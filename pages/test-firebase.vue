<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Test Firebase Configuration</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Configuración de Firebase:</h2>
      
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <span class="font-medium">API Key:</span>
          <span :class="firebaseConfig.apiKey ? 'text-green-600' : 'text-red-600'">
            {{ firebaseConfig.apiKey ? '✅ Definida' : '❌ NO DEFINIDA' }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="font-medium">Auth Domain:</span>
          <span :class="firebaseConfig.authDomain ? 'text-green-600' : 'text-red-600'">
            {{ firebaseConfig.authDomain || '❌ NO DEFINIDA' }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="font-medium">Project ID:</span>
          <span :class="firebaseConfig.projectId ? 'text-green-600' : 'text-red-600'">
            {{ firebaseConfig.projectId || '❌ NO DEFINIDA' }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="font-medium">Storage Bucket:</span>
          <span :class="firebaseConfig.storageBucket ? 'text-green-600' : 'text-red-600'">
            {{ firebaseConfig.storageBucket || '❌ NO DEFINIDA' }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="font-medium">Messaging Sender ID:</span>
          <span :class="firebaseConfig.messagingSenderId ? 'text-green-600' : 'text-red-600'">
            {{ firebaseConfig.messagingSenderId || '❌ NO DEFINIDA' }}
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <span class="font-medium">App ID:</span>
          <span :class="firebaseConfig.appId ? 'text-green-600' : 'text-red-600'">
            {{ firebaseConfig.appId ? '✅ Definida' : '❌ NO DEFINIDA' }}
          </span>
        </div>
      </div>
      
      <div class="mt-6">
        <h3 class="font-semibold mb-2">Estado de los Servicios:</h3>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <span class="font-medium">Firebase App:</span>
            <span :class="firebaseApp ? 'text-green-600' : 'text-red-600'">
              {{ firebaseApp ? '✅ Inicializado' : '❌ NO INICIALIZADO' }}
            </span>
          </div>
          
          <div class="flex items-center space-x-2">
            <span class="font-medium">Firestore:</span>
            <span :class="firestore ? 'text-green-600' : 'text-red-600'">
              {{ firestore ? '✅ Conectado' : '❌ NO CONECTADO' }}
            </span>
          </div>
          
          <div class="flex items-center space-x-2">
            <span class="font-medium">Auth:</span>
            <span :class="auth ? 'text-green-600' : 'text-red-600'">
              {{ auth ? '✅ Conectado' : '❌ NO CONECTADO' }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="mt-6">
        <button 
          @click="testLogin" 
          :disabled="!auth"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Probar Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $firebase, $firestore, $firebaseAuth } = useNuxtApp()
const config = useRuntimeConfig()

const firebaseConfig = computed(() => ({
  apiKey: config.public.firebaseApiKey,
  authDomain: config.public.firebaseAuthDomain,
  projectId: config.public.firebaseProjectId,
  storageBucket: config.public.firebaseStorageBucket,
  messagingSenderId: config.public.firebaseMessagingSenderId,
  appId: config.public.firebaseAppId
}))

const firebaseApp = computed(() => $firebase)
const firestore = computed(() => $firestore)
const auth = computed(() => $firebaseAuth)

const testLogin = async () => {
  try {
    console.log('🧪 Probando login...')
    console.log('Auth object:', $firebaseAuth)
    console.log('Config:', firebaseConfig.value)
  } catch (error) {
    console.error('❌ Error en test:', error)
  }
}

useHead({
  title: 'Test Firebase - AutoVentas360'
})
</script>




