<template>
  <div class="bg-white rounded-xl p-6 shadow-lg">
    
    <!-- Formulario horizontal como en la imagen -->
    <div class="flex flex-col lg:flex-row gap-4 items-end">
      <!-- Selector de Marca -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Marca</label>
        <select 
          v-model="marcaSeleccionada" 
          @change="onMarcaChange"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        >
          <option value="" class="text-gray-500">Seleccionar marca</option>
          <option v-for="marca in marcas" :key="marca.slug" :value="marca" class="text-gray-900">
            {{ marca.nombre }}
          </option>
        </select>
      </div>

      <!-- Selector de Modelo -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
        <select 
          v-model="modeloSeleccionado" 
          @change="onModeloChange"
          :disabled="!marcaSeleccionada"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
          :class="marcaSeleccionada ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-400'"
        >
          <option value="" class="text-gray-500">Seleccionar modelo</option>
          <option v-for="modelo in modelos" :key="modelo.slug" :value="modelo" class="text-gray-900">
            {{ modelo.nombre }}
          </option>
        </select>
      </div>

      <!-- Selector de Año -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Año</label>
        <select 
          v-model="añoSeleccionado" 
          :disabled="!modeloSeleccionado"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
          :class="modeloSeleccionado ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-400'"
        >
          <option value="" class="text-gray-500">Seleccionar año</option>
          <option v-for="año in años" :key="año" :value="año" class="text-gray-900">
            {{ año }}
          </option>
        </select>
      </div>

      <!-- Botón de búsqueda -->
      <button 
        @click="buscarRepuestos"
        :disabled="!marcaSeleccionada || !modeloSeleccionado || !añoSeleccionado"
        class="px-6 py-2 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        Buscar Repuestos
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Composables
const { getMarcas, getModelosByMarca } = useVehiculos()

// Variables reactivas
const marcaSeleccionada = ref('')
const modeloSeleccionado = ref('')
const añoSeleccionado = ref('')
const modelos = ref([])
const años = ref([])
const loadingModelos = ref(false)

// Obtener marcas
const marcas = getMarcas()

// Función para manejar cambio de marca
const onMarcaChange = async () => {
  modeloSeleccionado.value = ''
  añoSeleccionado.value = ''
  años.value = []
  
  if (marcaSeleccionada.value) {
    loadingModelos.value = true
    try {
      // Cargar modelos desde el archivo JSON específico de la marca
      const marcaData = await import(`~/data/marcas/${marcaSeleccionada.value.slug}.json`)
      const marcaInfo = marcaData.default || marcaData
      modelos.value = marcaInfo.modelos || []
    } catch (error) {
      console.error('Error cargando modelos:', error)
      // Fallback: usar el composable si no existe el archivo específico
      try {
        modelos.value = await getModelosByMarca(marcaSeleccionada.value.slug)
      } catch (fallbackError) {
        console.error('Error en fallback:', fallbackError)
        modelos.value = []
      }
    } finally {
      loadingModelos.value = false
    }
  } else {
    modelos.value = []
  }
}

// Función para manejar cambio de modelo
const onModeloChange = () => {
  añoSeleccionado.value = ''
  
  if (modeloSeleccionado.value && modeloSeleccionado.value.años) {
    // Filtrar años desde 1970 en adelante y usar los años específicos del modelo
    const añosModelo = modeloSeleccionado.value.años.filter(año => año >= 1970)
    años.value = añosModelo.sort((a, b) => b - a) // Ordenar de mayor a menor
  } else {
    // Años genéricos desde 1970 hasta el año actual
    const añoActual = new Date().getFullYear()
    años.value = Array.from({ length: añoActual - 1970 + 1 }, (_, i) => añoActual - i)
  }
}

// Función para buscar repuestos
const buscarRepuestos = () => {
  // Validación estricta de todos los campos requeridos
  if (!marcaSeleccionada.value || !marcaSeleccionada.value.slug) {
    alert('Por favor selecciona una marca')
    return
  }
  
  if (!modeloSeleccionado.value || !modeloSeleccionado.value.slug) {
    alert('Por favor selecciona un modelo')
    return
  }
  
  if (!añoSeleccionado.value || añoSeleccionado.value === '' || añoSeleccionado.value === 'undefined') {
    alert('Por favor selecciona un año')
    return
  }
  
  // Solo navegar si todos los valores son válidos
  const marcaSlug = String(marcaSeleccionada.value.slug).trim()
  const modeloSlug = String(modeloSeleccionado.value.slug).trim()
  const año = String(añoSeleccionado.value).trim()
  
  if (marcaSlug && modeloSlug && año && año !== 'undefined') {
    navigateTo(`/repuestos/${marcaSlug}/${modeloSlug}/${año}`)
  } else {
    alert('Por favor completa todos los campos correctamente')
  }
}

// Función para contactar por WhatsApp
const contactarWhatsApp = () => {
  if (marcaSeleccionada.value && modeloSeleccionado.value && añoSeleccionado.value) {
    const mensaje = `Hola! Me interesa consultar sobre repuestos para mi vehículo:\n\n• Marca: ${marcaSeleccionada.value.nombre}\n• Modelo: ${modeloSeleccionado.value.nombre}\n• Año: ${añoSeleccionado.value}\n\n¿Podrían ayudarme?`
    const numeroWhatsApp = '+56979796841'
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
    
    window.open(urlWhatsApp, '_blank')
  }
}

// Exponer funciones para uso externo
defineExpose({
  marcaSeleccionada,
  modeloSeleccionado,
  añoSeleccionado,
  buscarRepuestos,
  contactarWhatsApp
})
</script>
