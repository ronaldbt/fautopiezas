<template>
  <div>
    <!-- Breadcrumbs -->
    <div class="bg-white border-b">
      <div class="max-w-6xl mx-auto px-4">
        <Breadcrumbs :items="breadcrumbItems" />
      </div>
    </div>

    <!-- Hero Section FAutopiezas -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold mb-6">
          Repuestos para Autos en Chile - FAutopiezas
        </h1>
        <p class="text-xl mb-4">
          <strong>Stock inmediato</strong> de repuestos originales para Toyota, Nissan, Chevrolet, BMW, Hyundai y 74+ marcas. 
        </p>
        <p class="text-lg mb-8 opacity-90">
          Envío gratis en compras sobre $50.000 • Garantía extendida • Los mejores precios de Chile
        </p>
        <!-- Búsqueda por Vehículo Específico -->
        <div class="bg-white rounded-xl p-6 mx-auto max-w-4xl mb-8 shadow-lg">
          <h2 class="text-xl font-bold text-gray-800 mb-4 text-center">🔍 Buscar Repuestos por Vehículo</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <!-- Selector de Marca -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Marca</label>
              <select 
                v-model="selectedMarca"
                @change="onMarcaChange"
                class="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm hover:border-gray-400 transition-colors"
              >
                <option value="">Seleccionar marca</option>
                <option v-for="marca in searchMarcas" :key="marca.slug" :value="marca.slug">
                  {{ marca.nombre }}
                </option>
              </select>
            </div>
            
            <!-- Selector de Modelo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
              <select 
                v-model="selectedModelo"
                @change="onModeloChange"
                :disabled="!selectedMarca"
                class="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm hover:border-gray-400 transition-colors disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed"
              >
                <option value="">Seleccionar modelo</option>
                <option v-for="modelo in availableModelos" :key="modelo" :value="modelo">
                  {{ modelo }}
                </option>
              </select>
            </div>
            
            <!-- Selector de Año -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Año</label>
              <select 
                v-model="selectedAno"
                :disabled="!selectedModelo"
                class="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm hover:border-gray-400 transition-colors disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed"
              >
                <option value="">Seleccionar año</option>
                <option v-for="ano in availableAnos" :key="ano" :value="ano">
                  {{ ano }}
                </option>
              </select>
            </div>
            
            <!-- Botón de Búsqueda -->
            <div class="flex items-end">
              <button 
                @click="buscarRepuestos"
                :disabled="!selectedMarca || !selectedModelo || !selectedAno"
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Buscar Repuestos
              </button>
            </div>
          </div>
          
          <!-- Mensaje de resultado -->
          <div v-if="searchMessage" class="text-center text-sm text-gray-600 mb-4">
            {{ searchMessage }}
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/repuestos" class="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Ver Catálogo Completo
          </NuxtLink>
          <NuxtLink to="/repuestos/toyota" class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Repuestos Toyota
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Marcas Principales -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          Repuestos por Marca Automotriz
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          <div v-for="marca in getMarcasPopulares()" :key="marca.slug" 
               class="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow">
            <NuxtLink :to="`/repuestos/${marca.slug}`" class="block">
              <h3 class="font-bold text-sm text-blue-600 mb-1">
                {{ marca.nombre }}
              </h3>
              <p class="text-xs text-gray-600 mb-1">
                {{ marca.modelos }}+ modelos
              </p>
              <p class="text-xs text-green-600 font-semibold mb-1">
                Desde ${{ marca.precioMin?.toLocaleString() || '15.000' }}
              </p>
              <p class="text-xs text-gray-500">
                Ver repuestos →
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías de Repuestos -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          Categorías de Repuestos
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="categoria in categorias" :key="categoria.slug" 
               class="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
            <div class="text-4xl mb-4">{{ categoria.icono }}</div>
            <h3 class="font-semibold text-lg text-gray-800 mb-2">
              {{ categoria.nombre }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ categoria.descripcion }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de contenido SEO rich -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">
          ¿Por Qué Elegir FAutopiezas Chile?
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-bold text-blue-600 mb-4">✅ Repuestos 100% Originales</h3>
            <p class="text-gray-700">
              Trabajamos directamente con distribuidores oficiales de Toyota, Nissan, Chevrolet, BMW, Hyundai y más de 70 marcas. 
              Todos nuestros repuestos son originales con garantía de fábrica.
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-bold text-blue-600 mb-4">🚚 Envío Gratis a Todo Chile</h3>
            <p class="text-gray-700">
              Envío gratuito en compras superiores a $50.000 pesos. Despacho el mismo día en Santiago, 
              y entrega en 24-48 horas en regiones. Cobertura desde Arica a Punta Arenas.
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-bold text-blue-600 mb-4">📦 Stock Inmediato</h3>
            <p class="text-gray-700">
              Mantenemos inventario permanente de más de 50.000 referencias diferentes. 
              Los repuestos más solicitados siempre disponibles para entrega inmediata.
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-bold text-blue-600 mb-4">🛡️ Garantía Extendida</h3>
            <p class="text-gray-700">
              Garantía de 12 meses en repuestos de motor, 6 meses en frenos y suspensión. 
              Soporte técnico especializado y cambio inmediato en caso de defecto de fábrica.
            </p>
          </div>
        </div>

        <!-- Contenido SEO para palabras clave long-tail -->
        <div class="bg-white rounded-lg p-8 shadow-md">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Repuestos Automotrices en Chile - Catálogo Completo</h3>
          
          <div class="prose max-w-none text-gray-700">
            <p class="mb-4">
              <strong>FAutopiezas Chile</strong> es la tienda de repuestos automotrices líder en Chile, especializada en autopartes originales 
              para todas las marcas de vehículos. Nuestro catálogo incluye repuestos para <strong>Toyota Chile</strong>, 
              <strong>Nissan Chile</strong>, <strong>Chevrolet Chile</strong>, <strong>BMW Chile</strong>, <strong>Hyundai Chile</strong>, 
              <strong>Ford Chile</strong>, <strong>Volkswagen Chile</strong>, <strong>Honda Chile</strong>, <strong>Mazda Chile</strong>, 
              <strong>Kia Chile</strong> y más de 65 marcas adicionales.
            </p>
            
            <h4 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Repuestos por Categoría</h4>
            <p class="mb-4">
              Encuentra <strong>repuestos de motor</strong> (cigueñal, pistones, válvulas, juntas), <strong>repuestos de frenos</strong> 
              (pastillas, discos, tambores, líquido), <strong>repuestos de suspensión</strong> (amortiguadores, muelles, rotulas), 
              <strong>repuestos eléctricos</strong> (alternador, motor de arranque, batería), y <strong>repuestos de carrocería</strong> 
              (parachoques, puertas, espejos, luces).
            </p>
            
            <h4 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Cobertura Nacional</h4>
            <p class="mb-4">
              Realizamos envíos de <strong>autopartes a todo Chile</strong>: Santiago, Valparaíso, Viña del Mar, Concepción, 
              La Serena, Antofagasta, Temuco, Valdivia, Puerto Montt, Iquique, Arica, Copiapó, Talca, Chillán, 
              Los Ángeles, Osorno, Calama, Rancagua, Quilpué, Villa Alemana y todas las ciudades de Chile.
            </p>
            
            <div class="grid md:grid-cols-3 gap-4 mt-8 text-sm">
              <div>
                <h5 class="font-semibold text-gray-800 mb-2">Marcas Populares:</h5>
                <ul class="space-y-1 text-gray-600">
                  <li>• Repuestos Toyota Chile</li>
                  <li>• Repuestos Nissan Chile</li>
                  <li>• Repuestos Chevrolet Chile</li>
                  <li>• Repuestos BMW Chile</li>
                  <li>• Repuestos Hyundai Chile</li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-gray-800 mb-2">Categorías Principales:</h5>
                <ul class="space-y-1 text-gray-600">
                  <li>• Repuestos de Motor</li>
                  <li>• Repuestos de Frenos</li>
                  <li>• Repuestos de Suspensión</li>
                  <li>• Repuestos Eléctricos</li>
                  <li>• Repuestos de Carrocería</li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-gray-800 mb-2">Servicios:</h5>
                <ul class="space-y-1 text-gray-600">
                  <li>• Envío Gratis sobre $50.000</li>
                  <li>• Entrega en 24-48 horas</li>
                  <li>• Garantía hasta 12 meses</li>
                  <li>• Asesoría técnica especializada</li>
                  <li>• Repuestos 100% originales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Usar el composable para obtener las marcas
