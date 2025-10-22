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
        }
      },
      sessionStorage: {
        clear: () => {
          sessionStorage.clear()
          console.log('🧹 sessionStorage limpiado')
        }
      }
    }
    
    console.log('🛠️ Chrome debug tools disponibles en window.chromeDebug')
  }
})
