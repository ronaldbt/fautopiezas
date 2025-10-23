export default defineNuxtPlugin(() => {
  if (process.client && /Chrome/.test(navigator.userAgent)) {
    console.log('🔧 Configurando fix de User-Agent para evitar QUIC...')
    
    // Detectar si es Chrome y tiene problemas con QUIC
    const isChrome = /Chrome/.test(navigator.userAgent)
    const chromeVersion = navigator.userAgent.match(/Chrome\/(\d+)/)?.[1]
    
    if (isChrome && parseInt(chromeVersion) >= 100) {
      console.log('🚨 Chrome versión moderna detectada, aplicando fix de User-Agent...')
      
      // Crear un User-Agent más antiguo para evitar problemas de QUIC
      const originalUserAgent = navigator.userAgent
      const modifiedUserAgent = originalUserAgent.replace(
        /Chrome\/\d+\.\d+\.\d+\.\d+/,
        'Chrome/91.0.4472.124'
      )
      
      // Interceptar navigator.userAgent
      Object.defineProperty(navigator, 'userAgent', {
        get: function() {
          return modifiedUserAgent
        },
        configurable: true
      })
      
      console.log('✅ User-Agent modificado para evitar QUIC:', modifiedUserAgent)
      
      // También interceptar window.navigator.userAgent
      if (window.navigator) {
        Object.defineProperty(window.navigator, 'userAgent', {
          get: function() {
            return modifiedUserAgent
          },
          configurable: true
        })
      }
    }
    
    // Configurar headers globales para evitar QUIC (solo headers seguros)
    const originalOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      // Agregar headers específicos para evitar QUIC
      this.addEventListener('readystatechange', () => {
        if (this.readyState === 1) { // OPENED
          try {
            // Solo headers seguros que Chrome no rechaza
            this.setRequestHeader('Cache-Control', 'no-cache')
            this.setRequestHeader('Pragma', 'no-cache')
          } catch (e) {
            // Headers ya establecidos, ignorar error
          }
        }
      })
      
      return originalOpen.call(this, method, url, ...rest)
    }
    
    console.log('✅ Fix de User-Agent configurado para Chrome')
  }
})
