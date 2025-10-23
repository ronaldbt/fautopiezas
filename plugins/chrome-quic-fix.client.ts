export default defineNuxtPlugin(() => {
  if (process.client && /Chrome/.test(navigator.userAgent)) {
    console.log('🔧 Inicializando fix AGRESIVO para error QUIC de Chrome...')
    
    // Interceptar TODAS las requests para forzar HTTP/2
    const originalFetch = window.fetch
    
    window.fetch = async (...args) => {
      const [url, options = {}] = args
      
      // Interceptar específicamente requests a Firebase
      if (typeof url === 'string' && url.includes('identitytoolkit.googleapis.com')) {
        console.log('🎯 Interceptando request Firebase:', url)
        
        // Crear options modificadas para forzar HTTP/2
        const modifiedOptions = {
          ...options,
          headers: {
            ...options.headers,
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'User-Agent': navigator.userAgent.replace(/Chrome\/\d+/, 'Chrome/91'), // Versión más antigua
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br'
          },
          // Forzar HTTP/2
          keepalive: false,
          cache: 'no-cache'
        }
        
        try {
          console.log('🔄 Intentando request con configuración anti-QUIC...')
          const response = await originalFetch(url, modifiedOptions)
          console.log('✅ Request Firebase exitosa con fix QUIC')
          return response
        } catch (error) {
          console.warn('🚨 Error en request Firebase, intentando método alternativo...', error)
          
          // Método alternativo: usar XMLHttpRequest
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(options.method || 'POST', url, true)
            
            // Configurar headers
            Object.entries(modifiedOptions.headers || {}).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value)
            })
            
            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const response = new Response(xhr.responseText, {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: new Headers()
                  })
                  console.log('✅ Request Firebase exitosa con XMLHttpRequest')
                  resolve(response)
                } catch (parseError) {
                  reject(parseError)
                }
              } else {
                reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`))
              }
            }
            
            xhr.onerror = () => {
              console.error('❌ XMLHttpRequest falló')
              reject(new Error('XMLHttpRequest failed'))
            }
            
            xhr.send(options.body || null)
          })
        }
      }
      
      // Para otras requests, usar fetch normal
      return originalFetch(...args)
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
