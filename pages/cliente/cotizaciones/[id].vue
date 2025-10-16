<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Cotización {{ quote?.numero }}</h1>
        <p class="text-gray-600">Estado: <span class="px-2 py-1 text-xs rounded-full" :class="badgeClass(quote?.status)">{{ quote?.status }}</span></p>
      </div>
      <div class="space-x-2">
        <button @click="descargar" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Descargar PDF</button>
        <button v-if="quote?.status==='enviada' || quote?.status==='borrador'" @click="aceptar" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Aceptar</button>
        <button v-if="quote?.status==='enviada'" @click="rechazar" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Rechazar</button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div class="text-sm text-gray-500">Cliente</div>
          <div class="font-medium text-gray-900">{{ quote?.userName }}</div>
          <div class="text-sm text-gray-500">{{ quote?.userEmail }} • {{ quote?.userPhone }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Vehículo</div>
          <div class="font-medium text-gray-900">{{ quote?.vehicle?.marca }} {{ quote?.vehicle?.modelo }} {{ quote?.vehicle?.ano }}</div>
          <div class="text-sm text-gray-500">VIN: {{ quote?.vehicle?.vin || '-' }}</div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="text-left py-3 px-6 text-gray-700 text-sm">Ítem</th>
            <th class="text-left py-3 px-6 text-gray-700 text-sm">Descripción</th>
            <th class="text-right py-3 px-6 text-gray-700 text-sm">Cant.</th>
            <th class="text-right py-3 px-6 text-gray-700 text-sm">P. Unit.</th>
            <th class="text-right py-3 px-6 text-gray-700 text-sm">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(it,idx) in quote?.items || []" :key="it.id" class="border-b border-gray-100">
            <td class="py-3 px-6 text-sm text-gray-700">{{ it.itemCode || (idx+1) }}</td>
            <td class="py-3 px-6 text-sm text-gray-900">{{ it.descripcion }}</td>
            <td class="py-3 px-6 text-right text-sm text-gray-700">{{ it.cantidad }}</td>
            <td class="py-3 px-6 text-right text-sm text-gray-700">{{ money(it.precioUnitario) }}</td>
            <td class="py-3 px-6 text-right text-sm font-medium text-gray-900">{{ money((it.cantidad*it.precioUnitario)-(it.descuentoUnit||0)) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end p-6">
        <div class="w-64">
          <div class="flex justify-between text-sm text-gray-700 py-1"><span>Subtotal</span><span>{{ money(quote?.subTotal) }}</span></div>
          <div class="flex justify-between text-sm text-gray-700 py-1"><span>Descuento</span><span>{{ money(quote?.descuento) }}</span></div>
          <div class="flex justify-between text-sm text-gray-700 py-1"><span>Impuestos</span><span>{{ money(quote?.impuestos) }}</span></div>
          <div class="flex justify-between text-sm text-gray-700 py-1"><span>Envío</span><span>{{ money(quote?.envio) }}</span></div>
          <div class="flex justify-between text-base font-semibold text-gray-900 py-2 border-t mt-1"><span>Total</span><span>{{ money(quote?.total) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard-professional' })
const route = useRoute()
const authStore = useAuthStore()
const { getQuoteWithItems, updateQuoteStatus, generateQuotePdfClient } = useCotizaciones()

const quote = ref(null)
const currency = computed(() => quote.value?.currency || 'CLP')
const money = (v) => new Intl.NumberFormat('es-CL',{style:'currency',currency:currency.value}).format(v||0)
const badgeClass = (s) => ({ borrador:'bg-gray-100 text-gray-700', enviada:'bg-blue-100 text-blue-700', aceptada:'bg-green-100 text-green-700', rechazada:'bg-red-100 text-red-700', vencida:'bg-yellow-100 text-yellow-700' }[s] || 'bg-gray-100 text-gray-700')

const cargar = async () => { quote.value = await getQuoteWithItems(String(route.params.id)) }
onMounted(cargar)

const descargar = async () => { if (quote.value) await generateQuotePdfClient(quote.value) }
const aceptar = async () => {
  await updateQuoteStatus(String(route.params.id), 'aceptada', { userId: authStore.user?.uid || null, nombre: authStore.user?.displayName || authStore.user?.email || null, role: 'cliente' }, 'Aceptada por cliente')
  await cargar()
}
const rechazar = async () => {
  await updateQuoteStatus(String(route.params.id), 'rechazada', { userId: authStore.user?.uid || null, nombre: authStore.user?.displayName || authStore.user?.email || null, role: 'cliente' }, 'Rechazada por cliente')
  await cargar()
}
</script>


