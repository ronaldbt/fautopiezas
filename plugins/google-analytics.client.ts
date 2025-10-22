export default defineNuxtPlugin(() => {
  // Google Analytics 4
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Reemplaza con tu ID de Google Analytics
  
  // Cargar Google Analytics
  if (process.client && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // Script de Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    // Configurar gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href
    })

    // Exponer gtag globalmente
    window.gtag = gtag
  }
})




























