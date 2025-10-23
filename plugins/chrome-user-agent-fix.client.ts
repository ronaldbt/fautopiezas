export default defineNuxtPlugin(() => {
  if (process.client && /Chrome/.test(navigator.userAgent)) {
    console.log('🔧 Configurando optimizaciones para Chrome...')
    
    // Detectar versión de Chrome
    const isChrome = /Chrome/.test(navigator.userAgent)
    const chromeVersion = navigator.userAgent.match(/Chrome\/(\d+)/)?.[1]
    
    if (isChrome && parseInt(chromeVersion) >= 100) {
      console.log('🔧 Chrome versión moderna detectada, aplicando configuración optimizada...')
      
      // Solo modificar User-Agent si es necesario
      const originalUserAgent = navigator.userAgent
      const modifiedUserAgent = originalUserAgent.replace(
        /Chrome\/\d+\.\d+\.\d+\.\d+/,
        'Chrome/91.0.4472.124'
      )
      
      // Interceptar navigator.userAgent de manera sutil
      Object.defineProperty(navigator, 'userAgent', {
        get: function() {
          return modifiedUserAgent
        },
        configurable: true
      })
      
      console.log('✅ User-Agent optimizado para Chrome:', modifiedUserAgent)
    }
    
    console.log('✅ Optimizaciones para Chrome configuradas')
  }
})
