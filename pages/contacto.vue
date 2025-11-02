<template>
  <div class="min-h-screen bg-gray-50 pt-32">
    <!-- Header con breadcrumb -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <nav class="text-sm text-gray-600 mb-4">
          <NuxtLink to="/" class="hover:text-blue-600">Inicio</NuxtLink>
          <span class="mx-2">›</span>
          <span class="text-gray-800 font-medium">Contacto</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Contacto AutoPiezas360
        </h1>
        <p class="text-gray-600 mt-2">
          ¿No encuentras tu repuesto? Lo conseguimos por ti con hasta 50% de descuento
        </p>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      
      <!-- Sección principal: Repuestos especiales -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">
            ¿No está tu repuesto en la lista?
          </h2>
          <p class="text-xl mb-6 opacity-90">
            Si tu repuesto no aparece en nuestro catálogo o tienes un modelo muy antiguo, 
            <strong>nosotros lo conseguimos por ti</strong>
          </p>
          
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white/10 rounded-lg p-6 backdrop-blur">
              <div class="text-4xl mb-3">💰</div>
              <h3 class="font-bold text-lg mb-2">50% Más Barato</h3>
              <p class="text-sm opacity-90">
                Que comprarlo en Chile a la competencia
              </p>
            </div>
            
            <div class="bg-white/10 rounded-lg p-6 backdrop-blur">
              <div class="text-4xl mb-3">🚚</div>
              <h3 class="font-bold text-lg mb-2">7-14 Días</h3>
              <p class="text-sm opacity-90">
                Importación directa desde fábrica
              </p>
            </div>
            
            <div class="bg-white/10 rounded-lg p-6 backdrop-blur">
              <div class="text-4xl mb-3">🔧</div>
              <h3 class="font-bold text-lg mb-2">Cualquier Modelo</h3>
              <p class="text-sm opacity-90">
                Incluso vehículos muy antiguos
              </p>
            </div>
          </div>

          <div class="bg-orange-500 rounded-lg p-6 mb-6">
            <h3 class="text-xl font-bold mb-2">¿Por qué sale mejor importar?</h3>
            <p class="text-lg">
              Importamos directo desde fábrica sin intermediarios. 
              <strong>Siempre será más barato</strong> que comprar en tiendas locales.
            </p>
          </div>

          <button 
            @click="openWhatsApp"
            class="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors flex items-center justify-center space-x-3 mx-auto"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Escribir por WhatsApp Ahora</span>
          </button>
        </div>
      </div>

      <!-- Información de contacto -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <!-- Formulario de contacto -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Envíanos tu consulta</h3>
          
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
              <input 
                v-model="form.nombre"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tu nombre completo"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu@email.com"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono (opcional)</label>
              <input 
                v-model="form.telefono"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+56 9 1234 5678"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Vehículo (Marca, Modelo, Año)</label>
              <input 
                v-model="form.vehiculo"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Toyota Corolla 2015"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Repuesto que necesitas</label>
              <textarea 
                v-model="form.mensaje"
                required
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el repuesto que necesitas, código OEM, o cualquier detalle que tengas..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              :disabled="submitting"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-3 rounded-md font-medium transition-colors"
            >
              <span v-if="!submitting">Enviar Consulta</span>
              <span v-else>Enviando...</span>
            </button>
            
            <p v-if="submitMessage" :class="submitSuccess ? 'text-green-600' : 'text-red-600'" class="text-sm mt-2">
              {{ submitMessage }}
            </p>
          </form>
        </div>

        <!-- Información de contacto directo -->
        <div class="space-y-6">
          <!-- WhatsApp -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp (Recomendado)
            </h3>
            <p class="text-green-700 mb-4">
              <strong>La forma más rápida de cotizar.</strong> Respuesta inmediata en horario comercial.
            </p>
            <div class="space-y-2 text-sm text-green-600">
              <p><strong>+56 9 7979 6841</strong></p>
              <p>📅 Lunes a Viernes: 9:00 - 18:00</p>
              <p>📅 Sábados: 9:00 - 14:00</p>
            </div>
            <button 
              @click="openWhatsApp"
              class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Abrir WhatsApp
            </button>
          </div>

          <!-- Email -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Email
            </h3>
            <p class="text-blue-700 mb-4">
              Para consultas detalladas o cotizaciones con imágenes.
            </p>
            <div class="space-y-2 text-sm text-blue-600">
              <p><strong>contacto@autopiezas360.cl</strong></p>
              <p>⏱️ Respuesta en 2-4 horas hábiles</p>
            </div>
            <a 
              href="mailto:contacto@autopiezas360.cl?subject=Consulta repuesto&body=Hola, necesito cotizar un repuesto para mi vehículo:"
              class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors inline-block text-center"
            >
              Enviar Email
            </a>
          </div>

          <!-- Ubicación -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Ubicación
            </h3>
            <div class="space-y-2 text-sm text-gray-600">
              <p><strong>Santiago, Chile</strong></p>
              <p>🚚 Envíos a todo Chile</p>
              <p>🏪 Operación 100% online</p>
              <p>📦 Importación directa</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ sobre importación -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes sobre Importación</h3>
        
        <div class="space-y-6">
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-bold text-lg text-gray-800 mb-2">¿Cuánto me ahorro importando?</h4>
            <p class="text-gray-600">
              Entre 30% y 50% comparado con precios locales. Al importar directo desde fábrica eliminamos intermediarios 
              y márgenes de distribuidores locales.
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-bold text-lg text-gray-800 mb-2">¿Pueden conseguir repuestos para modelos muy antiguos?</h4>
            <p class="text-gray-600">
              Sí, especialmentepara vehículos de 20+ años que ya no se venden en Chile. 
              Tenemos acceso a proveedores internacionales que mantienen stock de piezas descontinuadas.
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-bold text-lg text-gray-800 mb-2">¿Cuánto demora la importación?</h4>
            <p class="text-gray-600">
              Entre 7 y 14 días dependiendo del origen. La mayoría de repuestos llegan en 7-10 días desde Asia 
              y 10-14 días desde Europa/USA.
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-bold text-lg text-gray-800 mb-2">¿Qué garantía tienen los repuestos importados?</h4>
            <p class="text-gray-600">
              Garantía extendida de 6-12 meses según el tipo de repuesto. Todos vienen con certificación de calidad 
              y respaldo de fábrica.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Formulario reactivo
