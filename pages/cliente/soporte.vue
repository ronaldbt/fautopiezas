<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Soporte</h1>
      <p class="text-gray-600 mt-2">Estamos aquí para ayudarte con cualquier consulta</p>
    </div>

    <!-- Soporte en Línea -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Soporte en Línea</h2>
            <p class="text-sm text-gray-600">Respuesta inmediata por WhatsApp</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p class="font-medium text-gray-900">Disponible Ahora</p>
                <p class="text-sm text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
              </div>
            </div>
            <span class="text-sm text-green-600 font-medium">En línea</span>
          </div>

          <div class="space-y-3">
            <div class="flex items-center space-x-3 text-sm text-gray-600">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Respuesta promedio: 2 minutos</span>
            </div>
            <div class="flex items-center space-x-3 text-sm text-gray-600">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Soporte técnico especializado</span>
            </div>
            <div class="flex items-center space-x-3 text-sm text-gray-600">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span>Seguimiento de pedidos en tiempo real</span>
            </div>
          </div>

          <a
            href="https://wa.me/56912345678?text=Hola,%20necesito%20ayuda%20con%20mi%20pedido"
            target="_blank"
            class="w-full px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-3 shadow-lg"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
      </div>

      <!-- Información de Contacto -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h2>
        
        <div class="space-y-6">
          <!-- WhatsApp -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">WhatsApp</h3>
              <p class="text-sm text-gray-600">+56 9 1234 5678</p>
              <p class="text-xs text-gray-500">Respuesta inmediata</p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Email</h3>
              <p class="text-sm text-gray-600">contacto@autoventas360.cl</p>
              <p class="text-xs text-gray-500">Respuesta en 24 horas</p>
            </div>
          </div>

          <!-- Horarios -->
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Horarios de Atención</h3>
              <p class="text-sm text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
              <p class="text-sm text-gray-600">Sábados: 9:00 - 14:00</p>
              <p class="text-xs text-gray-500">Hora de Chile (GMT-3)</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preguntas Frecuentes -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Preguntas Frecuentes</h2>
      
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg">
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h3 class="font-medium text-gray-900">{{ faq.pregunta }}</h3>
            <svg class="w-5 h-5 text-gray-500 transform transition-transform" 
                 :class="{ 'rotate-180': faq.abierto }" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-if="faq.abierto" class="px-6 pb-4">
            <p class="text-gray-600">{{ faq.respuesta }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Temas de Ayuda -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Temas de Ayuda</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="tema in temasAyuda" :key="tema.id" 
             class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
             @click="contactarConTema(tema)">
          <div class="flex items-center space-x-3 mb-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                 :class="tema.color">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tema.icono"></path>
              </svg>
            </div>
            <h3 class="font-medium text-gray-900">{{ tema.titulo }}</h3>
          </div>
          <p class="text-sm text-gray-600">{{ tema.descripcion }}</p>
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
  title: 'Soporte - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Estado
const faqs = ref([
  {
    pregunta: '¿Cuánto tiempo tarda en llegar mi repuesto?',
    respuesta: 'El tiempo promedio de entrega es de 7 días hábiles desde que confirmamos el producto y recibimos el pago. Esto incluye el tiempo de importación desde el país de origen.',
    abierto: false
  },
  {
    pregunta: '¿Cómo puedo hacer seguimiento a mi pedido?',
    respuesta: 'Puedes hacer seguimiento a tu pedido desde la sección "Mis Pedidos" donde verás el estado actualizado en tiempo real. También recibirás notificaciones por WhatsApp.',
    abierto: false
  },
  {
    pregunta: '¿Qué métodos de pago aceptan?',
    respuesta: 'Aceptamos transferencias bancarias a nuestras cuentas de Banco de Chile y Banco Estado. Una vez confirmado el pago, procedemos con la importación del repuesto.',
    abierto: false
  },
  {
    pregunta: '¿Puedo cancelar mi pedido?',
    respuesta: 'Puedes cancelar tu pedido siempre que esté en estado "Solicitud Enviada" o "Producto Encontrado". Una vez procesado el pago, no es posible cancelar.',
    abierto: false
  },
  {
    pregunta: '¿Qué pasa si el repuesto no es el correcto?',
    respuesta: 'Si el repuesto no corresponde a lo solicitado, nos hacemos cargo de la devolución y envío del producto correcto sin costo adicional.',
    abierto: false
  },
  {
    pregunta: '¿Ofrecen garantía en los repuestos?',
    respuesta: 'Todos nuestros repuestos tienen garantía de 6 meses contra defectos de fabricación. No cubre desgaste normal por uso.',
    abierto: false
  }
])

const temasAyuda = ref([
  {
    id: 1,
    titulo: 'Seguimiento de Pedidos',
    descripcion: 'Consulta el estado de tus pedidos y tiempos de entrega',
    icono: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    color: 'bg-blue-600'
  },
  {
    id: 2,
    titulo: 'Información de Pagos',
    descripcion: 'Cuentas bancarias y proceso de pago',
    icono: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    color: 'bg-green-600'
  },
  {
    id: 3,
    titulo: 'Problemas con Pedidos',
    descripcion: 'Reporta problemas o solicita cambios',
    icono: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
    color: 'bg-red-600'
  },
  {
    id: 4,
    titulo: 'Garantías y Devoluciones',
    descripcion: 'Políticas de garantía y proceso de devolución',
    icono: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'bg-purple-600'
  },
  {
    id: 5,
    titulo: 'Información Técnica',
    descripcion: 'Especificaciones y compatibilidad de repuestos',
    icono: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'bg-yellow-600'
  },
  {
    id: 6,
    titulo: 'Cuenta y Perfil',
    descripcion: 'Gestiona tu información personal y preferencias',
    icono: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    color: 'bg-indigo-600'
  }
])

// Función para toggle FAQ
const toggleFaq = (index) => {
  faqs.value[index].abierto = !faqs.value[index].abierto
}

// Función para contactar con tema específico
const contactarConTema = (tema) => {
  const mensaje = `Hola, necesito ayuda con: ${tema.titulo}`
  const url = `https://wa.me/56912345678?text=${encodeURIComponent(mensaje)}`
  window.open(url, '_blank')
}
</script>
