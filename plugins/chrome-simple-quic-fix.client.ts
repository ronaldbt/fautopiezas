export default defineNuxtPlugin(() => {
  if (process.client && /Chrome/.test(navigator.userAgent)) {
    console.log('🔧 Inicializando fix SIMPLE para error QUIC de Chrome...')
    
    // Estrategia simple: interceptar solo las requests problemáticas y usar fetch nativo sin modificaciones
    const originalFetch = window.fetch
    
    window.fetch = async (...args) => {
      const [url, options = {}] = args
      
      // Solo interceptar requests a Firebase
      if (typeof url === 'string' && url.includes('identitytoolkit.googleapis.com')) {
        console.log('🎯 Interceptando request Firebase simple:', url)
        
        try {
          // Usar fetch nativo sin modificaciones para evitar problemas de headers
          const response = await originalFetch(url, {
            ...options,
            // Solo agregar configuración básica
            mode: 'cors',
            credentials: 'omit'
          })
          
          console.log('✅ Request Firebase exitosa con fetch simple')
          return response
          
        } catch (error) {
          console.warn('🚨 Error en request Firebase, Chrome tiene problemas de QUIC:', error.message)
          
          // Mostrar instrucciones al usuario
          showQuicInstructions()
          
          // Re-lanzar el error para que Firebase lo maneje
          throw error
        }
      }
      
      // Para otras requests, usar fetch normal
      return originalFetch(...args)
    }
    
    console.log('✅ Fix simple para QUIC configurado')
  }
})

// Función para mostrar instrucciones al usuario
function showQuicInstructions() {
  // Crear un modal simple con instrucciones
  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `
  
  modal.innerHTML = `
    <div style="
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      margin: 20px;
    ">
      <h3 style="color: #dc2626; margin-bottom: 15px;">🚨 Error QUIC de Chrome Detectado</h3>
      <p style="margin-bottom: 15px;">
        Chrome está teniendo problemas con el protocolo QUIC. Para solucionarlo:
      </p>
      <ol style="margin-bottom: 20px; padding-left: 20px;">
        <li style="margin-bottom: 8px;">
          <strong>Ve a:</strong> <code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px;">chrome://flags/#enable-quic</code>
        </li>
        <li style="margin-bottom: 8px;">
          <strong>Cambia "Experimental QUIC protocol" a "Disabled"</strong>
        </li>
        <li style="margin-bottom: 8px;">
          <strong>Reinicia Chrome</strong>
        </li>
      </ol>
      <div style="display: flex; gap: 10px;">
        <button id="openQuicSettings" style="
          background: #dc2626;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        ">🔧 Abrir Configuración QUIC</button>
        <button id="closeModal" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        ">Cerrar</button>
      </div>
    </div>
  `
  
  document.body.appendChild(modal)
  
  // Event listeners
  document.getElementById('openQuicSettings').onclick = () => {
    window.open('chrome://flags/#enable-quic', '_blank')
  }
  
  document.getElementById('closeModal').onclick = () => {
    document.body.removeChild(modal)
  }
  
  // Cerrar al hacer clic fuera del modal
  modal.onclick = (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal)
    }
  }
}
