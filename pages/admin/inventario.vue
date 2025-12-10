<template>
  <div>
    <div class="mb-8">
      <div class="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
        <h1 class="text-3xl font-bold">Gestión de Inventario</h1>
        <p class="text-red-100 mt-2 text-lg">Ver, cargar y gestionar productos del catálogo</p>
      </div>
    </div>

    <!-- Tabs para cambiar entre ver y cargar -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="tabActivo = 'ver'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              tabActivo === 'ver'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Ver Productos
          </button>
          <button
            @click="tabActivo = 'cargar'"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              tabActivo === 'cargar'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Cargar Productos
          </button>
        </nav>
      </div>
    </div>

    <!-- Tab: Ver Productos -->
    <div v-if="tabActivo === 'ver'" class="space-y-6">
      <!-- Filtros -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Filtros de Búsqueda</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Marca</label>
            <select
              v-model="filtros.marca"
              @change="aplicarFiltros"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Todas las marcas</option>
              <option v-for="marca in marcasDisponibles" :key="marca" :value="marca">
                {{ marca.charAt(0).toUpperCase() + marca.slice(1) }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Año</label>
            <input
              v-model.number="filtros.anio"
              @input="aplicarFiltros"
              type="number"
              placeholder="Año"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
            <input
              v-model="filtros.modelo"
              @input="aplicarFiltros"
              type="text"
              placeholder="Modelo"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <input
              v-model="filtros.categoria"
              @input="aplicarFiltros"
              type="text"
              placeholder="Categoría"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subcategoría</label>
            <input
              v-model="filtros.subcategoria"
              @input="aplicarFiltros"
              type="text"
              placeholder="Subcategoría"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button
            @click="limpiarFiltros"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Productos</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{{ productos.length }}</p>
            </div>
            <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Productos Filtrados</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{{ productosFiltrados.length }}</p>
            </div>
            <div class="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">En Stock</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{{ productosEnStock }}</p>
            </div>
            <div class="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de Productos -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Productos</h2>
          <div class="flex items-center space-x-4">
            <input
              v-model="busqueda"
              @input="aplicarFiltros"
              type="text"
              placeholder="Buscar productos..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              v-model="ordenamiento"
              @change="aplicarFiltros"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="nombre">Nombre (A-Z)</option>
              <option value="precio">Precio (menor a mayor)</option>
              <option value="precio-desc">Precio (mayor a menor)</option>
              <option value="fecha">Más recientes</option>
            </select>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="cargando" class="flex items-center justify-center h-64">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Cargando productos...</p>
          </div>
        </div>

        <!-- Tabla de Productos -->
        <div v-else-if="productosFiltrados.length > 0" class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-medium text-gray-700">Nombre</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Marca</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Modelo</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Año</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Categoría</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Precio</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Stock</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="producto in productosFiltrados"
                :key="producto.id"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="py-3 px-4">
                  <div>
                    <p class="font-medium text-gray-900">{{ producto.nombre }}</p>
                    <p class="text-sm text-gray-500 truncate max-w-xs">{{ producto.descripcion }}</p>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {{ producto.marca }}
                  </span>
                </td>
                <td class="py-3 px-4 text-sm text-gray-600">{{ producto.modelo }}</td>
                <td class="py-3 px-4 text-sm text-gray-600">{{ producto.anio }}</td>
                <td class="py-3 px-4">
                  <div>
                    <span class="text-sm text-gray-600">{{ producto.categoria }}</span>
                    <span v-if="producto.subcategoria" class="text-xs text-gray-500 block">
                      {{ producto.subcategoria }}
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="font-semibold text-gray-900">
                    ${{ parseFloat(producto.precio.toString().replace('$', '').replace(',', '')) || 0 }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      producto.stock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ producto.stock ? 'En Stock' : 'Sin Stock' }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <button
                    @click="editarProducto(producto)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium mr-3"
                  >
                    Editar
                  </button>
                  <button
                    @click="eliminarProducto(producto.id)"
                    class="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Sin resultados -->
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">📦</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
          <p class="text-gray-600">Intenta ajustar los filtros o cargar nuevos productos</p>
        </div>
      </div>
    </div>

    <!-- Tab: Cargar Productos -->
    <div v-if="tabActivo === 'cargar'" class="space-y-6">
      <!-- Selección de método de carga -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Método de Carga</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            @click="metodoCarga = 'json'"
            :class="[
              'p-6 border-2 rounded-xl transition-all',
              metodoCarga === 'json'
                ? 'border-red-600 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-red-100 rounded-lg">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="text-left">
                <h3 class="text-lg font-semibold text-gray-900">Cargar desde JSON</h3>
                <p class="text-sm text-gray-600">Sube un archivo JSON con la estructura de productos</p>
              </div>
            </div>
          </button>
          <button
            @click="metodoCarga = 'manual'"
            :class="[
              'p-6 border-2 rounded-xl transition-all',
              metodoCarga === 'manual'
                ? 'border-red-600 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-red-100 rounded-lg">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <div class="text-left">
                <h3 class="text-lg font-semibold text-gray-900">Carga Manual</h3>
                <p class="text-sm text-gray-600">Agrega productos uno por uno mediante formulario</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Carga desde JSON -->
      <div v-if="metodoCarga === 'json'" class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Cargar Productos desde JSON</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar archivo JSON
            </label>
            <input
              ref="fileInput"
              @change="handleFileSelect"
              type="file"
              accept=".json"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
            <p class="mt-2 text-sm text-gray-500">
              El archivo JSON debe tener la estructura con marca, año, categorías, subcategorías y productos
            </p>
          </div>

          <div v-if="datosJSON" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Vista Previa de Datos</h3>
            <div class="text-sm text-gray-600 space-y-1">
              <p><strong>Marca:</strong> {{ datosJSON.marca }}</p>
              <p><strong>Año:</strong> {{ datosJSON.año }}</p>
              <p><strong>Total de productos:</strong> {{ datosJSON.total_productos }}</p>
              <p><strong>Categorías:</strong> {{ Object.keys(datosJSON.categorias || {}).length }}</p>
            </div>
          </div>

          <div class="flex space-x-4">
            <button
              @click="procesarJSON"
              :disabled="!datosJSON || procesando"
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <span v-if="procesando">Procesando...</span>
              <span v-else>Procesar y Guardar Productos</span>
            </button>
            <button
              @click="limpiarJSON"
              class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Limpiar
            </button>
          </div>

          <div v-if="resultadoProcesamiento" class="mt-4 p-4 rounded-lg" :class="resultadoProcesamiento.exito ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
            <p class="font-medium">{{ resultadoProcesamiento.mensaje }}</p>
            <p v-if="resultadoProcesamiento.detalles" class="text-sm mt-2">{{ resultadoProcesamiento.detalles }}</p>
          </div>
        </div>
      </div>

      <!-- Carga Manual -->
      <div v-if="metodoCarga === 'manual'" class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Agregar Producto Manualmente</h2>
        <form @submit.prevent="guardarProductoManual" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
              <select
                v-model="productoManual.marca"
                @change="cargarModelosPorMarca"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Seleccionar marca</option>
                <option v-for="marca in marcasDisponibles" :key="marca" :value="marca">
                  {{ marca.charAt(0).toUpperCase() + marca.slice(1) }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Modelo *</label>
              <select
                v-if="modelosDisponibles.length > 0"
                v-model="productoManual.modelo"
                @change="cargarAñosPorModelo"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Seleccionar modelo</option>
                <option v-for="modelo in modelosDisponibles" :key="modelo.slug" :value="modelo.nombre">
                  {{ modelo.nombre }}
                </option>
              </select>
              <input
                v-else
                v-model="productoManual.modelo"
                type="text"
                required
                placeholder="Ej: 370Z o S-Type"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Año *</label>
              <select
                v-if="añosDisponibles.length > 0"
                v-model.number="productoManual.anio"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option :value="null">Seleccionar año</option>
                <option v-for="año in añosDisponibles" :key="año" :value="año">
                  {{ año }}
                </option>
              </select>
              <input
                v-else
                v-model.number="productoManual.anio"
                type="number"
                required
                placeholder="Ej: 2003"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
              <select
                v-model="productoManual.categoria"
                @change="cargarSubcategoriasPorCategoria"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Seleccionar categoría</option>
                <option v-for="categoria in categoriasDisponibles" :key="categoria.slug" :value="categoria.nombre">
                  {{ categoria.nombre }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subcategoría</label>
              <select
                v-if="subcategoriasDisponibles.length > 0"
                v-model="productoManual.subcategoria"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Seleccionar subcategoría (opcional)</option>
                <option v-for="subcat in subcategoriasDisponibles" :key="subcat" :value="subcat">
                  {{ subcat }}
                </option>
              </select>
              <input
                v-else
                v-model="productoManual.subcategoria"
                type="text"
                placeholder="Ej: Compresor de Aire Acondicionado"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
              <input
                v-model="productoManual.nombre"
                type="text"
                required
                placeholder="Ej: UAC RO0900B PAG"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
              <input
                v-model="productoManual.descripcion"
                type="text"
                required
                placeholder="Descripción del producto"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Precio *</label>
              <input
                v-model="productoManual.precio"
                type="text"
                required
                placeholder="Ej: $4.72 o 4.72"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">URL</label>
              <input
                v-model="productoManual.url"
                type="url"
                placeholder="URL del producto"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
              <input
                v-model="productoManual.imagen"
                type="url"
                placeholder="URL de la imagen"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <select
                v-model="productoManual.stock"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option :value="true">En Stock</option>
                <option :value="false">Sin Stock</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="limpiarFormularioManual"
              class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Limpiar
            </button>
            <button
              type="submit"
              :disabled="guardando"
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <span v-if="guardando">Guardando...</span>
              <span v-else>Guardar Producto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore'

// Layout y middleware
definePageMeta({
  layout: 'dashboard-professional',
  middleware: 'admin'
})

useHead({
  title: 'Inventario - Panel Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const { $firestore } = useNuxtApp()
const { crearRepuesto, actualizarRepuesto, eliminarRepuesto } = useRepuestos()
const { getCategorias, getModelosByMarca } = useVehiculos()

// Estado
const tabActivo = ref('ver')
const metodoCarga = ref('json')
const cargando = ref(false)
const procesando = ref(false)
const guardando = ref(false)

// Datos
const productos = ref([])
const marcasDisponibles = ref([])
const filtros = ref({
  marca: '',
  anio: null,
  modelo: '',
  categoria: '',
  subcategoria: ''
})
const busqueda = ref('')
const ordenamiento = ref('nombre')

// Datos para formulario manual
const categoriasDisponibles = ref([])
const modelosDisponibles = ref([])
const añosDisponibles = ref([])
const subcategoriasDisponibles = ref([])

// Carga JSON
const fileInput = ref(null)
const datosJSON = ref(null)
const resultadoProcesamiento = ref(null)

// Carga Manual
const productoManual = ref({
  marca: '',
  modelo: '',
  anio: null,
  categoria: '',
  subcategoria: '',
  nombre: '',
  descripcion: '',
  precio: '',
  url: '',
  imagen: '',
  stock: true
})

// Computed
const productosFiltrados = computed(() => {
  let filtrados = [...productos.value]

  // Aplicar filtros
  if (filtros.value.marca) {
    filtrados = filtrados.filter(p => p.marca === filtros.value.marca)
  }
  if (filtros.value.anio) {
    filtrados = filtrados.filter(p => p.anio === filtros.value.anio)
  }
  if (filtros.value.modelo) {
    filtrados = filtrados.filter(p => 
      p.modelo.toLowerCase().includes(filtros.value.modelo.toLowerCase())
    )
  }
  if (filtros.value.categoria) {
    filtrados = filtrados.filter(p => 
      p.categoria.toLowerCase().includes(filtros.value.categoria.toLowerCase())
    )
  }
  if (filtros.value.subcategoria) {
    filtrados = filtrados.filter(p => 
      p.subcategoria?.toLowerCase().includes(filtros.value.subcategoria.toLowerCase())
    )
  }

  // Búsqueda de texto
  if (busqueda.value) {
    const termino = busqueda.value.toLowerCase()
    filtrados = filtrados.filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.descripcion.toLowerCase().includes(termino)
    )
  }

  // Ordenamiento
  if (ordenamiento.value === 'nombre') {
    filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
  } else if (ordenamiento.value === 'precio') {
    filtrados.sort((a, b) => {
      const precioA = parseFloat(a.precio.toString().replace('$', '').replace(',', '')) || 0
      const precioB = parseFloat(b.precio.toString().replace('$', '').replace(',', '')) || 0
      return precioA - precioB
    })
  } else if (ordenamiento.value === 'precio-desc') {
    filtrados.sort((a, b) => {
      const precioA = parseFloat(a.precio.toString().replace('$', '').replace(',', '')) || 0
      const precioB = parseFloat(b.precio.toString().replace('$', '').replace(',', '')) || 0
      return precioB - precioA
    })
  } else if (ordenamiento.value === 'fecha') {
    filtrados.sort((a, b) => {
      const fechaA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0)
      const fechaB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0)
      return fechaB.getTime() - fechaA.getTime()
    })
  }

  return filtrados
})

const productosEnStock = computed(() => {
  return productos.value.filter(p => p.stock).length
})

// Funciones
const cargarProductos = async () => {
  try {
    console.log('🔄 Cargando productos desde Firestore...')
    cargando.value = true
    const repuestosRef = collection($firestore, 'repuestos')
    
    // Intentar ordenar por createdAt, pero si falla, cargar sin ordenar
    let querySnapshot
    try {
      const q = query(repuestosRef, orderBy('createdAt', 'desc'))
      querySnapshot = await getDocs(q)
      console.log('✅ Query ejecutada con ordenamiento')
    } catch (error) {
      // Si falla el ordenamiento, cargar sin ordenar
      console.warn('⚠️ No se pudo ordenar por createdAt, cargando sin orden:', error)
      querySnapshot = await getDocs(repuestosRef)
    }
    
    productos.value = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      productos.value.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
      })
    })

    console.log(`📦 Productos cargados: ${productos.value.length}`)

    // Ordenar manualmente si no se pudo ordenar en la query
    productos.value.sort((a, b) => {
      const fechaA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0)
      const fechaB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0)
      return fechaB.getTime() - fechaA.getTime()
    })

    // Cargar marcas desde archivos JSON
    await cargarMarcasDesdeJSON()
  } catch (error) {
    console.error('❌ Error cargando productos:', error)
    console.error('❌ Detalles del error:', error.message, error.stack)
  } finally {
    cargando.value = false
  }
}

