// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  modules: [
    '@pinia/nuxt',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Firebase en chunk separado
            if (id.includes('firebase')) return 'firebase'
            
            // Vue core
            if (id.includes('vue/') || id.includes('@vue/')) return 'vue-core'
            
            // UI Libraries
            if (id.includes('tailwindcss') || id.includes('@tailwindcss')) return 'ui-framework'
            
            // PDF and Canvas libs (heavy)
            if (id.includes('jspdf') || id.includes('html2canvas')) return 'pdf-utils'
            
            // Nuxt framework
            if (id.includes('nuxt') || id.includes('@nuxt')) return 'nuxt-framework'
            
            // Router
            if (id.includes('vue-router')) return 'router'
            
            // Other node_modules
            if (id.includes('node_modules')) return 'vendor'
            
            return undefined
          }
        }
      }
    },
    server: {
      watch: {
        usePolling: false,
        useFsEvents: false,
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.nuxt/**', '**/msrepuestos-data/**']
      }
    }
  },

  // Optimizaciones para Core Web Vitals
  experimental: {
    payloadExtraction: true
  },
  
  runtimeConfig: {
    // Variables privadas (solo en servidor)
    firebaseServiceAccountKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    
    // Variables públicas (disponibles en cliente)
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID
    }
  },

  // Configuración de generación y SSR híbrido
  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2,
      nodeVersion: '18'
    },
    prerender: {
      routes: [
        // Páginas principales
        '/',
        '/repuestos',
        '/sitemap.xml',
        // Marcas principales con servicio de importación
        '/repuestos/toyota',
        '/repuestos/nissan',
        '/repuestos/chevrolet',
        '/repuestos/bmw',
        '/repuestos/hyundai',
        '/repuestos/ford',
        '/repuestos/volkswagen',
        '/repuestos/honda',
        '/repuestos/mazda',
        '/repuestos/kia',
        '/repuestos/audi',
        '/repuestos/mercedes-benz',
        // Modelos populares Toyota
        '/repuestos/toyota/corolla',
        '/repuestos/toyota/camry',
        '/repuestos/toyota/rav4',
        '/repuestos/toyota/prius',
        '/repuestos/toyota/hilux',
        // Modelos populares Nissan
        '/repuestos/nissan/sentra',
        '/repuestos/nissan/altima',
        '/repuestos/nissan/x-trail',
        '/repuestos/nissan/qashqai',
        // Modelos populares Chevrolet
        '/repuestos/chevrolet/cruze',
        '/repuestos/chevrolet/spark',
        '/repuestos/chevrolet/aveo',
        // Categorías principales - importación disponible
        '/categoria/frenos',
        '/categoria/motor',
        '/categoria/suspension',
        '/categoria/transmision',
        '/categoria/electricidad',
        '/categoria/carroceria',
        '/categoria/filtros',
        '/categoria/aceites',
        // Combinaciones marca + categoría populares
        '/repuestos/toyota/frenos',
        '/repuestos/toyota/motor',
        '/repuestos/nissan/frenos',
        '/repuestos/chevrolet/frenos',
        '/repuestos/bmw/frenos',
        '/repuestos/hyundai/frenos',
        '/repuestos/ford/frenos',
        // Páginas de servicios
        '/contacto',
        '/sobre-nosotros',
        '/como-comprar',
        '/garantias'
      ]
    },
    // Optimización para rendimiento
    minify: false,
    compressPublicAssets: true
  },

  // Configuración SSG para Firebase Hosting
  ssr: false,

  // Configuración de SEO y Google
  app: {
    head: {
      htmlAttrs: {
        lang: 'es-CL'
      },
      title: 'AutoPiezas360 - Repuestos Importados para Vehículos en Chile',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Repuestos importados para tu vehículo con 50% de descuento. Importación directa desde fábrica. Toyota, Nissan, Chevrolet, BMW y más marcas. Envío a todo Chile en 7 días.' },
        { name: 'keywords', content: 'repuestos importados, autopartes chile, toyota, nissan, chevrolet, bmw, repuestos baratos, descuento 50%, importación directa, audi chile, mercedes benz chile, ford raptor chile, volvo chile, repuestos alta gama, repuestos premium, difíciles de encontrar' },
        { name: 'author', content: 'AutoPiezas360' },
        { name: 'robots', content: 'index, follow' },
        { name: 'geo.region', content: 'CL' },
        { name: 'geo.country', content: 'Chile' },
        { name: 'geo.placename', content: 'Santiago, Chile' },
        { name: 'ICBM', content: '-33.4489,-70.6693' },
        { property: 'og:title', content: 'AutoPiezas360 - Repuestos Importados con 50% Descuento' },
        { property: 'og:description', content: 'Repuestos importados directamente desde fábrica con 50% de descuento. Envío a todo Chile en 7 días.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://autopiezas360.cl' },
        { property: 'og:image', content: 'https://autopiezas360.cl/og-image.jpg' },
        { property: 'og:locale', content: 'es_CL' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AutoPiezas360 - Repuestos Importados 50% Descuento' },
        { name: 'twitter:description', content: 'Repuestos importados con 50% descuento. Envío Chile en 7 días.' },
      ],
      link: [
        { rel: 'canonical', href: 'https://autopiezas360.cl' },
        { rel: 'alternate', hreflang: 'es-CL', href: 'https://autopiezas360.cl' },
        { rel: 'alternate', hreflang: 'es', href: 'https://autopiezas360.cl' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://autopiezas360.cl' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
      ]
    }
  }
})