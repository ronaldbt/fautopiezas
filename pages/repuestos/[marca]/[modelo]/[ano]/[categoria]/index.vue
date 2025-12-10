<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header con breadcrumb -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <nav class="text-sm text-gray-600 mb-4">
          <NuxtLink to="/" class="hover:text-blue-600">Inicio</NuxtLink>
          <span class="mx-2">›</span>
          <NuxtLink to="/repuestos" class="hover:text-blue-600">Repuestos</NuxtLink>
          <span class="mx-2">›</span>
          <NuxtLink :to="`/repuestos/${marca}`" class="hover:text-blue-600">{{ marcaCapitalizada }}</NuxtLink>
          <span class="mx-2">›</span>
          <NuxtLink :to="`/repuestos/${marca}/${modelo}`" class="hover:text-blue-600">{{ modeloCapitalizado }}</NuxtLink>
          <span class="mx-2">›</span>
          <NuxtLink :to="`/repuestos/${marca}/${modelo}/${año}`" class="hover:text-blue-600">{{ año }}</NuxtLink>
          <span class="mx-2">›</span>
          <span class="text-gray-800 font-medium">{{ categoriaCapitalizada }}</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Repuestos {{ categoriaCapitalizada }} - {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
        </h1>
        <p class="text-gray-600 mt-2">
          Repuestos originales {{ categoriaCapitalizada }} para {{ marcaCapitalizada }} {{ modeloCapitalizado }} año {{ año }}
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Cargando repuestos...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="text-red-600 text-6xl mb-4">⚠️</div>
        <h2 class="text-xl font-bold text-red-800 mb-2">Error al cargar los repuestos</h2>
        <p class="text-red-600">{{ error }}</p>
      </div>
    </div>

    <!-- Contenido principal -->
    <div v-else class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex gap-8">
        <!-- Sidebar de filtros -->
        <div class="w-80 flex-shrink-0">
          <FiltrosRepuestos 
            :subcategorias="subcategorias"
            :marcas-repuestos="marcasRepuestos"
            @filtros-aplicados="aplicarFiltros"
            @filtros-limpios="limpiarFiltros"
          />
        </div>

        <!-- Contenido principal -->
        <div class="flex-1">
          <!-- Encabezado de resultados -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  {{ repuestos.length }} repuestos encontrados
                </h2>
                <p class="text-gray-600 mt-1">
                  {{ categoriaCapitalizada }} para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
                </p>
              </div>
              <div class="flex items-center space-x-4">
                <select 
                  v-model="ordenamiento" 
                  @change="aplicarFiltros"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevancia">Ordenar por relevancia</option>
                  <option value="precio">Precio (menor a mayor)</option>
                  <option value="precio-desc">Precio (mayor a menor)</option>
                  <option value="nombre">Nombre (A-Z)</option>
                  <option value="fecha">Más recientes</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Lista de repuestos -->
          <div v-if="repuestos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RepuestoCard 
              v-for="repuesto in repuestos" 
              :key="repuesto.id"
              :repuesto="repuesto"
            />
          </div>

          <!-- Sin resultados - Mensaje WhatsApp -->
          <div v-else class="bg-white rounded-lg shadow-md p-12 text-center">
            <div class="text-6xl mb-6">📦</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">¡Tu repuesto llega en 7 días!</h3>
            <p class="text-gray-600 mb-6 text-lg">
              Como somos especialistas en <strong>importación directa</strong>, no tenemos este repuesto {{ categoriaCapitalizada }} 
              para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} en stock, pero podemos conseguirlo para ti.
            </p>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div class="flex items-center justify-center mb-3">
                <div class="text-3xl mr-3">🚚</div>
                <h4 class="text-lg font-semibold text-green-800">Importación Express</h4>
              </div>
              <ul class="text-green-700 space-y-2 mb-4">
                <li class="flex items-center justify-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Llegada garantizada en 7 días a tu casa o taller
                </li>
                <li class="flex items-center justify-center">
                  <span class="text-green-500 mr-2">✓</span>
                  En promedio se puede ahorrar un 50% importando el producto
                </li>
                <li class="flex items-center justify-center">
                  <span class="text-green-500 mr-2">✓</span>
                  Envío a todas las ciudades de Chile
                </li>
              </ul>
            </div>

            <div class="space-y-4">
              <button 
                @click="contactarWhatsApp"
                class="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold shadow-lg"
              >
                <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Consultar por WhatsApp
              </button>
              
              <div class="text-sm text-gray-500">
                <p>📱 Respuesta inmediata • 🕒 Horario: Lunes a Viernes 9:00 - 18:00</p>
              </div>
              
              <NuxtLink 
                :to="`/repuestos/${marca}/${modelo}/${año}`"
                class="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors ml-4"
              >
                Ver otras categorías disponibles
              </NuxtLink>
            </div>
          </div>

          <!-- Paginación -->
          <div v-if="totalPaginas > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button 
                @click="cambiarPagina(paginaActual - 1)"
                :disabled="paginaActual === 1"
                class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              <button 
                v-for="pagina in paginasVisibles" 
                :key="pagina"
                @click="cambiarPagina(pagina)"
                :class="[
                  'px-3 py-2 border rounded-md',
                  pagina === paginaActual 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ pagina }}
              </button>
              
              <button 
                @click="cambiarPagina(paginaActual + 1)"
                :disabled="paginaActual === totalPaginas"
                class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- SEO Content -->
    <section class="bg-white py-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Repuestos {{ categoriaCapitalizada }} {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} - Especialistas
        </h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En FAutopiezas Chile somos especialistas en repuestos {{ categoriaCapitalizada }} para {{ marcaCapitalizada }} {{ modeloCapitalizado }} año {{ año }}. 
            Contamos con el catálogo más completo de autopartes originales específicas para esta categoría.
          </p>
          <p class="text-gray-600 mb-4">
            Todos nuestros repuestos {{ categoriaCapitalizada }} para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} son 100% originales, 
            cuentan con garantía oficial del fabricante y están disponibles con entrega inmediata en Santiago y regiones.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Repuestos {{ categoriaCapitalizada }} específicos para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}</li>
            <li>Compatibilidad 100% garantizada</li>
            <li>Stock disponible en tiempo real</li>
            <li>Instalación por técnicos certificados</li>
            <li>Garantía extendida en todos los repuestos</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Debug: Verificar que esta página se está cargando