const cargarMarcasDesdeJSON = async () => {
  try {
    console.log('🔍 Cargando marcas desde JSON...')
    // Obtener lista de archivos JSON en data/marcas
    const response = await $fetch('/api/admin/listar-marcas')
    console.log('📦 Respuesta de marcas:', response)
    if (response && response.marcas) {
      marcasDisponibles.value = response.marcas.map((m) => m.slug).sort()
      console.log('✅ Marcas cargadas:', marcasDisponibles.value.length)
    } else {
      // Fallback: obtener marcas únicas de productos
      const marcas = [...new Set(productos.value.map(p => p.marca).filter(Boolean))]
      marcasDisponibles.value = marcas.sort()
      console.log('⚠️ Usando marcas de productos como fallback:', marcasDisponibles.value.length)
    }
  } catch (error) {
    console.error('❌ Error cargando marcas desde JSON:', error)
    // Fallback: obtener marcas únicas de productos
    const marcas = [...new Set(productos.value.map(p => p.marca).filter(Boolean))]
    marcasDisponibles.value = marcas.sort()
  }
}

const cargarCategorias = () => {
  try {
    console.log('🔍 Cargando categorías...')
    const categorias = getCategorias()
    categoriasDisponibles.value = categorias.sort((a, b) => a.orden - b.orden)
    console.log('✅ Categorías cargadas:', categoriasDisponibles.value.length)
  } catch (error) {
    console.error('❌ Error cargando categorías:', error)
  }
}

