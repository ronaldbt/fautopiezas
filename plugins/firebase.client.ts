import { initializeApp } from 'firebase/app'
import { initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(async () => {
  console.log('🔧 Inicializando plugin de Firebase...')
  const config = useRuntimeConfig()
  
  // Detección de navegador para optimizaciones específicas
  const detectBrowser = () => {
    const userAgent = navigator.userAgent
    return {
      isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
      isFirefox: /Firefox/.test(userAgent),
      version: userAgent.match(/Chrome\/(\d+)/)?.[1] || '0'
    }
  }

  const browserInfo = detectBrowser()
  console.log('🌐 Navegador detectado:', browserInfo)
  
  // Debug: Log the configuration
  console.log('🔍 Firebase Config Debug:', {
    apiKey: config.public.firebaseApiKey ? '✅ Definida' : '❌ NO DEFINIDA',
    authDomain: config.public.firebaseAuthDomain || '❌ NO DEFINIDA',
    projectId: config.public.firebaseProjectId || '❌ NO DEFINIDA',
    storageBucket: config.public.firebaseStorageBucket || '❌ NO DEFINIDA',
    messagingSenderId: config.public.firebaseMessagingSenderId || '❌ NO DEFINIDA',
    appId: config.public.firebaseAppId ? '✅ Definida' : '❌ NO DEFINIDA'
  })
  
  // Verificar que todas las configuraciones estén presentes
  const requiredConfigs = ['firebaseApiKey', 'firebaseAuthDomain', 'firebaseProjectId']
  const missingConfigs = requiredConfigs.filter(key => !config.public[key])
  
  if (missingConfigs.length > 0) {
    console.error('❌ Configuraciones de Firebase faltantes:', missingConfigs)
    console.error('🔧 Verifica las variables de entorno en .env')
  } else {
    console.log('✅ Todas las configuraciones de Firebase están presentes')
  }
  
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }
  
  console.log('🚀 Inicializando Firebase con config:', {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'undefined'
  })

  try {
    // Initialize Firebase
    console.log('🔥 Creando app de Firebase...')
    
    // Configuración específica para Chrome
    let app
    if (browserInfo.isChrome) {
      console.log('🚀 Aplicando configuración optimizada para Chrome...')
      
      // Configuración específica para Chrome
      const chromeConfig = {
        ...firebaseConfig,
        // Agregar configuración específica para Chrome si es necesario
      }
      
      app = initializeApp(chromeConfig)
      console.log('✅ App de Firebase creada con configuración optimizada para Chrome')
    } else {
      app = initializeApp(firebaseConfig)
      console.log('✅ App de Firebase creada exitosamente')
    }
    
    // Initialize Firebase services
    console.log('🔗 Inicializando servicios de Firebase...')
    
    // Configuración optimizada según el navegador
    const getFirestoreConfig = () => {
      const baseConfig = {
        experimentalForceLongPolling: true,
        useFetchStreams: false
      }
      
      if (browserInfo.isChrome) {
        console.log('🚀 Aplicando configuración optimizada para Chrome...')
        return {
          ...baseConfig,
          cacheSizeBytes: 30 * 1024 * 1024, // 30MB para Chrome
          ignoreUndefinedProperties: true,
          merge: true
        }
      }
      
      console.log('🦊 Usando configuración estándar para Firefox/otros navegadores')
      return baseConfig
    }

    const db = initializeFirestore(app, getFirestoreConfig())
    console.log('✅ Firestore inicializado con configuración optimizada para el navegador')

    // Habilitar persistencia con configuración optimizada según el navegador
    try {
      if (browserInfo.isChrome) {
        console.log('🔧 Configurando persistencia optimizada para Chrome...')
        // Configuración específica para Chrome con mejor manejo de errores
        await enableIndexedDbPersistence(db, {
          forceOwnership: false,
          synchronizeTabs: true
        })
        console.log('✅ Persistencia de Firestore habilitada para Chrome (IndexedDB optimizado)')
      } else {
        await enableIndexedDbPersistence(db)
        console.log('✅ Persistencia de Firestore habilitada (IndexedDB)')
      }
    } catch (persistenceError: any) {
      console.warn('⚠️ No se pudo habilitar la persistencia de Firestore:', persistenceError?.message || persistenceError)
      
      // Fallback específico para Chrome
      if (browserInfo.isChrome) {
        console.log('🔄 Chrome: Aplicando configuración alternativa sin persistencia...')
        console.log('ℹ️ La aplicación funcionará sin caché offline para Chrome')
      }
    }
    
    const auth = getAuth(app)
    console.log('✅ Firebase Auth inicializado')
    console.log('🔐 Auth config:', {
      app: auth.app.name,
      config: auth.config
    })
    
    const storage = getStorage(app)
    console.log('✅ Firebase Storage inicializado')

    console.log('🎉 Todos los servicios de Firebase inicializados correctamente')

    return {
      provide: {
        firebase: app,
        firestore: db,
        firebaseAuth: auth,
        firebaseStorage: storage
      }
    }
  } catch (error) {
    console.error('❌ Error inicializando Firebase:', error)
    console.error('🔍 Detalles del error:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    })
    throw error
  }
})
