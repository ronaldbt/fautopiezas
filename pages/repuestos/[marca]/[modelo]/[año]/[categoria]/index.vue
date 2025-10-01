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
          <span class="text-gray-800 font-medium">{{ categoriaCapitalizada }}</span>
        </nav>
        <h1 class="text-3xl font-bold text-gray-800">
          Repuestos {{ categoriaCapitalizada }} - {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
        </h1>
        <p class="text-gray-600 mt-2">
          Repuestos de {{ categoriaCapitalizada.toLowerCase() }} originales para {{ marcaCapitalizada }} {{ modeloCapitalizado }} año {{ año }}
        </p>
      </div>
    </div>

    <!-- Botón para ver listado completo -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-blue-800 mb-2">Ver Listado Completo de Repuestos</h2>
            <p class="text-blue-600">Explora todos los repuestos de {{ categoriaCapitalizada }} disponibles para {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}</p>
          </div>
          <NuxtLink 
            :to="`/repuestos-listado?marca=${marca}&modelo=${modelo}&año=${año}&categoria=${categoria}`"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Ver Listado Completo →
          </NuxtLink>
        </div>
      </div>

      <!-- Lista de repuestos destacados -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Repuestos Destacados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="repuesto in repuestos" :key="repuesto.slug" 
               class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <NuxtLink :to="`/repuestos/${marca}/${modelo}/${año}/${categoria}/${repuesto.slug}`" class="block">
              <h3 class="text-lg font-bold text-blue-600 mb-2">{{ repuesto.nombre }}</h3>
              <p class="text-sm text-gray-600 mb-3">{{ repuesto.descripcion }}</p>
              <div class="flex justify-between items-center mb-3">
                <span class="text-xl font-bold text-green-600">${{ repuesto.precio.toLocaleString() }}</span>
                <span v-if="repuesto.stock" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">En Stock</span>
                <span v-else class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Agotado</span>
              </div>
              <div class="text-xs text-gray-500">
                Ver detalles →
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Sección de listado estilo RockAuto -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Listado Completo de Repuestos</h2>
            <p class="text-gray-600 mt-1">Vista estilo RockAuto con filtros avanzados</p>
          </div>
          <NuxtLink 
            :to="`/repuestos-listado?marca=${marca}&modelo=${modelo}&año=${año}&categoria=${categoria}`"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Ver Listado Completo →
          </NuxtLink>
        </div>
        
        <!-- Vista previa del listado -->
        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div class="flex gap-4 mb-4">
            <!-- Sidebar preview -->
            <div class="w-48 bg-white rounded border p-3">
              <h4 class="font-semibold text-sm mb-2">Filtros</h4>
              <div class="space-y-1 text-xs">
                <div>✓ Marca del Repuesto</div>
                <div>✓ Rango de Precio</div>
                <div>✓ Disponibilidad</div>
              </div>
            </div>
            <!-- Lista preview -->
            <div class="flex-1 bg-white rounded border p-3">
              <h4 class="font-semibold text-sm mb-2">{{ repuestos.length }} repuestos encontrados</h4>
              <div class="space-y-2">
                <div v-for="repuesto in repuestos.slice(0, 3)" :key="repuesto.slug" 
                     class="flex justify-between items-center text-xs border-b pb-1">
                  <span>{{ repuesto.nombre }}</span>
                  <span class="font-bold text-green-600">${{ repuesto.precio.toLocaleString() }}</span>
                </div>
                <div class="text-xs text-gray-500">... y {{ repuestos.length - 3 }} más</div>
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-600 text-center">
            Vista completa con filtros avanzados, ordenamiento y paginación
          </p>
        </div>
      </div>
    </div>

    <!-- Información de la categoría -->
    <section class="bg-white py-12">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Repuestos {{ categoriaCapitalizada }} {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }}
        </h2>
        <div class="prose max-w-none">
          <p class="text-gray-600 mb-4">
            En FAutopiezas Chile ofrecemos los mejores repuestos de {{ categoriaCapitalizada.toLowerCase() }} 
            para {{ marcaCapitalizada }} {{ modeloCapitalizado }} año {{ año }}. Todos nuestros repuestos son 100% originales 
            y cuentan con garantía oficial del fabricante.
          </p>
          <p class="text-gray-600 mb-4">
            Nuestro catálogo de repuestos de {{ categoriaCapitalizada.toLowerCase() }} incluye todas las piezas necesarias 
            para mantener tu {{ marcaCapitalizada }} {{ modeloCapitalizado }} {{ año }} en perfecto estado.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Repuestos {{ categoriaCapitalizada.toLowerCase() }} originales {{ marcaCapitalizada }}</li>
            <li>Compatibilidad garantizada para {{ modeloCapitalizado }} {{ año }}</li>
            <li>Stock disponible con entrega inmediata</li>
            <li>Garantía oficial del fabricante</li>
            <li>Instalación por técnicos certificados</li>
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

