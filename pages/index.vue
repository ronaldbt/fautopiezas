<template>
  <div>
    <!-- Hero Section -->
    <section class="relative pt-36 pb-24 overflow-hidden">
      <!-- Modern Background Gradient -->
      <div 
        class="absolute inset-0 z-0" 
        style="background: radial-gradient(ellipse at top right, rgb(37 99 235), rgb(30 64 175), rgb(15 23 42));"
      ></div>
      
      <!-- Animated Overlay Shapes -->
      <div class="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl z-0 pointer-events-none animate-spin-slow"></div>
      <div class="absolute -bottom-1/2 -left-1/2 w-full h-full bg-indigo-500/10 rounded-full blur-3xl z-0 pointer-events-none animate-spin-reverse-slow"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center mb-10">
          <!-- Título principal -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Repuestos para Autos en Chile
          </h1>
          
          <!-- Descripción -->
          <p class="text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto mb-4 font-light whitespace-nowrap">
            Importación de repuestos para Toyota, Nissan, Chevrolet, BMW, Hyundai y 74+ marcas.
          </p>
          
          <p class="text-lg mb-8 text-blue-100/90">
            🚚 En 7 días están en tu casa • Garantía extendida • Los mejores precios de Chile
          </p>
        </div>

        <!-- Search Card -->
        <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/30 p-1 ring-1 ring-white/50 max-w-5xl mx-auto mb-10">
          <div class="bg-white rounded-[20px] p-6 md:p-8">
            <!-- Selector de Vehículo (mantiene funcionalidad) -->
            <div class="[&>div]:bg-transparent [&>div]:shadow-none [&>div]:p-0">
              <SelectorVehiculo />
            </div>
          </div>
        </div>
        
        <!-- Trust Signals & CTA -->
        <div class="mt-10 flex flex-col items-center">
          <NuxtLink 
            to="/repuestos" 
            class="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-4 rounded-full font-bold shadow-xl shadow-orange-500/20 transition-all mb-8 flex items-center gap-2 border-b-4 border-orange-700 hover:scale-105 active:scale-95"
          >
            Ver Catálogo Completo
          </NuxtLink>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-white/80">
            <div class="flex flex-col items-center gap-2 group">
              <div class="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-xs font-bold text-white uppercase tracking-wider">Pago Seguro</p>
                <p class="text-[10px] opacity-70">Webpay / Transferencia</p>
              </div>
            </div>

            <div class="flex flex-col items-center gap-2 group">
              <div class="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-xs font-bold text-white uppercase tracking-wider">Envíos Rápidos</p>
                <p class="text-[10px] opacity-70">A todo Chile</p>
              </div>
            </div>

            <div class="flex flex-col items-center gap-2 group">
              <div class="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-xs font-bold text-white uppercase tracking-wider">Garantía Real</p>
                <p class="text-[10px] opacity-70">Hasta 6 meses</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center gap-2 group">
              <div class="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-xs font-bold text-white uppercase tracking-wider">Hasta 6 Cuotas</p>
                <p class="text-[10px] opacity-70">Sin interés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenido principal -->
    <main>

    <!-- Marcas Principales -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          Repuestos por Marca Automotriz
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          <div v-for="marca in getMarcasPopulares()" :key="marca.slug" 
               class="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow">
            <NuxtLink :to="`/repuestos/${marca.slug}`" class="block" :title="`Repuestos ${marca.nombre} Chile - Ver catálogo completo`">
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
        
        <!-- Enlaces internos adicionales para SEO -->
        <div class="mt-8 text-center">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Explora por Categoría</h3>
          <div class="flex flex-wrap justify-center gap-2">
            <NuxtLink to="/repuestos" class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded-full">Ver Todas las Marcas</NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/repuestos/toyota" class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded-full">Repuestos Toyota</NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/repuestos/nissan" class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded-full">Repuestos Nissan</NuxtLink>
            <span class="text-gray-400">•</span>
            <NuxtLink to="/repuestos/bmw" class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded-full">Repuestos BMW</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Repuestos de Alta Gama -->
    <section class="py-16 bg-blue-50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-4 text-gray-800">
          Repuestos de Alta Gama - Difíciles de Encontrar en Chile
        </h2>
        <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Especializados en importación directa de repuestos para vehículos premium: <strong>Audi, BMW, Mercedes-Benz, Ford Raptor, Volvo, Porsche</strong> y más. 
          Los conseguimos aunque no los tenga nadie más en Chile.
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink to="/repuestos/audi" class="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow hover:bg-blue-50">
            <h3 class="font-bold text-lg text-blue-600 mb-1">AUDI</h3>
            <p class="text-xs text-gray-600">Repuestos premium</p>
          </NuxtLink>
          <NuxtLink to="/repuestos/bmw" class="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow hover:bg-blue-50">
            <h3 class="font-bold text-lg text-blue-600 mb-1">BMW</h3>
            <p class="text-xs text-gray-600">Piezas importadas</p>
          </NuxtLink>
          <NuxtLink to="/repuestos/mercedes-benz" class="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow hover:bg-blue-50">
            <h3 class="font-bold text-lg text-blue-600 mb-1">MERCEDES-BENZ</h3>
            <p class="text-xs text-gray-600">Alta calidad</p>
          </NuxtLink>
          <NuxtLink to="/repuestos/ford" class="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow hover:bg-blue-50">
            <h3 class="font-bold text-lg text-blue-600 mb-1">FORD RAPTOR</h3>
            <p class="text-xs text-gray-600">Piezas especiales</p>
          </NuxtLink>
          <NuxtLink to="/repuestos/volvo" class="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow hover:bg-blue-50">
            <h3 class="font-bold text-lg text-blue-600 mb-1">VOLVO</h3>
            <p class="text-xs text-gray-600">Seguridad sueca</p>
          </NuxtLink>
          <NuxtLink to="/repuestos/porsche" class="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow hover:bg-blue-50">
            <h3 class="font-bold text-lg text-blue-600 mb-1">PORSCHE</h3>
            <p class="text-xs text-gray-600">Alto rendimiento</p>
          </NuxtLink>
        </div>

        <div class="text-center mt-8">
          <div class="bg-orange-100 border border-orange-300 rounded-lg p-6 inline-block">
            <h3 class="text-lg font-bold text-orange-800 mb-2">¿No encuentras el repuesto?</h3>
            <p class="text-orange-700 mb-4">Si no está en stock, lo importamos especialmente para ti</p>
            <p class="text-sm text-orange-600">✅ Conseguimos cualquier pieza • ⏱️ 7-14 días • 💰 Hasta 50% menos</p>
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
          ¿Por Qué Elegir AutoPiezas360 Chile?
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-bold text-blue-600 mb-4">✅ Repuestos de Calidad</h3>
            <p class="text-gray-700">
              Trabajamos directamente con distribuidores oficiales de Toyota, Nissan, Chevrolet, BMW, Hyundai y más de 70 marcas. 
              Todos nuestros repuestos tienen garantía de fábrica.
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-bold text-blue-600 mb-4">🚚 Envío Gratis a Todo Chile</h3>
            <p class="text-gray-700">
              Despacho el mismo día en Santiago, 
              y entrega en 24-48 horas en regiones. Cobertura desde Arica a Punta Arenas.
            </p>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-md">
            <h3 class="text-xl font-bold text-blue-600 mb-4">📦 Importación de Repuestos</h3>
            <p class="text-gray-700">
              Nosotros importamos repuestos de la mejor calidad y llegan en 7 días, te puedes ahorrar hasta un 50%. 
              Más de 50.000 referencias diferentes disponibles.
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
              <strong>AutoPiezas360 Chile</strong> es la tienda de repuestos automotrices líder en Chile, especializada en autopartes de calidad 
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
            
            <h4 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Repuestos de Alta Gama Difíciles de Encontrar</h4>
            <p class="mb-4">
              Especializados en <strong>repuestos Audi Chile</strong>, <strong>repuestos BMW Chile</strong>, <strong>repuestos Mercedes-Benz Chile</strong>, 
              <strong>repuestos Ford Raptor Chile</strong>, <strong>repuestos Volvo Chile</strong>, <strong>repuestos Porsche Chile</strong>, 
              <strong>repuestos Jaguar Chile</strong> y <strong>repuestos Land Rover Chile</strong>. Si no lo encuentra en stock tradicional, 
              nosotros lo importamos directamente desde fábrica con hasta 50% de descuento.
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
                <h5 class="font-semibold text-gray-800 mb-2">Alta Gama:</h5>
                <ul class="space-y-1 text-gray-600">
                  <li>• Repuestos Audi Chile</li>
                  <li>• Repuestos Mercedes-Benz Chile</li>
                  <li>• Repuestos Ford Raptor Chile</li>
                  <li>• Repuestos Volvo Chile</li>
                  <li>• Repuestos Porsche Chile</li>
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
                  <li>• Envío Gratis a todo Chile</li>
                  <li>• Entrega en 24-48 horas</li>
                  <li>• Garantía hasta 12 meses</li>
                  <li>• Asesoría técnica especializada</li>
                  <li>• Repuestos de calidad garantizada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </main>

    <!-- Botón flotante de WhatsApp -->
    <WhatsAppFloating />
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

