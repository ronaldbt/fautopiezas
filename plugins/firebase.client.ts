import { initializeApp } from 'firebase/app'
import { initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(async () => {
  console.log('🔧 Inicializando plugin de Firebase...')
  const config = useRuntimeConfig()
  
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
    const app = initializeApp(firebaseConfig)
    console.log('✅ App de Firebase creada exitosamente')
    
    // Initialize Firebase services
    console.log('🔗 Inicializando servicios de Firebase...')
    // Forzar long-polling para evitar problemas con CORS/Service Worker
    const db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false
    })
    console.log('✅ Firestore inicializado (long-polling habilitado)')

    // Habilitar persistencia para disponer de caché si la red falla
    try {
      await enableIndexedDbPersistence(db)
      console.log('✅ Persistencia de Firestore habilitada (IndexedDB)')
    } catch (persistenceError: any) {
      console.warn('⚠️ No se pudo habilitar la persistencia de Firestore:', persistenceError?.message || persistenceError)
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