const cargarModelosPorMarca = async () => {
  if (!productoManual.value.marca) {
    modelosDisponibles.value = []
    añosDisponibles.value = []
    return
  }
  
  try {
    console.log('🔍 Cargando modelos para marca:', productoManual.value.marca)
    const modelos = await getModelosByMarca(productoManual.value.marca)
    modelosDisponibles.value = modelos
    console.log('✅ Modelos cargados:', modelosDisponibles.value.length)
    
    // Limpiar modelo y años seleccionados
    productoManual.value.modelo = ''
    productoManual.value.anio = null
    añosDisponibles.value = []
  } catch (error) {
    console.error('❌ Error cargando modelos:', error)
    modelosDisponibles.value = []
  }
}

const cargarAñosPorModelo = async () => {
  if (!productoManual.value.marca || !productoManual.value.modelo) {
    añosDisponibles.value = []
    return
  }
  
  try {
    console.log('🔍 Cargando años para modelo:', productoManual.value.modelo)
    const modeloEncontrado = modelosDisponibles.value.find(m => m.nombre === productoManual.value.modelo)
    if (modeloEncontrado) {
      añosDisponibles.value = [...modeloEncontrado.años].sort((a, b) => b - a) // Más recientes primero
      console.log('✅ Años cargados:', añosDisponibles.value.length)
      // Guardar el nombre exacto del modelo del JSON para consistencia
      productoManual.value.modeloExacto = modeloEncontrado.nombre
    } else {
      añosDisponibles.value = []
      productoManual.value.modeloExacto = productoManual.value.modelo
    }
    productoManual.value.anio = null
  } catch (error) {
    console.error('❌ Error cargando años:', error)
    añosDisponibles.value = []
  }
}

