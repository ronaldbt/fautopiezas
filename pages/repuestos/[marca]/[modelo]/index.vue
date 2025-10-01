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
// Obtener parámetros de la URL
const route = useRoute()
const marca = route.params.marca
const modelo = route.params.modelo

// Capitalizar para display
const marcaCapitalizada = marca.charAt(0).toUpperCase() + marca.slice(1)
const modeloCapitalizado = modelo.charAt(0).toUpperCase() + modelo.slice(1)

// Años disponibles según el modelo
const añosDisponibles = []
if (modelo === 'corolla') {
  for (let i = 2010; i <= 2024; i++) añosDisponibles.push(i)
} else if (modelo === 'qashqai') {
  for (let i = 2014; i <= 2024; i++) añosDisponibles.push(i)
} else if (modelo === 'sail') {
  for (let i = 2012; i <= 2024; i++) añosDisponibles.push(i)
} else {
  // Años genéricos
  for (let i = 2015; i <= 2024; i++) añosDisponibles.push(i)
}

// Categorías de repuestos
const categorias = [
  { nombre: 'Motor', slug: 'motor', icono: '🔧', repuestos: 45 },
  { nombre: 'Frenos', slug: 'frenos', icono: '🛑', repuestos: 23 },
  { nombre: 'Suspensión', slug: 'suspension', icono: '⚡', repuestos: 18 },
  { nombre: 'Eléctrico', slug: 'electrico', icono: '⚡', repuestos: 31 },
  { nombre: 'Carrocería', slug: 'carroceria', icono: '🚗', repuestos: 27 },
  { nombre: 'Transmisión', slug: 'transmision', icono: '⚙️', repuestos: 15 },
  { nombre: 'Refrigeración', slug: 'refrigeracion', icono: '❄️', repuestos: 12 },
  { nombre: 'Escape', slug: 'escape', icono: '💨', repuestos: 9 }
]

// SEO Meta dinámico por modelo
useHead({
  title: `Repuestos ${marcaCapitalizada} ${modeloCapitalizado} Chile - Originales | FAutopiezas`,
  meta: [
    { name: 'description', content: `Repuestos originales ${marcaCapitalizada} ${modeloCapitalizado} en Chile. Stock inmediato, garantía extendida, envío gratis. Especialistas en ${marcaCapitalizada} ${modeloCapitalizado}.` },
    { name: 'keywords', content: `repuestos ${marca} ${modelo} chile, autopartes ${marca} ${modelo}, repuestos originales ${marca} ${modelo}, ${marca} ${modelo} repuestos` }
  ]
})
</script>