// Capitalizar para display
const marcaCapitalizada = marca.charAt(0).toUpperCase() + marca.slice(1)
const modeloCapitalizado = modelo.charAt(0).toUpperCase() + modelo.slice(1)
const categoriaCapitalizada = categoria.charAt(0).toUpperCase() + categoria.slice(1)

// Repuestos según la categoría
const repuestosMotor = [
  { nombre: 'Cigueñal', slug: 'ciguenal', descripcion: 'Cigueñal original', precio: 450000, stock: true },
  { nombre: 'Pistones', slug: 'pistones', descripcion: 'Juego de pistones', precio: 180000, stock: true },
  { nombre: 'Válvulas', slug: 'valvulas', descripcion: 'Válvulas de admisión', precio: 85000, stock: true },
  { nombre: 'Filtro de Aire', slug: 'filtro-aire', descripcion: 'Filtro de aire original', precio: 35000, stock: true },
  { nombre: 'Bomba de Aceite', slug: 'bomba-aceite', descripcion: 'Bomba de aceite', precio: 120000, stock: false },
  { nombre: 'Termostato', slug: 'termostato', descripcion: 'Termostato original', precio: 45000, stock: true }
]

const repuestosFrenos = [
  { nombre: 'Pastillas Freno Delanteras', slug: 'pastillas-freno-delanteras', descripcion: 'Pastillas originales', precio: 85000, stock: true },
  { nombre: 'Discos de Freno', slug: 'discos-freno', descripcion: 'Discos delanteros', precio: 120000, stock: true },
  { nombre: 'Líquido de Frenos', slug: 'liquido-frenos', descripcion: 'Líquido DOT 4', precio: 15000, stock: true },
  { nombre: 'Pastillas Freno Traseras', slug: 'pastillas-freno-traseras', descripcion: 'Pastillas traseras', precio: 65000, stock: true },
  { nombre: 'Cable de Freno', slug: 'cable-freno', descripcion: 'Cable de freno de mano', precio: 35000, stock: true }
]

const repuestosSuspension = [
  { nombre: 'Amortiguadores Delanteros', slug: 'amortiguadores-delanteros', descripcion: 'Amortiguadores originales', precio: 180000, stock: true },
  { nombre: 'Amortiguadores Traseros', slug: 'amortiguadores-traseros', descripcion: 'Amortiguadores traseros', precio: 160000, stock: true },
  { nombre: 'Muelles', slug: 'muelles', descripcion: 'Muelles de suspensión', precio: 95000, stock: true },
  { nombre: 'Brazos de Suspensión', slug: 'brazos-suspension', descripcion: 'Brazos inferiores', precio: 125000, stock: true },
  { nombre: 'Rótulas', slug: 'rotulas', descripcion: 'Rótulas de dirección', precio: 75000, stock: true }
]

// Seleccionar repuestos según la categoría
let repuestos = []
if (categoria === 'motor') {
  repuestos = repuestosMotor
} else if (categoria === 'frenos') {
  repuestos = repuestosFrenos
} else if (categoria === 'suspension') {
  repuestos = repuestosSuspension
} else {
  // Repuestos genéricos para otras categorías
  repuestos = [
    { nombre: 'Repuesto A', slug: 'repuesto-a', descripcion: 'Descripción del repuesto', precio: 50000, stock: true },
    { nombre: 'Repuesto B', slug: 'repuesto-b', descripcion: 'Descripción del repuesto', precio: 75000, stock: true },
    { nombre: 'Repuesto C', slug: 'repuesto-c', descripcion: 'Descripción del repuesto', precio: 100000, stock: false }
  ]
}

// SEO Meta dinámico por categoría
useHead({
  title: `Repuestos ${categoriaCapitalizada} ${marcaCapitalizada} ${modeloCapitalizado} ${año} - Originales | FAutopiezas`,
  meta: [
    { name: 'description', content: `Repuestos ${categoriaCapitalizada.toLowerCase()} originales ${marcaCapitalizada} ${modeloCapitalizado} ${año} en Chile. Stock inmediato, garantía extendida, envío gratis. Especialistas en ${categoriaCapitalizada.toLowerCase()} ${marcaCapitalizada}.` },
    { name: 'keywords', content: `repuestos ${categoria} ${marca} ${modelo} ${año}, autopartes ${categoria} ${marca} ${modelo} ${año}, repuestos originales ${categoria} ${marca}, ${categoria} ${marca} ${modelo} ${año}` }
  ]
})
</script>
