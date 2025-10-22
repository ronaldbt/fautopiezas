export default defineNuxtPlugin(() => {
  if (process.client && /Chrome/.test(navigator.userAgent)) {
    console.log('🔍 Modo debug Chrome activado')
    
    // Exponer información útil para debugging
    window.chromeDebug = {
      version: navigator.userAgent.match(/Chrome\/(\d+)/)?.[1],
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      localStorage: {
        clear: () => {
          localStorage.clear()
          console.log('🧹 localStorage limpiado')
        },
        getFirebaseData: () => {
          const firebaseKeys = Object.keys(localStorage).filter(key => key.includes('firebase'))
          return firebaseKeys.reduce((acc, key) => {
            acc[key] = localStorage.getItem(key)
            return acc
          }, {})
        },
        clearFirebaseData: () => {
          const keysToRemove = Object.keys(localStorage).filter(key => 
            key.includes('firebase') || key.includes('quic') || key.includes('chrome')
          )
          keysToRemove.forEach(key => localStorage.removeItem(key))
          console.log('🧹 Datos de Firebase limpiados:', keysToRemove)
        }
      },
      sessionStorage: {
        clear: () => {
          sessionStorage.clear()
          console.log('🧹 sessionStorage limpiado')
        }
      },
      quic: {
        disable: () => {
          // Intentar deshabilitar QUIC
          console.log('🔧 Intentando deshabilitar QUIC...')
          // Esto requeriría configuración del navegador
          console.log('ℹ️ Para deshabilitar QUIC permanentemente, ve a chrome://flags/#enable-quic y desactívalo')
        },
        testConnection: async () => {
          try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ test: true })
            })
            console.log('✅ Conexión de prueba exitosa')
            return true
          } catch (error) {
            console.error('❌ Error de conexión:', error)
            return false
          }
        }
      }
    }
    
    console.log('🛠️ Chrome debug tools disponibles en window.chromeDebug')
  }
})