const cargarSubcategoriasPorCategoria = () => {
  if (!productoManual.value.categoria) {
    subcategoriasDisponibles.value = []
    return
  }
  
  try {
    console.log('🔍 Cargando subcategorías para categoría:', productoManual.value.categoria)
    const categoria = categoriasDisponibles.value.find(c => c.nombre === productoManual.value.categoria)
    if (categoria && categoria.subcategorias) {
      subcategoriasDisponibles.value = categoria.subcategorias.map(sub => {
        // Convertir slug a nombre legible
        return sub
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      })
      console.log('✅ Subcategorías cargadas:', subcategoriasDisponibles.value.length)
    } else {
      subcategoriasDisponibles.value = []
    }
    productoManual.value.subcategoria = ''
  } catch (error) {
    console.error('❌ Error cargando subcategorías:', error)
    subcategoriasDisponibles.value = []
  }
}

const aplicarFiltros = () => {
  // Los filtros se aplican automáticamente mediante computed
}

const limpiarFiltros = () => {
  filtros.value = {
    marca: '',
    anio: null,
    modelo: '',
    categoria: '',
    subcategoria: ''
  }
  busqueda.value = ''
}

const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const text = await file.text()
    const json = JSON.parse(text)
    datosJSON.value = json
    resultadoProcesamiento.value = null
  } catch (error) {
    console.error('Error leyendo archivo:', error)
    resultadoProcesamiento.value = {
      exito: false,
      mensaje: 'Error al leer el archivo JSON',
      detalles: error.message
    }
  }
}