console.log('🟢 [Página Lista] Componente montado')
console.log('🟢 [Página Lista] Ruta completa:', useRoute().path)
console.log('🟢 [Página Lista] Parámetros:', useRoute().params)

// Obtener parámetros de la URL
const route = useRoute()
const marca = route.params.marca
const modelo = route.params.modelo
const año = route.params.ano
const categoria = route.params.categoria

// Debug: Si hay un parámetro "repuesto", significa que estamos en la ruta incorrecta
if (route.params.repuesto) {
  console.error('❌ [Página Lista] ERROR: Esta es la página de lista pero hay un parámetro "repuesto" en la URL:', route.params.repuesto)
  console.error('❌ [Página Lista] Esto significa que Nuxt no está resolviendo correctamente la ruta dinámica')
}

// Capitalizar para display
const marcaCapitalizada = marca.charAt(0).toUpperCase() + marca.slice(1)
const modeloCapitalizado = modelo.charAt(0).toUpperCase() + modelo.slice(1)
const categoriaCapitalizada = categoria.charAt(0).toUpperCase() + categoria.slice(1)

// Variables reactivas
const repuestos = ref([])
const loading = ref(true)
const error = ref(null)
const filtros = ref({})
const ordenamiento = ref('relevancia')
const paginaActual = ref(1)
const repuestosPorPagina = 12

// Composables
const { getRepuestos } = useRepuestos()
const { getCategoriaBySlug } = useVehiculos()

    // Obtener información de la categoría
    const categoriaData = getCategoriaBySlug(String(categoria))
const subcategorias = categoriaData?.subcategorias || []

// Obtener marcas de repuestos únicas
const marcasRepuestos = ref([])

// Computed para paginación
const totalPaginas = computed(() => Math.ceil(repuestos.value.length / repuestosPorPagina))

