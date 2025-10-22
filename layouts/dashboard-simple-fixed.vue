<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div class="flex items-center justify-between h-16 px-6 border-b">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">A</span>
          </div>
          <span class="text-xl font-bold text-gray-800">Autopiezas360</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <NuxtLink to="/cliente" 
                   class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                   :class="isActive('/cliente') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            Dashboard
          </NuxtLink>
          
          <NuxtLink to="/cliente/perfil" 
                   class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                   :class="isActive('/cliente/perfil') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Mi Perfil
          </NuxtLink>
          
          <NuxtLink to="/cliente/pedidos" 
                   class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                   :class="isActive('/cliente/pedidos') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Mis Pedidos
          </NuxtLink>
          
          <NuxtLink to="/cliente/pagos" 
                   class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                   :class="isActive('/cliente/pagos') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Pagos
          </NuxtLink>
          
          <NuxtLink to="/cliente/favoritos" 
                   class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                   :class="isActive('/cliente/favoritos') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            Favoritos
          </NuxtLink>
        </div>
      </nav>

      <!-- User info -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-white">{{ userInitial }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
            <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
          </div>
        </div>
        <button @click="logout" 
                class="w-full mt-3 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          Cerrar Sesión
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <h1 class="text-xl font-semibold text-gray-900">{{ pageTitle }}</h1>
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
const authStore = useAuthStore()

// Datos del usuario desde el store
const userName = computed(() => authStore.user?.displayName || 'Usuario')
const userEmail = computed(() => authStore.user?.email || '')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())

// Título de la página
const pageTitle = computed(() => {
  const titles = {
    '/cliente': 'Dashboard',
    '/cliente/perfil': 'Mi Perfil',
    '/cliente/pedidos': 'Mis Pedidos',
    '/cliente/pagos': 'Pagos',
    '/cliente/favoritos': 'Favoritos'
  }
  return titles[route.path] || 'Dashboard'
})

// Función para verificar si una ruta está activa
const isActive = (path) => {
  return route.path === path
}

// Función de logout
const logout = async () => {
  await authStore.logout()
}

console.log('Layout dashboard-simple-fixed cargado')
</script>





















