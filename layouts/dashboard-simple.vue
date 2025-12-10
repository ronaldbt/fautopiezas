<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Dashboard Simple - {{ userRole }}</h1>
      <p>Usuario: {{ user?.email || 'No autenticado' }}</p>
      <p>Rol: {{ userRole }}</p>
      <slot />
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
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const { $firebaseAuth, $firestore } = useNuxtApp()

// Estado del usuario
const user = ref({})
const userRole = ref('cliente')

// Cargar datos del usuario
onMounted(async () => {
  const currentUser = $firebaseAuth?.currentUser
  
  if (currentUser) {
    user.value = currentUser
    
    try {
      // Buscar el rol del usuario en Firestore
      const { doc, getDoc } = await import('firebase/firestore')
      const userDoc = await getDoc(doc($firestore, 'users', currentUser.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        userRole.value = userData.role || 'cliente'
      }
    } catch (error) {
      console.error('Error cargando datos del usuario:', error)
    }
  }
})
</script>































