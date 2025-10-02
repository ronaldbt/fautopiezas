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

          <!-- Sin resultados -->
          <div v-else class="bg-white rounded-lg shadow-md p-12 text-center">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">No se encontraron repuestos</h3>
            <p class="text-gray-600 mb-4">
              No hay repuestos {{ categoriaCapitalizada }} disponibles para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
            </p>
            <NuxtLink 
              :to="`/repuestos/${marca}/${modelo}/${año}`"
              class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver otras categorías
            </NuxtLink>
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

// Obtener parámetros de la URL
const route = useRoute()
const marca = route.params.marca
const modelo = route.params.modelo
const año = route.params.año
const categoria = route.params.categoria

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
    
    const repuestosEncontrados = await getRepuestos({
      marca: String(marca),
      modelo: String(modelo),
      anio: parseInt(String(año)),
      categoria: String(categoria),
      ...filtros.value,
      ordenarPor: ordenamiento.value === 'precio-desc' ? 'precio' : ordenamiento.value,
      orden: ordenamiento.value === 'precio-desc' ? 'desc' : 'asc'
    })
    
    repuestos.value = repuestosEncontrados
    
    // Obtener marcas únicas de repuestos
    const marcas = [...new Set(repuestosEncontrados.map(r => r.marcaRepuesto).filter(Boolean))]
    marcasRepuestos.value = marcas
    
  } catch (err) {
    console.error('Error cargando repuestos:', err)
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