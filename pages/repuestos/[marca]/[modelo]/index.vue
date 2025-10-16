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
          <span class="text-gray-800 font-medium">{{ modeloCapitalizado }}</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }} Chile
        </h1>
        <p class="text-gray-600 mt-2">
          Repuestos originales {{ marcaCapitalizada }} {{ modeloCapitalizado }} con stock inmediato
        </p>
      </div>
    </div>

    <!-- Lista de años disponibles -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Selecciona el Año de tu Vehículo</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="año in añosDisponibles" :key="año" 
             class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 text-center">
          <NuxtLink :to="`/repuestos/${marca}/${modelo}/${año}`" class="block">
            <div class="text-2xl font-bold text-blue-600">{{ año }}</div>
            <div class="text-sm text-gray-600 mt-1">
              Ver repuestos →
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Categorías de repuestos -->
    <section class="bg-white py-12">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Categorías de Repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="categoria in categorias" :key="categoria.slug" 
               class="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-4">{{ categoria.icono }}</div>
            <h3 class="font-semibold text-lg text-gray-800 mb-2">{{ categoria.nombre }}</h3>
            <p class="text-sm text-gray-600">{{ categoria.repuestos }}+ repuestos</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SEO Content -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }} - Especialistas en Chile
        </h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En FAutopiezas Chile somos especialistas en repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }}. 
            Contamos con el catálogo más completo de autopartes originales para este modelo específico.
          </p>
          <p class="text-gray-600 mb-4">
            Todos nuestros repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }} son 100% originales, 
            cuentan con garantía oficial y están disponibles con entrega inmediata.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Repuestos {{ marcaCapitalizada }} {{ modeloCapitalizado }} originales</li>
            <li>Stock disponible para todos los años</li>
            <li>Garantía oficial del fabricante</li>
            <li>Instalación por técnicos especializados</li>
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

// Capitalizar para display
const marcaCapitalizada = computed(() => marca.value.charAt(0).toUpperCase() + marca.value.slice(1))
const modeloCapitalizado = computed(() => modelo.value.charAt(0).toUpperCase() + modelo.value.slice(1))

// Composables
const { getAñosByModelo, getCategoriasByModelo } = useVehiculos()

// Variables reactivas
const añosDisponibles = ref([])
const categorias = ref([])
const loading = ref(true)

// Iconos para categorías
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

// Cargar datos reales del modelo
const cargarDatos = async () => {
  try {
    loading.value = true
    
    // Cargar años reales disponibles para este modelo
    const años = await getAñosByModelo(marca.value, modelo.value)
    añosDisponibles.value = años.sort((a, b) => b - a) // Orden descendente
    
    // Cargar categorías reales disponibles para este modelo
    const categoriasDisponibles = await getCategoriasByModelo(marca.value, modelo.value)
    categorias.value = categoriasDisponibles.map(categoria => ({
      nombre: categoria.nombre,
      slug: categoria.slug,
      icono: iconosPorCategoria[categoria.slug] || '🔧',
      repuestos: Math.floor(Math.random() * 40) + 10 // Simulado por ahora
    }))
    
  } catch (error) {
    console.error('Error cargando datos del modelo:', error)
    // Fallback con datos básicos
    añosDisponibles.value = Array.from({ length: 10 }, (_, i) => 2024 - i)
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

// Cargar datos al montar
onMounted(() => {
  cargarDatos()
})

// SEO Meta dinámico por modelo
useHead({
  title: `Repuestos ${marcaCapitalizada.value} ${modeloCapitalizado.value} Chile - Originales | FAutopiezas`,
  meta: [
    { name: 'description', content: `Repuestos originales ${marcaCapitalizada.value} ${modeloCapitalizado.value} en Chile. Stock inmediato, garantía extendida, envío gratis. Especialistas en ${marcaCapitalizada.value} ${modeloCapitalizado.value}.` },
    { name: 'keywords', content: `repuestos ${marca.value} ${modelo.value} chile, autopartes ${marca.value} ${modelo.value}, repuestos originales ${marca.value} ${modelo.value}, ${marca.value} ${modelo.value} repuestos` }
  ]
})
</script>

