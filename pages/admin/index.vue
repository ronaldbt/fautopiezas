<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Panel de Administración</h1>
      <p class="text-gray-600 mt-2">Gestiona usuarios, pedidos y el sistema completo</p>
    </div>

    <!-- Estadísticas Generales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Usuarios</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ estadisticas.totalUsuarios }}</p>
            <p class="text-xs text-blue-600 mt-1">{{ estadisticas.usuariosNuevos }} nuevos este mes</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pedidos Activos</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ estadisticas.pedidosActivos }}</p>
            <p class="text-xs text-orange-600 mt-1">{{ estadisticas.pendientesPago }} pendientes de pago</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pedidos Completados</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ estadisticas.pedidosCompletados }}</p>
            <p class="text-xs text-green-600 mt-1">{{ estadisticas.completadosMes }} este mes</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Ingresos del Mes</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">${{ estadisticas.ingresosMes.toLocaleString() }}</p>
            <p class="text-xs text-purple-600 mt-1">{{ estadisticas.crecimientoIngresos }}% vs mes anterior</p>
          </div>
          <div class="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones Rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <NuxtLink to="/admin/usuarios" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Gestionar Usuarios</h3>
            <p class="text-sm text-gray-600">Crear usuarios y asignar roles</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/pedidos" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Gestionar Pedidos</h3>
            <p class="text-sm text-gray-600">Crear pedidos para usuarios</p>
          </div>
        </div>
      </NuxtLink>

      <button @click="showQuickActions = !showQuickActions" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
            <p class="text-sm text-gray-600">Crear usuario o pedido</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Acciones Rápidas Dropdown -->
    <div v-if="showQuickActions" class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          @click="showNewUserModal = true; showQuickActions = false"
          class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <div class="text-left">
            <h4 class="font-medium text-gray-900">Crear Usuario</h4>
            <p class="text-sm text-gray-600">Registrar nuevo cliente o vendedor</p>
          </div>
        </button>

        <button
          @click="showNewPedidoModal = true; showQuickActions = false"
          class="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div class="text-left">
            <h4 class="font-medium text-gray-900">Crear Pedido</h4>
            <p class="text-sm text-gray-600">Crear pedido para un usuario</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Pedidos Recientes -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Pedidos Recientes</h2>
        <NuxtLink to="/admin/pedidos" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Ver todos →
        </NuxtLink>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 font-medium text-gray-700">Pedido</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Fecha</th>
              <th class="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in pedidosRecientes" :key="pedido.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="py-3 px-4">
                <div>
                  <p class="font-medium text-gray-900">{{ pedido.numero }}</p>
                  <p class="text-sm text-gray-500 truncate max-w-xs">{{ pedido.descripcion }}</p>
                </div>
              </td>
              <td class="py-3 px-4">
                <div>
                  <p class="font-medium text-gray-900">{{ pedido.userName }}</p>
                  <p class="text-sm text-gray-500">{{ pedido.userEmail }}</p>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" 
                      :class="getStatusClass(pedido.estado)">
                  {{ getStatusText(pedido.estado) }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-500">
                {{ formatDate(pedido.createdAt) }}
              </td>
              <td class="py-3 px-4">
                <button @click="verPedido(pedido.id)" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// Layout específico para admin
definePageMeta({
  layout: 'dashboard-professional'
})

// SEO - No indexar páginas privadas
useHead({
  title: 'Panel Admin - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const authStore = useAuthStore()

// Estado
const showQuickActions = ref(false)
const showNewUserModal = ref(false)
const showNewPedidoModal = ref(false)
const estadisticas = ref({
  totalUsuarios: 0,
  usuariosNuevos: 0,
  pedidosActivos: 0,
  pendientesPago: 0,
  pedidosCompletados: 0,
  completadosMes: 0,
  ingresosMes: 0,
  crecimientoIngresos: 0
})

const pedidosRecientes = ref([])

// Estados del pedido (mismo que en cliente)
const estadosPedido = [
  { key: 'solicitud_enviada', titulo: 'Solicitud Enviada' },
  { key: 'producto_encontrado', titulo: 'Producto Encontrado' },
  { key: 'pendiente_pago', titulo: 'Pendiente de Pago' },
  { key: 'producto_viajando', titulo: 'Producto Viajando' },
  { key: 'llegada_chile', titulo: 'Llegada a Chile' },
  { key: 'despachando', titulo: 'Despachando' },
  { key: 'entregado', titulo: 'Entregado' }
]

// Función para formatear fecha
const formatDate = (date) => {
  if (!date) return 'No disponible'
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Función para obtener clase de estado
const getStatusClass = (estado) => {
  const statusMap = {
    'solicitud_enviada': 'bg-yellow-100 text-yellow-800',
    'producto_encontrado': 'bg-blue-100 text-blue-800',
    'pendiente_pago': 'bg-orange-100 text-orange-800',
    'producto_viajando': 'bg-purple-100 text-purple-800',
    'llegada_chile': 'bg-indigo-100 text-indigo-800',
    'despachando': 'bg-pink-100 text-pink-800',
    'entregado': 'bg-green-100 text-green-800'
  }
  return statusMap[estado] || 'bg-gray-100 text-gray-800'
}

// Función para obtener texto de estado
const getStatusText = (estado) => {
  const estadoObj = estadosPedido.find(e => e.key === estado)
  return estadoObj ? estadoObj.titulo : estado
}

// Función para ver pedido
const verPedido = (pedidoId) => {
  navigateTo(`/admin/pedidos/${pedidoId}`)
}

// Cargar estadísticas y datos
const cargarEstadisticas = async () => {
  try {
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, orderBy, limit } = await import('firebase/firestore')
    
    // Cargar pedidos recientes
    const pedidosQuery = query(
      collection($firestore, 'pedidos'),
      orderBy('createdAt', 'desc'),
      limit(5)
    )
    
    const pedidosSnapshot = await getDocs(pedidosQuery)
    pedidosRecientes.value = []
    
    pedidosSnapshot.forEach((doc) => {
      const data = doc.data()
      pedidosRecientes.value.push({
        id: doc.id,
        numero: data.numero,
        descripcion: data.descripcion,
        userName: data.userName,
        userEmail: data.userEmail,
        estado: data.estado,
        createdAt: data.createdAt?.toDate() || new Date()
      })
    })
    
    // TODO: Calcular estadísticas reales desde Firestore
    // Por ahora, datos de ejemplo
    estadisticas.value = {
      totalUsuarios: 156,
      usuariosNuevos: 12,
      pedidosActivos: 23,
      pendientesPago: 8,
      pedidosCompletados: 89,
      completadosMes: 15,
      ingresosMes: 2450000,
      crecimientoIngresos: 15
    }
    
  } catch (error) {
    console.error('Error cargando estadísticas:', error)
  }
}

onMounted(() => {
  cargarEstadisticas()
})
</script>