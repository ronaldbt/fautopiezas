<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header con breadcrumb -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <nav class="text-sm text-gray-600 mb-4">
          <NuxtLink to="/" class="hover:text-blue-600">Inicio</NuxtLink>
          <span class="mx-2">›</span>
          <span class="text-gray-800 font-medium">Repuestos</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">Catálogo de Repuestos por Marca</h1>
        <p class="text-gray-600 mt-2">Encuentra repuestos originales para todas las marcas de autos en Chile</p>
      </div>
    </div>

    <!-- Layout principal con sidebar y contenido -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex gap-8">
        <!-- Sidebar de filtros -->
        <div class="w-80 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-lg font-bold text-gray-800 mb-6">Filtrar por Marca</h2>
            
            <!-- Buscador de marcas -->
            <div class="mb-6">
              <input 
                v-model="searchMarca" 
                type="text" 
                placeholder="Buscar marca..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <!-- Lista de marcas -->
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div 
                v-for="marca in marcasFiltradas" 
                :key="marca.slug"
                class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                @click="selectMarca(marca)"
              >
                <div>
                  <div class="font-medium text-gray-800">{{ marca.nombre }}</div>
                  <div class="text-xs text-gray-500">{{ marca.modelos }} modelos</div>
                </div>
                <NuxtLink 
                  :to="`/repuestos/${marca.slug}`" 
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  @click.stop
                >
                  Ver →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="flex-1">
          <!-- Encabezado de resultados -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-gray-800">Repuestos por Marca</h2>
                <p class="text-gray-600 mt-1">{{ marcas.length }} marcas disponibles</p>
              </div>
              <div class="flex items-center space-x-4">
                <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Ordenar por popularidad</option>
                  <option>Ordenar por nombre A-Z</option>
                  <option>Ordenar por nombre Z-A</option>
                  <option>Ordenar por cantidad de modelos</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Grid de marcas -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="marca in marcasFiltradas" 
              :key="marca.slug" 
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <NuxtLink :to="`/repuestos/${marca.slug}`" class="block">
                <div class="mb-4">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ marca.nombre }}</h3>
                  <p class="text-sm text-gray-600">{{ marca.modelos }}+ modelos disponibles</p>
                </div>
                
                <!-- Categorías principales -->
                <div class="mb-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="categoria in marca.categorias" 
                      :key="categoria"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {{ categoria }}
                    </span>
                  </div>
                </div>

                <!-- Información adicional -->
                <div class="border-t pt-4">
                  <div class="flex justify-between items-center text-sm text-gray-600">
                    <span>Desde ${{ marca.precioMinimo.toLocaleString() }}</span>
                    <span class="text-green-600 font-medium">En stock</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Paginación -->
          <div class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                Anterior
              </button>
              <button class="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
              <button class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
              <button class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
              <button class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Siguiente
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- SEO Content -->
    <section class="bg-white py-12 mt-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Repuestos Originales en Chile</h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En AutoPiezas360 Chile encontrarás la más amplia gama de repuestos para todas las marcas de vehículos con importación directa. 
            Trabajamos directamente con fabricantes para garantizar autopartes de calidad con hasta 50% de descuento.
          </p>
          <p class="text-gray-600 mb-4">
            Nuestro catálogo incluye {{ marcas.length }} marcas: Toyota, Nissan, Chevrolet, BMW, Hyundai, Ford, Volkswagen, Honda, Mazda, Kia 
            y muchas más. Todos nuestros repuestos cuentan con garantía extendida y entrega en 7 días a todo Chile.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Stock inmediato en Santiago y regiones</li>
            <li>Garantía extendida en todos los repuestos</li>
            <li>Envío gratis en compras superiores a $50.000</li>
            <li>Atención especializada por técnicos certificados</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

  // Datos de marcas para SEO - Ordenadas alfabéticamente (74 marcas)
  const marcas = [
    { nombre: 'ABARTH', slug: 'abarth', modelos: 4, categorias: ['Motor', 'Frenos', 'Deportivo'], precioMinimo: 45000 },
    { nombre: 'ACURA', slug: 'acura', modelos: 8, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 40000 },
    { nombre: 'ALFA-ROMEO', slug: 'alfa-romeo', modelos: 6, categorias: ['Motor', 'Frenos', 'Deportivo'], precioMinimo: 42000 },
    { nombre: 'ASTON-MARTIN', slug: 'aston-martin', modelos: 3, categorias: ['Motor', 'Frenos', 'Lujo', 'Deportivo'], precioMinimo: 120000 },
    { nombre: 'AUDI', slug: 'audi', modelos: 16, categorias: ['Motor', 'Frenos', 'Eléctrico', 'Lujo'], precioMinimo: 38000 },
    { nombre: 'BENTLEY', slug: 'bentley', modelos: 4, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 150000 },
    { nombre: 'BMW', slug: 'bmw', modelos: 12, categorias: ['Motor', 'Frenos', 'Eléctrico', 'Lujo'], precioMinimo: 35000 },
    { nombre: 'BUICK', slug: 'buick', modelos: 6, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 32000 },
    { nombre: 'BYD', slug: 'byd', modelos: 5, categorias: ['Motor', 'Eléctrico', 'Híbrido'], precioMinimo: 28000 },
    { nombre: 'CADILLAC', slug: 'cadillac', modelos: 8, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 45000 },
    { nombre: 'CHANGAN', slug: 'changan', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 22000 },
    { nombre: 'CHEVROLET', slug: 'chevrolet', modelos: 22, categorias: ['Motor', 'Frenos', 'Transmisión'], precioMinimo: 12000 },
    { nombre: 'CHRYSLER', slug: 'chrysler', modelos: 7, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 35000 },
    { nombre: 'CITROEN', slug: 'citroen', modelos: 9, categorias: ['Motor', 'Frenos', 'Suspensión'], precioMinimo: 25000 },
    { nombre: 'DAEWOO', slug: 'daewoo', modelos: 5, categorias: ['Motor', 'Frenos'], precioMinimo: 18000 },
    { nombre: 'DAIHATSU', slug: 'daihatsu', modelos: 6, categorias: ['Motor', 'Frenos'], precioMinimo: 16000 },
    { nombre: 'DODGE', slug: 'dodge', modelos: 10, categorias: ['Motor', 'Frenos', 'Deportivo'], precioMinimo: 30000 },
    { nombre: 'FERRARI', slug: 'ferrari', modelos: 2, categorias: ['Motor', 'Frenos', 'Deportivo', 'Lujo'], precioMinimo: 200000 },
    { nombre: 'FIAT', slug: 'fiat', modelos: 8, categorias: ['Motor', 'Frenos'], precioMinimo: 20000 },
    { nombre: 'FORD', slug: 'ford', modelos: 20, categorias: ['Motor', 'Frenos', 'Suspensión', 'Transmisión'], precioMinimo: 16000 },
    { nombre: 'FOTON', slug: 'foton', modelos: 3, categorias: ['Motor', 'Frenos', 'Comercial'], precioMinimo: 35000 },
    { nombre: 'GEELY', slug: 'geely', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 24000 },
    { nombre: 'GMC', slug: 'gmc', modelos: 8, categorias: ['Motor', 'Frenos', 'Pickup'], precioMinimo: 40000 },
    { nombre: 'HONDA', slug: 'honda', modelos: 16, categorias: ['Motor', 'Frenos', 'Suspensión'], precioMinimo: 17000 },
    { nombre: 'HUMMER', slug: 'hummer', modelos: 3, categorias: ['Motor', 'Frenos', '4x4'], precioMinimo: 80000 },
    { nombre: 'HYUNDAI', slug: 'hyundai', modelos: 15, categorias: ['Motor', 'Frenos', 'Carrocería'], precioMinimo: 14000 },
    { nombre: 'INFINITI', slug: 'infiniti', modelos: 7, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 42000 },
    { nombre: 'ISUZU', slug: 'isuzu', modelos: 5, categorias: ['Motor', 'Frenos', 'Comercial'], precioMinimo: 38000 },
    { nombre: 'IVECO', slug: 'iveco', modelos: 4, categorias: ['Motor', 'Frenos', 'Comercial'], precioMinimo: 45000 },
    { nombre: 'JAC', slug: 'jac', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 26000 },
    { nombre: 'JAGUAR', slug: 'jaguar', modelos: 6, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 65000 },
    { nombre: 'JEEP', slug: 'jeep', modelos: 8, categorias: ['Motor', 'Frenos', '4x4'], precioMinimo: 45000 },
    { nombre: 'KIA', slug: 'kia', modelos: 13, categorias: ['Motor', 'Frenos', 'Suspensión'], precioMinimo: 13000 },
    { nombre: 'LADA', slug: 'lada', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 15000 },
    { nombre: 'LAMBORGHINI', slug: 'lamborghini', modelos: 2, categorias: ['Motor', 'Frenos', 'Deportivo', 'Lujo'], precioMinimo: 250000 },
    { nombre: 'LAND-ROVER', slug: 'land-rover', modelos: 6, categorias: ['Motor', 'Frenos', '4x4', 'Lujo'], precioMinimo: 75000 },
    { nombre: 'LEXUS', slug: 'lexus', modelos: 10, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 55000 },
    { nombre: 'LINCOLN', slug: 'lincoln', modelos: 6, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 48000 },
    { nombre: 'LOTUS', slug: 'lotus', modelos: 3, categorias: ['Motor', 'Frenos', 'Deportivo'], precioMinimo: 90000 },
    { nombre: 'MASERATI', slug: 'maserati', modelos: 4, categorias: ['Motor', 'Frenos', 'Lujo', 'Deportivo'], precioMinimo: 110000 },
    { nombre: 'MAYBACH', slug: 'maybach', modelos: 2, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 180000 },
    { nombre: 'MAZDA', slug: 'mazda', modelos: 10, categorias: ['Motor', 'Frenos', 'Carrocería'], precioMinimo: 19000 },
    { nombre: 'MCLAREN', slug: 'mclaren', modelos: 2, categorias: ['Motor', 'Frenos', 'Deportivo'], precioMinimo: 300000 },
    { nombre: 'MERCEDES-BENZ', slug: 'mercedes-benz', modelos: 18, categorias: ['Motor', 'Frenos', 'Eléctrico', 'Lujo'], precioMinimo: 50000 },
    { nombre: 'MG', slug: 'mg', modelos: 5, categorias: ['Motor', 'Frenos'], precioMinimo: 29000 },
    { nombre: 'MINI', slug: 'mini', modelos: 6, categorias: ['Motor', 'Frenos', 'Compacto'], precioMinimo: 32000 },
    { nombre: 'MITSUBISHI', slug: 'mitsubishi', modelos: 12, categorias: ['Motor', 'Frenos', '4x4'], precioMinimo: 28000 },
    { nombre: 'NISSAN', slug: 'nissan', modelos: 18, categorias: ['Motor', 'Frenos', 'Suspensión'], precioMinimo: 18000 },
    { nombre: 'OLDSMOBILE', slug: 'oldsmobile', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 25000 },
    { nombre: 'OPEL', slug: 'opel', modelos: 9, categorias: ['Motor', 'Frenos'], precioMinimo: 26000 },
    { nombre: 'PEUGEOT', slug: 'peugeot', modelos: 11, categorias: ['Motor', 'Frenos', 'Suspensión'], precioMinimo: 27000 },
    { nombre: 'PLYMOUTH', slug: 'plymouth', modelos: 3, categorias: ['Motor', 'Frenos'], precioMinimo: 22000 },
    { nombre: 'PONTIAC', slug: 'pontiac', modelos: 5, categorias: ['Motor', 'Frenos'], precioMinimo: 24000 },
    { nombre: 'PORSCHE', slug: 'porsche', modelos: 8, categorias: ['Motor', 'Frenos', 'Deportivo', 'Lujo'], precioMinimo: 85000 },
    { nombre: 'RENAULT', slug: 'renault', modelos: 10, categorias: ['Motor', 'Frenos'], precioMinimo: 23000 },
    { nombre: 'ROLLS-ROYCE', slug: 'rolls-royce', modelos: 3, categorias: ['Motor', 'Frenos', 'Lujo'], precioMinimo: 300000 },
    { nombre: 'ROVER', slug: 'rover', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 30000 },
    { nombre: 'SAAB', slug: 'saab', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 35000 },
    { nombre: 'SATURN', slug: 'saturn', modelos: 3, categorias: ['Motor', 'Frenos'], precioMinimo: 20000 },
    { nombre: 'SCION', slug: 'scion', modelos: 4, categorias: ['Motor', 'Frenos'], precioMinimo: 25000 },
    { nombre: 'SEAT', slug: 'seat', modelos: 8, categorias: ['Motor', 'Frenos'], precioMinimo: 24000 },
    { nombre: 'SHELBY', slug: 'shelby', modelos: 2, categorias: ['Motor', 'Frenos', 'Deportivo'], precioMinimo: 120000 },
    { nombre: 'SKODA', slug: 'skoda', modelos: 9, categorias: ['Motor', 'Frenos'], precioMinimo: 26000 },
    { nombre: 'SMART', slug: 'smart', modelos: 4, categorias: ['Motor', 'Frenos', 'Compacto'], precioMinimo: 28000 },
    { nombre: 'SSANGYONG', slug: 'ssangyong', modelos: 5, categorias: ['Motor', 'Frenos', 'SUV'], precioMinimo: 32000 },
    { nombre: 'SUBARU', slug: 'subaru', modelos: 6, categorias: ['Motor', 'Transmisión', '4x4'], precioMinimo: 25000 },
    { nombre: 'SUZUKI', slug: 'suzuki', modelos: 8, categorias: ['Motor', 'Frenos'], precioMinimo: 11000 },
    { nombre: 'TESLA', slug: 'tesla', modelos: 6, categorias: ['Motor', 'Eléctrico', 'Tecnología'], precioMinimo: 65000 },
    { nombre: 'TOYOTA', slug: 'toyota', modelos: 25, categorias: ['Motor', 'Frenos', 'Suspensión', 'Eléctrico'], precioMinimo: 15000 },
    { nombre: 'TRIUMPH', slug: 'triumph', modelos: 3, categorias: ['Motor', 'Frenos'], precioMinimo: 45000 },
    { nombre: 'UAZ', slug: 'uaz', modelos: 3, categorias: ['Motor', 'Frenos', '4x4'], precioMinimo: 38000 },
    { nombre: 'VESPA', slug: 'vespa', modelos: 4, categorias: ['Motor', 'Frenos', 'Motocicleta'], precioMinimo: 12000 },
    { nombre: 'VOLKSWAGEN', slug: 'volkswagen', modelos: 14, categorias: ['Motor', 'Frenos', 'Eléctrico'], precioMinimo: 20000 },
    { nombre: 'VOLVO', slug: 'volvo', modelos: 11, categorias: ['Motor', 'Frenos', 'Seguridad'], precioMinimo: 42000 }
  ]

