<template>
  <div>
    <!-- Header fijo -->
    <Header />

    <!-- Contenido principal con padding para compensar header fijo -->
    <main class="pt-32 min-h-screen bg-gray-50">
      <div class="max-w-md mx-auto px-4 py-12">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <!-- Logo y título -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">A</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
            <p class="text-gray-600 mt-2">Accede a tu cuenta de Autopiezas360</p>
          </div>

          <!-- Formulario de login -->
          <form @submit.prevent="login" class="space-y-6">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu@email.com"
              />
            </div>

            <!-- Contraseña -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <!-- Recordar sesión -->
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-600">Recordar sesión</span>
              </label>
              <NuxtLink to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </NuxtLink>
            </div>

            <!-- Botón de login -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <span v-if="loading">Iniciando sesión...</span>
              <span v-else>Iniciar Sesión</span>
            </button>

            <!-- Error message -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <p class="text-red-600 text-sm">{{ error }}</p>
            </div>
          </form>

          <!-- Divider -->
          <div class="my-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">O continúa con</span>
              </div>
            </div>
          </div>

          <!-- Login con Google -->
          <button
            @click="loginWithGoogle"
            :disabled="loading"
            class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continuar con Google</span>
          </button>

          <!-- Link a registro -->
          <div class="mt-6 text-center">
            <p class="text-gray-600">
              ¿No tienes cuenta?
              <NuxtLink to="/registro" class="text-blue-600 hover:text-blue-700 font-medium">
                Regístrate aquí
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// Variables reactivas
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

// Función para redirigir según el rol del usuario
const redirectByRole = async (userId) => {
  console.log('🔄 Iniciando redirección por rol...')
  console.log('👤 User ID:', userId)
  
  try {
    console.log('🔍 Obteniendo Firestore...')
    const { $firestore } = useNuxtApp()
    console.log('✅ Firestore obtenido:', $firestore ? 'SÍ' : 'NO')
    
    const { doc, getDoc } = await import('firebase/firestore')
    console.log('📄 Buscando documento de usuario...')
    
    const userDoc = await getDoc(doc($firestore, 'users', userId))
    console.log('📋 Documento existe:', userDoc.exists())
    
    if (userDoc.exists()) {
      const userData = userDoc.data()
      console.log('👤 Datos del usuario completos:', userData)
      console.log('🔍 Campos disponibles:', Object.keys(userData))
      
      // Buscar el rol de diferentes maneras posibles
      const role = userData.role || userData.userRole || userData.role_type || 'cliente'
      console.log('🎭 Rol detectado:', role)
      console.log('🔍 Verificación de rol admin:', role === 'admin')
      
      // Actualizar último login
      console.log('⏰ Actualizando último login...')
      const { setDoc } = await import('firebase/firestore')
      await setDoc(doc($firestore, 'users', userId), {
        ...userData,
        lastLogin: new Date()
      }, { merge: true })
      console.log('✅ Último login actualizado')
      
      // Redirigir según el rol
      console.log('🎯 Redirigiendo según rol:', role)
      console.log('🔍 Comparación de roles:')
      console.log('  - role === "admin":', role === 'admin')
      console.log('  - role === "superadmin":', role === 'superadmin')
      console.log('  - typeof role:', typeof role)
      console.log('  - role.trim():', role.trim())
      
      if (role === 'admin' || role === 'superadmin') {
        console.log('🔐 Redirigiendo a admin...')
        await navigateTo('/admin')
      } else if (role === 'vendedor') {
        console.log('💼 Redirigiendo a vendedor...')
        await navigateTo('/vendedor')
      } else {
        console.log('👤 Redirigiendo a cliente (rol no reconocido):', role)
        await navigateTo('/cliente')
      }
    } else {
      console.log('📝 Documento de usuario no existe, creando...')
      // Si no existe el documento, crear uno con rol de cliente por defecto
      const { setDoc } = await import('firebase/firestore')
      const { $firebaseAuth } = useNuxtApp()
      const user = $firebaseAuth?.currentUser
      
      await setDoc(doc($firestore, 'users', userId), {
        email: user?.email,
        displayName: user?.displayName,
        role: 'cliente',
        createdAt: new Date(),
        lastLogin: new Date()
      })
      console.log('✅ Documento de usuario creado')
      
      console.log('👤 Redirigiendo a cliente (nuevo usuario)...')
      await navigateTo('/cliente')
    }
  } catch (error) {
    console.error('❌ Error verificando rol de usuario:', error)
    console.error('🔍 Código de error:', error.code)
    console.error('📝 Mensaje de error:', error.message)
    // En caso de error, redirigir al dashboard del cliente por defecto
    console.log('🆘 Redirigiendo a cliente por defecto (error)...')
    await navigateTo('/cliente')
  }
}

