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
          <NuxtLink :to="`/repuestos/${marca}/${modelo}/${año}/${categoria}`" class="hover:text-blue-600">{{ categoriaCapitalizada }}</NuxtLink>
          <span class="mx-2">›</span>
          <span class="text-gray-800 font-medium">{{ repuestoCapitalizado }}</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          {{ repuestoCapitalizado }} - {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
        </h1>
        <p class="text-gray-600 mt-2">
          Repuesto original {{ marcaCapitalizada }} con garantía extendida
        </p>
      </div>
    </div>

    <!-- Información del repuesto -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Imagen del repuesto -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">🔧</div>
              <p class="text-gray-600">Imagen del repuesto</p>
            </div>
          </div>
        </div>

        <!-- Detalles del repuesto -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ repuestoCapitalizado }}</h2>
          
          <!-- Precio -->
          <div class="mb-6">
            <span class="text-3xl font-bold text-green-600">${{ repuestoData.precio.toLocaleString() }}</span>
            <span class="text-sm text-gray-600 ml-2">CLP</span>
          </div>

          <!-- Stock -->
          <div class="mb-6">
            <span v-if="repuestoData.stock" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✓ En Stock - Disponible
            </span>
            <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              ✗ Agotado
            </span>
          </div>

          <!-- Características -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Características</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Repuesto 100% original {{ marcaCapitalizada }}</li>
              <li>• Compatible con {{ modeloCapitalizado }} {{ año }}</li>
              <li>• Garantía oficial del fabricante</li>
              <li>• Entrega inmediata disponible</li>
              <li>• Instalación por técnicos certificados</li>
            </ul>
          </div>

          <!-- Botón de compra -->
          <div class="space-y-3">
            <button v-if="repuestoData.stock" 
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Comprar Ahora - ${{ repuestoData.precio.toLocaleString() }}
            </button>
            <button v-else 
                    class="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed">
              Repuesto Agotado
            </button>
            <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
              Consultar Disponibilidad
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Información técnica -->
    <section class="bg-white py-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Información Técnica</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Especificaciones</h3>
            <ul class="space-y-2 text-gray-600">
              <li><strong>Marca:</strong> {{ marcaCapitalizada }}</li>
              <li><strong>Modelo:</strong> {{ modeloCapitalizado }}</li>
              <li><strong>Año:</strong> {{ año }}</li>
              <li><strong>Categoría:</strong> {{ categoriaCapitalizada }}</li>
              <li><strong>Código Original:</strong> {{ repuestoData.codigoOriginal }}</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Garantía</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Garantía oficial {{ marcaCapitalizada }}</li>
              <li>• 12 meses de cobertura</li>
              <li>• Instalación incluida</li>
              <li>• Soporte técnico especializado</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- SEO Content -->
    <section class="bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          {{ repuestoCapitalizado }} {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} - Original
        </h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En FAutopiezas Chile ofrecemos el {{ repuestoCapitalizado.toLowerCase() }} original para {{ marcaCapitalizada }} {{ modeloCapitalizado }} año {{ año }}. 
            Este repuesto es 100% original, cuenta con garantía oficial del fabricante y está disponible con entrega inmediata.
          </p>
          <p class="text-gray-600 mb-4">
            Nuestro {{ repuestoCapitalizado.toLowerCase() }} para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} está diseñado específicamente 
            para este modelo y año, garantizando compatibilidad perfecta y rendimiento óptimo.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Repuesto original {{ marcaCapitalizada }} con código {{ repuestoData.codigoOriginal }}</li>
            <li>Compatibilidad 100% garantizada para {{ modeloCapitalizado }} {{ año }}</li>
            <li>Stock disponible con entrega inmediata</li>
            <li>Garantía oficial del fabricante por 12 meses</li>
            <li>Instalación incluida por técnicos certificados</li>
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
const año = route.params.año
const categoria = route.params.categoria
const repuesto = route.params.repuesto

// Capitalizar para display
const marcaCapitalizada = marca.charAt(0).toUpperCase() + marca.slice(1)
const modeloCapitalizado = modelo.charAt(0).toUpperCase() + modelo.slice(1)
const categoriaCapitalizada = categoria.charAt(0).toUpperCase() + categoria.slice(1)
const repuestoCapitalizado = repuesto.charAt(0).toUpperCase() + repuesto.slice(1).replace(/-/g, ' ')

// Datos del repuesto específico
const repuestoData = {
  precio: 85000,
  stock: true,
  codigoOriginal: `${marca.toUpperCase()}-${repuesto.toUpperCase()}-${año}`
}

// SEO Meta dinámico por repuesto específico
useHead({
  title: `${repuestoCapitalizado} ${marcaCapitalizada} ${modeloCapitalizado} ${año} - Original | FAutopiezas`,
  meta: [
    { name: 'description', content: `${repuestoCapitalizado} original ${marcaCapitalizada} ${modeloCapitalizado} ${año} en Chile. Stock inmediato, garantía extendida, envío gratis. Repuesto original con código ${repuestoData.codigoOriginal}.` },
    { name: 'keywords', content: `${repuesto} ${marca} ${modelo} ${año}, ${repuesto} original ${marca} ${modelo}, ${repuesto} ${marca} ${modelo} ${año} precio, ${repuesto} ${marca} ${modelo} chile` }
  ]
})
</script>

