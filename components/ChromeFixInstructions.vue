<template>
  <div v-if="showInstructions" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Solución para Chrome</h3>
        <button @click="closeInstructions" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-red-800">Error QUIC Detectado</h4>
              <p class="text-sm text-red-700 mt-1">
                Chrome está usando el protocolo QUIC que causa problemas con Firebase. <strong>Solución rápida:</strong>
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-yellow-800">Error de Conexión Detectado</h4>
              <p class="text-sm text-yellow-700 mt-1">
                Chrome está teniendo problemas para conectarse con Firebase. Sigue estos pasos:
              </p>
            </div>
          </div>
        </div>
        
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-red-600">1</span>
            </div>
            <div>
              <p class="text-sm text-gray-700">
                <strong>DESHABILITAR QUIC:</strong> Ve a <code class="px-1 py-0.5 bg-gray-100 rounded text-xs">chrome://flags/#enable-quic</code> y cambia a <strong>Disabled</strong>
              </p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600">2</span>
            </div>
            <div>
              <p class="text-sm text-gray-700">
                <strong>Limpiar caché de Chrome:</strong> Presiona <kbd class="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+Shift+Del</kbd> y selecciona "Todo el tiempo"
              </p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600">3</span>
            </div>
            <div>
              <p class="text-sm text-gray-700">
                <strong>Desactivar extensiones:</strong> Ve a <code class="px-1 py-0.5 bg-gray-100 rounded text-xs">chrome://extensions/</code> y desactiva temporalmente todas las extensiones
              </p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600">4</span>
            </div>
            <div>
              <p class="text-sm text-gray-700">
                <strong>Reiniciar Chrome:</strong> Cierra completamente Chrome y ábrelo nuevamente
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-blue-800">Alternativa</h4>
              <p class="text-sm text-blue-700 mt-1">
                Si el problema persiste, intenta usar Firefox o Edge, donde la aplicación funciona perfectamente.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-6 flex justify-between">
        <button @click="openQuicSettings" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          🔧 Abrir Configuración QUIC
        </button>
        <div class="flex space-x-3">
          <button @click="tryAgain" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Intentar Nuevamente
          </button>
          <button @click="closeInstructions" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'retry'])

const showInstructions = computed(() => props.show)

const closeInstructions = () => {
  emit('close')
}

const tryAgain = () => {
  emit('retry')
}

const openQuicSettings = () => {
  // Abrir configuración de QUIC en Chrome
  window.open('chrome://flags/#enable-quic', '_blank')
}
</script>
</template>
