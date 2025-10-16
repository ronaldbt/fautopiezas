<template>
  <div>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Verificando acceso...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

// SEO - No indexar páginas privadas
useHead({
  title: 'Dashboard - Autopiezas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Verificar rol del usuario y redirigir
onMounted(async () => {
  const { $firebaseAuth, $firestore } = useNuxtApp()
  const user = $firebaseAuth?.currentUser
  
  if (user) {
    try {
      // Buscar el documento del usuario en Firestore
      const { doc, getDoc } = await import('firebase/firestore')
      const userDoc = await getDoc(doc($firestore, 'users', user.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const role = userData.role || 'cliente'
        
        // Redirigir según el rol
        switch (role) {
          case 'admin':
            await navigateTo('/admin')
            break
          case 'vendedor':
            await navigateTo('/vendedor')
            break
          default:
            await navigateTo('/cliente')
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
        await navigateTo('/cliente')
      }
    } catch (error) {
      console.error('Error verificando rol de usuario:', error)
      await navigateTo('/cliente')
    }
  } else {
    await navigateTo('/login')
  }
})
</script>


