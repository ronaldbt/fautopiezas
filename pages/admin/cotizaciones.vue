<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Cotizaciones</h1>
        <p class="text-gray-600 mt-2">Administra y envía cotizaciones a clientes</p>
      </div>
      <button @click="showNewQuote = true" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"/></svg>
        <span>Nueva Cotización</span>
      </button>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <input v-model="filtros.text" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="número, email, cliente, vehículo"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="filtros.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Todos</option>
            <option v-for="s in estados" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Orden</label>
          <select v-model="filtros.order" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="createdAt">Fecha de creación</option>
            <option value="lastEventAt">Última actividad</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="cargar" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Aplicar</button>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="text-left py-4 px-6 text-gray-700 font-medium">N°</th>
            <th class="text-left py-4 px-6 text-gray-700 font-medium">Cliente</th>
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
            <td class="py-4 px-6">
              <div class="text-gray-900 font-medium">{{ q.userName }}</div>
              <div class="text-sm text-gray-500">{{ q.userEmail }}</div>
            </td>
            <td class="py-4 px-6 text-gray-700">{{ q.vehicle?.marca }} {{ q.vehicle?.modelo }} {{ q.vehicle?.ano }}</td>
            <td class="py-4 px-6">
              <span class="px-2 py-1 text-xs rounded-full" :class="badgeClass(q.status)">{{ q.status }}</span>
            </td>
            <td class="py-4 px-6 text-sm text-gray-500">{{ formatDate(q.createdAt?.toDate?.() || q.createdAt) }}</td>
            <td class="py-4 px-6 text-right font-semibold text-gray-900">{{ formatCurrency(q.total, q.currency) }}</td>
            <td class="py-4 px-6 text-right space-x-2">
              <button @click="verPreview(q.id)" class="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">Preview</button>
              <button @click="descargarPDF(q.id)" class="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">PDF</button>
              <button @click="editar(q.id)" class="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">Editar</button>
              <button @click="onEliminar(q)" class="px-3 py-2 text-sm border rounded-lg hover:bg-red-50 text-red-600">Eliminar</button>
            </td>
          </tr>
          <tr v-if="cotizaciones.length === 0">
            <td colspan="7" class="py-8 text-center text-gray-500">No hay cotizaciones</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Nueva Cotización (simplificado) -->
    <div v-if="showNewQuote" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
        <div class="px-6 py-4 border-b flex items-center justify-between">
          <h3 class="text-lg font-semibold">Nueva Cotización</h3>
          <button @click="showNewQuote = false" class="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cliente registrado</label>
              <select v-model="form.userId" class="w-full px-3 py-2 border rounded-lg">
                <option value="">Sin seleccionar</option>
                <option v-for="c in clientes" :key="c.id" :value="c.id">{{ c.displayName }} ({{ c.email }})</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre cliente (manual)</label>
              <input v-model="form.manualName" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Nombre del cliente"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email cliente (manual)</label>
              <input v-model="form.manualEmail" type="email" class="w-full px-3 py-2 border rounded-lg" placeholder="email@cliente.cl"/>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
              <select v-model="form.currency" class="w-full px-3 py-2 border rounded-lg">
                <option value="CLP">CLP</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Validez</label>
              <input v-model="form.validez" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Válida por 5 días"/>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input v-model="form.vehicle.marca" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Marca"/>
            <input v-model="form.vehicle.modelo" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="Modelo"/>
            <input v-model.number="form.vehicle.ano" type="number" class="w-full px-3 py-2 border rounded-lg" placeholder="Año"/>
            <input v-model="form.vehicle.vin" type="text" class="w-full px-3 py-2 border rounded-lg" placeholder="VIN (opcional)" maxlength="17"/>
          </div>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" v-model="form.modoTotalFinal" />
                Modo precio total (ocultar unitarios)
              </label>
            </div>
            <div v-if="form.modoTotalFinal" class="grid grid-cols-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Total de la cotización</label>
              <div class="flex items-center gap-2">
                <span class="px-3 py-2 border rounded-lg bg-gray-50 text-gray-700">{{ form.currency }}</span>
                <input v-model.number="form.totalFinal" type="number" step="any" min="0" class="w-full px-3 py-2 border rounded-lg" placeholder="Ingresa el total" />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <h4 class="font-medium">Ítems</h4>
              <button @click="addItem" class="text-blue-600 text-sm">Agregar ítem</button>
            </div>
            <div class="space-y-3">
              <div v-for="(it,idx) in form.items" :key="idx" class="grid grid-cols-12 gap-2 items-end">
                <input v-model="it.itemCode" class="col-span-2 px-3 py-2 border rounded-lg" placeholder="Código"/>
                <input v-model="it.descripcion" class="col-span-3 px-3 py-2 border rounded-lg" placeholder="Descripción"/>
                <input v-model="it.marca" class="col-span-2 px-3 py-2 border rounded-lg" placeholder="Marca"/>
                <input v-model.number="it.cantidad" type="number" class="col-span-1 px-3 py-2 border rounded-lg" placeholder="Cant"/>
                <input v-if="!form.modoTotalFinal" v-model.number="it.precioUnitario" type="number" class="col-span-2 px-3 py-2 border rounded-lg" placeholder="Precio"/>
                <div v-if="form.modoTotalFinal" class="col-span-2"></div>
                <div class="col-span-2 flex gap-1">
                  <input 
                    :ref="el => fileInputs[idx] = el"
                    type="file" 
                    accept="image/*" 
                    @change="handleFileUpload($event, idx)"
                    class="hidden"
                  />
                  <button 
                    type="button"
                    @click="fileInputs[idx]?.click()"
                    class="px-2 py-2 text-xs border rounded-lg hover:bg-gray-50"
                  >
                    📷 Foto
                  </button>
                  <button 
                    v-if="it.fotoPreview"
                    type="button"
                    @click="removePhoto(idx)"
                    class="px-2 py-2 text-xs border rounded-lg hover:bg-red-50 text-red-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input v-model="form.condicionesPago" class="px-3 py-2 border rounded-lg" placeholder="Condiciones de pago"/>
            <input v-model="form.plazoEntrega" class="px-3 py-2 border rounded-lg" placeholder="Plazo de entrega"/>
            <input v-model="form.userPhone" class="px-3 py-2 border rounded-lg" placeholder="Teléfono cliente (opcional)"/>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
          <button @click="showNewQuote=false" class="px-4 py-2 border rounded-lg">Cancelar</button>
          <button :disabled="creating || (form.modoTotalFinal && !(Number(form.totalFinal) > 0))" @click="crear" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">{{ creating ? 'Creando...' : 'Crear' }}</button>
        </div>
      </div>
    </div>

    <!-- Modal Preview PDF -->
    <div v-if="preview.open" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl w-full max-w-4xl overflow-hidden">
        <div class="px-6 py-4 border-b flex items-center justify-between">
          <h3 class="text-lg font-semibold">Preview Cotización</h3>
          <div class="flex items-center gap-2">
            <button v-if="preview.quote" @click="generateQuotePdfClient(preview.quote)" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Descargar PDF</button>
            <button @click="preview.open = false" class="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        <div class="p-0 max-h-[80vh] overflow-auto bg-gray-50">
          <div class="p-6">
            <div class="bg-white shadow border rounded-xl p-6">
              <div v-html="preview.html"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard-professional', middleware: 'admin' })

