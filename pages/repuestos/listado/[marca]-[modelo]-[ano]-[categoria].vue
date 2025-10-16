<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header con breadcrumb -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-4">
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
          <span class="text-gray-800 font-medium">Listado</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Listado de Repuestos {{ categoriaCapitalizada }} - {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
        </h1>
        <p class="text-gray-600 mt-2">
          {{ repuestos.length }} repuestos disponibles para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
        </p>
      </div>
    </div>

    <!-- Layout principal con sidebar y listado -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex gap-8">
        <!-- Sidebar de filtros -->
        <div class="w-80 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-lg font-bold text-gray-800 mb-6">Filtros</h2>
            
            <!-- Filtro por marca de repuesto -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-700 mb-3">Marca del Repuesto</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300" checked>
                  <span class="ml-2 text-sm">Original {{ marcaCapitalizada }}</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300">
                  <span class="ml-2 text-sm">Bosch</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300">
                  <span class="ml-2 text-sm">Valeo</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300">
                  <span class="ml-2 text-sm">Denso</span>
                </label>
              </div>
            </div>

            <!-- Filtro por precio -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-700 mb-3">Rango de Precio</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" name="precio" class="border-gray-300" checked>
                  <span class="ml-2 text-sm">Todos los precios</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="precio" class="border-gray-300">
                  <span class="ml-2 text-sm">Hasta $50.000</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="precio" class="border-gray-300">
                  <span class="ml-2 text-sm">$50.000 - $100.000</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="precio" class="border-gray-300">
                  <span class="ml-2 text-sm">Más de $100.000</span>
                </label>
              </div>
            </div>

            <!-- Filtro por disponibilidad -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-700 mb-3">Disponibilidad</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300" checked>
                  <span class="ml-2 text-sm">En Stock</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300">
                  <span class="ml-2 text-sm">Envío 24h</span>
                </label>
              </div>
            </div>

            <!-- Botón limpiar filtros -->
            <button class="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors">
              Limpiar Filtros
            </button>
          </div>
        </div>

        <!-- Contenido principal - Listado de repuestos -->
        <div class="flex-1">
          <!-- Encabezado de resultados -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-gray-800">{{ repuestos.length }} repuestos encontrados</h2>
                <p class="text-gray-600 mt-1">{{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} - {{ categoriaCapitalizada }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Ordenar por relevancia</option>
                  <option>Ordenar por precio (menor a mayor)</option>
                  <option>Ordenar por precio (mayor a menor)</option>
                  <option>Ordenar por marca</option>
                </select>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Vista de lista
                </button>
              </div>
            </div>
          </div>

          <!-- Listado de repuestos -->
          <div class="space-y-4">
            <div 
              v-for="repuesto in repuestos" 
              :key="repuesto.id"
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div class="flex gap-6">
                <!-- Imagen del repuesto -->
                <div class="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div class="text-center">
                    <div class="text-3xl mb-2">🔧</div>
                    <div class="text-xs text-gray-500">Imagen</div>
                  </div>
                </div>

                <!-- Información del repuesto -->
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h3 class="text-lg font-bold text-gray-800 mb-1">{{ repuesto.nombre }}</h3>
                      <p class="text-sm text-gray-600 mb-2">{{ repuesto.descripcion }}</p>
                      <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Código: {{ repuesto.codigo }}</span>
                        <span>Marca: {{ repuesto.marca }}</span>
                        <span>Stock: {{ repuesto.stock }} unidades</span>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-green-600">${{ repuesto.precio.toLocaleString() }}</div>
                      <div class="text-xs text-gray-500">CLP</div>
                    </div>
                  </div>

                  <!-- Características del repuesto -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span 
                      v-for="caracteristica in repuesto.caracteristicas" 
                      :key="caracteristica"
                      class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {{ caracteristica }}
                    </span>
                  </div>

                  <!-- Botones de acción -->
                  <div class="flex items-center space-x-3">
                    <button class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Agregar al Carrito
                    </button>
                    <NuxtLink 
                      :to="`/repuestos/${marca}/${modelo}/${año}/${categoria}/${repuesto.slug}`"
                      class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Ver Detalles
                    </NuxtLink>
                    <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      Comparar
                    </button>
                  </div>
                </div>
              </div>
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
// Obtener parámetros de la URL de forma estable
const route = useRoute()
const marca = computed(() => String(route.params.marca))
const modelo = computed(() => String(route.params.modelo))
const año = computed(() => String(route.params.ano))
const categoria = computed(() => String(route.params.categoria))

// Capitalizar para display
const marcaCapitalizada = computed(() => marca.value.charAt(0).toUpperCase() + marca.value.slice(1))
const modeloCapitalizado = computed(() => modelo.value.charAt(0).toUpperCase() + modelo.value.slice(1))
const categoriaCapitalizada = computed(() => categoria.value.charAt(0).toUpperCase() + categoria.value.slice(1))

// Datos de repuestos de ejemplo
const repuestos = [
  {
    id: 1,
    nombre: 'Pastillas de Freno Delanteras',
    descripcion: 'Pastillas de freno delanteras originales para mejor rendimiento',
    codigo: `${marca.value.toUpperCase()}-FB-001`,
    marca: marcaCapitalizada.value,
    precio: 85000,
    stock: 15,
    slug: 'pastillas-freno-delanteras',
    caracteristicas: ['Original', 'Garantía 12 meses', 'Envío gratis']
  },
  {
    id: 2,
    nombre: 'Discos de Freno Delanteros',
    descripcion: 'Discos de freno ventilados para mayor disipación de calor',
    codigo: `${marca.toUpperCase()}-FB-002`,
    marca: 'Bosch',
    precio: 120000,
    stock: 8,
    slug: 'discos-freno-delanteros',
    caracteristicas: ['Ventilados', 'Garantía 24 meses', 'Envío gratis']
  },
  {
    id: 3,
    nombre: 'Líquido de Frenos DOT 4',
    descripcion: 'Líquido de frenos de alta calidad para todo tipo de vehículos',
    codigo: `${marca.toUpperCase()}-FB-003`,
    marca: 'Valeo',
    precio: 15000,
    stock: 25,
    slug: 'liquido-frenos-dot4',
    caracteristicas: ['DOT 4', 'Alta temperatura', 'Envío gratis']
  },
  {
    id: 4,
    nombre: 'Pastillas de Freno Traseras',
    descripcion: 'Pastillas de freno traseras con material cerámico',
    codigo: `${marca.toUpperCase()}-FB-004`,
    marca: 'Denso',
    precio: 65000,
    stock: 12,
    slug: 'pastillas-freno-traseras',
    caracteristicas: ['Cerámicas', 'Bajo ruido', 'Garantía 12 meses']
  },
  {
    id: 5,
    nombre: 'Cable de Freno de Mano',
    descripcion: 'Cable de freno de mano con recubrimiento anticorrosivo',
    codigo: `${marca.toUpperCase()}-FB-005`,
    marca: marcaCapitalizada,
    precio: 35000,
    stock: 6,
    slug: 'cable-freno-mano',
    caracteristicas: ['Anticorrosivo', 'Fácil instalación', 'Envío gratis']
  }
]

// SEO Meta dinámico
useHead({
  title: `Listado de Repuestos ${categoriaCapitalizada.value} ${marcaCapitalizada.value} ${modeloCapitalizado.value} ${año.value} | FAutopiezas`,
  meta: [
    { name: 'description', content: `Listado completo de repuestos ${categoriaCapitalizada.value.toLowerCase()} para ${marcaCapitalizada.value} ${modeloCapitalizado.value} ${año.value}. ${repuestos.length} repuestos disponibles con precios y stock.` },
    { name: 'keywords', content: `listado repuestos ${categoria.value} ${marca.value} ${modelo.value} ${año.value}, repuestos ${categoria.value} ${marca.value} ${modelo.value} ${año.value} precio, catálogo ${categoria.value} ${marca.value} ${modelo.value}` }
  ]
})
</script>












