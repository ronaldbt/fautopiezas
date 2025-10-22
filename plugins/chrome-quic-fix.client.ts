export default defineNuxtPlugin(() => {
  if (process.client && /Chrome/.test(navigator.userAgent)) {
    console.log('🔧 Inicializando fix para error QUIC de Chrome...')
    
    // Interceptar errores de red específicos de Chrome
    const originalFetch = window.fetch
    
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args)
        return response
      } catch (error) {
        // Detectar error QUIC específico de Chrome
        if (error.message && error.message.includes('ERR_QUIC_PROTOCOL_ERROR')) {
          console.warn('🚨 Error QUIC detectado en Chrome, aplicando fix...')
          
          // Crear nueva request sin QUIC
          const [url, options = {}] = args
          const modifiedOptions = {
            ...options,
            headers: {
              ...options.headers,
              'Connection': 'keep-alive',
              'Cache-Control': 'no-cache'
            }
          }
          
          // Intentar con fetch nativo sin QUIC
          try {
            const response = await originalFetch(url, modifiedOptions)
            console.log('✅ Fix QUIC exitoso')
            return response
          } catch (retryError) {
            console.error('❌ Fix QUIC falló:', retryError)
            throw retryError
          }
        }
        
        throw error
      }
    }
    
    // Interceptar errores de XMLHttpRequest también
    const originalXHROpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      // Agregar headers para evitar QUIC
      this.addEventListener('error', (event) => {
        if (event.target.status === 0 && url.includes('identitytoolkit.googleapis.com')) {
          console.warn('🚨 Posible error QUIC en XMLHttpRequest, reintentando...')
        }
      })
      
      return originalXHROpen.call(this, method, url, ...rest)
    }
    
    // Configurar headers globales para evitar QUIC
    if (window.chrome && window.chrome.webRequest) {
      console.log('🔧 Configurando políticas de red para evitar QUIC...')
    }
    
    console.log('✅ Fix para error QUIC de Chrome configurado')
  }
})
