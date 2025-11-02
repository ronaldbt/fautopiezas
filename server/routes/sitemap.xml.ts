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
    
    // Obtener marcas populares dinámicamente
    const marcasPopulares = marcas.filter(marca => marca.popular === true)
    
    // Categorías principales para URLs (usando slugs reales)
    const categoriasPrincipales = [
      'motor', 'freno-maza-rueda', 'suspension', 'electrico', 
      'carroceria-ensamblaje-lampara', 'transmision-automatica', 
      'tren-transmision', 'sistema-enfriamiento'
    ]
    
    // Subcategorías importantes para SEO adicional
    const subcategoriasPrincipales = [
      'pastillas-freno', 'discos-freno', 'amortiguadores', 'filtro-aire',
      'aceite-motor', 'bateria', 'alternador', 'radiador'
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
    
    // 2. URLs por marca (solo marcas populares y activas)
    marcas.filter(marca => marca.activa).forEach(marca => {
      const priority = marca.popular ? '0.8' : '0.6'
      urls.push(createUrlEntry(`/repuestos/${marca.slug}`, priority, 'weekly'))
    })
    
    // 3. URLs de categorías (solo activas)
    categorias.filter(categoria => categoria.activa).forEach(categoria => {
      urls.push(createUrlEntry(`/categoria/${categoria.slug}`, '0.7', 'weekly'))
    })
    
    // 4. URLs de modelos populares para marcas top (solo con datos reales)
    const marcasConModelosReales = marcasPopulares.slice(0, 5) // Top 5 marcas
    marcasConModelosReales.forEach(marca => {
      const modelosPopulares = getModelosPopularesPorMarca(marca.slug)
      modelosPopulares.forEach((modelo: string) => {
        urls.push(createUrlEntry(`/repuestos/${marca.slug}/${modelo}`, '0.7', 'weekly'))
      })
    })
    
    // 5. Función para obtener modelos populares por marca
    const getModelosPopularesPorMarca = (marcaSlug: string): string[] => {
      const modelosPorMarca: { [key: string]: string[] } = {
        'toyota': ['corolla', 'camry', 'rav4', 'prius', 'hilux'],
        'nissan': ['sentra', 'altima', 'x-trail', 'qashqai', 'navara'],
        'chevrolet': ['cruze', 'spark', 'aveo', 'silverado', 'equinox'],
        'bmw': ['serie-3', 'serie-5', 'x3', 'x5', 'serie-1'],
        'hyundai': ['elantra', 'tucson', 'accent', 'santa-fe', 'i30'],
        'ford': ['focus', 'fiesta', 'escape', 'f-150', 'mustang'],
        'volkswagen': ['golf', 'jetta', 'tiguan', 'polo', 'passat'],
        'honda': ['civic', 'accord', 'cr-v', 'fit', 'pilot'],
        'mazda': ['mazda3', 'cx-5', 'mazda6', 'cx-3', 'mx-5'],
        'kia': ['rio', 'sportage', 'sorento', 'optima', 'picanto']
      }
      return modelosPorMarca[marcaSlug] || []
    }
    
    // 6. URLs de páginas de contacto y servicios
    urls.push(createUrlEntry('/contacto', '0.8', 'monthly'))
    
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