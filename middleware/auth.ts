export default defineNuxtRouteMiddleware(async (to, from) => {
  // Si no hay autenticación disponible en el servidor, permitir el acceso
  // La verificación real se hará en el cliente
  if (process.server) {
    return
  }

  // Esperar a que la aplicación se monte completamente
  await nextTick()
  
  try {
    // Verificar si el usuario está autenticado
    const { $firebaseAuth } = useNuxtApp()
    
    if (!$firebaseAuth) {
      console.warn('Firebase Auth no está disponible')
      return
    }

    // Verificar autenticación en el cliente
    const user = $firebaseAuth.currentUser
    
    if (!user) {
      // Si no está autenticado, redirigir al login
      return navigateTo('/login')
    }
  } catch (error) {
    console.error('Error en middleware de autenticación:', error)
    // En caso de error, redirigir al login para estar seguros
    return navigateTo('/login')
  }
})
