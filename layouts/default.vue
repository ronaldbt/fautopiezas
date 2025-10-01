<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header FAutopiezas -->
    <header class="bg-white shadow-lg border-b">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700">
            🚗 FAutopiezas Chile
          </NuxtLink>
          <nav class="hidden md:flex space-x-6">
            <NuxtLink to="/repuestos" class="text-gray-700 hover:text-blue-600 font-medium">
              Catálogo
            </NuxtLink>
            <NuxtLink to="/repuestos/toyota" class="text-gray-700 hover:text-blue-600 font-medium">
              Toyota
            </NuxtLink>
            <NuxtLink to="/repuestos/nissan" class="text-gray-700 hover:text-blue-600 font-medium">
              Nissan
            </NuxtLink>
            <NuxtLink to="/repuestos/chevrolet" class="text-gray-700 hover:text-blue-600 font-medium">
              Chevrolet
            </NuxtLink>
          </nav>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">📞 +56 2 2345 6789</span>
            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Main content -->
    <main>
      <slot />
    </main>
    
    <!-- Footer FAutopiezas -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">🚗 FAutopiezas Chile</h3>
            <p class="text-gray-300 text-sm">
              Los mejores repuestos para autos en Chile. Stock inmediato, envío gratis, garantía extendida.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Marcas Principales</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><NuxtLink to="/repuestos/toyota" class="hover:text-white">Repuestos Toyota</NuxtLink></li>
              <li><NuxtLink to="/repuestos/nissan" class="hover:text-white">Repuestos Nissan</NuxtLink></li>
              <li><NuxtLink to="/repuestos/chevrolet" class="hover:text-white">Repuestos Chevrolet</NuxtLink></li>
              <li><NuxtLink to="/repuestos/bmw" class="hover:text-white">Repuestos BMW</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Categorías</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><NuxtLink to="/repuestos" class="hover:text-white">Motor</NuxtLink></li>
              <li><NuxtLink to="/repuestos" class="hover:text-white">Frenos</NuxtLink></li>
              <li><NuxtLink to="/repuestos" class="hover:text-white">Suspensión</NuxtLink></li>
              <li><NuxtLink to="/repuestos" class="hover:text-white">Eléctrico</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Contacto</h4>
            <ul class="space-y-2 text-sm text-gray-300">
              <li>📞 +56 2 2345 6789</li>
              <li>✉️ info@fautopiezas.cl</li>
              <li>📍 Santiago, Chile</li>
              <li>🕒 Lun-Vie: 9:00-18:00</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {{ new Date().getFullYear() }} FAutopiezas Chile. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

