// Script para verificar la configuración de Firebase
console.log('🔍 Verificando configuración de Firebase...\n')

const config = {
  apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID
}

console.log('✅ Variables de entorno:')
Object.keys(config).forEach(key => {
  const value = config[key]
  if (value) {
    console.log(`   ${key}: ${value.substring(0, 20)}${value.length > 20 ? '...' : ''}`)
  } else {
    console.log(`   ❌ ${key}: NO DEFINIDA`)
  }
})

console.log('\n🔗 URLs de Firebase:')
console.log(`   Auth Domain: https://${config.authDomain}`)
console.log(`   Project ID: ${config.projectId}`)
console.log(`   API Key: ${config.apiKey ? 'Definida' : 'NO DEFINIDA'}`)

console.log('\n📋 Configuración completa:')
console.log(JSON.stringify(config, null, 2))


