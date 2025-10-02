export default defineEventHandler(async (event) => {
  // Base URL del sitio
  const baseURL = 'https://autopiezas360.cl'
  
  try {
    // Cargar datos de marcas desde el archivo JSON
    const marcasData = await import('~/data/marcas.json')
    const marcas = marcasData.default || marcasData
    
    // Cargar datos de categorías desde el archivo JSON
    const categoriasData = await import('~/data/categorias.json')
    const categorias = categoriasData.default || categoriasData
    
    // Categorías principales para URLs
    const categoriasPrincipales = [
      'motor', 'frenos', 'suspension', 'electrico', 'carroceria', 'transmision'
    ]
  
    // Función para generar entrada XML
    const createUrlEntry = (url: string, priority: string = '0.8', changefreq: string = 'weekly') => {
      return `  <url>
    <loc>${baseURL}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    }
    
    // URLs del sitemap
    const urls: string[] = []
    
    // 1. Páginas principales
    urls.push(createUrlEntry('/', '1.0', 'daily')) // Homepage - máxima prioridad
    urls.push(createUrlEntry('/repuestos', '0.9', 'daily')) // Catálogo principal
    
    // 2. URLs por marca
    marcas.forEach(marca => {
      urls.push(createUrlEntry(`/repuestos/${marca.slug}`, '0.8', 'weekly'))
    })
    
    // 3. URLs de categorías
    categorias.forEach(categoria => {
      urls.push(createUrlEntry(`/categoria/${categoria.slug}`, '0.7', 'weekly'))
    })
    
    // 4. URLs marca + categoría (SEO combo) - limitado para evitar sitemap muy grande
    marcas.slice(0, 15).forEach(marca => { // Top 15 marcas
      categoriasPrincipales.forEach(categoria => {
        urls.push(createUrlEntry(`/repuestos/${marca.slug}/${categoria}`, '0.6', 'monthly'))
      })
    })
    
    // 5. URLs de años para marcas principales (2020-2024)
    const marcasPrincipales = ['toyota', 'nissan', 'chevrolet', 'bmw', 'hyundai', 'ford']
    const anos = [2020, 2021, 2022, 2023, 2024]
    
    marcasPrincipales.forEach(marca => {
      anos.forEach(ano => {
        urls.push(createUrlEntry(`/repuestos/${marca}/${ano}`, '0.6', 'monthly'))
      })
    })
    
    // 6. URLs de páginas especiales
    const paginasEspeciales = [
      '/repuestos-toyota-chile',
      '/repuestos-nissan-chile', 
      '/repuestos-chevrolet-chile',
      '/repuestos-bmw-chile',
      '/autopartes-chile',
      '/repuestos-originales-chile'
    ]
    
    paginasEspeciales.forEach(pagina => {
      urls.push(createUrlEntry(pagina, '0.8', 'weekly'))
    })
    
    // Generar XML del sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

    // Configurar headers
    setHeader(event, 'Content-Type', 'application/xml')
    setHeader(event, 'Cache-Control', 'max-age=3600') // Cache de 1 hora
    
    return sitemap
    
  } catch (error) {
    console.error('Error generando sitemap:', error)
    
    // Fallback con URLs básicas
    const fallbackUrls = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/repuestos', priority: '0.9', changefreq: 'daily' }
    ]
    
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fallbackUrls.map(item => `  <url>
    <loc>${baseURL}${item.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    setHeader(event, 'Content-Type', 'application/xml')
    return fallbackSitemap
  }
})