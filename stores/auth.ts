import { defineStore } from 'pinia'

export interface User {
  uid: string
  email: string | null
  displayName: string | null
  role: string
  createdAt?: Date
  lastLogin?: Date
}

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || 'cliente')
  const isLoading = ref(false)

  // Acciones
  const setUser = (userData: User | null) => {
    user.value = userData
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { $firebaseAuth } = useNuxtApp()
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      
      const userCredential = await signInWithEmailAndPassword($firebaseAuth, email, password)
      await loadUserData(userCredential.user.uid)
      
      return userCredential.user
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      const { $firebaseAuth } = await import('firebase/auth')
      const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth')
      
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup($firebaseAuth, provider)
      await loadUserData(result.user.uid)
      
      return result.user
    } catch (error) {
      console.error('Error en login con Google:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, displayName: string, phone?: string) => {
    try {
      setLoading(true)
      const { $firebaseAuth, $firestore } = useNuxtApp()
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
      const { doc, setDoc } = await import('firebase/firestore')
      
      // Crear usuario
      const userCredential = await createUserWithEmailAndPassword($firebaseAuth, email, password)
      
      // Actualizar perfil
      await updateProfile(userCredential.user, { displayName })
      
      // Guardar en Firestore
      await setDoc(doc($firestore, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        displayName,
        phone: phone || '',
        role: 'cliente',
        createdAt: new Date(),
        lastLogin: new Date()
      })
      
      // Cargar datos del usuario
      await loadUserData(userCredential.user.uid)
      
      return userCredential.user
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loadUserData = async (uid: string) => {
    try {
      const { $firestore } = useNuxtApp()
      const { doc, getDoc } = await import('firebase/firestore')
      
      const userDoc = await getDoc(doc($firestore, 'users', uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        setUser({
          uid,
          email: userData.email,
          displayName: userData.displayName,
          role: userData.role || 'cliente',
          createdAt: userData.createdAt?.toDate(),
          lastLogin: userData.lastLogin?.toDate()
        })
        
        // Actualizar último login
        const { setDoc } = await import('firebase/firestore')
        await setDoc(doc($firestore, 'users', uid), {
          ...userData,
          lastLogin: new Date()
        }, { merge: true })
      } else {
        // Si no existe, crear documento por defecto
        const { setDoc } = await import('firebase/firestore')
        await setDoc(doc($firestore, 'users', uid), {
          email: null,
          displayName: null,
          role: 'cliente',
          createdAt: new Date(),
          lastLogin: new Date()
        })
        
        setUser({
          uid,
          email: null,
          displayName: null,
          role: 'cliente'
        })
      }
    } catch (error) {
      console.error('Error cargando datos del usuario:', error)
      // En caso de error, crear usuario básico
      setUser({
        uid,
        email: null,
        displayName: null,
        role: 'cliente'
      })
    }
  }

  const logout = async () => {
    try {
      const { $firebaseAuth } = useNuxtApp()
      const { signOut } = await import('firebase/auth')
      
      await signOut($firebaseAuth)
      setUser(null)
      
      // Redirigir al login
      await navigateTo('/login')
    } catch (error) {
      console.error('Error en logout:', error)
      throw error
    }
  }

  const checkAuthState = async () => {
    try {
      const { $firebaseAuth } = useNuxtApp()
      
      if ($firebaseAuth?.currentUser) {
        await loadUserData($firebaseAuth.currentUser.uid)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error verificando estado de autenticación:', error)
      setUser(null)
    }
  }

  return {
    // Estado
    user: readonly(user),
    isAuthenticated,
    userRole,
    isLoading: readonly(isLoading),
    
    // Acciones
    setUser,
    setLoading,
    login,
    loginWithGoogle,
    register,
    logout,
    checkAuthState,
    loadUserData
  }
})


