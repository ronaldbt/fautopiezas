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
        <NuxtLink 
          :to="`/repuestos/${marca}/${modelo}/${año}/${categoria}`" 
          class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Volver a la lista
        </NuxtLink>
      </div>
    </div>

    <!-- Estado: No encontrado -->
    <div v-else-if="!loading && !repuestoData" class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <div class="text-yellow-600 text-6xl mb-4">🔍</div>
        <h2 class="text-xl font-bold text-yellow-800 mb-2">Repuesto no encontrado</h2>
        <p class="text-yellow-700 mb-4">No se pudo encontrar el repuesto solicitado.</p>
        <NuxtLink 
          :to="`/repuestos/${marca}/${modelo}/${año}/${categoria}`" 
          class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Volver a la lista de repuestos
        </NuxtLink>
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
            <div v-if="repuestoData.precio" class="flex items-baseline space-x-2">
              <span class="text-3xl font-bold text-green-600">${{ repuestoData.precio.toLocaleString() }}</span>
              <span class="text-sm text-gray-600">CLP</span>
            </div>
            <div v-else class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div class="flex items-center space-x-2">
                <span class="text-orange-600 text-xl">📋</span>
                <div>
                  <h3 class="text-lg font-semibold text-orange-800">¡Tu repuesto llega en 7 días!</h3>
                  <p class="text-orange-700 text-sm">Como somos especialistas en <strong>importación directa</strong>, no tenemos este repuesto en stock, pero podemos conseguirlo para ti.</p>
                </div>
              </div>
            </div>
            <div v-if="repuestoData.precioOriginal && repuestoData.descuento" class="flex items-center space-x-2 mt-1">
              <span class="text-lg text-gray-500 line-through">${{ repuestoData.precioOriginal.toLocaleString() }}</span>
              <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                -{{ repuestoData.descuento }}%
              </span>
            </div>
          </div>

          <!-- Stock e Importación -->
          <div class="mb-6">
            <span v-if="repuestoData.stock" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✓ En Stock - {{ repuestoData.cantidad || 'Disponible' }}
            </span>
            <div v-else class="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 class="text-green-800 font-semibold mb-2">🚚 Importación Express</h4>
              <ul class="text-green-700 text-sm space-y-1">
                <li>✅ Llegada garantizada en 7 días a tu casa o taller</li>
                <li>✅ En promedio se puede ahorrar un 50% importando el producto</li>
                <li>✅ Envío a todas las ciudades de Chile</li>
              </ul>
            </div>
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

          <!-- Botones de acción -->
          <div class="space-y-3">
            <button 
              v-if="repuestoData.stock && repuestoData.precio" 
              @click="agregarAlCarritoYComprar"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Comprar Ahora - ${{ repuestoData.precio.toLocaleString() }}
            </button>
            <button 
              v-if="repuestoData.stock && repuestoData.precio" 
              @click="agregarAlCarrito"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <ShoppingCartIcon class="w-5 h-5" />
              <span>Agregar al Carrito</span>
            </button>
            <div v-else class="space-y-2">
              <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <span>💬</span>
                <span>Consultar por WhatsApp</span>
              </button>
              <div class="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <span>📅</span>
                <span>Respuesta inmediata</span>
                <span>•</span>
                <span>🕒</span>
                <span>Horario: Lunes a Viernes 9:00 - 18:00</span>
              </div>
            </div>
            <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
              Ver otras categorías disponibles
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
    <section v-if="repuestoData" class="bg-gray-50 py-12">
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
            <li v-if="repuestoData.codigoOEM || repuestoData.codigoOriginal">
              Repuesto original {{ marcaCapitalizada }} con código {{ repuestoData.codigoOEM || repuestoData.codigoOriginal }}
            </li>
            <li v-else>Repuesto original {{ marcaCapitalizada }}</li>
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
import { ref, computed, onMounted } from 'vue'
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'

// Debug: Verificar que esta página se está cargando
console.log('🔵 [Página Detalles] Componente montado')
console.log('🔵 [Página Detalles] Ruta completa:', useRoute().path)
console.log('🔵 [Página Detalles] Parámetros:', useRoute().params)

// Obtener parámetros de la URL de forma estable
const route = useRoute()
const marca = computed(() => String(route.params.marca))
const modelo = computed(() => String(route.params.modelo))
const año = computed(() => String(route.params.ano))
const categoria = computed(() => String(route.params.categoria))
const repuesto = computed(() => String(route.params.repuesto))