// Variables reactivas para filtros
const searchMarca = ref('')

// Computed para marcas filtradas
const marcasFiltradas = computed(() => {
  if (!searchMarca.value) return marcas
  
  return marcas.filter(marca => 
    marca.nombre.toLowerCase().includes(searchMarca.value.toLowerCase())
  )
})

// Función para seleccionar marca
const selectMarca = (marca) => {
  // Aquí podrías agregar lógica adicional si necesitas
  console.log('Marca seleccionada:', marca.nombre)
}

// SEO Meta dinámico
useHead({
  title: 'Repuestos por Marca - AutoPiezas360 Chile | Catálogo Completo 50% Descuento',
  meta: [
    { name: 'description', content: `Catálogo completo de repuestos por marca en Chile. ${marcas.length} marcas disponibles: Toyota, Nissan, Chevrolet, BMW, Hyundai y más. Importación directa con 50% descuento.` },
    { name: 'keywords', content: 'repuestos por marca chile, catálogo repuestos autos, repuestos importados chile, autopartes por marca, repuestos descuento' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Repuestos por Marca Chile - 50% Descuento | AutoPiezas360' },
    { property: 'og:description', content: `${marcas.length} marcas disponibles con importación directa y 50% descuento. Toyota, Nissan, BMW, Chevrolet y más.` },
    { property: 'og:url', content: 'https://autopiezas360.cl/repuestos' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'canonical', href: 'https://autopiezas360.cl/repuestos' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Repuestos por Marca AutoPiezas360",
        "description": `Catálogo completo de repuestos automotrices por marca con ${marcas.length} marcas disponibles`,
        "url": "https://autopiezas360.cl/repuestos",
        "mainEntity": {
          "@type": "ItemList",
          "name": "Marcas de Vehículos",
          "numberOfItems": marcas.length,
          "itemListElement": marcas.slice(0, 20).map((marca, index) => ({
            "@type": "Brand",
            "position": index + 1,
            "name": marca.nombre,
            "url": `https://autopiezas360.cl/repuestos/${marca.slug}`
          }))
        }
      })
    }
  ]
})
</script>
