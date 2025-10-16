<template>
  <div>
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
          <p class="text-gray-600 mt-2">Administra todos los pedidos del sistema</p>
        </div>
        <button
          @click="showNewPedidoModal = true"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Crear Pedido</span>
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <input
            v-model="filtroBusqueda"
            type="text"
            placeholder="Número, cliente, descripción..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select
            v-model="filtroEstado"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            <option value="solicitud_enviada">Solicitud Enviada</option>
            <option value="producto_encontrado">Producto Encontrado</option>
            <option value="pendiente_pago">Pendiente de Pago</option>
            <option value="producto_viajando">Producto Viajando</option>
            <option value="llegada_chile">Llegada a Chile</option>
            <option value="despachando">Despachando</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
          <select
            v-model="filtroCliente"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los clientes</option>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
              {{ cliente.displayName }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
          <input
            v-model="filtroFecha"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div class="flex items-end">
          <button
            @click="limpiarFiltros"
            class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Pedidos -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Pedido</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Cliente</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Descripción</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Estado</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Fecha</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Precio</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="pedido in pedidosFiltrados" :key="pedido.id" class="hover:bg-gray-50">
              <td class="py-4 px-6">
                <div>
                  <p class="font-medium text-gray-900">{{ pedido.numero }}</p>
                  <p class="text-xs text-gray-500">{{ pedido.id.substring(0, 8) }}...</p>
                </div>
              </td>
              <td class="py-4 px-6">
                <div>
                  <p class="font-medium text-gray-900">{{ pedido.userName || 'Sin nombre' }}</p>
                  <p class="text-sm text-gray-500">{{ pedido.userEmail }}</p>
                </div>
              </td>
              <td class="py-4 px-6">
                <p class="text-sm text-gray-900 truncate max-w-xs">{{ pedido.descripcion }}</p>
                <div v-if="pedido.marca || pedido.modelo" class="text-xs text-gray-500 mt-1">
                  {{ pedido.marca }} {{ pedido.modelo }} {{ pedido.ano }}
                </div>
              </td>
              <td class="py-4 px-6">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" 
                      :class="getStatusClass(pedido.estado)">
                  {{ getStatusText(pedido.estado) }}
                </span>
              </td>
              <td class="py-4 px-6 text-sm text-gray-500">
                {{ formatDate(pedido.createdAt) }}
              </td>
              <td class="py-4 px-6">
                <span v-if="pedido.precio" class="text-sm font-medium text-gray-900">
                  ${{ pedido.precio.toLocaleString() }}
                </span>
                <span v-else class="text-sm text-gray-400">-</span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center space-x-2">
                  <button
                    @click="verPedido(pedido.id)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Ver
                  </button>
                  <button
                    @click="editarPedido(pedido)"
                    class="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    v-if="pedido.estado === 'solicitud_enviada'"
                    @click="actualizarEstado(pedido.id, 'producto_encontrado')"
                    class="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Encontrado
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Estado Vacío -->
      <div v-if="pedidosFiltrados.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
        <p class="text-gray-500 mb-4">Comienza creando el primer pedido</p>
        <button
          @click="showNewPedidoModal = true"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Crear Pedido
        </button>
      </div>
    </div>

    <!-- Modal Crear Pedido -->
    <div v-if="showNewPedidoModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        <!-- Header del Modal -->
        <div class="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-green-500 bg-opacity-30 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">Crear Pedido</h2>
                <p class="text-green-100 mt-1">Crear pedido para un cliente</p>
              </div>
            </div>
            <button
              @click="showNewPedidoModal = false"
              class="w-10 h-10 bg-green-500 bg-opacity-30 hover:bg-opacity-50 rounded-xl flex items-center justify-center transition-all duration-200"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenido del Modal -->
        <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          <form @submit.prevent="crearPedido" class="space-y-8">
            <!-- Selección de Cliente -->
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                <span class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                  <span>Cliente</span>
                  <span class="text-red-500">*</span>
                </span>
              </label>
              <select
                v-model="nuevoPedido.userId"
                required
                class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="clientes.length === 0"
              >
                <option value="">
                  {{ clientes.length === 0 ? 'Cargando clientes...' : 'Seleccionar cliente' }}
                </option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                  {{ cliente.displayName }} ({{ cliente.email }})
                </option>
              </select>
              <div v-if="clientes.length === 0" class="text-sm text-gray-500 mt-2">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Cargando lista de clientes...</span>
                </div>
              </div>
            </div>

            <!-- Descripción del Repuesto -->
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                <span class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Descripción del repuesto</span>
                  <span class="text-red-500">*</span>
                </span>
              </label>
              <textarea
                v-model="nuevoPedido.descripcion"
                rows="4"
                required
                class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none"
                placeholder="Ej: Filtro de aceite para Toyota Corolla 2015, motor 1.8L..."
              ></textarea>
            </div>

            <!-- Información del Vehículo -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Marca</label>
                <input
                  v-model="nuevoPedido.marca"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Toyota"
                />
              </div>
              
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Modelo</label>
                <input
                  v-model="nuevoPedido.modelo"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Corolla"
                />
              </div>
              
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Año</label>
                <input
                  v-model="nuevoPedido.ano"
                  type="number"
                  min="1990"
                  max="2024"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="2020"
                />
              </div>
            </div>

            <!-- VIN y Teléfono -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">VIN (opcional)</label>
                <input
                  v-model="nuevoPedido.vin"
                  type="text"
                  maxlength="17"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                  placeholder="1HGBH41JXMN109186"
                />
              </div>
              
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Teléfono de contacto</label>
                <input
                  v-model="nuevoPedido.telefono"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+56912345678"
                />
              </div>
            </div>

            <!-- Precio (opcional) -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700">Precio estimado (opcional)</label>
              <input
                v-model="nuevoPedido.precio"
                type="number"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="125000"
              />
            </div>
          </form>
        </div>

        <!-- Footer del Modal -->
        <div class="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-600">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>El pedido se creará en estado "Solicitud Enviada"</span>
              </span>
            </div>
            <div class="flex space-x-4">
              <button
                type="button"
                @click="showNewPedidoModal = false"
                class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                @click="crearPedido"
                :disabled="loading || !nuevoPedido.userId || !nuevoPedido.descripcion"
                class="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none flex items-center space-x-2"
              >
                <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span v-if="loading">Creando...</span>
                <span v-else>Crear Pedido</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Layout específico para admin
definePageMeta({
  layout: 'dashboard-professional',
  middleware: 'admin'
})

// SEO - No indexar páginas privadas
useHead({
  title: 'Gestión de Pedidos - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const authStore = useAuthStore()

// Estado
const pedidos = ref([])
const clientes = ref([])
const showNewPedidoModal = ref(false)
const loading = ref(false)
const filtroBusqueda = ref('')
const filtroEstado = ref('')
const filtroCliente = ref('')
const filtroFecha = ref('')

const nuevoPedido = ref({
  userId: '',
  descripcion: '',
  marca: '',
  modelo: '',
  ano: '',
  vin: '',
  telefono: '',
  precio: null
})

// Estados del pedido
const estadosPedido = [
  { key: 'solicitud_enviada', titulo: 'Solicitud Enviada' },
  { key: 'producto_encontrado', titulo: 'Producto Encontrado' },
  { key: 'pendiente_pago', titulo: 'Pendiente de Pago' },
  { key: 'producto_viajando', titulo: 'Producto Viajando' },
  { key: 'llegada_chile', titulo: 'Llegada a Chile' },
  { key: 'despachando', titulo: 'Despachando' },
  { key: 'entregado', titulo: 'Entregado' }
]

// Pedidos filtrados
const pedidosFiltrados = computed(() => {
  let filtrados = pedidos.value

  // Filtro de búsqueda
  if (filtroBusqueda.value) {
    const busqueda = filtroBusqueda.value.toLowerCase()
    filtrados = filtrados.filter(p => 
      p.numero.toLowerCase().includes(busqueda) ||
      p.descripcion.toLowerCase().includes(busqueda) ||
      p.userName?.toLowerCase().includes(busqueda) ||
      p.userEmail.toLowerCase().includes(busqueda)
    )
  }

  // Filtro de estado
  if (filtroEstado.value) {
    filtrados = filtrados.filter(p => p.estado === filtroEstado.value)
  }

  // Filtro de cliente
  if (filtroCliente.value) {
    filtrados = filtrados.filter(p => p.userId === filtroCliente.value)
  }

  // Filtro de fecha
  if (filtroFecha.value) {
    const fechaFiltro = new Date(filtroFecha.value)
    filtrados = filtrados.filter(p => {
      const fechaPedido = new Date(p.createdAt)
      return fechaPedido.toDateString() === fechaFiltro.toDateString()
    })
  }

  return filtrados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

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

// Función para limpiar filtros
const limpiarFiltros = () => {
  filtroBusqueda.value = ''
  filtroEstado.value = ''
  filtroCliente.value = ''
  filtroFecha.value = ''
}

// Función para ver pedido
const verPedido = (pedidoId) => {
  navigateTo(`/admin/pedidos/${pedidoId}`)
}

// Función para editar pedido
const editarPedido = (pedido) => {
  // TODO: Implementar edición de pedido
  console.log('Editar pedido:', pedido.id)
}

// Función para actualizar estado
const actualizarEstado = async (pedidoId, nuevoEstado) => {
  try {
    const { $firestore } = useNuxtApp()
    const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore')
    
    await updateDoc(doc($firestore, 'pedidos', pedidoId), {
      estado: nuevoEstado,
      updatedAt: serverTimestamp(),
      [`historialEstados.${nuevoEstado}`]: {
        estado: nuevoEstado,
        fecha: serverTimestamp(),
        descripcion: `Estado actualizado a ${getStatusText(nuevoEstado)}`,
        usuario: authStore.user?.displayName || 'Admin'
      }
    })
    
    // Actualizar en la lista local
    const pedidoIndex = pedidos.value.findIndex(p => p.id === pedidoId)
    if (pedidoIndex !== -1) {
      pedidos.value[pedidoIndex].estado = nuevoEstado
    }
    
    alert('Estado actualizado correctamente')
    
  } catch (error) {
    console.error('Error actualizando estado:', error)
    alert('Error al actualizar el estado')
  }
}

// Función para crear pedido
const crearPedido = async () => {
  loading.value = true
  
  try {
    const { $firestore } = useNuxtApp()
    const { collection, addDoc, serverTimestamp, doc, getDoc } = await import('firebase/firestore')
    
    // Obtener datos del cliente seleccionado
    const clienteDoc = await getDoc(doc($firestore, 'users', nuevoPedido.value.userId))
    const clienteData = clienteDoc.data()
    
    // Crear el documento del pedido en Firestore
    const pedidoData = {
      // Información básica
      numero: `PED-${Date.now().toString().slice(-6)}`,
      descripcion: nuevoPedido.value.descripcion,
      vin: nuevoPedido.value.vin || null,
      marca: nuevoPedido.value.marca || null,
      modelo: nuevoPedido.value.modelo || null,
      ano: nuevoPedido.value.ano ? parseInt(nuevoPedido.value.ano) : null,
      telefono: nuevoPedido.value.telefono || null,
      precio: nuevoPedido.value.precio ? parseInt(nuevoPedido.value.precio) : null,
      
      // Estado y seguimiento
      estado: 'solicitud_enviada',
      fechaEstimada: null,
      
      // Información del usuario
      userId: nuevoPedido.value.userId,
      userEmail: clienteData.email,
      userName: clienteData.displayName,
      
      // Timestamps
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      
      // Historial de estados
      historialEstados: [
        {
          estado: 'solicitud_enviada',
          fecha: serverTimestamp(),
          descripcion: 'Pedido creado por administrador',
          usuario: authStore.user?.displayName || 'Admin'
        }
      ],
      
      // Información adicional
      productoEncontrado: null,
      fotoProducto: null,
      paisOrigen: null,
      proveedor: null,
      codigoProducto: null,
      transportista: null,
      numeroSeguimiento: null,
      direccionEntrega: null,
      fechaEntrega: null,
      review: null,
      
      // Metadatos
      prioridad: 'normal',
      notas: '',
      asignadoA: authStore.user?.uid, // Asignado al admin que lo crea
      creadoPor: authStore.user?.uid // Admin que lo creó
    }
    
    // Guardar en Firestore
    const docRef = await addDoc(collection($firestore, 'pedidos'), pedidoData)
    
    // Limpiar formulario
    nuevoPedido.value = {
      userId: '',
      descripcion: '',
      marca: '',
      modelo: '',
      ano: '',
      vin: '',
      telefono: '',
      precio: null
    }
    
    showNewPedidoModal.value = false
    
    // Recargar lista de pedidos
    await cargarPedidos()
    
    alert(`Pedido #${pedidoData.numero} creado exitosamente para ${clienteData.displayName}`)
    
  } catch (error) {
    console.error('Error creando pedido:', error)
    alert('Error al crear el pedido: ' + error.message)
  } finally {
    loading.value = false
  }
}

// Cargar pedidos
const cargarPedidos = async () => {
  try {
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, orderBy } = await import('firebase/firestore')
    
    const pedidosQuery = query(
      collection($firestore, 'pedidos'),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(pedidosQuery)
    pedidos.value = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      pedidos.value.push({
        id: doc.id,
        numero: data.numero,
        descripcion: data.descripcion,
        marca: data.marca,
        modelo: data.modelo,
        ano: data.ano,
        vin: data.vin,
        telefono: data.telefono,
        precio: data.precio,
        estado: data.estado,
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
        createdAt: data.createdAt?.toDate() || new Date(),
        fechaEstimada: data.fechaEstimada
      })
    })
    
  } catch (error) {
    console.error('Error cargando pedidos:', error)
  }
}

// Cargar clientes
const cargarClientes = async () => {
  try {
    console.log('🔄 Cargando clientes...')
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore')
    
    // Primero intentar con orderBy, si falla, cargar sin orderBy
    let clientesQuery
    try {
      clientesQuery = query(
        collection($firestore, 'users'),
        where('role', 'in', ['cliente', 'vendedor']),
        orderBy('email', 'asc')
      )
    } catch (orderError) {
      console.log('⚠️ No se puede ordenar por email, cargando sin ordenar...')
      clientesQuery = query(
        collection($firestore, 'users'),
        where('role', 'in', ['cliente', 'vendedor'])
      )
    }
    
    const querySnapshot = await getDocs(clientesQuery)
    clientes.value = []
    
    console.log('📊 Total documentos encontrados:', querySnapshot.size)
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log('👤 Cliente encontrado:', {
        id: doc.id,
        email: data.email,
        displayName: data.displayName,
        role: data.role
      })
      
      clientes.value.push({
        id: doc.id,
        email: data.email || 'Sin email',
        displayName: data.displayName || data.name || data.email || 'Usuario',
        role: data.role
      })
    })
    
    console.log('✅ Clientes cargados:', clientes.value.length)
    
  } catch (error) {
    console.error('❌ Error cargando clientes:', error)
    console.error('🔍 Detalles del error:', error.message)
  }
}

onMounted(() => {
  cargarPedidos()
  cargarClientes()
})
</script>
