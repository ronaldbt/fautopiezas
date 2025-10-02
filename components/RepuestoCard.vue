<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
    <!-- Imagen del repuesto -->
    <div class="aspect-w-16 aspect-h-9 bg-gray-200">
      <img 
        v-if="repuesto.imagen" 
        :src="repuesto.imagen" 
        :alt="repuesto.nombre"
        class="w-full h-48 object-cover"
      >
      <div v-else class="w-full h-48 flex items-center justify-center bg-gray-100">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
      </div>
    </div>

    <!-- Contenido de la tarjeta -->
    <div class="p-4">
      <!-- Nombre del repuesto -->
      <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {{ repuesto.nombre }}
      </h3>

      <!-- Descripción -->
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ repuesto.descripcion }}
      </p>

      <!-- Información del vehículo -->
      <div class="text-xs text-gray-500 mb-3">
        <div class="flex items-center space-x-2">
          <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {{ repuesto.marca.toUpperCase() }}
          </span>
          <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {{ repuesto.modelo }}
          </span>
          <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {{ repuesto.año }}
          </span>
        </div>
      </div>

      <!-- Código OEM si existe -->
      <div v-if="repuesto.codigoOEM" class="text-xs text-gray-500 mb-3">
        <span class="font-medium">Código OEM:</span> {{ repuesto.codigoOEM }}
      </div>

      <!-- Precio y stock -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex flex-col">
          <span class="text-2xl font-bold text-blue-600">
            ${{ repuesto.precio.toLocaleString() }}
          </span>
          <span v-if="repuesto.precioOriginal && repuesto.descuento" class="text-sm text-gray-500">
            <span class="line-through">${{ repuesto.precioOriginal.toLocaleString() }}</span>
            <span class="text-green-600 ml-1">-{{ repuesto.descuento }}%</span>
          </span>
        </div>
        
        <div class="flex items-center">
          <span 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              repuesto.stock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            ]"
          >
            {{ repuesto.stock ? 'En Stock' : 'Sin Stock' }}
          </span>
        </div>
      </div>

      <!-- Garantía si existe -->
      <div v-if="repuesto.garantia" class="text-xs text-gray-500 mb-3">
        <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        Garantía {{ repuesto.garantia }} meses
      </div>

      <!-- Botones de acción -->
      <div class="flex space-x-2">
        <NuxtLink 
          :to="`/repuestos/${repuesto.marca}/${repuesto.modelo}/${repuesto.año}/${repuesto.categoria}/${repuesto.slug}`"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
        >
          Ver Detalles
        </NuxtLink>
        
        <button 
          v-if="repuesto.stock"
          @click="agregarAlCarrito"
          class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
          </svg>
        </button>
      </div>

      <!-- Tags -->
      <div v-if="repuesto.tags && repuesto.tags.length" class="mt-3 flex flex-wrap gap-1">
        <span 
          v-for="tag in repuesto.tags.slice(0, 3)" 
          :key="tag"
          class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
        >
          {{ tag }}
        </span>
        <span v-if="repuesto.tags.length > 3" class="text-xs text-gray-400">
          +{{ repuesto.tags.length - 3 }} más
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  repuesto: {
    type: Object,
    required: true
  }
})

// Función para agregar al carrito (placeholder)
const agregarAlCarrito = () => {
  // TODO: Implementar lógica del carrito
  console.log('Agregando al carrito:', props.repuesto.nombre)
  // Aquí podrías emitir un evento o usar un composable para el carrito
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
