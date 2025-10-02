// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    // Variables privadas (solo en servidor)
    firebaseServiceAccountKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    
    // Variables públicas (disponibles en cliente)
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID
    }
  },

  // Configuración de generación estática
  nitro: {
    prerender: {
      routes: [
        '/',
        '/repuestos',
        '/sitemap.xml',
        '/repuestos/toyota',
        '/repuestos/nissan',
        '/repuestos/chevrolet',
        '/repuestos/bmw',
        '/repuestos/hyundai'
      ]
    }
  },

  // Configuración para Firebase Hosting
  ssr: false,

  // Configuración de SEO y Google
  app: {
    head: {
      title: 'FAutopiezas - Repuestos Originales para Vehículos en Chile',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'Encuentra repuestos originales para tu vehículo en Chile. Toyota, Nissan, Chevrolet, BMW y más marcas. Envío a todo el país.' },
        { name: 'keywords', content: 'repuestos, autopartes, toyota, nissan, chevrolet, bmw, chile, originales' },
        { name: 'author', content: 'FAutopiezas' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'FAutopiezas - Repuestos Originales para Vehículos' },
        { property: 'og:description', content: 'Encuentra repuestos originales para tu vehículo en Chile' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://autopiezas360.cl' },
        { property: 'og:image', content: 'https://autopiezas360.cl/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'FAutopiezas - Repuestos Originales' },
        { name: 'twitter:description', content: 'Encuentra repuestos originales para tu vehículo en Chile' },
        { name: 'google-site-verification', content: 'TU_CODIGO_DE_VERIFICACION_AQUI' }
      ],
      link: [
        { rel: 'canonical', href: 'https://autopiezas360.cl' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
      ]
    }
  }
})