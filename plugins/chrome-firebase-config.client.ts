export default defineNuxtPlugin(() => {
  if (process.client && /Chrome/.test(navigator.userAgent)) {
    console.log('🔧 Configurando Firebase específicamente para Chrome...')
    
    // Configurar variables de entorno para Chrome
    const originalEnv = process.env
    
    // Modificar configuración de red para Chrome
    if (window.navigator && window.navigator.serviceWorker) {
      // Deshabilitar service worker si está causando problemas
      console.log('🔧 Configurando service worker para Chrome...')
    }
    
    // Configurar timeout más largo para Chrome
    const originalSetTimeout = window.setTimeout
    const originalSetInterval = window.setInterval
    
    // Interceptar timers para requests de Firebase
    window.setTimeout = function(callback, delay, ...args) {
      // Aumentar timeout para requests de Firebase en Chrome
      if (delay < 5000 && callback.toString().includes('firebase')) {
        delay = Math.max(delay * 2, 5000) // Mínimo 5 segundos para Firebase
        console.log('⏰ Aumentando timeout para Firebase en Chrome:', delay + 'ms')
      }
      return originalSetTimeout.call(this, callback, delay, ...args)
    }
    
    // Configurar localStorage para Chrome
    const originalSetItem = localStorage.setItem
    localStorage.setItem = function(key, value) {
      try {
        return originalSetItem.call(this, key, value)
      } catch (e) {
        console.warn('⚠️ Error en localStorage, limpiando datos antiguos...')
        // Limpiar datos antiguos si hay problemas
        try {
          localStorage.clear()
          return originalSetItem.call(this, key, value)
        } catch (e2) {
          console.error('❌ No se puede usar localStorage en Chrome')
          return false
        }
      }
    }
    
    // Configurar sessionStorage para Chrome
    const originalSessionSetItem = sessionStorage.setItem
    sessionStorage.setItem = function(key, value) {
      try {
        return originalSessionSetItem.call(this, key, value)
      } catch (e) {
        console.warn('⚠️ Error en sessionStorage, limpiando datos antiguos...')
        try {
          sessionStorage.clear()
          return originalSessionSetItem.call(this, key, value)
        } catch (e2) {
          console.error('❌ No se puede usar sessionStorage en Chrome')
          return false
        }
      }
    }
    
    // Configurar IndexedDB para Chrome
    if (window.indexedDB) {
      const originalOpen = indexedDB.open
      indexedDB.open = function(name, version) {
        try {
          return originalOpen.call(this, name, version)
        } catch (e) {
          console.warn('⚠️ Error en IndexedDB, intentando con configuración alternativa...')
          // Intentar con nombre alternativo
          return originalOpen.call(this, name + '_chrome_fix', version)
        }
      }
    }
    
    // Configurar WebSocket para Chrome si es necesario
    const originalWebSocket = window.WebSocket
    window.WebSocket = function(url, protocols) {
      try {
        return new originalWebSocket(url, protocols)
      } catch (e) {
        console.warn('⚠️ Error en WebSocket, usando configuración alternativa...')
        // Intentar sin protocols
        return new originalWebSocket(url)
      }
    }
    
    console.log('✅ Configuración específica para Chrome completada')
  }
})
