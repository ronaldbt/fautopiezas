<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
    
    <div class="space-y-6">
      <!-- Filtro por precio -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Rango de Precio</label>
        <div class="grid grid-cols-2 gap-2">
          <input 
            v-model.number="filtros.precioMin" 
            type="number" 
            placeholder="Mínimo"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input 
            v-model.number="filtros.precioMax" 
            type="number" 
            placeholder="Máximo"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <!-- Filtro por stock -->
      <div>
        <label class="flex items-center">
          <input 
            v-model="filtros.soloStock" 
            type="checkbox"
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span class="ml-2 text-sm text-gray-700">Solo con stock</span>
        </label>
      </div>

      <!-- Filtro por marca de repuesto -->
      <div v-if="marcasRepuestos.length">
        <label class="block text-sm font-medium text-gray-700 mb-2">Marca del Repuesto</label>
        <select 
          v-model="filtros.marcaRepuesto" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Todas las marcas</option>
          <option v-for="marca in marcasRepuestos" :key="marca" :value="marca">
            {{ marca }}
          </option>
        </select>
      </div>

      <!-- Filtro por subcategoría -->
      <div v-if="subcategorias.length">
        <label class="block text-sm font-medium text-gray-700 mb-2">Subcategoría</label>
        <select 
          v-model="filtros.subcategoria" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Todas las subcategorías</option>
          <option v-for="sub in subcategorias" :key="sub" :value="sub">
            {{ sub.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
          </option>
        </select>
      </div>

      <!-- Filtro por garantía -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Garantía Mínima</label>
        <select 
          v-model="filtros.garantiaMinima" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Cualquier garantía</option>
          <option value="6">6 meses o más</option>
          <option value="12">12 meses o más</option>
          <option value="24">24 meses o más</option>
          <option value="36">36 meses o más</option>
        </select>
      </div>

      <!-- Filtro por ordenamiento -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
        <select 
          v-model="filtros.ordenarPor" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="relevancia">Relevancia</option>
          <option value="precio">Precio (menor a mayor)</option>
          <option value="precio-desc">Precio (mayor a menor)</option>
          <option value="nombre">Nombre (A-Z)</option>
          <option value="fecha">Más recientes</option>
        </select>
      </div>

      <!-- Botones de acción -->
      <div class="flex space-x-2 pt-4 border-t">
        <button 
          @click="aplicarFiltros"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Aplicar Filtros
        </button>
        <button 
          @click="limpiarFiltros"
          class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          Limpiar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  subcategorias: {
    type: Array,
    default: () => []
  },
  marcasRepuestos: {
    type: Array,
    default: () => []
  },
  filtrosIniciales: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['filtros-aplicados', 'filtros-limpios'])

// Filtros reactivos
const filtros = ref({
  precioMin: props.filtrosIniciales.precioMin,
  precioMax: props.filtrosIniciales.precioMax,
  soloStock: props.filtrosIniciales.soloStock || false,
  marcaRepuesto: props.filtrosIniciales.marcaRepuesto || '',
  subcategoria: props.filtrosIniciales.subcategoria || '',
  garantiaMinima: props.filtrosIniciales.garantiaMinima || '',
  ordenarPor: props.filtrosIniciales.ordenarPor || 'relevancia'
})

// Función para aplicar filtros
const aplicarFiltros = () => {
  // Limpiar valores vacíos
  const filtrosLimpios = Object.fromEntries(
    Object.entries(filtros.value).filter(([_, value]) => 
      value !== '' && value !== null && value !== undefined
    )
  )
  
  emit('filtros-aplicados', filtrosLimpios)
}

// Función para limpiar filtros
const limpiarFiltros = () => {
  filtros.value = {
    precioMin: undefined,
    precioMax: undefined,
    soloStock: false,
    marcaRepuesto: '',
    subcategoria: '',
    garantiaMinima: '',
    ordenarPor: 'relevancia'
  }
  
  emit('filtros-limpios')
}

// Aplicar filtros automáticamente cuando cambian (opcional)
watch(filtros, () => {
  // Descomenta la siguiente línea si quieres aplicar filtros automáticamente
  // aplicarFiltros()
}, { deep: true })
</script>
