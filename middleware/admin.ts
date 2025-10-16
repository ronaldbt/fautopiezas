export default defineNuxtRouteMiddleware(async (to, from) => {
  // Primero verificar autenticación
  const authMiddleware = await import('./auth')
  await authMiddleware.default(to, from)
  
  // Si no hay autenticación disponible en el servidor, permitir el acceso
  if (process.server) {
    return
  }

  // Verificar si el usuario es administrador
  const { $firebaseAuth, $firestore } = useNuxtApp()
  const user = $firebaseAuth?.currentUser
  
  if (user) {
    try {
      // Buscar el documento del usuario en Firestore
      const { doc, getDoc } = await import('firebase/firestore')
      const userDoc = await getDoc(doc($firestore, 'users', user.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        if (userData.role !== 'admin' && userData.role !== 'superadmin') {
          // Si no es admin o superadmin, redirigir según su rol
          switch (userData.role) {
            case 'vendedor':
              return navigateTo('/vendedor')
            default:
              return navigateTo('/cliente')
          }
        }
      } else {
        // Si no existe el documento, crear uno con rol de cliente por defecto
        const { setDoc } = await import('firebase/firestore')
        await setDoc(doc($firestore, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName,
          role: 'cliente',
          createdAt: new Date(),
          lastLogin: new Date()
        })
        return navigateTo('/cliente')
      }
    } catch (error) {
      console.error('Error verificando rol de usuario:', error)
      return navigateTo('/cliente')
    }
  }
})
