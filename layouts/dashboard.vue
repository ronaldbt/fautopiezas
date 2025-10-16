<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar 
      :is-open="sidebarOpen" 
      :config="menuConfig" 
      :user="user"
      @toggle="toggleSidebar" />

    <!-- Overlay para móvil -->
    <div v-if="sidebarOpen" @click="toggleSidebar" 
         class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"></div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <button @click="toggleSidebar" class="lg:hidden mr-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <h1 class="text-xl font-semibold text-gray-900">{{ pageTitle }}</h1>
            </div>
            
            <!-- Header Actions -->
            <div class="flex items-center space-x-4">
              <!-- Link al sitio web (solo para admin) -->
              <NuxtLink v-if="userRole === 'admin'" to="/" 
                       class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50 transition-colors">
                Ver Sitio Web
              </NuxtLink>
              
              <!-- Notifications -->
              <button class="p-2 text-gray-400 hover:text-gray-500 relative">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5z"></path>
                </svg>
                <span class="absolute top-0 right-0 w-2 h-2 rounded-full" 
                      :class="getNotificationColor(menuConfig.color)"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <slot />
      </main>
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

const route = useRoute()
const { $firebaseAuth, $firestore } = useNuxtApp()

// Estado del sidebar
const sidebarOpen = ref(false)

// Datos del usuario
const user = ref({})
const userRole = ref('cliente')
const menuConfig = ref({})

// Título de la página
const pageTitle = computed(() => {
  // Buscar el título en la configuración del menú
  const currentItem = menuConfig.value.items?.find(item => item.path === route.path)
  return currentItem?.label || 'Dashboard'
})

// Función para toggle del sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// Función para obtener color de notificación
const getNotificationColor = (color) => {
  const colorMap = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500'
  }
  return colorMap[color] || 'bg-blue-500'
}

// Cargar configuración del menú por defecto primero
const loadDefaultMenu = async () => {
  try {
    const menuConfigData = await import('~/data/menu-config.json')
    menuConfig.value = menuConfigData.default.cliente
  } catch (error) {
    console.error('Error cargando configuración del menú:', error)
    // Configuración hardcodeada de emergencia
    menuConfig.value = {
      color: 'blue',
      icon: 'A',
      title: 'Autopiezas360',
      items: [
        { label: 'Dashboard', path: '/cliente', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
        { label: 'Mi Perfil', path: '/cliente/perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { label: 'Mis Pedidos', path: '/cliente/pedidos', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' }
      ]
    }
  }
}

// Cargar configuración del menú y datos del usuario
onMounted(async () => {
  const currentUser = $firebaseAuth?.currentUser
  
  if (currentUser) {
    user.value = currentUser
    
    // Cargar menú por defecto primero para que siempre se vea el sidebar
    await loadDefaultMenu()
    
    try {
      // Buscar el rol del usuario en Firestore
      const { doc, getDoc } = await import('firebase/firestore')
      const userDoc = await getDoc(doc($firestore, 'users', currentUser.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        userRole.value = userData.role || 'cliente'
      } else {
        // Si no existe el documento, crear uno con rol de cliente por defecto
        const { setDoc } = await import('firebase/firestore')
        await setDoc(doc($firestore, 'users', currentUser.uid), {
          email: currentUser.email,
          displayName: currentUser.displayName,
          role: 'cliente',
          createdAt: new Date(),
          lastLogin: new Date()
        })
        userRole.value = 'cliente'
      }
      
      // Actualizar configuración del menú según el rol
      const menuConfigData = await import('~/data/menu-config.json')
      menuConfig.value = menuConfigData.default[userRole.value] || menuConfigData.default.cliente
      
    } catch (error) {
      console.error('Error cargando datos del usuario:', error)
      // Mantener configuración por defecto
    }
  } else {
    // Redirigir al login si no hay usuario
    await navigateTo('/login')
  }
})
</script>