const { listQuotes, createQuote, getQuoteWithItems, generateQuotePdfClient, buildQuoteHtml, deleteQuote, updateQuote } = useCotizaciones()
const authStore = useAuthStore()

const estados = ['borrador','enviada','aceptada','rechazada','vencida']
const filtros = reactive({ text: '', status: '', order: 'createdAt' })
const cotizaciones = ref([])

const formatDate = (d) => {
  if (!d) return '-'
  return new Intl.DateTimeFormat('es-CL', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }).format(new Date(d))
}
const formatCurrency = (v, c='CLP') => new Intl.NumberFormat('es-CL',{ style:'currency', currency:c }).format(v || 0)
const badgeClass = (s) => ({
  borrador: 'bg-gray-100 text-gray-700',
  enviada: 'bg-blue-100 text-blue-700',
  aceptada: 'bg-green-100 text-green-700',
  rechazada: 'bg-red-100 text-red-700',
  vencida: 'bg-yellow-100 text-yellow-700'
}[s] || 'bg-gray-100 text-gray-700')

const cargar = async () => {
  const list = await listQuotes({ status: filtros.status || undefined, order: filtros.order })
  cotizaciones.value = filtros.text ? list.filter(i => (i.searchableText||'').includes(filtros.text.toLowerCase())) : list
}

onMounted(cargar)

// Crear cotización
const showNewQuote = ref(false)
const creating = ref(false)
const clientes = ref([])
const form = reactive({
  userId: '', userPhone: '', manualName: '', manualEmail: '',
  currency: 'CLP', validez: 'Válida por 5 días',
  vehicle: { marca: '', modelo: '', ano: null, vin: '' },
  condicionesPago: '', plazoEntrega: '',
  modoTotalFinal: false, totalFinal: null,
  items: [ { itemCode:'', descripcion:'', marca:'', cantidad:1, precioUnitario:0, fotoPreview: null } ]
})

