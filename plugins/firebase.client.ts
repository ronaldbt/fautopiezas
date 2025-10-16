import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
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
  
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }
  
  console.log('🚀 Inicializando Firebase con config:', firebaseConfig)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  
  // Initialize Firebase services
  const db = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)

  return {
    provide: {
      firebase: app,
      firestore: db,
      firebaseAuth: auth,
      firebaseStorage: storage
    }
  }
})
