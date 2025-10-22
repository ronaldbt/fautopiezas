<template>
  <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out" 
       :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }">
    
    <!-- Header del Sidebar -->
    <div class="flex items-center justify-between h-16 px-6 border-b">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" 
             :class="getColorClass(config.color, 'bg')">
          <span class="text-white font-bold text-sm">{{ config.icon }}</span>
        </div>
        <span class="text-xl font-bold text-gray-800">{{ config.title }}</span>
      </div>
      <button @click="$emit('toggle')" class="lg:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="mt-6 px-3">
      <div class="space-y-1">
        <NuxtLink 
          v-for="item in config.items" 
          :key="item.path"
          :to="item.path"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="isActive(item.path) ? getActiveClass(config.color) : 'text-gray-600 hover:bg-gray-100'">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
          </svg>
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>

    <!-- User info -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center" 
             :class="getColorClass(config.color, 'bg')">
          <span class="text-sm font-medium text-white">{{ userInitial }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
          <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
        </div>
      </div>
      <button @click="logout" 
              class="w-full mt-3 px-3 py-2 text-sm rounded-lg transition-colors"
              :class="getColorClass(config.color, 'text', 'hover')">
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  config: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['toggle'])

const route = useRoute()
const { $firebaseAuth } = useNuxtApp()

// Detección de navegador para optimizaciones específicas
const detectBrowser = () => {
  if (process.client) {
    const userAgent = navigator.userAgent
    return {
      isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
      isFirefox: /Firefox/.test(userAgent),
      version: userAgent.match(/Chrome\/(\d+)/)?.[1] || '0'
    }
  }
  return { isChrome: false, isFirefox: false, version: '0' }
}

const browserInfo = detectBrowser()

// Datos del usuario
const userName = computed(() => props.user.displayName || 'Usuario')
const userEmail = computed(() => props.user.email || '')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())

// Función para verificar si una ruta está activa
const isActive = (path) => {
  return route.path === path
}

// Función para obtener clases de color dinámicamente
const getColorClass = (color, type, variant = '') => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-50'
    },
    red: {
      bg: 'bg-red-600',
      text: 'text-red-600',
      hover: 'hover:bg-red-50'
    },
    green: {
      bg: 'bg-green-600',
      text: 'text-green-600',
      hover: 'hover:bg-green-50'
    }
  }
  
  return colorMap[color]?.[type] || colorMap.blue[type]
}

// Función para obtener clase activa
const getActiveClass = (color) => {
  const activeMap = {
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700',
    green: 'bg-green-100 text-green-700'
  }
  
  return activeMap[color] || activeMap.blue
}

// Función de logout optimizada para Chrome
const logout = async () => {
  try {
    const { signOut } = await import('firebase/auth')
    
    // Limpieza específica para Chrome
    if (browserInfo.isChrome) {
      console.log('🧹 Limpiando datos específicos de Chrome...')
      try {
        // Limpiar localStorage y sessionStorage
        localStorage.clear()
        sessionStorage.clear()
        
        // Limpiar datos específicos de Firebase
        localStorage.removeItem('firebase:authUser')
        localStorage.removeItem('firebase:host:')
        
        console.log('✅ Limpieza de Chrome completada')
      } catch (cleanError) {
        console.warn('⚠️ Error en limpieza de Chrome:', cleanError)
      }
    }
    
    await signOut($firebaseAuth)
    await navigateTo('/')
    
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    
    // Fallback para Chrome si falla el logout normal
    if (browserInfo.isChrome) {
      console.log('🔄 Aplicando logout alternativo para Chrome...')
      try {
        // Limpiar todo y redirigir
        localStorage.clear()
        sessionStorage.clear()
        await navigateTo('/')
      } catch (fallbackError) {
        console.error('Error en logout alternativo:', fallbackError)
        // Último recurso: recargar la página
        if (process.client) {
          window.location.href = '/'
        }
      }
    }
  }
}
</script>





















