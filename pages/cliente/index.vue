<template>
  <div>
    <!-- Header con bienvenida -->
    <div class="mb-8">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h1 class="text-3xl font-bold">¡Bienvenido, {{ userName }}!</h1>
        <p class="text-blue-100 mt-2 text-lg">Aquí tienes un resumen de tu actividad en AutoVentas360</p>
        <div class="mt-4 flex items-center space-x-2 text-blue-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-sm">Sesión activa desde {{ formatDate(new Date()) }}</span>
        </div>
      </div>
    </div>

    <!-- Acciones Rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <NuxtLink to="/cliente/pedidos" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Mis Pedidos</h3>
            <p class="text-sm text-gray-600">Solicita repuestos importados</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/cliente/pagos" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Pagos</h3>
            <p class="text-sm text-gray-600">Información bancaria</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/cliente/soporte" class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Soporte</h3>
            <p class="text-sm text-gray-600">Soporte en línea</p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Información del Servicio -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">¿Cómo funciona AutoVentas360?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">1</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Solicita tu repuesto</h3>
          <p class="text-gray-600">Describe el repuesto que necesitas y nosotros lo buscamos en el mercado internacional</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">2</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Importación directa</h3>
          <p class="text-gray-600">Importamos tu repuesto directamente desde fábrica con 50% de descuento</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-white">3</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Entrega en 7 días</h3>
          <p class="text-gray-600">Recibe tu repuesto en tu domicilio en aproximadamente 7 días hábiles</p>
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
  title: 'Dashboard - Cliente',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const { $firebaseAuth } = useNuxtApp()

// Datos del usuario
const userName = computed(() => {
  const user = $firebaseAuth?.currentUser
  return user?.email || user?.displayName || 'Usuario'
})

// Los datos se cargarán desde Firebase cuando esté conectado

// Función para formatear fecha
const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short'
  }).format(date)
}

// Función para obtener clase de estado
const getStatusClass = (estado) => {
  const statusMap = {
    'En Proceso': 'bg-yellow-100 text-yellow-800',
    'Enviado': 'bg-blue-100 text-blue-800',
    'Entregado': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-red-100 text-red-800'
  }
  return statusMap[estado] || 'bg-gray-100 text-gray-800'
}
</script>
