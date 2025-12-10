<template>
  <header 
    :class="`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'shadow-lg' : ''}`"
  >
    <!-- Top Bar - Disappears on scroll with smooth height transition -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-500 ease-in"
      enter-from-class="opacity-100 max-h-20"
      enter-to-class="opacity-100 max-h-20"
      leave-from-class="opacity-100 max-h-20"
      leave-to-class="opacity-0 max-h-0 overflow-hidden"
    >
      <div 
        v-if="!isScrolled"
        class="bg-gradient-to-r from-blue-700 to-blue-600 text-white text-xs overflow-hidden"
      >
        <div class="container mx-auto px-4 py-2 flex justify-between items-center">
          <div class="flex gap-6">
            <a 
              href="tel:+56979796841" 
              class="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +56 9 7979 6841
            </a>
            <a 
              href="mailto:contacto@autopiezas360.cl" 
              class="hidden sm:flex items-center gap-1.5 hover:text-blue-200 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contacto@autopiezas360.cl
            </a>
          </div>
          <div class="flex gap-6 font-medium">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Envío gratis > $500k
            </span>
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Garantía extendida
            </span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Navbar with Soft Gray and Blur -->
    <div 
      :class="`transition-all duration-300 border-b border-gray-200/50 ${
        isScrolled 
          ? 'bg-slate-50/90 backdrop-blur-md py-3' 
          : 'bg-slate-50 py-5'
      }`"
    >
      <div class="container mx-auto px-4 flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="bg-blue-600 text-white p-2.5 rounded-xl font-bold text-xl shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">A</div>
          <div class="leading-none">
            <h1 class="text-xl font-extrabold text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors">Autopiezas360</h1>
            <p class="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block">IMPORTACIÓN DIRECTA</p>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-8 font-medium text-slate-600 text-sm">
          <NuxtLink 
            to="/repuestos" 
            class="relative hover:text-blue-600 transition-colors py-2 group"
          >
            Repuestos
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          
          <!-- Dropdown de Marcas -->
          <div class="relative" @mouseleave="marcasDropdownOpen = false">
            <button 
              @mouseenter="marcasDropdownOpen = true"
              @click="marcasDropdownOpen = !marcasDropdownOpen"
              class="relative hover:text-blue-600 transition-colors py-2 group flex items-center gap-1"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Menu de marcas de vehículos"
            >
              Marcas
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
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
          
          <NuxtLink 
            to="/categorias" 
            class="relative hover:text-blue-600 transition-colors py-2 group"
          >
            Categorías
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          
          <NuxtLink 
            to="/guias" 
            class="relative hover:text-blue-600 transition-colors py-2 group"
          >
            Guías
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          
          <NuxtLink 
            to="/contacto" 
            class="relative hover:text-blue-600 transition-colors py-2 group"
          >
            Contacto
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
          
          <button 
            @click="openWhatsApp"
            class="bg-green-500/10 text-green-600 border border-green-500/20 px-4 py-2 rounded-full text-xs font-bold transition-all hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-2 group"
          >
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:bg-white"></span>
            WhatsApp
          </button>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <button class="p-2.5 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all duration-300 hidden sm:block">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <!-- Carrito -->
          <NuxtLink 
            to="/carrito" 
            class="relative p-2.5 hover:bg-blue-50 rounded-full transition-all group"
          >
            <ShoppingCartIcon class="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
            <span 
              v-if="cantidadItems > 0"
              class="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
            >
              {{ cantidadItems }}
            </span>
          </NuxtLink>
          
          <div class="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-300 ml-2">
            <NuxtLink 
              to="/login" 
              class="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Entrar
            </NuxtLink>
            <NuxtLink 
              to="/registro" 
              class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Registrarse
            </NuxtLink>
          </div>
          
          <!-- Menú móvil -->
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden p-2 text-slate-700 hover:bg-slate-200 rounded-lg"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menú móvil desplegable -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-screen"
        leave-from-class="opacity-100 max-h-screen"
        leave-to-class="opacity-0 max-h-0"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t overflow-hidden">
          <div class="px-4 py-2 space-y-2">
            <NuxtLink to="/repuestos" class="block py-2 text-slate-600 hover:text-blue-600">Repuestos</NuxtLink>
            
            <!-- Marcas móvil -->
            <div>
              <button 
                @click="marcasMobileOpen = !marcasMobileOpen"
                class="flex items-center justify-between w-full py-2 text-slate-600 hover:text-blue-600"
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
            
            <NuxtLink to="/categorias" class="block py-2 text-slate-600 hover:text-blue-600">Categorías</NuxtLink>
            <NuxtLink to="/guias" class="block py-2 text-slate-600 hover:text-blue-600">Guías</NuxtLink>
            <NuxtLink to="/contacto" class="block py-2 text-slate-600 hover:text-blue-600">Contacto</NuxtLink>
            <div class="pt-4 border-t">
              <NuxtLink to="/login" class="block py-2 text-slate-600 hover:text-blue-600">Entrar</NuxtLink>
              <NuxtLink to="/registro" class="block py-2 text-blue-600 hover:text-blue-700">Registrarse</NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'

// Composables
const { cantidadItems } = useCarrito()

// Estado del scroll
const isScrolled = ref(false)

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

// Función para manejar el scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// Agregar listener de scroll
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Verificar estado inicial
})

// Remover listener de scroll
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

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
