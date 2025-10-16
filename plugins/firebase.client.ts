import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
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
    const db = getFirestore(app)
    console.log('✅ Firestore inicializado')
    
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
