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
    
    // 2. URLs por marca
    marcas.forEach(marca => {
      urls.push(createUrlEntry(`/repuestos/${marca.slug}`, '0.8', 'weekly'))
    })
    
    // 3. URLs de categorías
    categorias.forEach(categoria => {
      urls.push(createUrlEntry(`/categoria/${categoria.slug}`, '0.7', 'weekly'))
    })
    
    // 4. URLs marca + categoría (usando marcas populares)
    marcasPopulares.forEach(marca => {
      categoriasPrincipales.forEach(categoria => {
        urls.push(createUrlEntry(`/repuestos/${marca.slug}/${categoria}`, '0.7', 'monthly'))
      })
    })
    
    // 5. URLs de subcategorías específicas para marcas top
    const marcasTop = marcasPopulares.slice(0, 5) // Top 5 marcas populares
    marcasTop.forEach(marca => {
      subcategoriasPrincipales.forEach(subcategoria => {
        urls.push(createUrlEntry(`/repuestos/${marca.slug}/${subcategoria}`, '0.6', 'monthly'))
      })
    })
    
    // 6. URLs de años extendido para marcas populares (2018-2025)
    const anos = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
    marcasPopulares.forEach(marca => {
      anos.forEach(ano => {
        urls.push(createUrlEntry(`/repuestos/${marca.slug}/${ano}`, '0.6', 'monthly'))
        
        // URLs marca + año + categoría principal para top 3 marcas
        if (marcasPopulares.indexOf(marca) < 3) {
          categoriasPrincipales.slice(0, 4).forEach(categoria => {
            urls.push(createUrlEntry(`/repuestos/${marca.slug}/${ano}/${categoria}`, '0.5', 'monthly'))
          })
        }
      })
    })
    
    // 7. URLs de páginas especiales (generadas dinámicamente)
    const paginasEspeciales = []
    
    // Páginas especiales para marcas populares
    marcasPopulares.forEach(marca => {
      paginasEspeciales.push(`/repuestos-${marca.slug}-chile`)
      paginasEspeciales.push(`/autopartes-${marca.slug}-originales`)
    })
    
    // Páginas especiales generales
    paginasEspeciales.push('/autopartes-chile')
    paginasEspeciales.push('/repuestos-originales-chile')
    paginasEspeciales.push('/importacion-repuestos-chile')
    paginasEspeciales.push('/repuestos-premium-chile')
    
    paginasEspeciales.forEach(pagina => {
      urls.push(createUrlEntry(pagina, '0.8', 'weekly'))
    })
    
    // 8. URLs de combinaciones marca + modelo para marcas top
    const marcasConModelos = marcasPopulares.slice(0, 3) // Solo top 3 para evitar sobrecargar
    
    // Función para obtener modelos populares por marca
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
    
    marcasConModelos.forEach(marca => {
      const modelosPopulares = getModelosPopularesPorMarca(marca.slug)
      modelosPopulares.forEach((modelo: string) => {
        urls.push(createUrlEntry(`/repuestos/${marca.slug}/${modelo}`, '0.6', 'monthly'))
      })
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