const { getMarcas, getMarcasPopulares, getModelosByMarca } = useVehiculos()

// Obtener todas las marcas del JSON
const marcasPrincipales = getMarcas()

// Categorías de repuestos (basadas en la imagen proporcionada)
const categorias = [
  { nombre: 'Motor', slug: 'motor', icono: '🔧', descripcion: 'Cigueñal, pistones, válvulas, juntas' },
  { nombre: 'Filtros', slug: 'filtros', icono: '🌀', descripcion: 'Filtro aire, aceite, combustible' },
  { nombre: 'Frenos', slug: 'frenos', icono: '🛑', descripcion: 'Pastillas, discos, tambores, líquido' },
  { nombre: 'Suspensión', slug: 'suspension', icono: '⚡', descripcion: 'Amortiguadores, muelles, rotulas' },
  { nombre: 'Dirección', slug: 'direccion', icono: '🎯', descripcion: 'Cremallera, bomba, terminales' },
  { nombre: 'Transmisión', slug: 'transmision', icono: '⚙️', descripcion: 'Embrague, caja cambios, diferencial' },
  { nombre: 'Eléctrico', slug: 'electrico', icono: '⚡', descripcion: 'Alternador, motor arranque, batería' },
  { nombre: 'Escape', slug: 'escape', icono: '💨', descripcion: 'Catalizador, silenciador, tubo' },
  { nombre: 'Refrigeración', slug: 'refrigeracion', icono: '❄️', descripcion: 'Radiador, termostato, bomba agua' },
  { nombre: 'Carrocería', slug: 'carroceria', icono: '🚗', descripcion: 'Parachoques, puertas, espejos' },
  { nombre: 'Correas', slug: 'correas', icono: '🔗', descripcion: 'Correa tiempo, accesorios, distribución' },
  { nombre: 'Iluminación', slug: 'iluminacion', icono: '💡', descripcion: 'Focos, faros, intermitentes' }
]