// Debug: Log de parámetros
watch([marca, modelo, año, categoria, repuesto], ([m, mod, a, c, r]) => {
  console.log('🔵 [Página Detalles] Parámetros actualizados:', { marca: m, modelo: mod, año: a, categoria: c, repuesto: r })
}, { immediate: true })

// Capitalizar para display
const marcaCapitalizada = computed(() => marca.value.charAt(0).toUpperCase() + marca.value.slice(1))
const modeloCapitalizado = computed(() => modelo.value.charAt(0).toUpperCase() + modelo.value.slice(1))
const categoriaCapitalizada = computed(() => categoria.value.charAt(0).toUpperCase() + categoria.value.slice(1))
const repuestoCapitalizado = computed(() => repuesto.value.charAt(0).toUpperCase() + repuesto.value.slice(1).replace(/-/g, ' '))

// Variables reactivas
const repuestoData = ref(null)
const loading = ref(true)
const error = ref(null)

// Composables
const { getRepuestoBySlug, getRepuestosRelacionados, getRepuestos } = useRepuestos()
const { agregarAlCarrito: agregarProductoAlCarrito } = useCarrito()
const router = useRouter()

// Cargar datos del repuesto
onMounted(async () => {
  // Solo ejecutar en el cliente
  if (process.server) return
  
  try {
    loading.value = true
    error.value = null
    console.log('🔍 [Detalles] Buscando repuesto con slug:', repuesto.value)
    console.log('🔍 [Detalles] Parámetros:', { marca: marca.value, modelo: modelo.value, año: año.value, categoria: categoria.value })
    
    // Validar que tenemos los parámetros necesarios
    if (!repuesto.value || !marca.value || !modelo.value || !año.value || !categoria.value) {
      throw new Error('Faltan parámetros en la URL')
    }
    
    // Buscar repuesto por slug primero (intentar con el slug exacto y también en minúsculas)
    let repuestoEncontrado = null
    try {
      // Intentar con el slug exacto de la URL
      repuestoEncontrado = await getRepuestoBySlug(repuesto.value)
      console.log('🔍 [Detalles] Resultado búsqueda por slug exacto:', repuestoEncontrado ? 'Encontrado' : 'No encontrado')
      
      // Si no se encuentra, intentar con el slug en minúsculas
      if (!repuestoEncontrado) {
        const slugLower = repuesto.value.toLowerCase()
        repuestoEncontrado = await getRepuestoBySlug(slugLower)
        console.log('🔍 [Detalles] Resultado búsqueda por slug en minúsculas:', repuestoEncontrado ? 'Encontrado' : 'No encontrado')
      }
    } catch (err) {
      console.warn('⚠️ [Detalles] Error en búsqueda por slug:', err)
      // Continuar con búsqueda alternativa
    }
    
    // Si no se encuentra por slug, intentar buscar por filtros
    if (!repuestoEncontrado) {
      console.log('🔍 [Detalles] Intentando búsqueda alternativa por filtros...')
      try {
        const añoNumero = parseInt(año.value)
        if (isNaN(añoNumero)) {
          throw new Error(`Año inválido: ${año.value}`)
        }
        const repuestos = await getRepuestos({
          marca: marca.value.toLowerCase(),
          modelo: modelo.value.toLowerCase(),
          anio: añoNumero,
          categoria: categoria.value.toLowerCase()
        })
        console.log('🔍 [Detalles] Productos encontrados con filtros:', repuestos.length)
        
        // Buscar el que tenga un slug similar o que coincida con el nombre
        const slugBuscado = repuesto.value.toLowerCase()
        console.log('🔍 [Detalles] Buscando slug:', slugBuscado)
        console.log('🔍 [Detalles] Slugs disponibles:', repuestos.map(r => r.slug))
        
        repuestoEncontrado = repuestos.find(r => {
          const slugProducto = (r.slug || '').toLowerCase()
          const nombreProducto = (r.nombre || '').toLowerCase()
          const slugMatch = slugProducto === slugBuscado || 
                 slugProducto.includes(slugBuscado) || 
                 slugBuscado.includes(slugProducto)
          const nombreMatch = nombreProducto.includes(slugBuscado.replace(/-/g, ' '))
          
          if (slugMatch || nombreMatch) {
            console.log('✅ [Detalles] Coincidencia encontrada:', {
              slugProducto,
              slugBuscado,
              nombreProducto,
              slugMatch,
              nombreMatch
            })
          }
          
          return slugMatch || nombreMatch
        })
        
        if (repuestoEncontrado) {
          console.log('✅ [Detalles] Repuesto encontrado por búsqueda alternativa')
        } else if (repuestos.length > 0) {
          // Si hay productos pero ninguno coincide exactamente, usar el primero
          console.log('⚠️ [Detalles] No se encontró coincidencia exacta, usando el primer producto encontrado')
          repuestoEncontrado = repuestos[0]
        }
      } catch (err) {
        console.error('⚠️ [Detalles] Error en búsqueda alternativa:', err)
        // Continuar sin repuesto encontrado, se usará el fallback
      }
    }
    
    if (repuestoEncontrado) {
      console.log('✅ [Detalles] Repuesto encontrado:', repuestoEncontrado.nombre)
      repuestoData.value = repuestoEncontrado
    } else {
      // Si no se encuentra en Firebase, usar datos de ejemplo
      repuestoData.value = {
        id: 'ejemplo',
        nombre: repuestoCapitalizado.value,
        descripcion: `Repuesto original ${marcaCapitalizada.value} ${modeloCapitalizado.value} ${año.value}`,
        precio: 85000,
        precioOriginal: 100000,
        descuento: 15,
        stock: true,
        cantidad: 5,
        codigoOEM: `${marca.value.toUpperCase()}-${repuesto.value.toUpperCase()}-${año.value}`,
        marca: marca.value,
        modelo: modelo.value,
        anio: parseInt(año.value),
        categoria: categoria.value,
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
    console.error('❌ [Detalles] Error cargando repuesto:', err)
    console.error('❌ [Detalles] Stack:', err.stack)
    error.value = err.message || 'Error al cargar el repuesto. Por favor, intenta de nuevo.'
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

// SEO y Structured Data
const { setPageSEO, setStructuredData } = useSEO()

// Configurar SEO dinámico
watch(repuestoData, (newData) => {
  if (newData) {
    setPageSEO('producto', {
      nombre: newData.nombre,
      marca: marcaCapitalizada.value,
      modelo: modeloCapitalizado.value,
      año: año.value,
      categoria: categoriaCapitalizada.value,
      precio: newData.precio,
      codigoOEM: newData.codigoOEM,
      vehicle: {
        marca: marcaCapitalizada.value,
        modelo: modeloCapitalizado.value,
        año: año.value
      }
    })

    // Structured Data para producto
    setStructuredData('product', {
      nombre: newData.nombre,
      descripcion: newData.descripcion,
      marca: marcaCapitalizada.value,
      precio: newData.precio,
      stock: newData.stock ? 1 : 0,
      codigoOEM: newData.codigoOEM,
      categoria: categoriaCapitalizada.value,
      id: newData.id,
      imagen: newData.imagen,
      garantia: newData.garantia,
      vehicle: {
        marca: marcaCapitalizada.value,
        modelo: modeloCapitalizado.value,
        año: año.value
      }
    })

    // Breadcrumb structured data
    setStructuredData('breadcrumb', {
      breadcrumbs: [
        { name: 'Inicio', path: '/' },
        { name: 'Repuestos', path: '/repuestos' },
        { name: marcaCapitalizada.value, path: `/repuestos/${marca.value}` },
        { name: modeloCapitalizado.value, path: `/repuestos/${marca.value}/${modelo.value}` },
        { name: año.value, path: `/repuestos/${marca.value}/${modelo.value}/${año.value}` },
        { name: categoriaCapitalizada.value, path: `/repuestos/${marca.value}/${modelo.value}/${año.value}/${categoria.value}` },
        { name: repuestoCapitalizado.value, path: useRoute().path }
      ]
    })
  }
}, { immediate: true })

// Funciones para el carrito
const agregarAlCarrito = () => {
  if (!repuestoData.value) return
  
  const itemCarrito = {
    id: repuestoData.value.id || '',
    nombre: repuestoData.value.nombre,
    precio: repuestoData.value.precio,
    cantidad: 1,
    imagen: repuestoData.value.imagen,
    marca: repuestoData.value.marca,
    modelo: repuestoData.value.modelo,
    anio: repuestoData.value.anio,
    categoria: repuestoData.value.categoria,
    slug: repuestoData.value.slug || '',
    stock: repuestoData.value.stock,
    codigoOEM: repuestoData.value.codigoOEM
  }
  
  agregarProductoAlCarrito(itemCarrito)
  console.log('✅ Producto agregado al carrito:', repuestoData.value.nombre)
  
  if (process.client) {
    alert(`✅ ${repuestoData.value.nombre} agregado al carrito`)
  }
}

const agregarAlCarritoYComprar = () => {
  agregarAlCarrito()
  router.push('/carrito')
}
</script>

