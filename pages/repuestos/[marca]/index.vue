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
          <span class="text-gray-800 font-medium">{{ marcaCapitalizada }}</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Repuestos {{ marcaCapitalizada }} Chile
        </h1>
        <p class="text-gray-600 mt-2">
          Repuestos originales {{ marcaCapitalizada }} con stock inmediato y garantía extendida
        </p>
      </div>
    </div>

    <!-- Lista de modelos -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="modelo in modelos" :key="modelo.slug" 
             class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <NuxtLink :to="`/repuestos/${marca}/${modelo.slug}`" class="block">
            <h2 class="text-xl font-bold text-blue-600 mb-2">{{ modelo.nombre }}</h2>
            <p class="text-sm text-gray-600 mb-3">{{ modelo.años }} años disponibles</p>
            <div class="text-xs text-gray-500">
              Ver repuestos {{ marcaCapitalizada }} {{ modelo.nombre }} →
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- SEO Content -->
    <section class="bg-white py-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Repuestos Originales {{ marcaCapitalizada }} en Chile
        </h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En FAutopiezas Chile somos especialistas en repuestos originales {{ marcaCapitalizada }}. 
            Contamos con el catálogo más completo de autopartes {{ marcaCapitalizada }} para todos los modelos comercializados en Chile.
          </p>
          <p class="text-gray-600 mb-4">
            Todos nuestros repuestos {{ marcaCapitalizada }} son 100% originales, cuentan con garantía oficial del fabricante 
            y están disponibles con entrega inmediata en Santiago y regiones.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Repuestos {{ marcaCapitalizada }} originales con garantía</li>
            <li>Stock disponible para todos los modelos</li>
            <li>Envío gratis en compras superiores a $50.000</li>
            <li>Instalación por técnicos certificados {{ marcaCapitalizada }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Obtener parámetro de la URL
const route = useRoute()
const marca = route.params.marca

// Capitalizar marca para display
const marcaCapitalizada = marca.charAt(0).toUpperCase() + marca.slice(1)

// Datos de modelos por marca (ejemplo para Toyota)
const modelosToyota = [
  { nombre: 'Corolla', slug: 'corolla', años: '2010-2024' },
  { nombre: 'Yaris', slug: 'yaris', años: '2015-2024' },
  { nombre: 'RAV4', slug: 'rav4', años: '2012-2024' },
  { nombre: 'Hilux', slug: 'hilux', años: '2008-2024' },
  { nombre: 'Prius', slug: 'prius', años: '2016-2024' },
  { nombre: 'Camry', slug: 'camry', años: '2018-2024' }
]

// Datos de modelos por marca (ejemplo para Nissan)
const modelosNissan = [
  { nombre: 'Qashqai', slug: 'qashqai', años: '2014-2024' },
  { nombre: 'X-Trail', slug: 'x-trail', años: '2016-2024' },
  { nombre: 'Versa', slug: 'versa', años: '2012-2024' },
  { nombre: 'Sentra', slug: 'sentra', años: '2015-2024' },
  { nombre: 'Navara', slug: 'navara', años: '2010-2024' }
]

// Datos de modelos por marca (ejemplo para Chevrolet)
const modelosChevrolet = [
  { nombre: 'Sail', slug: 'sail', años: '2012-2024' },
  { nombre: 'Cruze', slug: 'cruze', años: '2014-2024' },
  { nombre: 'Equinox', slug: 'equinox', años: '2018-2024' },
  { nombre: 'Silverado', slug: 'silverado', años: '2016-2024' },
  { nombre: 'Spark', slug: 'spark', años: '2015-2024' }
]

// Seleccionar modelos según la marca
let modelos = []
if (marca === 'toyota') {
  modelos = modelosToyota
} else if (marca === 'nissan') {
  modelos = modelosNissan
} else if (marca === 'chevrolet') {
  modelos = modelosChevrolet
} else {
  // Modelos genéricos para otras marcas
  modelos = [
    { nombre: 'Modelo A', slug: 'modelo-a', años: '2015-2024' },
    { nombre: 'Modelo B', slug: 'modelo-b', años: '2018-2024' },
    { nombre: 'Modelo C', slug: 'modelo-c', años: '2020-2024' }
  ]
}

// SEO Meta dinámico por marca
useHead({
  title: `Repuestos ${marcaCapitalizada} Chile - Originales y Garantizados | FAutopiezas`,
  meta: [
    { name: 'description', content: `Repuestos originales ${marcaCapitalizada} en Chile. Stock inmediato, envío gratis, garantía extendida. Los mejores precios del mercado para ${marcaCapitalizada}.` },
    { name: 'keywords', content: `repuestos ${marca} chile, autopartes ${marca} chile, repuestos originales ${marca}, repuestos ${marca} santiago` }
  ]
})
</script>