// Variables reactivas para búsqueda
const selectedMarca = ref('')
const selectedModelo = ref('')
const selectedAno = ref('')
const searchMessage = ref('')

// Usar todas las marcas para búsqueda
const searchMarcas = marcasPrincipales

// Años disponibles (2000-2024)
const availableAnos = Array.from({length: 25}, (_, i) => 2024 - i)

// Computed para modelos disponibles según marca seleccionada
const availableModelos = ref([])

// Cargar modelos cuando se selecciona una marca
const onMarcaChange = async () => {
  selectedModelo.value = ''
  selectedAno.value = ''
  searchMessage.value = ''
  
  if (selectedMarca.value) {
    try {
      const modelos = await getModelosByMarca(selectedMarca.value)
      availableModelos.value = modelos.map(modelo => modelo.nombre)
    } catch (error) {
      console.error('Error cargando modelos:', error)
      availableModelos.value = []
    }
  } else {
    availableModelos.value = []
  }
}

// Funciones de manejo de búsqueda

const onModeloChange = () => {
  selectedAno.value = ''
  searchMessage.value = ''
}

const buscarRepuestos = () => {
  if (selectedMarca.value && selectedModelo.value && selectedAno.value) {
    searchMessage.value = `Buscando repuestos para ${selectedMarca.value.toUpperCase()} ${selectedModelo.value} ${selectedAno.value}...`
    
    // Simular búsqueda y redirigir
    setTimeout(() => {
      // Convertir nombre del modelo a slug
      const modeloSlug = selectedModelo.value.toLowerCase().replace(/\s+/g, '-')
      const url = `/repuestos/${selectedMarca.value}/${modeloSlug}/${selectedAno.value}`
      navigateTo(url)
    }, 1000)
  }
}

// Breadcrumbs para homepage
const breadcrumbItems = [
  { name: 'Repuestos para Autos', url: '/', isLast: true }
]

// SEO Meta para homepage
useHead({
  title: 'FAutopiezas Chile - Repuestos para Autos | Stock Inmediato',
  meta: [
    { name: 'description', content: 'Repuestos originales Toyota, Nissan, Chevrolet, BMW en Chile. Stock inmediato, envío gratis, garantía extendida. ¡Los mejores precios del mercado!' },
    { name: 'keywords', content: 'repuestos autos chile, autopartes chile, repuestos toyota chile, repuestos nissan chile, repuestos chevrolet chile, repuestos bmw chile' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AutoPartsStore",
        "name": "FAutopiezas Chile",
        "description": "Tienda de repuestos automotrices en Chile. Stock inmediato de autopartes originales para todas las marcas de vehículos.",
        "url": "https://fautopiezas.cl",
        "telephone": "+56-2-1234-5678",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Providencia 1234",
          "addressLocality": "Santiago",
          "addressRegion": "Región Metropolitana",
          "postalCode": "7500000",
          "addressCountry": "CL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -33.4489,
          "longitude": -70.6693
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "14:00"
          }
        ],
        "currenciesAccepted": "CLP",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "priceRange": "$15000-$500000",
        "servesCuisine": null,
        "areaServed": {
          "@type": "Country",
          "name": "Chile"
        },
        "brand": [
          { "@type": "Brand", "name": "Toyota" },
          { "@type": "Brand", "name": "Nissan" },
          { "@type": "Brand", "name": "Chevrolet" },
          { "@type": "Brand", "name": "BMW" },
          { "@type": "Brand", "name": "Hyundai" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Catálogo de Repuestos FAutopiezas",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Repuestos de Motor",
                "category": "Automotive Parts"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Repuestos de Frenos",
                "category": "Automotive Parts"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Repuestos de Suspensión",
                "category": "Automotive Parts"
              }
            }
          ]
        }
      })
    }
  ]
})
</script>
