<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
    <!-- Barra de navegación superior -->
    <div class="bg-blue-600 text-white py-2">
      <div class="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm">
        <div class="flex items-center space-x-4">
          <span>📞 +56979796841</span>
          <span>✉️ contacto@autopiezas360.cl</span>
        </div>
        <div class="flex items-center space-x-4">
          <span>🚚 Envío gratis sobre $500.000</span>
          <span>🛡️ Garantía extendida</span>
        </div>
      </div>
    </div>

    <!-- Navegación principal -->
    <nav class="bg-white border-b">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-800">Autopiezas360</h1>
                <p class="text-xs text-gray-500">importa y ahorra hasta un 50%</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Navegación central -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/repuestos" class="text-gray-700 hover:text-blue-600 font-medium">Repuestos</NuxtLink>
            
            <!-- Dropdown de Marcas -->
            <div class="relative" @mouseleave="marcasDropdownOpen = false">
              <button 
                @mouseenter="marcasDropdownOpen = true"
                @click="marcasDropdownOpen = !marcasDropdownOpen"
                class="text-gray-700 hover:text-blue-600 font-medium flex items-center space-x-1"
                aria-expanded="false"
                aria-haspopup="true"
                aria-label="Menu de marcas de vehículos"
              >
                <span>Marcas</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Dropdown menu -->
              <div 
                v-if="marcasDropdownOpen"
                class="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <!-- Header del dropdown -->
                <div class="p-4 border-b border-gray-100">
                  <h3 class="font-semibold text-gray-800">Todas las Marcas</h3>
                  <p class="text-sm text-gray-600">{{ marcas.length }}+ marcas disponibles</p>
                  
                  <!-- Marcas destacadas / Alta gama -->
                  <div class="mt-3">
                    <p class="text-xs font-medium text-blue-600 mb-2">ALTA GAMA:</p>
                    <div class="flex flex-wrap gap-2">
                      <NuxtLink 
                        v-for="marca in marcasDestacadas" 
                        :key="marca.slug"
                        :to="`/repuestos/${marca.slug}`"
                        class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors"
                        @click="marcasDropdownOpen = false"
                      >
                        {{ marca.nombre }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                
                <!-- Lista de marcas con scroll -->
                <div class="max-h-96 overflow-y-auto">
                  <div class="grid grid-cols-2 gap-1 p-2">
                    <NuxtLink 
                      v-for="marca in marcas" 
                      :key="marca.slug"
                      :to="`/repuestos/${marca.slug}`"
                      class="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                      @click="marcasDropdownOpen = false"
                    >
                      <div class="flex items-center justify-between">
                        <span class="font-medium">{{ marca.nombre }}</span>
                        <span class="text-xs text-gray-500">{{ marca.modelos }}+</span>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
                
                <!-- Footer del dropdown -->
                <div class="p-3 border-t border-gray-100 bg-gray-50">
                  <NuxtLink 
                    to="/repuestos" 
                    class="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    @click="marcasDropdownOpen = false"
                  >
                    Ver todas las marcas →
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <NuxtLink to="/categorias" class="text-gray-700 hover:text-blue-600 font-medium">Categorías</NuxtLink>
            <NuxtLink to="/guias" class="text-gray-700 hover:text-blue-600 font-medium">Guías</NuxtLink>
            <NuxtLink to="/contacto" class="text-gray-700 hover:text-blue-600 font-medium">Contacto</NuxtLink>
          </div>

          <!-- Botones de autenticación -->
          <div class="flex items-center space-x-4">
            <button 
              @click="openWhatsApp"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </button>
            
            <NuxtLink 
              to="/login" 
              class="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-500 transition-colors"
            >
              Iniciar Sesión
            </NuxtLink>
            
            <NuxtLink 
              to="/registro" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Registrarse
            </NuxtLink>
          </div>

          <!-- Menú móvil -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Menú móvil desplegable -->
        <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
          <div class="px-4 py-2 space-y-2">
            <NuxtLink to="/repuestos" class="block py-2 text-gray-700 hover:text-blue-600">Repuestos</NuxtLink>
            
            <!-- Marcas móvil -->
            <div>
              <button 
                @click="marcasMobileOpen = !marcasMobileOpen"
                class="flex items-center justify-between w-full py-2 text-gray-700 hover:text-blue-600"
              >
                <span>Marcas</span>
                <svg 
                  :class="{ 'transform rotate-180': marcasMobileOpen }"
                  class="w-4 h-4 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Submenu de marcas -->
              <div v-if="marcasMobileOpen" class="pl-4 mt-2 max-h-64 overflow-y-auto bg-gray-50 rounded-md">
                <div class="py-2 space-y-1">
                  <NuxtLink 
                    v-for="marca in marcas.slice(0, 20)" 
                    :key="marca.slug"
                    :to="`/repuestos/${marca.slug}`"
                    class="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600"
                    @click="mobileMenuOpen = false"
                  >
                    {{ marca.nombre }}
                  </NuxtLink>
                  <NuxtLink 
                    to="/repuestos" 
                    class="block px-3 py-2 text-sm text-blue-600 font-medium border-t border-gray-200 mt-2 pt-2"
                    @click="mobileMenuOpen = false"
                  >
                    Ver todas las marcas →
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <NuxtLink to="/categorias" class="block py-2 text-gray-700 hover:text-blue-600">Categorías</NuxtLink>
            <NuxtLink to="/guias" class="block py-2 text-gray-700 hover:text-blue-600">Guías</NuxtLink>
            <NuxtLink to="/contacto" class="block py-2 text-gray-700 hover:text-blue-600">Contacto</NuxtLink>
            <div class="pt-4 border-t">
              <NuxtLink to="/login" class="block py-2 text-gray-700 hover:text-blue-600">Iniciar Sesión</NuxtLink>
              <NuxtLink to="/registro" class="block py-2 text-blue-600 hover:text-blue-700">Registrarse</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

// Estado del menú móvil
const mobileMenuOpen = ref(false)

// Estado del dropdown de marcas
const marcasDropdownOpen = ref(false)

// Estado del menú móvil de marcas
const marcasMobileOpen = ref(false)

// Obtener marcas desde el composable
const { getMarcas } = useVehiculos()
const marcas = getMarcas()

// Marcas destacadas de alta gama para SEO
const marcasDestacadas = marcas.filter(marca => 
  ['audi', 'bmw', 'mercedes-benz', 'porsche', 'volvo', 'ford'].includes(marca.slug)
)

// Función para abrir WhatsApp
const openWhatsApp = () => {
  const mensaje = `Hola! Me interesa consultar sobre repuestos. ¿Podrían ayudarme?`
  const numeroWhatsApp = '+56979796841'
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
  
  window.open(urlWhatsApp, '_blank')
}

// Función para toggle del menú móvil
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
