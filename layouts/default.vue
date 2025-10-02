<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header fijo -->
    <Header />
    
    <!-- Main content -->
    <main>
      <slot />
    </main>
    
    <!-- Botón flotante de WhatsApp -->
    <WhatsAppFloating />
    
    <!-- Footer AutoPiezas360 -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">🚗 AutoPiezas360 Chile</h3>
            <p class="text-gray-300 text-sm">
              Importación de repuestos para autos con 50% de descuento. Entrega en 7 días, garantía extendida.
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
              <li>📞 +56 9 7979 6841</li>
              <li>✉️ info@autopiezas360.cl</li>
              <li>📍 Santiago, Chile</li>
              <li>🕒 Lun-Vie: 9:00-18:00</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {{ new Date().getFullYear() }} AutoPiezas360 Chile. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

