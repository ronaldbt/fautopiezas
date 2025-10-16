<template>
  <div>
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
          <p class="text-gray-600 mt-2">Gestiona tus solicitudes de repuestos importados</p>
        </div>
        <button
          @click="showNewOrderModal = true"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Nuevo Pedido</span>
        </button>
      </div>
    </div>

    <!-- Lista de Pedidos -->
    <div class="space-y-6">
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Pedido #{{ pedido.numero }}</h3>
            <p class="text-sm text-gray-500">{{ formatDate(pedido.createdAt) }}</p>
          </div>
          <span class="inline-flex px-3 py-1 text-sm font-medium rounded-full" 
                :class="getStatusClass(pedido.estado)">
            {{ getStatusText(pedido.estado) }}
          </span>
        </div>

        <!-- Descripción del Pedido -->
        <div class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Descripción:</h4>
          <p class="text-gray-600">{{ pedido.descripcion }}</p>
        </div>

        <!-- Timeline de Estados -->
        <div class="mb-6">
          <h4 class="text-sm font-medium text-gray-700 mb-4">Estado del Pedido:</h4>
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div v-for="(estado, index) in estadosPedido" :key="estado.key" class="relative flex items-start mb-6">
              <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 relative z-10"
                   :class="getTimelineDotClass(pedido.estado, estado.key)">
                <svg v-if="isEstadoCompletado(pedido.estado, estado.key)" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span v-else class="text-xs font-bold">{{ index + 1 }}</span>
              </div>
              
              <div class="ml-4 flex-1">
                <h5 class="text-sm font-medium" 
                    :class="isEstadoCompletado(pedido.estado, estado.key) ? 'text-gray-900' : 'text-gray-500'">
                  {{ estado.titulo }}
                </h5>
                <p class="text-xs text-gray-500">{{ estado.descripcion }}</p>
                <p v-if="estado.fecha" class="text-xs text-gray-400 mt-1">{{ estado.fecha }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="flex justify-between items-center pt-4 border-t">
          <div class="flex space-x-3">
            <button
              v-if="pedido.estado === 'pendiente_pago'"
              @click="goToPayments"
              class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Ir a Pagar
            </button>
            <button
              v-if="pedido.estado === 'entregado' && !pedido.reviewCompletado"
              @click="showReviewModal(pedido)"
              class="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              Calificar Servicio
            </button>
          </div>
          <span class="text-sm text-gray-500">
            Estimado de entrega: {{ pedido.fechaEstimada || '7 días hábiles' }}
          </span>
        </div>
      </div>

      <!-- Estado Vacío -->
      <div v-if="pedidos.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes pedidos aún</h3>
        <p class="text-gray-500 mb-4">Comienza solicitando tu primer repuesto importado</p>
        <button
          @click="showNewOrderModal = true"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Hacer mi primer pedido
        </button>
      </div>
    </div>

    <!-- Modal Nuevo Pedido -->
    <div v-if="showNewOrderModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl transform transition-all duration-300">
        <!-- Header del Modal -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">Nuevo Pedido</h2>
                <p class="text-blue-100 mt-1">Solicita tu repuesto importado</p>
              </div>
            </div>
            <button
              @click="showNewOrderModal = false"
              class="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl flex items-center justify-center transition-all duration-200"
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
            <!-- Información de Ayuda -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-blue-900 mb-2">¿Necesitas ayuda?</h4>
                  <p class="text-blue-700 leading-relaxed">
                    Si tienes dudas sobre cómo llenar esta solicitud, un vendedor puede ayudarte a crear el pedido desde su panel. 
                    Una vez creado, podrás hacer seguimiento desde aquí.
                  </p>
                </div>
              </div>
            </div>

            <!-- Descripción del Repuesto -->
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                <span class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none"
                placeholder="Ej: Filtro de aceite para Toyota Corolla 2015, motor 1.8L, filtro original o compatible..."
              ></textarea>
              <p class="text-sm text-gray-600 flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Sé lo más específico posible: marca, modelo, año, motor, tipo de repuesto, etc.</span>
              </p>
            </div>

            <!-- VIN del Vehículo -->
            <div class="space-y-3">
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                <span class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  <span>VIN del vehículo</span>
                  <span class="text-sm font-normal text-gray-500">(opcional)</span>
                </span>
              </label>
              <input
                v-model="nuevoPedido.vin"
                type="text"
                class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400 font-mono tracking-wider"
                placeholder="1HGBH41JXMN109186"
                maxlength="17"
              />
              <p class="text-sm text-gray-600">Número de identificación del vehículo (17 caracteres alfanuméricos)</p>
            </div>

            <!-- Información del Vehículo -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="block text-lg font-semibold text-gray-800 mb-3">
                  <span class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span>Marca del vehículo</span>
                  </span>
                </label>
                <input
                  v-model="nuevoPedido.marca"
                  type="text"
                  class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Toyota, Honda, Ford, Chevrolet..."
                />
              </div>
              
              <div class="space-y-3">
                <label class="block text-lg font-semibold text-gray-800 mb-3">
                  <span class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Modelo del vehículo</span>
                  </span>
                </label>
                <input
                  v-model="nuevoPedido.modelo"
                  type="text"
                  class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Corolla, Civic, Focus, Cruze..."
                />
              </div>
            </div>

            <!-- Año y Contacto -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="block text-lg font-semibold text-gray-800 mb-3">
                  <span class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Año del vehículo</span>
                  </span>
                </label>
                <input
                  v-model="nuevoPedido.ano"
                  type="number"
                  min="1990"
                  max="2024"
                  class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="2020"
                />
              </div>
              
              <div class="space-y-3">
                <label class="block text-lg font-semibold text-gray-800 mb-3">
                  <span class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span>Teléfono de contacto</span>
                  </span>
                </label>
                <input
                  v-model="nuevoPedido.telefono"
                  type="tel"
                  class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="+56912345678"
                />
                <p class="text-sm text-gray-600 flex items-center space-x-2">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <span>Un vendedor se pondrá en contacto contigo por WhatsApp o email cuando encontremos el producto</span>
                </p>
              </div>
            </div>

          </form>
        </div>

        <!-- Footer del Modal -->
        <div class="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-600">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Tiempo estimado de entrega: 7 días hábiles</span>
              </span>
            </div>
            <div class="flex space-x-4">
              <button
                type="button"
                @click="showNewOrderModal = false"
                class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                @click="crearPedido"
                :disabled="loading || !nuevoPedido.descripcion"
                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-none flex items-center space-x-2"
              >
                <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span v-if="loading">Creando Pedido...</span>
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
// Layout específico para cliente
definePageMeta({
  layout: 'dashboard-professional'
})

// SEO - No indexar páginas privadas
useHead({
  title: 'Mis Pedidos - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const authStore = useAuthStore()

// Estado
const pedidos = ref([])
const showNewOrderModal = ref(false)
const loading = ref(false)

const nuevoPedido = ref({
  descripcion: '',
  vin: '',
  marca: '',
  modelo: '',
  ano: '',
  telefono: ''
})

// Estados del pedido
const estadosPedido = [
  {
    key: 'solicitud_enviada',
    titulo: 'Solicitud Enviada',
    descripcion: 'Hemos recibido tu solicitud y estamos buscando el repuesto'
  },
  {
    key: 'producto_encontrado',
    titulo: 'Producto Encontrado',
    descripcion: 'Hemos encontrado tu repuesto y subido la foto para confirmación'
  },
  {
    key: 'pendiente_pago',
    titulo: 'Pendiente de Pago',
    descripcion: 'Confirma el producto y procede con el pago'
  },
  {
    key: 'producto_viajando',
    titulo: 'Producto Viajando',
    descripcion: 'Tu repuesto está siendo importado desde el extranjero'
  },
  {
    key: 'llegada_chile',
    titulo: 'Llegada a Chile',
    descripcion: 'El producto ha llegado a Chile y está en proceso de despacho'
  },
  {
    key: 'despachando',
    titulo: 'Despachando',
    descripcion: 'Tu pedido está siendo preparado para entrega'
  },
  {
    key: 'entregado',
    titulo: 'Entregado',
    descripcion: '¡Tu repuesto ha sido entregado exitosamente!'
  }
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

// Función para verificar si un estado está completado
const isEstadoCompletado = (estadoActual, estadoVerificar) => {
  const indices = estadosPedido.map(e => e.key)
  const indiceActual = indices.indexOf(estadoActual)
  const indiceVerificar = indices.indexOf(estadoVerificar)
  return indiceVerificar <= indiceActual
}

// Función para obtener clase del punto del timeline
const getTimelineDotClass = (estadoActual, estadoVerificar) => {
  if (isEstadoCompletado(estadoActual, estadoVerificar)) {
    return 'bg-green-500 border-green-500'
  }
  return 'bg-white border-gray-300'
}

// Función para ir a pagos
const goToPayments = () => {
  navigateTo('/cliente/pagos')
}

// Función para mostrar modal de review
const showReviewModal = (pedido) => {
  // TODO: Implementar modal de review
  console.log('Mostrar review para pedido:', pedido.id)
}

// Función para crear pedido usando composable
const crearPedido = async () => {
  loading.value = true
  try {
    const { createPedido } = usePedidos()
    const actor = {
      byUserId: authStore.user?.uid || null,
      byName: authStore.user?.displayName || authStore.user?.email || 'Cliente',
      byRole: 'cliente'
    }
    const input = {
      descripcion: nuevoPedido.value.descripcion,
      vehicle: {
        marca: nuevoPedido.value.marca || null,
        modelo: nuevoPedido.value.modelo || null,
        ano: nuevoPedido.value.ano ? parseInt(nuevoPedido.value.ano) : null,
        vin: nuevoPedido.value.vin || null
      },
      telefono: nuevoPedido.value.telefono || null,
      price: null,
      userId: authStore.user?.uid || '',
      createdBy: authStore.user?.uid || null,
      createdByRole: 'cliente',
      assignedTo: null
    }

    const { id, numero } = await createPedido(input, actor)

    pedidos.value.unshift({
      id,
      numero,
      descripcion: input.descripcion,
      marca: input.vehicle.marca,
      modelo: input.vehicle.modelo,
      ano: input.vehicle.ano,
      estado: 'solicitud_enviada',
      createdAt: new Date(),
      fechaEstimada: null
    })

    nuevoPedido.value = { descripcion: '', vin: '', marca: '', modelo: '', ano: '', telefono: '' }
    showNewOrderModal.value = false
    alert(`Pedido #${numero} creado exitosamente. Te contactaremos pronto.`)
  } catch (error) {
    console.error('Error creando pedido:', error)
    alert('Error al crear el pedido. Por favor, inténtalo nuevamente.')
  } finally {
    loading.value = false
  }
}

// Cargar pedidos del usuario
const cargarPedidos = async () => {
  try {
    const { $firestore } = useNuxtApp()
    const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore')
    
  if (!authStore.user?.uid && !authStore.user?.email) return
  
  // Si el usuario tiene UID, usarlo; adicionalmente buscar por email para pedidos creados manualmente
  let filtros = []
  if (authStore.user?.uid) filtros.push(where('userId', '==', authStore.user.uid))
  if (authStore.user?.email) filtros.push(where('userEmail', '==', authStore.user.email))
  
  // Por limitaciones de Firestore, hacemos dos consultas y unimos resultados si hay ambos filtros
  const pedidosTmp = []
  if (authStore.user?.uid) {
    const qUid = query(collection($firestore, 'pedidos'), where('userId', '==', authStore.user.uid))
    const snapUid = await getDocs(qUid)
    snapUid.forEach(doc => pedidosTmp.push({ id: doc.id, ...doc.data() }))
  }
  if (authStore.user?.email) {
    const qEmail = query(collection($firestore, 'pedidos'), where('userEmail', '==', authStore.user.email))
    const snapEmail = await getDocs(qEmail)
    snapEmail.forEach(doc => pedidosTmp.push({ id: doc.id, ...doc.data() }))
  }
  
  // Unificar por id y ordenar por fecha
  const mapById = new Map()
  pedidosTmp.forEach(p => mapById.set(p.id, p))
  const datos = Array.from(mapById.values()).sort((a,b)=> (b.createdAt?.toDate?.()||new Date(b.createdAt||0)) - (a.createdAt?.toDate?.()||new Date(a.createdAt||0)))
    
  pedidos.value = []
  datos.forEach((dataObj) => {
    const data = dataObj
    const id = dataObj.id
      pedidos.value.push({
      id,
        numero: data.numero,
        descripcion: data.descripcion,
        marca: data.marca,
        modelo: data.modelo,
        ano: data.ano,
        estado: data.estado,
        createdAt: data.createdAt?.toDate() || new Date(),
        fechaEstimada: data.fechaEstimada,
        vin: data.vin,
        telefono: data.telefono,
        precio: data.precio,
        reviewCompletado: data.review ? true : false
      })
    })
    
  } catch (error) {
    console.error('Error cargando pedidos:', error)
    // En caso de error, mostrar mensaje pero no bloquear la interfaz
    console.warn('No se pudieron cargar los pedidos desde Firestore')
  }
}

onMounted(() => {
  cargarPedidos()
})
</script>
