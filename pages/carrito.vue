<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800">Carrito de Compras</h1>
        <p class="text-gray-600 mt-2">Revisa tus productos antes de finalizar la compra</p>
      </div>
    </div>

    <!-- Contenido -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Carrito vacío -->
      <div v-if="estaVacio" class="bg-white rounded-lg shadow-md p-12 text-center">
        <ShoppingCartIcon class="w-24 h-24 mx-auto mb-4 text-gray-300" />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
        <p class="text-gray-600 mb-6">Agrega productos a tu carrito para comenzar a comprar</p>
        <NuxtLink 
          to="/repuestos" 
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Ver Repuestos
        </NuxtLink>
      </div>

      <!-- Carrito con productos -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Lista de productos -->
        <div class="lg:col-span-2 space-y-4">
          <div 
            v-for="item in carrito" 
            :key="item.id"
            class="bg-white rounded-lg shadow-md p-6"
          >
            <div class="flex gap-4">
              <!-- Imagen -->
              <div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <img 
                  v-if="item.imagen" 
                  :src="item.imagen" 
                  :alt="item.nombre"
                  class="w-full h-full object-cover rounded-lg"
                >
                <div v-else class="text-3xl">🔧</div>
              </div>

              <!-- Información del producto -->
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ item.nombre }}</h3>
                <p class="text-sm text-gray-600 mb-2">
                  {{ item.marca.toUpperCase() }} {{ item.modelo }} {{ item.anio }}
                </p>
                <p v-if="item.codigoOEM" class="text-xs text-gray-500 mb-2">
                  Código OEM: {{ item.codigoOEM }}
                </p>
                
                <!-- Precio y cantidad -->
                <div class="flex items-center justify-between mt-4">
                  <div>
                    <p class="text-xl font-bold text-blue-600">
                      ${{ (item.precio * item.cantidad).toLocaleString() }}
                    </p>
                    <p class="text-sm text-gray-500">
                      ${{ item.precio.toLocaleString() }} c/u
                    </p>
                  </div>

                  <!-- Controles de cantidad -->
                  <div class="flex items-center space-x-3">
                    <button 
                      @click="actualizarCantidad(item.id, item.cantidad - 1)"
                      class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
                      title="Disminuir cantidad"
                    >
                      <MinusIcon class="w-4 h-4" />
                    </button>
                    <span class="text-lg font-medium w-8 text-center">{{ item.cantidad }}</span>
                    <button 
                      @click="actualizarCantidad(item.id, item.cantidad + 1)"
                      class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
                      title="Aumentar cantidad"
                    >
                      <PlusIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Botón eliminar -->
              <button 
                @click="eliminarDelCarrito(item.id)"
                class="text-red-500 hover:text-red-700 transition-colors"
                title="Eliminar del carrito"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Resumen del pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Resumen del Pedido</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal ({{ cantidadItems }} {{ cantidadItems === 1 ? 'producto' : 'productos' }})</span>
                <span>${{ total.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Envío</span>
                <span class="text-green-600">Gratis</span>
              </div>
              <div class="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span class="text-blue-600">${{ total.toLocaleString() }}</span>
              </div>
            </div>

            <button 
              @click="procederAlPago"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-3"
            >
              Proceder al Pago
            </button>

            <button 
              @click="limpiarCarrito"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Limpiar Carrito
            </button>

            <div class="mt-6 pt-6 border-t">
              <p class="text-sm text-gray-600 mb-2">💬 ¿Necesitas ayuda?</p>
              <button 
                @click="abrirWhatsApp"
                class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ShoppingCartIcon, TrashIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Carrito de Compras - AutoPiezas360',
  meta: [
    { name: 'description', content: 'Revisa y gestiona los productos en tu carrito de compras. Finaliza tu pedido con envío gratis sobre $500.000.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Composables
const { 
  carrito, 
  eliminarDelCarrito, 
  actualizarCantidad, 
  limpiarCarrito, 
  total, 
  cantidadItems, 
  estaVacio 
} = useCarrito()

// Funciones
const procederAlPago = () => {
  // TODO: Implementar lógica de pago
  console.log('Proceder al pago con:', carrito.value)
  alert('Funcionalidad de pago en desarrollo')
}

const abrirWhatsApp = () => {
  const productos = carrito.value.map(item => 
    `- ${item.nombre} (${item.cantidad}x) - $${(item.precio * item.cantidad).toLocaleString()}`
  ).join('\n')
  
  const mensaje = `Hola! Me interesa comprar los siguientes productos:\n\n${productos}\n\nTotal: $${total.value.toLocaleString()}\n\n¿Podrían ayudarme con el proceso de compra?`
  const numeroWhatsApp = '+56979796841'
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
  
  window.open(urlWhatsApp, '_blank')
}
</script>