const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  vehiculo: '',
  mensaje: ''
})

const submitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

// Función para abrir WhatsApp
const openWhatsApp = () => {
  const mensaje = `Hola! Necesito cotizar un repuesto que no encuentro en su catálogo. ¿Pueden ayudarme con importación directa?`
  const numeroWhatsApp = '+56979796841'
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
  
  window.open(urlWhatsApp, '_blank')
}

// Función para enviar formulario
const submitForm = async () => {
  submitting.value = true
  submitMessage.value = ''
  
  try {
    // Simular envío (aquí irías a tu API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Preparar datos para WhatsApp como fallback
    const mensaje = `Nueva consulta desde web:
Nombre: ${form.value.nombre}
Email: ${form.value.email}
Teléfono: ${form.value.telefono}
Vehículo: ${form.value.vehiculo}
Consulta: ${form.value.mensaje}`
    
    const numeroWhatsApp = '+56979796841'
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
    
    // Abrir WhatsApp con los datos
    window.open(urlWhatsApp, '_blank')
    
    submitMessage.value = 'Consulta enviada! Te hemos redirigido a WhatsApp para respuesta inmediata.'
    submitSuccess.value = true
    
    // Limpiar formulario
    form.value = {
      nombre: '',
      email: '',
      telefono: '',
      vehiculo: '',
      mensaje: ''
    }
    
  } catch (error) {
    submitMessage.value = 'Error al enviar. Por favor, intenta por WhatsApp directamente.'
    submitSuccess.value = false
  } finally {
    submitting.value = false
  }
}

// SEO Meta para contacto
useHead({
  title: 'Contacto AutoPiezas360 Chile - Importación de Repuestos Especiales',
  meta: [
    { name: 'description', content: '¿No encuentras tu repuesto? Lo importamos por ti con 50% descuento vs competencia local. Repuestos para modelos antiguos y piezas especiales. Contacto WhatsApp directo.' },
    { name: 'keywords', content: 'contacto autopiezas360, importación repuestos chile, repuestos modelos antiguos, cotización repuestos, whatsapp repuestos chile' },
    { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { property: 'og:title', content: 'Contacto AutoPiezas360 - Importación Repuestos Chile' },
    { property: 'og:description', content: 'Importamos cualquier repuesto con 50% descuento. WhatsApp directo para respuesta inmediata.' },
    { property: 'og:url', content: 'https://autopiezas360.cl/contacto' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'canonical', href: 'https://autopiezas360.cl/contacto' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto AutoPiezas360 Chile",
        "description": "Página de contacto para importación de repuestos especiales",
        "url": "https://autopiezas360.cl/contacto",
        "mainEntity": {
          "@type": "LocalBusiness",
          "name": "AutoPiezas360 Chile",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+56979796841",
            "contactType": "customer service",
            "availableLanguage": "Spanish",
            "areaServed": "CL"
          }
        }
      })
    }
  ]
})
</script>