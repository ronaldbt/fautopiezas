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

    <!-- Loading State -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Cargando repuesto...</p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="text-red-600 text-6xl mb-4">⚠️</div>
        <h2 class="text-xl font-bold text-red-800 mb-2">Error al cargar el repuesto</h2>
        <p class="text-red-600">{{ error }}</p>
      </div>
    </div>

    <!-- Información del repuesto -->
    <div v-else-if="repuestoData" class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Imagen del repuesto -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              v-if="repuestoData.imagen" 
              :src="repuestoData.imagen" 
              :alt="repuestoData.nombre"
              class="w-full h-full object-cover"
            >
            <div v-else class="text-center">
              <div class="text-6xl mb-4">🔧</div>
              <p class="text-gray-600">Imagen del repuesto</p>
            </div>
          </div>
          
          <!-- Galería de imágenes si existe -->
          <div v-if="repuestoData.imagenes && repuestoData.imagenes.length > 1" class="mt-4 grid grid-cols-4 gap-2">
            <img 
              v-for="(imagen, index) in repuestoData.imagenes.slice(0, 4)" 
              :key="index"
              :src="imagen" 
              :alt="`${repuestoData.nombre} ${index + 1}`"
              class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
            >
          </div>
        </div>

        <!-- Detalles del repuesto -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ repuestoData.nombre }}</h2>
          
          <!-- Descripción -->
          <p class="text-gray-600 mb-4">{{ repuestoData.descripcion }}</p>
          
          <!-- Precio -->
          <div class="mb-6">
            <div class="flex items-baseline space-x-2">
              <span class="text-3xl font-bold text-green-600">${{ repuestoData.precio.toLocaleString() }}</span>
              <span class="text-sm text-gray-600">CLP</span>
            </div>
            <div v-if="repuestoData.precioOriginal && repuestoData.descuento" class="flex items-center space-x-2 mt-1">
              <span class="text-lg text-gray-500 line-through">${{ repuestoData.precioOriginal.toLocaleString() }}</span>
              <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                -{{ repuestoData.descuento }}%
              </span>
            </div>
          </div>

          <!-- Stock -->
          <div class="mb-6">
            <span v-if="repuestoData.stock" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✓ En Stock - {{ repuestoData.cantidad || 'Disponible' }}
            </span>
            <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              ✗ Agotado
            </span>
          </div>

          <!-- Código OEM -->
          <div v-if="repuestoData.codigoOEM" class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-1">Código OEM</h3>
            <p class="text-lg font-mono text-gray-800">{{ repuestoData.codigoOEM }}</p>
          </div>

          <!-- Características -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Características</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Repuesto 100% original {{ marcaCapitalizada }}</li>
              <li>• Compatible con {{ modeloCapitalizado }} {{ año }}</li>
              <li v-if="repuestoData.garantia">• Garantía de {{ repuestoData.garantia }} meses</li>
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
    <section v-if="repuestoData" class="bg-white py-12">
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
              <li v-if="repuestoData.codigoOEM"><strong>Código OEM:</strong> {{ repuestoData.codigoOEM }}</li>
              <li v-if="repuestoData.marcaRepuesto"><strong>Marca del Repuesto:</strong> {{ repuestoData.marcaRepuesto }}</li>
              <li v-if="repuestoData.peso"><strong>Peso:</strong> {{ repuestoData.peso }} kg</li>
              <li v-if="repuestoData.dimensiones">
                <strong>Dimensiones:</strong> 
                {{ repuestoData.dimensiones.largo }} x {{ repuestoData.dimensiones.ancho }} x {{ repuestoData.dimensiones.alto }} cm
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Garantía y Servicios</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• Garantía oficial {{ marcaCapitalizada }}</li>
              <li v-if="repuestoData.garantia">• {{ repuestoData.garantia }} meses de cobertura</li>
              <li v-else>• 12 meses de cobertura</li>
              <li>• Instalación incluida</li>
              <li>• Soporte técnico especializado</li>
              <li>• Envío gratis en compras superiores a $50.000</li>
            </ul>
          </div>
        </div>

        <!-- Características técnicas adicionales -->
        <div v-if="repuestoData.caracteristicas" class="mt-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Características Técnicas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(valor, clave) in repuestoData.caracteristicas" :key="clave" 
                 class="bg-gray-50 p-3 rounded-lg">
              <span class="text-sm font-medium text-gray-700 capitalize">{{ clave.replace(/([A-Z])/g, ' $1') }}:</span>
              <span class="text-sm text-gray-600 ml-1">{{ valor }}</span>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="repuestoData.tags && repuestoData.tags.length" class="mt-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Etiquetas</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in repuestoData.tags" :key="tag" 
                  class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {{ tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Repuestos relacionados -->
    <section v-if="repuestosRelacionados.length > 0" class="bg-gray-50 py-12">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Repuestos Relacionados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RepuestoCard 
            v-for="repuestoRel in repuestosRelacionados" 
            :key="repuestoRel.id"
            :repuesto="repuestoRel"
          />
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
import { ref, onMounted } from 'vue'

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

// Variables reactivas
const repuestoData = ref(null)
const loading = ref(true)
const error = ref(null)

// Composables
const { getRepuestoBySlug, getRepuestosRelacionados } = useRepuestos()

// Cargar datos del repuesto
onMounted(async () => {
  try {
    loading.value = true
    
    // Buscar repuesto por slug
    const repuestoEncontrado = await getRepuestoBySlug(String(repuesto))
    
    if (repuestoEncontrado) {
      repuestoData.value = repuestoEncontrado
    } else {
      // Si no se encuentra en Firebase, usar datos de ejemplo
      repuestoData.value = {
        id: 'ejemplo',
        nombre: repuestoCapitalizado,
        descripcion: `Repuesto original ${marcaCapitalizada} ${modeloCapitalizado} ${año}`,
        precio: 85000,
        precioOriginal: 100000,
        descuento: 15,
        stock: true,
        cantidad: 5,
        codigoOEM: `${String(marca).toUpperCase()}-${String(repuesto).toUpperCase()}-${año}`,
        marca: String(marca),
        modelo: String(modelo),
        anio: parseInt(String(año)),
        categoria: String(categoria),
        garantia: 12,
        peso: 1.5,
        dimensiones: {
          largo: 10,
          ancho: 8,
          alto: 5
        },
        caracteristicas: {
          material: 'Acero inoxidable',
          color: 'Gris metálico',
          origen: 'Original'
        },
        tags: ['original', 'garantia', 'envio-gratis'],
        activo: true,
        destacado: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: String(repuesto),
        searchTerms: [repuesto, marca, modelo, año, categoria]
      }
    }
  } catch (err) {
    console.error('Error cargando repuesto:', err)
    error.value = 'Error al cargar el repuesto'
  } finally {
    loading.value = false
  }
})

// Repuestos relacionados
const repuestosRelacionados = ref([])

// Cargar repuestos relacionados
onMounted(async () => {
  if (repuestoData.value) {
    try {
      repuestosRelacionados.value = await getRepuestosRelacionados(repuestoData.value, 4)
    } catch (err) {
      console.error('Error cargando repuestos relacionados:', err)
    }
  }
})

// SEO Meta dinámico por repuesto específico
useHead({
  title: `${repuestoCapitalizado} ${marcaCapitalizada} ${modeloCapitalizado} ${año} - Original | FAutopiezas`,
  meta: [
    { name: 'description', content: `${repuestoCapitalizado} original ${marcaCapitalizada} ${modeloCapitalizado} ${año} en Chile. Stock inmediato, garantía extendida, envío gratis. Repuesto original con código ${repuestoData.value?.codigoOEM || 'N/A'}.` },
    { name: 'keywords', content: `${repuesto} ${marca} ${modelo} ${año}, ${repuesto} original ${marca} ${modelo}, ${repuesto} ${marca} ${modelo} ${año} precio, ${repuesto} ${marca} ${modelo} chile` }
  ]
})
</script>