const paginasVisibles = computed(() => {
  const total = totalPaginas.value
  const actual = paginaActual.value
  const paginas = []
  
  // Mostrar máximo 5 páginas
  const inicio = Math.max(1, actual - 2)
  const fin = Math.min(total, actual + 2)
  
  for (let i = inicio; i <= fin; i++) {
    paginas.push(i)
  }
  
  return paginas
})

// Cargar repuestos
const cargarRepuestos = async () => {
  try {
    loading.value = true
    error.value = null
    
    const filtrosBusqueda = {
      marca: String(marca).toLowerCase(),
      modelo: String(modelo),
      anio: parseInt(String(año)),
      categoria: String(categoria).toLowerCase(),
      ...filtros.value,
      ordenarPor: ordenamiento.value === 'precio-desc' ? 'precio' : ordenamiento.value,
      orden: ordenamiento.value === 'precio-desc' ? 'desc' : 'asc',
      limite: 100 // Aumentar límite para ver más productos
    }
    
    console.log('🔍 [cargarRepuestos] Buscando productos con:', filtrosBusqueda)
    console.log('📍 [cargarRepuestos] URL:', route.path)
    console.log('📋 [cargarRepuestos] Parámetros:', { marca, modelo, año, categoria })
    
    const repuestosEncontrados = await getRepuestos(filtrosBusqueda)
    
    console.log(`✅ [cargarRepuestos] Productos encontrados: ${repuestosEncontrados.length}`)
    if (repuestosEncontrados.length > 0) {
      console.log('📦 [cargarRepuestos] Primer producto:', repuestosEncontrados[0])
    }
    
    repuestos.value = repuestosEncontrados
    
    // Obtener marcas únicas de repuestos
    const marcas = [...new Set(repuestosEncontrados.map(r => r.marcaRepuesto).filter(Boolean))]
    marcasRepuestos.value = marcas
    
  } catch (err) {
    console.error('❌ [cargarRepuestos] Error cargando repuestos:', err)
    console.error('❌ [cargarRepuestos] Detalles:', err.message, err.stack)
    error.value = 'Error al cargar los repuestos'
  } finally {
    loading.value = false
  }
}

// Aplicar filtros
const aplicarFiltros = (nuevosFiltros) => {
  filtros.value = { ...filtros.value, ...nuevosFiltros }
  paginaActual.value = 1
  cargarRepuestos()
}

// Limpiar filtros
const limpiarFiltros = () => {
  filtros.value = {}
  paginaActual.value = 1
  cargarRepuestos()
}

// Cambiar página
const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Función para contactar por WhatsApp
const contactarWhatsApp = () => {
  const mensaje = `¡Hola! Necesito cotizar un repuesto ${categoriaCapitalizada} para mi vehículo:

🚗 Marca: ${marcaCapitalizada}
🚙 Modelo: ${modeloCapitalizado}  
📅 Año: ${año}
🔧 Categoría: ${categoriaCapitalizada}

¿Podrían ayudarme con la importación? Entiendo que llega en 7 días.

¡Gracias!`
  
  const numeroWhatsApp = '+56979796841'
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
  
  window.open(urlWhatsApp, '_blank')
}

// Cargar datos iniciales
onMounted(() => {
  cargarRepuestos()
})

// SEO Meta dinámico
useHead({
  title: `Repuestos ${categoriaCapitalizada} ${marcaCapitalizada} ${modeloCapitalizado} ${año} - Originales | FAutopiezas`,
  meta: [
    { name: 'description', content: `Repuestos originales ${categoriaCapitalizada} para ${marcaCapitalizada} ${modeloCapitalizado} ${año} en Chile. Stock inmediato, garantía extendida, envío gratis. Especialistas en ${categoriaCapitalizada} ${marcaCapitalizada} ${modeloCapitalizado}.` },
    { name: 'keywords', content: `repuestos ${categoria} ${marca} ${modelo} ${año}, ${categoria} ${marca} ${modelo}, repuestos originales ${categoria} ${marca} ${modelo} ${año}, ${marca} ${modelo} ${año} ${categoria} repuestos` }
  ]
})
</script>