const procesarJSON = async () => {
  if (!datosJSON.value) return

  try {
    procesando.value = true
    resultadoProcesamiento.value = null

    const productosProcesados = []
    const marca = datosJSON.value.marca
    const año = datosJSON.value.año

    // Recorrer categorías
    for (const [nombreCategoria, categoria] of Object.entries(datosJSON.value.categorias || {})) {
      // Si la categoría tiene subcategorías
      if (categoria.subcategorias) {
        for (const [nombreSubcategoria, subcategoria] of Object.entries(categoria.subcategorias)) {
          // Si la subcategoría tiene productos
          if (subcategoria.productos) {
            for (const producto of subcategoria.productos) {
              const productoProcesado = transformarProducto(producto, marca, año, nombreCategoria, nombreSubcategoria)
              productosProcesados.push(productoProcesado)
            }
          }
        }
      }
      
      // Si la categoría tiene productos directos
      if (categoria.productos) {
        for (const producto of categoria.productos) {
          const productoProcesado = transformarProducto(producto, marca, año, nombreCategoria, null)
          productosProcesados.push(productoProcesado)
        }
      }
    }

    // Guardar productos en Firestore y actualizar archivos JSON
    let guardados = 0
    let errores = 0
    const modelosAños = new Map() // Para trackear modelos y años únicos

    for (let i = 0; i < productosProcesados.length; i++) {
      const producto = productosProcesados[i]
      try {
        console.log(`📦 Guardando producto ${i + 1}/${productosProcesados.length}:`, producto.nombre)
        const productoId = await crearRepuesto(producto)
        console.log(`✅ Producto guardado con ID: ${productoId}`)
        guardados++

        // Trackear modelo y año para actualizar JSON
        const key = `${producto.marca}-${producto.modelo}-${producto.anio}`
        if (!modelosAños.has(key)) {
          modelosAños.set(key, {
            marca: producto.marca,
            modelo: producto.modelo,
            año: producto.anio,
            categoria: producto.categoria // Ya está en formato slug
          })
        }
      } catch (error) {
        console.error(`❌ Error guardando producto ${i + 1}:`, error)
        console.error('❌ Detalles del error:', error.message, error.stack)
        errores++
      }
    }
    
    console.log(`📊 Resumen: ${guardados} guardados, ${errores} errores`)

    // Actualizar archivos JSON de marcas
    let actualizacionesJSON = 0
    for (const [key, info] of modelosAños) {
      try {
        await $fetch('/api/admin/actualizar-marca.json', {
          method: 'POST',
          body: {
            marca: info.marca,
            modelo: info.modelo,
            año: info.año,
            categoria: info.categoria
          }
        })
        actualizacionesJSON++
      } catch (error) {
        console.error('Error actualizando JSON de marca:', error)
      }
    }

    resultadoProcesamiento.value = {
      exito: true,
      mensaje: `Procesamiento completado`,
      detalles: `${guardados} productos guardados exitosamente${errores > 0 ? `. ${errores} errores.` : ''}${actualizacionesJSON > 0 ? ` ${actualizacionesJSON} archivo(s) JSON actualizado(s).` : ''}`
    }

    // Recargar productos y marcas
    await cargarProductos()
    limpiarJSON()
  } catch (error) {
    console.error('Error procesando JSON:', error)
    resultadoProcesamiento.value = {
      exito: false,
      mensaje: 'Error al procesar el JSON',
      detalles: error.message
    }
  } finally {
    procesando.value = false
  }
}

