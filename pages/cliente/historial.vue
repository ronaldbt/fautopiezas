<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Historial</h1>
      <p class="text-gray-600 mt-2">Todos tus repuestos entregados exitosamente</p>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <input
            v-model="filtroBusqueda"
            type="text"
            placeholder="Buscar por descripción o número..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Marca</label>
          <select
            v-model="filtroMarca"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las marcas</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Nissan">Nissan</option>
            <option value="Chevrolet">Chevrolet</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Período</label>
          <select
            v-model="filtroPeriodo"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los períodos</option>
            <option value="ultimo_mes">Último mes</option>
            <option value="ultimos_3_meses">Últimos 3 meses</option>
            <option value="ultimo_ano">Último año</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button
            @click="limpiarFiltros"
            class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Productos Entregados -->
    <div class="space-y-6">
      <div
        v-for="producto in productosFiltrados"
        :key="producto.id"
        class="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ producto.descripcion }}</h3>
              <span class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Entregado
              </span>
            </div>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span>Pedido #{{ producto.numeroPedido }}</span>
              <span>•</span>
              <span>{{ producto.marca }} {{ producto.modelo }}</span>
              <span>•</span>
              <span>Año {{ producto.ano }}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-semibold text-gray-900">${{ producto.precio.toLocaleString() }}</p>
            <p class="text-sm text-gray-500">Entregado el {{ formatDate(producto.fechaEntrega) }}</p>
          </div>
        </div>

        <!-- Detalles del Producto -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Información del Pedido</h4>
            <div class="space-y-1 text-sm text-gray-600">
              <p><span class="font-medium">Solicitado:</span> {{ formatDate(producto.fechaSolicitud) }}</p>
              <p><span class="font-medium">Procesado:</span> {{ formatDate(producto.fechaProcesamiento) }}</p>
              <p><span class="font-medium">Tiempo total:</span> {{ producto.tiempoTotal }} días</p>
            </div>
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Origen</h4>
            <div class="space-y-1 text-sm text-gray-600">
              <p><span class="font-medium">País:</span> {{ producto.origen }}</p>
              <p><span class="font-medium">Proveedor:</span> {{ producto.proveedor }}</p>
              <p><span class="font-medium">Código:</span> {{ producto.codigoProducto }}</p>
            </div>
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Entrega</h4>
            <div class="space-y-1 text-sm text-gray-600">
              <p><span class="font-medium">Transportista:</span> {{ producto.transportista }}</p>
              <p><span class="font-medium">N° Seguimiento:</span> {{ producto.numeroSeguimiento }}</p>
              <p><span class="font-medium">Dirección:</span> {{ producto.direccionEntrega }}</p>
            </div>
          </div>
        </div>

        <!-- Reseña -->
        <div v-if="producto.review" class="border-t pt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Tu Reseña</h4>
          <div class="flex items-center space-x-2 mb-2">
            <div class="flex items-center">
              <svg v-for="i in 5" :key="i" 
                   class="w-4 h-4" 
                   :class="i <= producto.review.calificacion ? 'text-yellow-400' : 'text-gray-300'"
                   fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="text-sm text-gray-600">{{ producto.review.calificacion }}/5</span>
          </div>
          <p class="text-sm text-gray-600">{{ producto.review.comentario }}</p>
        </div>

        <!-- Acciones -->
        <div class="flex justify-between items-center pt-4 border-t">
          <div class="flex space-x-3">
            <button
              v-if="!producto.review"
              @click="mostrarModalReview(producto)"
              class="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              Calificar Servicio
            </button>
            <button
              @click="solicitarMismoProducto(producto)"
              class="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              Solicitar Nuevamente
            </button>
          </div>
          <button
            @click="descargarFactura(producto)"
            class="px-4 py-2 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition-colors"
          >
            Descargar Factura
          </button>
        </div>
      </div>

      <!-- Estado Vacío -->
      <div v-if="productosFiltrados.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay productos en tu historial</h3>
        <p class="text-gray-500 mb-4">Los productos entregados aparecerán aquí</p>
        <NuxtLink to="/cliente/pedidos" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Ver Mis Pedidos
        </NuxtLink>
      </div>
    </div>

    <!-- Resumen -->
    <div v-if="productosFiltrados.length > 0" class="mt-8 bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Resumen del Historial</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{{ productosFiltrados.length }}</p>
          <p class="text-sm text-gray-600">Productos Entregados</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">${{ totalGastado.toLocaleString() }}</p>
          <p class="text-sm text-gray-600">Total Gastado</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{{ promedioTiempo }}</p>
          <p class="text-sm text-gray-600">Promedio de Entrega (días)</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{{ promedioCalificacion }}</p>
          <p class="text-sm text-gray-600">Calificación Promedio</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Layout específico para cliente
definePageMeta({
  layout: 'dashboard-professional'
})

