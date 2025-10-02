<template>
  <div class="min-h-screen bg-gray-50 pt-32">
    <!-- Header con breadcrumb -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <nav class="text-sm text-gray-600 mb-4">
          <NuxtLink to="/" class="hover:text-blue-600">Inicio</NuxtLink>
          <span class="mx-2">›</span>
          <span class="text-gray-800 font-medium">Guías</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Guías y Consejos AutoPiezas360
        </h1>
        <p class="text-gray-600 mt-2">
          Todo lo que necesitas saber sobre repuestos, mantenimiento y cuidado de tu vehículo
        </p>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Categorías de guías -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div class="text-blue-600 text-4xl mb-4">🔧</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Mantenimiento</h3>
          <p class="text-gray-600 mb-4">
            Guías sobre cómo mantener tu vehículo en perfectas condiciones
          </p>
          <div class="text-sm text-blue-600 font-medium">Próximamente →</div>
        </div>

        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div class="text-green-600 text-4xl mb-4">🚗</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Repuestos</h3>
          <p class="text-gray-600 mb-4">
            Aprende a identificar y elegir los repuestos correctos para tu auto
          </p>
          <div class="text-sm text-blue-600 font-medium">Próximamente →</div>
        </div>

        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div class="text-red-600 text-4xl mb-4">🛠️</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Instalación</h3>
          <p class="text-gray-600 mb-4">
            Tutoriales paso a paso para instalar repuestos en casa
          </p>
          <div class="text-sm text-blue-600 font-medium">Próximamente →</div>
        </div>

        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div class="text-purple-600 text-4xl mb-4">💡</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Tips y Trucos</h3>
          <p class="text-gray-600 mb-4">
            Consejos prácticos para ahorrar dinero en repuestos
          </p>
          <div class="text-sm text-blue-600 font-medium">Próximamente →</div>
        </div>

        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div class="text-yellow-600 text-4xl mb-4">🏆</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Alta Gama</h3>
          <p class="text-gray-600 mb-4">
            Guías especializadas para vehículos premium: Audi, BMW, Mercedes
          </p>
          <div class="text-sm text-blue-600 font-medium">Próximamente →</div>
        </div>

        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div class="text-indigo-600 text-4xl mb-4">📦</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Importación</h3>
          <p class="text-gray-600 mb-4">
            Todo sobre cómo importar repuestos y ahorrar hasta 50%
          </p>
          <div class="text-sm text-blue-600 font-medium">Próximamente →</div>
        </div>
      </div>

      <!-- Sección informativa -->
      <div class="bg-blue-50 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          ¿Tienes alguna pregunta específica?
        </h2>
        <p class="text-gray-600 mb-6">
          Nuestro equipo de expertos está preparando contenido de calidad para ayudarte con tu vehículo.
          Mientras tanto, puedes contactarnos directamente.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="openWhatsApp"
            class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Consultar por WhatsApp</span>
          </button>
          
          <NuxtLink 
            to="/contacto" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
          >
            Contactar por Email
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Función para abrir WhatsApp
const openWhatsApp = () => {
  const mensaje = `Hola! Tengo una pregunta sobre repuestos y mantenimiento. ¿Podrían ayudarme?`
  const numeroWhatsApp = '+56979796841'
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
  
  window.open(urlWhatsApp, '_blank')
}

// SEO Meta para la página de guías
useHead({
  title: 'Guías y Consejos AutoPiezas360 Chile - Mantenimiento y Repuestos',
  meta: [
    { name: 'description', content: 'Guías expertas sobre mantenimiento, repuestos, instalación y cuidado de vehículos. Tips para ahorrar en repuestos importados y mantener tu auto en perfecto estado.' },
    { name: 'keywords', content: 'guías mantenimiento auto, consejos repuestos chile, tutoriales instalación repuestos, tips ahorro repuestos, mantenimiento vehículos chile' }
  ]
})
</script>