// Función para convertir nombre de categoría a slug
const convertirCategoriaASlug = (nombreCategoria) => {
  if (!nombreCategoria) return ''
  
  return nombreCategoria
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Función para generar slug de producto de manera consistente
const generarSlugProducto = (marca, modelo, anio, nombre) => {
  const marcaSlug = convertirCategoriaASlug(marca)
  const modeloSlug = convertirCategoriaASlug(String(modelo))
  const nombreSlug = convertirCategoriaASlug(nombre)
  const slug = `${marcaSlug}-${modeloSlug}-${anio}-${nombreSlug}`.substring(0, 100)
  return slug
}

const transformarProducto = (producto, marca, año, categoria, subcategoria) => {
  // Limpiar precio
  const precioStr = producto.precio?.toString().replace('$', '').replace(',', '') || '0'
  const precio = parseFloat(precioStr) || 0

  // Convertir categoría a slug
  const categoriaSlug = convertirCategoriaASlug(categoria)
  const subcategoriaSlug = subcategoria ? convertirCategoriaASlug(subcategoria) : null

  // Generar slug de manera consistente
  const slug = generarSlugProducto(marca, producto.modelo || 'sin-modelo', año, producto.nombre || 'producto')

  return {
    marca: marca.toLowerCase(),
    modelo: producto.modelo || '',
    anio: parseInt(año) || parseInt(producto.año) || new Date().getFullYear(),
    categoria: categoriaSlug,
    subcategoria: subcategoriaSlug,
    nombre: producto.nombre || '',
    descripcion: producto.descripcion || producto.nombre || '',
    precio: precio,
    stock: true,
    cantidad: 1,
    imagen: producto.imagen || '',
    imagenes: producto.imagen ? [producto.imagen] : [],
    url: producto.url || '',
    compatibilidad: [],
    tags: [marca, categoria, subcategoria].filter(Boolean),
    activo: true,
    destacado: false,
    slug: slug,
    searchTerms: [
      producto.nombre,
      producto.descripcion,
      marca,
      producto.modelo,
      categoria,
      subcategoria
    ].filter(Boolean).map(s => s.toLowerCase()),
    metaTitle: `${producto.nombre} - ${marca} ${producto.modelo} ${año}`,
    metaDescription: producto.descripcion || producto.nombre
  }
}

const limpiarJSON = () => {
  datosJSON.value = null
  resultadoProcesamiento.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const guardarProductoManual = async () => {
  try {
    console.log('🚀 Iniciando guardado de producto manual...')
    console.log('📝 Datos del producto:', productoManual.value)
    
    guardando.value = true

    // Validar campos requeridos
    if (!productoManual.value.marca || !productoManual.value.modelo || !productoManual.value.anio || 
        !productoManual.value.categoria || !productoManual.value.nombre || !productoManual.value.descripcion || 
        !productoManual.value.precio) {
      console.error('❌ Faltan campos requeridos')
      resultadoProcesamiento.value = {
        exito: false,
        mensaje: 'Por favor completa todos los campos requeridos'
      }
      guardando.value = false
      return
    }

    // Limpiar precio
    const precioStr = productoManual.value.precio.replace('$', '').replace(',', '')
    const precio = parseFloat(precioStr) || 0
    console.log('💰 Precio procesado:', precio)

    // Generar slug de manera consistente
    const slug = generarSlugProducto(
      productoManual.value.marca,
      productoManual.value.modelo,
      productoManual.value.anio,
      productoManual.value.nombre
    )
    console.log('🔗 Slug generado:', slug)

    // Convertir categoría a slug
    const categoriaSlug = convertirCategoriaASlug(productoManual.value.categoria)
    const subcategoriaSlug = productoManual.value.subcategoria 
      ? convertirCategoriaASlug(productoManual.value.subcategoria) 
      : null
    console.log('📂 Categoría slug:', categoriaSlug, 'Subcategoría slug:', subcategoriaSlug)

    // Usar el modelo exacto del JSON si está disponible, sino el ingresado
    // Normalizar para que sea consistente (primera letra mayúscula, resto según el JSON)
    let modeloFinal = productoManual.value.modeloExacto || productoManual.value.modelo
    // Si viene del select, usar el nombre exacto; si es texto libre, normalizar
    if (modelosDisponibles.value.length > 0) {
      const modeloEncontrado = modelosDisponibles.value.find(m => m.nombre === productoManual.value.modelo)
      if (modeloEncontrado) {
        modeloFinal = modeloEncontrado.nombre // Usar el nombre exacto del JSON
      }
    }
    
    console.log('🚗 Modelo final a guardar:', modeloFinal)
    
    const producto = {
      marca: productoManual.value.marca.toLowerCase(),
      modelo: modeloFinal, // Usar el nombre exacto del modelo del JSON para consistencia
      anio: productoManual.value.anio,
      categoria: categoriaSlug,
      subcategoria: subcategoriaSlug,
      nombre: productoManual.value.nombre,
      descripcion: productoManual.value.descripcion,
      precio: precio,
      stock: productoManual.value.stock,
      cantidad: 1,
      imagen: productoManual.value.imagen || '',
      imagenes: productoManual.value.imagen ? [productoManual.value.imagen] : [],
      url: productoManual.value.url || '',
      compatibilidad: [],
      tags: [
        productoManual.value.marca,
        categoriaSlug,
        subcategoriaSlug
      ].filter(Boolean),
      activo: true,
      destacado: false,
      slug: slug,
      searchTerms: [
        productoManual.value.nombre,
        productoManual.value.descripcion,
        productoManual.value.marca,
        productoManual.value.modelo,
        productoManual.value.categoria,
        productoManual.value.subcategoria
      ].filter(Boolean).map(s => s.toLowerCase()),
      metaTitle: `${productoManual.value.nombre} - ${productoManual.value.marca} ${productoManual.value.modelo} ${productoManual.value.anio}`,
      metaDescription: productoManual.value.descripcion
    }

    console.log('💾 Producto a guardar en Firestore:', producto)

    // Guardar en Firestore
    const productoId = await crearRepuesto(producto)
    console.log('✅ Producto guardado en Firestore con ID:', productoId)
    
    // Actualizar archivo JSON de marca
    try {
      console.log('🔄 Actualizando archivo JSON de marca...')
      await $fetch('/api/admin/actualizar-marca.json', {
        method: 'POST',
        body: {
          marca: producto.marca,
          modelo: producto.modelo,
          año: producto.anio,
          categoria: producto.categoria
        }
      })
      console.log('✅ Archivo JSON de marca actualizado')
    } catch (error) {
      console.error('❌ Error actualizando JSON de marca:', error)
    }
    
    // Mostrar mensaje de éxito
    resultadoProcesamiento.value = {
      exito: true,
      mensaje: 'Producto guardado exitosamente'
    }

    // Recargar productos y limpiar formulario
    console.log('🔄 Recargando productos...')
    await cargarProductos()
    limpiarFormularioManual()

    // Cambiar a tab de ver
    setTimeout(() => {
      tabActivo.value = 'ver'
    }, 1500)
  } catch (error) {
    console.error('❌ Error guardando producto:', error)
    console.error('❌ Detalles del error:', error.message, error.stack)
    resultadoProcesamiento.value = {
      exito: false,
      mensaje: 'Error al guardar el producto',
      detalles: error.message
    }
  } finally {
    guardando.value = false
  }
}

const limpiarFormularioManual = () => {
  productoManual.value = {
    marca: '',
    modelo: '',
    modeloExacto: '',
    anio: null,
    categoria: '',
    subcategoria: '',
    nombre: '',
    descripcion: '',
    precio: '',
    url: '',
    imagen: '',
    stock: true
  }
  modelosDisponibles.value = []
  añosDisponibles.value = []
  subcategoriasDisponibles.value = []
  resultadoProcesamiento.value = null
}

const editarProducto = (producto) => {
  // TODO: Implementar edición
  console.log('Editar producto:', producto)
  alert('Funcionalidad de edición próximamente')
}

const eliminarProducto = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return

  try {
    await eliminarRepuesto(id)
    await cargarProductos()
  } catch (error) {
    console.error('Error eliminando producto:', error)
    alert('Error al eliminar el producto')
  }
}

// Cargar datos iniciales
onMounted(async () => {
  console.log('🚀 Inicializando página de inventario...')
  await cargarProductos()
  cargarCategorias()
  console.log('✅ Página de inventario inicializada')
})
</script>

