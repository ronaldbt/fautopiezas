<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Mis Cotizaciones</h1>
        <p class="text-gray-600 mt-2">Revisa, descarga y acepta tus cotizaciones</p>
      </div>
      <NuxtLink to="/cliente/cotizaciones/solicitar" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Solicitar Cotización</NuxtLink>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="text-left py-4 px-6 text-gray-700 font-medium">N°</th>
            <th class="text-left py-4 px-6 text-gray-700 font-medium">Vehículo</th>
            <th class="text-left py-4 px-6 text-gray-700 font-medium">Estado</th>
            <th class="text-left py-4 px-6 text-gray-700 font-medium">Fecha</th>
            <th class="text-right py-4 px-6 text-gray-700 font-medium">Total</th>
            <th class="py-4 px-6"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="q in cotizaciones" :key="q.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="py-4 px-6 font-medium text-gray-900">{{ q.numero }}</td>
            <td class="py-4 px-6 text-gray-700">{{ q.vehicle?.marca }} {{ q.vehicle?.modelo }} {{ q.vehicle?.ano }}</td>
            <td class="py-4 px-6">
              <span class="px-2 py-1 text-xs rounded-full" :class="badgeClass(q.status)">{{ q.status }}</span>
            </td>
            <td class="py-4 px-6 text-sm text-gray-500">{{ formatDate(q.createdAt?.toDate?.() || q.createdAt) }}</td>
            <td class="py-4 px-6 text-right font-semibold text-gray-900">{{ formatCurrency(q.total, q.currency) }}</td>
            <td class="py-4 px-6 text-right space-x-2">
              <NuxtLink :to="`/cliente/cotizaciones/${q.id}`" class="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">Ver</NuxtLink>
            </td>
          </tr>
          <tr v-if="cotizaciones.length === 0">
            <td colspan="6" class="py-8 text-center text-gray-500">No tienes cotizaciones</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard-professional' })
const authStore = useAuthStore()
const { listQuotes } = useCotizaciones()
const cotizaciones = ref([])

const formatDate = (d) => d ? new Intl.DateTimeFormat('es-CL',{ day:'2-digit', month:'short', year:'numeric' }).format(new Date(d)) : '-'
const formatCurrency = (v,c='CLP') => new Intl.NumberFormat('es-CL',{style:'currency',currency:c}).format(v||0)
const badgeClass = (s) => ({ borrador:'bg-gray-100 text-gray-700', enviada:'bg-blue-100 text-blue-700', aceptada:'bg-green-100 text-green-700', rechazada:'bg-red-100 text-red-700', vencida:'bg-yellow-100 text-yellow-700' }[s] || 'bg-gray-100 text-gray-700')

const cargar = async () => {
  if (!authStore.user?.uid) return
  cotizaciones.value = await listQuotes({ userId: authStore.user.uid, order: 'createdAt' })
}
onMounted(cargar)
</script>