// Función de login con email y contraseña
const login = async () => {
  console.log('🚀 Iniciando proceso de login...')
  console.log('📧 Email ingresado:', email.value)
  console.log('🔒 Contraseña ingresada:', password.value ? '***' + password.value.slice(-2) : 'VACÍA')
  
  loading.value = true
  error.value = ''

  try {
    console.log('🔍 Obteniendo Firebase Auth...')
    const { $firebaseAuth } = useNuxtApp()
    console.log('✅ Firebase Auth obtenido:', $firebaseAuth ? 'SÍ' : 'NO')
    console.log('🔑 Firebase Auth object:', $firebaseAuth)
    
    console.log('📡 Intentando autenticación con Firebase...')
    console.log('🌐 URL de autenticación: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword')
    
    const userCredential = await signInWithEmailAndPassword($firebaseAuth, email.value, password.value)
    console.log('✅ Autenticación exitosa!')
    console.log('👤 Usuario autenticado:', userCredential.user.uid)
    console.log('📧 Email del usuario:', userCredential.user.email)
    
    // Redirigir según el rol del usuario
    console.log('🔄 Redirigiendo según rol...')
    await redirectByRole(userCredential.user.uid)
  } catch (err) {
    console.error('❌ Error en login:', err)
    console.error('🔍 Código de error:', err.code)
    console.error('📝 Mensaje de error:', err.message)
    console.error('🌐 Error stack:', err.stack)
    
    // Verificar si es un error de red
    if (err.code === 'auth/network-request-failed') {
      console.error('🌐 Error de red detectado!')
      console.error('🔍 Posibles causas:')
      console.error('   - Conexión a internet interrumpida')
      console.error('   - Firebase API no disponible')
      console.error('   - Configuración incorrecta de Firebase')
      console.error('   - CORS o políticas de seguridad')
    }
    
    switch (err.code) {
      case 'auth/user-not-found':
        error.value = 'No existe una cuenta con este correo electrónico.'
        break
      case 'auth/wrong-password':
        error.value = 'La contraseña es incorrecta.'
        break
      case 'auth/invalid-email':
        error.value = 'El correo electrónico no es válido.'
        break
      case 'auth/too-many-requests':
        error.value = 'Demasiados intentos fallidos. Intenta más tarde.'
        break
      case 'auth/network-request-failed':
        error.value = 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.'
        break
      default:
        error.value = 'Error al iniciar sesión. Intenta nuevamente.'
    }
  } finally {
    console.log('🏁 Finalizando proceso de login...')
    loading.value = false
  }
}

// Función de login con Google
const loginWithGoogle = async () => {
  loading.value = true
  error.value = ''

  try {
    const { $firebaseAuth } = useNuxtApp()
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup($firebaseAuth, provider)
    
    // Redirigir según el rol del usuario
    await redirectByRole(result.user.uid)
  } catch (err) {
    console.error('Error en login con Google:', err)
    error.value = 'Error al iniciar sesión con Google. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

// SEO Meta
useHead({
  title: 'Iniciar Sesión - Autopiezas360',
  meta: [
    { name: 'description', content: 'Inicia sesión en tu cuenta de Autopiezas360 para acceder a repuestos originales y ofertas exclusivas.' }
  ]
})
</script>