// Referencias para inputs de archivo
const fileInputs = ref([])

const addItem = () => form.items.push({ itemCode:'', descripcion:'', marca:'', cantidad:1, precioUnitario:0, fotoPreview: null })

// Manejo de fotos
const handleFileUpload = (event, idx) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.items[idx].fotoPreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removePhoto = (idx) => {
  form.items[idx].fotoPreview = null
  if (fileInputs.value[idx]) {
    fileInputs.value[idx].value = ''
  }
}

// cargar clientes básicos para seleccionar
const cargarClientes = async () => {
  const { $firestore } = useNuxtApp()
  const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore')
  try {
    const q = query(collection($firestore,'users'), where('role','in',['cliente','vendedor']), orderBy('email','asc'))
    const snap = await getDocs(q)
    clientes.value = []
    snap.forEach(d => clientes.value.push({ id: d.id, ...(d.data()||{}) }))
  } catch(e) {
    const q = query(collection($firestore,'users'), where('role','in',['cliente','vendedor']))
    const snap = await getDocs(q)
    clientes.value = []
    snap.forEach(d => clientes.value.push({ id: d.id, ...(d.data()||{}) }))
    clientes.value.sort((a,b)=> (a.displayName||'').localeCompare(b.displayName||''))
  }
}
onMounted(cargarClientes)

const crear = async () => {
  if ((!form.userId && !form.manualName) || form.items.length===0) return
  creating.value = true
  try {
    const payload = {
      userId: form.userId || `manual_${Date.now()}`,
      userEmail: form.manualEmail || null,
      userName: form.manualName || null,
      userPhone: form.userPhone || null,
      vehicle: { marca: form.vehicle.marca||null, modelo: form.vehicle.modelo||null, ano: form.vehicle.ano||null, vin: form.vehicle.vin||null },
      currency: form.currency,
      condicionesPago: form.condicionesPago,
      plazoEntrega: form.plazoEntrega,
      validez: form.validez,
      validaHasta: null,
      items: form.items,
      modoTotalFinal: form.modoTotalFinal,
      totalFinal: form.modoTotalFinal ? (Number(form.totalFinal)||0) : undefined,
      creadaPor: { userId: authStore.user?.uid || null, nombre: authStore.user?.displayName || authStore.user?.email || null, role: 'admin' }
    }
    if (editState.id) {
      await updateQuote(editState.id, payload)
    } else {
      const { id } = await createQuote(payload)
      editState.id = id
    }
    showNewQuote.value = false
    await cargar()
  } finally { creating.value = false }
}

const preview = reactive({ open: false, html: '', quote: null })
const descargarPDF = async (id) => {
  const q = await getQuoteWithItems(id)
  await generateQuotePdfClient(q)
}
const verPreview = async (id) => {
  const q = await getQuoteWithItems(id)
  preview.quote = q
  preview.html = buildQuoteHtml(q)
  preview.open = true
}

const editState = reactive({ id: '' })
const editar = async (id) => {
  const q = await getQuoteWithItems(id)
  // Prellenar formulario
  form.userId = q.userId || ''
  form.manualName = q.userName || ''
  form.manualEmail = q.userEmail || ''
  form.userPhone = q.userPhone || ''
  form.currency = q.currency || 'CLP'
  form.validez = q.validez || 'Válida por 5 días'
  form.vehicle.marca = q.vehicle?.marca || ''
  form.vehicle.modelo = q.vehicle?.modelo || ''
  form.vehicle.ano = q.vehicle?.ano || null
  form.vehicle.vin = q.vehicle?.vin || ''
  form.condicionesPago = q.condicionesPago || ''
  form.plazoEntrega = q.plazoEntrega || ''
  form.modoTotalFinal = !!q.modoTotalFinal
  form.totalFinal = q.totalFinal || null
  form.items = (q.items || []).map((it) => ({
    itemCode: it.itemCode || '',
    descripcion: it.descripcion || '',
    marca: it.marca || '',
    cantidad: it.cantidad || 1,
    precioUnitario: it.precioUnitario || 0,
    fotoPreview: it.fotoPreview || null
  }))
  editState.id = id
  showNewQuote.value = true
}

const onEliminar = async (q) => {
  const ok = confirm(`¿Eliminar la cotización ${q.numero}? Esta acción no se puede deshacer.`)
  if (!ok) return
  try {
    await deleteQuote(q.id)
    await cargar()
  } catch (e) {
    alert('No se pudo eliminar la cotización. Intenta nuevamente.')
    console.error(e)
  }
}
</script>