// Variables reactivas para búsqueda (simplificadas)
const searchMessage = ref('')

// SEO Meta para homepage usando composable
const { setPageSEO, setStructuredData } = useSEO()

setPageSEO('home')
setStructuredData('website')

// Structured data adicional para página principal
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://autopiezas360.cl/#organization",
            "name": "AutoPiezas360 Chile",
            "url": "https://autopiezas360.cl",
            "logo": {
              "@type": "ImageObject",
              "url": "https://autopiezas360.cl/logo.png",
              "width": 300,
              "height": 100
            },
            "sameAs": [
              "https://www.facebook.com/autopiezas360",
              "https://www.instagram.com/autopiezas360"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+56979796841",
              "contactType": "customer service",
              "areaServed": "CL",
              "availableLanguage": "Spanish"
            }
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://autopiezas360.cl/#localbusiness",
            "name": "AutoPiezas360 Chile",
            "description": "Importación de repuestos automotrices directo de fábrica con 50% de descuento. Entrega en 7 días a todo Chile. Más de 70 marcas disponibles.",
            "url": "https://autopiezas360.cl",
            "telephone": "+56979796841",
            "priceRange": "$15000-$500000",
            "currenciesAccepted": "CLP",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Santiago de Chile",
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
            "areaServed": {
              "@type": "Country",
              "name": "Chile"
            },
            "brand": [
          { "@type": "Brand", "name": "Toyota" },
          { "@type": "Brand", "name": "Nissan" },
          { "@type": "Brand", "name": "Chevrolet" },
          { "@type": "Brand", "name": "BMW" },
          { "@type": "Brand", "name": "Hyundai" },
          { "@type": "Brand", "name": "Audi" },
          { "@type": "Brand", "name": "Mercedes-Benz" },
          { "@type": "Brand", "name": "Ford" },
          { "@type": "Brand", "name": "Volvo" },
          { "@type": "Brand", "name": "Porsche" },
              { "@type": "Brand", "name": "Jaguar" },
              { "@type": "Brand", "name": "Land Rover" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Catálogo de Repuestos AutoPiezas360",
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
          }
        ]
      })
    }
  ]
})
</script>