// SEO - No indexar páginas privadas
useHead({
  title: 'Historial - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Estado
const productos = ref([])
const filtroBusqueda = ref('')
const filtroMarca = ref('')
const filtroPeriodo = ref('')

// Productos filtrados
const productosFiltrados = computed(() => {
  let filtrados = productos.value

  // Filtro de búsqueda
  if (filtroBusqueda.value) {
    const busqueda = filtroBusqueda.value.toLowerCase()
    filtrados = filtrados.filter(p => 
      p.descripcion.toLowerCase().includes(busqueda) ||
      p.numeroPedido.toLowerCase().includes(busqueda)
    )
  }

  // Filtro de marca
  if (filtroMarca.value) {
    filtrados = filtrados.filter(p => p.marca === filtroMarca.value)
  }

  // Filtro de período
  if (filtroPeriodo.value) {
    const fechaLimite = new Date()
    switch (filtroPeriodo.value) {
      case 'ultimo_mes':
        fechaLimite.setMonth(fechaLimite.getMonth() - 1)
        break
      case 'ultimos_3_meses':
        fechaLimite.setMonth(fechaLimite.getMonth() - 3)
        break
      case 'ultimo_ano':
        fechaLimite.setFullYear(fechaLimite.getFullYear() - 1)
        break
    }
    filtrados = filtrados.filter(p => new Date(p.fechaEntrega) >= fechaLimite)
  }

  return filtrados.sort((a, b) => new Date(b.fechaEntrega) - new Date(a.fechaEntrega))
})

// Estadísticas
const totalGastado = computed(() => {
  return productosFiltrados.value.reduce((total, p) => total + p.precio, 0)
})

const promedioTiempo = computed(() => {
  if (productosFiltrados.value.length === 0) return 0
  const suma = productosFiltrados.value.reduce((total, p) => total + p.tiempoTotal, 0)
  return Math.round(suma / productosFiltrados.value.length)
})

const promedioCalificacion = computed(() => {
  const conReview = productosFiltrados.value.filter(p => p.review)
  if (conReview.length === 0) return 0
  const suma = conReview.reduce((total, p) => total + p.review.calificacion, 0)
  return (suma / conReview.length).toFixed(1)
})

// Función para formatear fecha
const formatDate = (date) => {
  if (!date) return 'No disponible'
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

// Función para limpiar filtros
const limpiarFiltros = () => {
  filtroBusqueda.value = ''
  filtroMarca.value = ''
  filtroPeriodo.value = ''
}

// Función para mostrar modal de review
const mostrarModalReview = (producto) => {
  // TODO: Implementar modal de review
  console.log('Mostrar review para:', producto.id)
}

// Función para solicitar mismo producto
const solicitarMismoProducto = (producto) => {
  navigateTo('/cliente/pedidos', {
    query: {
      repeticion: producto.id,
      descripcion: producto.descripcion,
      marca: producto.marca,
      modelo: producto.modelo,
      ano: producto.ano
    }
  })
}

// Función para descargar factura
const descargarFactura = (producto) => {
  // TODO: Implementar descarga de factura
  console.log('Descargar factura para:', producto.id)
}

// Cargar historial del usuario
onMounted(() => {
  // TODO: Cargar desde Firebase
  // Por ahora, datos de ejemplo
  productos.value = [
    {
      id: '1',
      numeroPedido: 'PED-001234',
      descripcion: 'Filtro de aceite para Toyota Corolla 2015, motor 1.8L',
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: '2015',
      precio: 125000,
      fechaSolicitud: new Date('2024-01-05'),
      fechaProcesamiento: new Date('2024-01-06'),
      fechaEntrega: new Date('2024-01-12'),
      tiempoTotal: 7,
      origen: 'Japón',
      proveedor: 'Toyota Motor Corporation',
      codigoProducto: 'TMC-FO-15-18L',
      transportista: 'Chilexpress',
      numeroSeguimiento: 'CX123456789CL',
      direccionEntrega: 'Av. Principal 123, Santiago',
      review: {
        calificacion: 5,
        comentario: 'Excelente servicio, el producto llegó en perfecto estado y antes de lo esperado.'
      }
    },
    {
      id: '2',
      numeroPedido: 'PED-001235',
      descripcion: 'Pastillas de freno delanteras para Honda Civic 2018',
      marca: 'Honda',
      modelo: 'Civic',
      ano: '2018',
      precio: 85000,
      fechaSolicitud: new Date('2024-01-08'),
      fechaProcesamiento: new Date('2024-01-09'),
      fechaEntrega: new Date('2024-01-16'),
      tiempoTotal: 8,
      origen: 'Tailandia',
      proveedor: 'Honda Manufacturing',
      codigoProducto: 'HON-PB-18-F',
      transportista: 'Starken',
      numeroSeguimiento: 'ST987654321CL',
      direccionEntrega: 'Calle Secundaria 456, Valparaíso',
      review: {
        calificacion: 4,
        comentario: 'Muy buen producto, solo tardó un día más de lo esperado pero todo correcto.'
      }
    }
  ]
})
</script>






























