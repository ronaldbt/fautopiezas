import { onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin(async () => {
  const { $firebaseAuth } = useNuxtApp()
  const authStore = useAuthStore()

  // Verificar estado de autenticación al cargar la app
  if ($firebaseAuth) {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged($firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        await authStore.loadUserData(firebaseUser.uid)
      } else {
        authStore.setUser(null)
      }
    })
  }
})

