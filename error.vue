<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      <!-- 404 Error -->
      <div v-if="error.statusCode === 404" class="space-y-6">
        <div class="text-6xl font-bold text-blue-600">404</div>
        <h1 class="text-3xl font-bold text-gray-800">Página no encontrada</h1>
        <p class="text-gray-600">
          La página que buscas no existe o ha sido movida. ¿Buscabas un repuesto específico?
        </p>
        
        <!-- Sugerencias útiles para SEO -->
        <div class="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">¿Qué puedes hacer?</h2>
          <div class="grid gap-3">
            <NuxtLink to="/repuestos" class="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <svg class="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <div class="text-left">
                <div class="font-medium text-gray-800">Ver todas las marcas</div>
                <div class="text-sm text-gray-600">Encuentra repuestos por marca</div>
              </div>
            </NuxtLink>
            
            <NuxtLink to="/contacto" class="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <div class="text-left">
                <div class="font-medium text-gray-800">¿No encuentras tu repuesto?</div>
                <div class="text-sm text-gray-600">Lo importamos por ti</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Marcas populares para navegación -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Marcas más buscadas</h3>
          <div class="grid grid-cols-2 gap-2">
            <NuxtLink to="/repuestos/toyota" class="text-blue-600 hover:text-blue-800 text-sm py-2 px-3 bg-blue-50 rounded hover:bg-blue-100 transition-colors">Toyota</NuxtLink>
            <NuxtLink to="/repuestos/nissan" class="text-blue-600 hover:text-blue-800 text-sm py-2 px-3 bg-blue-50 rounded hover:bg-blue-100 transition-colors">Nissan</NuxtLink>
            <NuxtLink to="/repuestos/chevrolet" class="text-blue-600 hover:text-blue-800 text-sm py-2 px-3 bg-blue-50 rounded hover:bg-blue-100 transition-colors">Chevrolet</NuxtLink>
            <NuxtLink to="/repuestos/bmw" class="text-blue-600 hover:text-blue-800 text-sm py-2 px-3 bg-blue-50 rounded hover:bg-blue-100 transition-colors">BMW</NuxtLink>
          </div>
        </div>
      </div>

      <!-- 500 Error -->
      <div v-else-if="error.statusCode === 500" class="space-y-6">
        <div class="text-6xl font-bold text-red-600">500</div>
        <h1 class="text-3xl font-bold text-gray-800">Error interno del servidor</h1>
        <p class="text-gray-600">
          Algo salió mal en nuestro servidor. Por favor, intenta de nuevo en unos minutos.
        </p>
        
        <div class="bg-white rounded-lg shadow p-6">
          <button @click="refresh" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            Intentar de nuevo
          </button>
        </div>
      </div>

      <!-- Otros errores -->
      <div v-else class="space-y-6">
        <div class="text-6xl font-bold text-orange-600">{{ error.statusCode }}</div>
        <h1 class="text-3xl font-bold text-gray-800">{{ error.statusMessage || 'Error' }}</h1>
        <p class="text-gray-600">
          {{ error.message || 'Ha ocurrido un error inesperado' }}
        </p>
      </div>

      <!-- Botón volver al inicio -->
      <div class="mt-8">
        <NuxtLink to="/" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['error'])

// Función para recargar la página
const refresh = () => {
  window.location.reload()
}

// SEO para páginas de error
useHead({
  title: `Error ${props.error.statusCode} - AutoPiezas360 Chile`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>