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
          <span class="text-gray-800 font-medium">{{ año }}</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
          <!-- DEBUG: {{ JSON.stringify({ marca: marca, modelo: modelo, año: año }) }} -->
        </h1>
        <p class="text-gray-600 mt-2">
          Repuestos originales para {{ marcaCapitalizada }} {{ modeloCapitalizado }} año {{ año }}
        </p>
      </div>
    </div>

    <!-- Categorías de repuestos para el año específico -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Categorías de Repuestos Disponibles</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="categoria in categorias" :key="categoria.slug" 
             class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <NuxtLink :to="`/repuestos/${marca}/${modelo}/${año}/${categoria.slug}`" class="block">
            <div class="text-center">
              <div class="text-4xl mb-4">{{ categoria.icono }}</div>
              <h3 class="text-xl font-bold text-blue-600 mb-2">{{ categoria.nombre }}</h3>
              <p class="text-sm text-gray-600 mb-3">{{ categoria.repuestos }} repuestos disponibles</p>
              <div class="text-xs text-gray-500">
                Ver repuestos {{ categoria.nombre.toLowerCase() }} →
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Repuestos más solicitados -->
    <section class="bg-white py-12">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Repuestos Más Solicitados {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="repuesto in repuestosPopulares" :key="repuesto.slug" 
               class="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
            <h3 class="font-semibold text-lg text-gray-800 mb-2">{{ repuesto.nombre }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ repuesto.descripcion }}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-blue-600">${{ repuesto.precio.toLocaleString() }}</span>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">En Stock</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEO Content -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} - Especialistas
        </h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En FAutopiezas Chile somos especialistas en repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }} año {{ año }}. 
            Contamos con el catálogo más completo de autopartes originales específicas para este año y modelo.
          </p>
          <p class="text-gray-600 mb-4">
            Todos nuestros repuestos para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} son 100% originales, 
            cuentan con garantía oficial del fabricante y están disponibles con entrega inmediata en Santiago y regiones.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Repuestos específicos para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}</li>
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
import { ref, computed, onMounted } from 'vue'

// Obtener parámetros de la URL de forma estable
const route = useRoute()
const marca = computed(() => String(route.params.marca))
const modelo = computed(() => String(route.params.modelo))
const año = computed(() => String(route.params.ano))

// Capitalizar para display
const marcaCapitalizada = computed(() => marca.value.charAt(0).toUpperCase() + marca.value.slice(1))
const modeloCapitalizado = computed(() => modelo.value.charAt(0).toUpperCase() + modelo.value.slice(1))

// Composables
const { getCategoriasByModelo, validarVehiculo, getCategorias } = useVehiculos()

// Variables reactivas
const categorias = ref([])
const loading = ref(true)
const vehiculoValido = ref(false)

// Iconos para categorías (mantener diseño visual)
const iconosPorCategoria = {
  'motor': '🔧',
  'freno-maza-rueda': '🛑', 
  'frenos': '🛑',
  'suspension': '⚡',
  'electrico': '⚡',
  'carroceria-ensamblaje-lampara': '🚗',
  'carroceria': '🚗',
  'transmision-automatica': '⚙️',
  'transmision': '⚙️',
  'sistema-enfriamiento': '❄️',
  'refrigeracion': '❄️',
  'escapes-emisiones': '💨',
  'escape': '💨'
}

// Cargar datos reales
const cargarDatos = async () => {
  try {
    loading.value = true
    
    
    // Validar que el vehículo existe
    const esValido = await validarVehiculo(marca.value, modelo.value, parseInt(año.value))
    console.log('✅ VEHÍCULO VÁLIDO:', esValido)
    vehiculoValido.value = esValido
    
    if (esValido) {
      // Cargar categorías reales disponibles para este modelo
      const categoriasDisponibles = await getCategoriasByModelo(marca.value, modelo.value)
      
      // Mapear categorías con iconos y datos simulados de cantidad
      categorias.value = categoriasDisponibles.map(categoria => ({
        nombre: categoria.nombre,
        slug: categoria.slug,
        icono: iconosPorCategoria[categoria.slug] || '🔧',
        repuestos: Math.floor(Math.random() * 40) + 10 // Simulado por ahora
      }))
    } else {
      // Si el vehículo no es válido, usar categorías generales
      const todasCategorias = getCategorias()
      categorias.value = todasCategorias.slice(0, 8).map(categoria => ({
        nombre: categoria.nombre,
        slug: categoria.slug,
        icono: iconosPorCategoria[categoria.slug] || '🔧',
        repuestos: Math.floor(Math.random() * 40) + 10
      }))
    }
  } catch (error) {
    console.error('Error cargando datos del vehículo:', error)
    // Fallback con categorías básicas
    categorias.value = [
      { nombre: 'Motor', slug: 'motor', icono: '🔧', repuestos: 45 },
      { nombre: 'Frenos', slug: 'freno-maza-rueda', icono: '🛑', repuestos: 23 },
      { nombre: 'Suspensión', slug: 'suspension', icono: '⚡', repuestos: 18 },
      { nombre: 'Eléctrico', slug: 'electrico', icono: '⚡', repuestos: 31 }
    ]
  } finally {
    loading.value = false
  }
}

// Repuestos populares para el año específico (mantener igual)
const repuestosPopulares = [
  { nombre: 'Filtro de Aceite', slug: 'filtro-aceite', descripcion: 'Filtro de aceite original', precio: 25000 },
  { nombre: 'Pastillas de Freno', slug: 'pastillas-freno', descripcion: 'Pastillas de freno delanteras', precio: 85000 },
  { nombre: 'Amortiguadores', slug: 'amortiguadores', descripcion: 'Amortiguadores delanteros', precio: 180000 },
  { nombre: 'Batería', slug: 'bateria', descripcion: 'Batería 12V 60Ah', precio: 95000 },
  { nombre: 'Alternador', slug: 'alternador', descripcion: 'Alternador original', precio: 320000 },
  { nombre: 'Radiador', slug: 'radiador', descripcion: 'Radiador de motor', precio: 280000 }
]

// Cargar datos al montar
onMounted(() => {
  cargarDatos()
})

// SEO Meta dinámico por año específico
useHead({
  title: `Repuestos ${marcaCapitalizada.value} ${modeloCapitalizado.value} ${año.value} - Originales | FAutopiezas`,
  meta: [
    { name: 'description', content: `Repuestos originales ${marcaCapitalizada.value} ${modeloCapitalizado.value} año ${año.value} en Chile. Stock inmediato, garantía extendida, envío gratis. Especialistas en ${marcaCapitalizada.value} ${modeloCapitalizado.value} ${año.value}.` },
    { name: 'keywords', content: `repuestos ${marca.value} ${modelo.value} ${año.value}, autopartes ${marca.value} ${modelo.value} ${año.value}, repuestos originales ${marca.value} ${modelo.value} ${año.value}, ${marca.value} ${modelo.value} ${año.value} repuestos` }
  ]
})
</script>

