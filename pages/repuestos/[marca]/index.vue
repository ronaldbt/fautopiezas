<template>
  <div class="min-h-screen bg-gray-50 pt-32">
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
          Repuestos {{ marcaCapitalizada }} importados con garantía extendida y envío a todo Chile
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
            <p class="text-sm text-gray-600 mb-3">{{ modelo.años.length }} años disponibles ({{ modelo.años[0] }}-{{ modelo.años[modelo.años.length-1] }})</p>
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
          Repuestos {{ marcaCapitalizada }} en Chile - Importación Directa
        </h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En AutoPiezas360 Chile somos especialistas en importación de repuestos {{ marcaCapitalizada }}. 
            Contamos con el catálogo más completo de autopartes {{ marcaCapitalizada }} para todos los modelos comercializados en Chile.
          </p>
          <p class="text-gray-600 mb-4">
            Importamos repuestos {{ marcaCapitalizada }} directamente desde fábrica con hasta 50% de descuento, 
            todos cuentan con garantía extendida y están disponibles con entrega en 7 días a todo Chile.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Repuestos {{ marcaCapitalizada }} importados con garantía extendida</li>
            <li>Conseguimos cualquier pieza, aunque no esté en stock</li>
            <li>Envío gratis en compras superiores a $500.000</li>
            <li>Hasta 50% de descuento vs. precios locales</li>
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

// Obtener modelos reales desde el composable
const { getModelosByMarca } = useVehiculos()

// Obtener modelos de la marca desde el JSON
const modelosData = await getModelosByMarca(marca)
const modelos = modelosData || []

// SEO Meta dinámico por marca
useHead({
  title: `Repuestos ${marcaCapitalizada} Chile - Importación Directa 50% Descuento | AutoPiezas360`,
  meta: [
    { name: 'description', content: `Repuestos ${marcaCapitalizada} importados en Chile con 50% descuento. Importación directa desde fábrica, entrega en 7 días, garantía extendida. Conseguimos cualquier pieza.` },
    { name: 'keywords', content: `repuestos ${marca} chile, autopartes ${marca} chile, repuestos ${marca} importados, repuestos ${marca} descuento, autopiezas360` }
  ]
})
</script>

