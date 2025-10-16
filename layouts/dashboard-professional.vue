<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar Profesional -->
    <div class="fixed inset-y-0 left-0 z-50 w-72 bg-slate-800 shadow-2xl">
      <!-- Header del Sidebar -->
      <div class="flex items-center h-20 px-6 border-b border-slate-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" :class="getHeaderColorClass()">
            <span class="text-white font-bold text-lg">{{ currentMenuConfig.icon }}</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">{{ currentMenuConfig.title }}</h1>
            <p class="text-xs text-slate-400">{{ panelTitle }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-8 px-4">
        <div class="space-y-2">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group"
            :class="isActive(item.path) ? getActiveClass() : 'text-slate-300 hover:bg-slate-700 hover:text-white'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
            </svg>
            <span>{{ item.label }}</span>
            <div v-if="isActive(item.path)" class="ml-auto w-2 h-2 rounded-full" :class="getActiveDotClass()"></div>
          </NuxtLink>
        </div>
      </nav>

      <!-- User info -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="getHeaderColorClass()">
            <span class="text-sm font-bold text-white">{{ userInitial }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ userName }}</p>
            <p class="text-xs text-slate-400 truncate">{{ userEmail }}</p>
          </div>
        </div>
        <button @click="logout" 
                class="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-600/25">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-72">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-gray-900">{{ pageTitle }}</h1>
            </div>
            
            <!-- Header Actions -->
            <div class="flex items-center space-x-4">
              <!-- Notifications -->
              <button class="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5z"></path>
                </svg>
                <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <!-- User Menu -->
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="getHeaderColorClass()">
                  <span class="text-xs font-bold text-white">{{ userInitial }}</span>
                </div>
                <span class="text-sm font-medium text-gray-700">{{ userName }}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <!-- Botón de Soporte Flotante -->
    <div class="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/56912345678?text=Hola,%20necesito%20ayuda%20con%20mi%20cuenta"
        target="_blank"
        class="group flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div class="relative">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div class="hidden group-hover:block transition-all duration-300">
          <span class="text-sm font-medium">Soporte en Línea</span>
        </div>
      </a>
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

// Datos del usuario desde el store (priorizar email para mostrar en UI)
const userName = computed(() => authStore.user?.email || authStore.user?.displayName || 'Usuario')
const userEmail = computed(() => authStore.user?.email || '')

// Debug sidebar
try {
  console.log('🧭 [Sidebar] authStore.user:', authStore.user)
  watchEffect(() => {
    console.log('🧭 [Sidebar] userName:', userName.value, 'userEmail:', userEmail.value)
  })
} catch (e) {}
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())

// Cargar configuración del menú
const menuConfig = await import('~/data/menu-config.json')

// Determinar el rol del usuario y cargar menú correspondiente
const userRole = computed(() => {
  if (route.path.startsWith('/admin')) return 'admin'
  if (route.path.startsWith('/vendedor')) return 'vendedor'
  return 'cliente'
})

// Items del menú según el rol
const menuItems = computed(() => {
  return menuConfig.default[userRole.value]?.items || menuConfig.default.cliente.items
})

// Configuración del menú actual
const currentMenuConfig = computed(() => {
  return menuConfig.default[userRole.value] || menuConfig.default.cliente
})

// Título del panel según la ruta
const panelTitle = computed(() => {
  return currentMenuConfig.value?.title || 'Panel'
})

// Título de la página
const pageTitle = computed(() => {
  const currentItem = menuItems.value.find(item => item.path === route.path)
  return currentItem?.label || 'Dashboard'
})

// Función para verificar si una ruta está activa
const isActive = (path) => {
  return route.path === path
}

// Función para obtener clase activa según el color del menú
const getActiveClass = () => {
  const color = currentMenuConfig.value?.color || 'blue'
  const colorMap = {
    blue: 'bg-blue-600 text-white shadow-lg shadow-blue-600/25',
    red: 'bg-red-600 text-white shadow-lg shadow-red-600/25',
    green: 'bg-green-600 text-white shadow-lg shadow-green-600/25'
  }
  return colorMap[color] || colorMap.blue
}

// Función para obtener clase del dot activo
const getActiveDotClass = () => {
  const color = currentMenuConfig.value?.color || 'blue'
  const colorMap = {
    blue: 'bg-blue-300',
    red: 'bg-red-300',
    green: 'bg-green-300'
  }
  return colorMap[color] || colorMap.blue
}

// Función para obtener clase del header
const getHeaderColorClass = () => {
  const color = currentMenuConfig.value?.color || 'blue'
  const colorMap = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    red: 'bg-gradient-to-br from-red-500 to-red-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600'
  }
  return colorMap[color] || colorMap.blue
}

// Función de logout
const logout = async () => {
  await authStore.logout()
}
</script>
