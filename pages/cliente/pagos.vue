<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Pagos</h1>
      <p class="text-gray-600 mt-2">Información bancaria y comprobantes de pago</p>
    </div>

    <!-- Información de Pago -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Cuentas Bancarias -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Cuentas Bancarias</h2>
          
          <div class="space-y-4">
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Banco Santander</h3>
                    <p class="text-sm text-gray-500">Cuenta Corriente</p>
                  </div>
                </div>
                <button @click="copyToClipboard('12345678901')" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Copiar
                </button>
              </div>
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="text-sm text-gray-600">Número de cuenta:</p>
                <p class="font-mono text-lg font-semibold text-gray-900">0-000-9726500-3</p>
              </div>
              <div class="mt-3">
                <p class="text-sm text-gray-600">Titular:</p>
                <p class="font-medium text-gray-900">Grupo Abarza Spa</p>
              </div>
              <div class="mt-3">
                <p class="text-sm text-gray-600">RUT:</p>
                <p class="font-mono text-gray-900">78.126.543-8</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Instrucciones de Pago -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Instrucciones de Pago</h2>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-bold text-white">1</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Paga en nuestro link de pago</h3>
                <p class="text-sm text-gray-600">
                  Ingresa a
                  <a class="text-blue-600 hover:text-blue-700 font-medium" href="https://link.mercadopago.cl/autopiezas360" target="_blank">link.mercadopago.cl/autopiezas360</a>
                  e introduce el <strong>monto total de tu pedido</strong> y tus datos.
                </p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-bold text-white">2</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Guarda el comprobante</h3>
                <p class="text-sm text-gray-600">Toma una foto o screenshot del comprobante de pago</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-bold text-white">3</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Envía el comprobante</h3>
                <p class="text-sm text-gray-600">Envíanos el comprobante por email o WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Envío de Comprobante -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Enviar Comprobante</h2>
          
          <div class="space-y-6">
            <!-- Email -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Email</h3>
                  <p class="text-sm text-gray-500">contacto@autoventas360.cl</p>
                </div>
              </div>
              <button @click="copyToClipboard('contacto@autoventas360.cl')" 
                      class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Copiar Email
              </button>
            </div>

            <!-- WhatsApp -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">WhatsApp</h3>
                  <p class="text-sm text-gray-500">+56 9 1234 5678</p>
                </div>
              </div>
              <a href="https://wa.me/56912345678?text=Hola,%20quiero%20enviar%20mi%20comprobante%20de%20pago" 
                 target="_blank"
                 class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Abrir WhatsApp</span>
              </a>
            </div>
          </div>

          <!-- Información Importante -->
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <div>
                <h4 class="text-sm font-medium text-yellow-800">Información importante</h4>
                <ul class="text-sm text-yellow-700 mt-1 space-y-1">
                  <li>• Incluye tu número de pedido en el mensaje</li>
                  <li>• El comprobante debe ser legible y completo</li>
                  <li>• Procesaremos tu pago en 24 horas hábiles</li>
                  <li>• Te notificaremos cuando el pago sea confirmado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado de Pagos -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Estado de Pagos</h2>
          
          <div class="space-y-4">
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-gray-900">Pedido #PED-001234</h3>
                <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Pagado
                </span>
              </div>
              <p class="text-sm text-gray-600">$125,000 - Banco de Chile</p>
              <p class="text-xs text-gray-500 mt-1">Confirmado el 15 de enero, 2024</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-gray-900">Pedido #PED-001235</h3>
                <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Pendiente
                </span>
              </div>
              <p class="text-sm text-gray-600">$85,000 - Pendiente confirmación</p>
              <p class="text-xs text-gray-500 mt-1">Enviado el 16 de enero, 2024</p>
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
  title: 'Pagos - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Función para copiar al portapapeles
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Copiado al portapapeles')
  } catch (err) {
    console.error('Error copiando al portapapeles:', err)
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Copiado al portapapeles')
  }
}
</script>




