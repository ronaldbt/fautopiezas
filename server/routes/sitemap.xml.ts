export default defineEventHandler(async (event) => {
  // Base URL del sitio
  const baseURL = 'https://fautopiezas.cl'
  
  // Todas las marcas disponibles
  const marcas = [
    'abarth', 'acura', 'alfa-romeo', 'aston-martin', 'audi', 'bentley', 'bmw', 'buick', 'byd',
    'cadillac', 'changan', 'chevrolet', 'chrysler', 'citroen', 'daewoo', 'daihatsu', 'dodge',
    'ferrari', 'fiat', 'ford', 'foton', 'geely', 'gmc', 'honda', 'hummer', 'hyundai',
    'infiniti', 'isuzu', 'iveco', 'jac', 'jaguar', 'jeep', 'kia', 'lada', 'lamborghini',
    'land-rover', 'lexus', 'lincoln', 'lotus', 'maserati', 'maybach', 'mazda', 'mclaren',
    'mercedes-benz', 'mg', 'mini', 'mitsubishi', 'nissan', 'oldsmobile', 'opel', 'peugeot',
    'plymouth', 'pontiac', 'porsche', 'renault', 'rolls-royce', 'rover', 'saab', 'saturn',
    'scion', 'seat', 'shelby', 'skoda', 'smart', 'ssangyong', 'subaru', 'suzuki', 'tesla',
    'toyota', 'triumph', 'uaz', 'vespa', 'volkswagen', 'volvo'
  ]
  
  // Categorías de repuestos
  const categorias = [
    'motor', 'filtros', 'frenos', 'suspension', 'direccion', 'transmision', 
    'electrico', 'escape', 'refrigeracion', 'carroceria', 'correas', 'iluminacion'
  ]
  
  // Modelos populares por marca (ejemplo)
  const modelosPopulares = {
    'toyota': ['corolla', 'camry', 'rav4', 'prius', 'yaris', 'hilux'],
    'nissan': ['sentra', 'altima', 'x-trail', 'qashqai', 'versa', 'navara'],
    'chevrolet': ['spark', 'sail', 'cruze', 'tracker', 'captiva', 's10'],
    'bmw': ['serie-1', 'serie-3', 'serie-5', 'x1', 'x3', 'x5'],
    'hyundai': ['accent', 'elantra', 'tucson', 'santa-fe', 'i20', 'creta']
  }
  
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
    urls.push(createUrlEntry(`/repuestos/${marca}`, '0.8', 'weekly'))
  })
  
  // 3. URLs por categoría
  categorias.forEach(categoria => {
    urls.push(createUrlEntry(`/categoria/${categoria}`, '0.7', 'weekly'))
  })
  
  // 4. URLs marca + categoría (SEO combo)
  marcas.slice(0, 20).forEach(marca => { // Top 20 marcas
    categorias.slice(0, 6).forEach(categoria => { // Top 6 categorías
      urls.push(createUrlEntry(`/repuestos/${marca}/${categoria}`, '0.6', 'monthly'))
    })
  })
  
  // 5. URLs de modelos populares
  Object.entries(modelosPopulares).forEach(([marca, modelos]) => {
    modelos.forEach(modelo => {
      urls.push(createUrlEntry(`/repuestos/${marca}/${modelo}`, '0.7', 'weekly'))
      
      // URLs modelo + categoría para modelos más populares
      categorias.slice(0, 4).forEach(categoria => {
        urls.push(createUrlEntry(`/repuestos/${marca}/${modelo}/${categoria}`, '0.5', 'monthly'))
      })
    })
  })
  
  // 6. URLs de años para marcas principales (2015-2024)
  const marcasPrincipales = ['toyota', 'nissan', 'chevrolet', 'bmw', 'hyundai', 'ford']
  const anos = Array.from({length: 10}, (_, i) => 2024 - i) // 2015-2024
  
  marcasPrincipales.forEach(marca => {
    anos.forEach(ano => {
      urls.push(createUrlEntry(`/repuestos/${marca}/${ano}`, '0.6', 'monthly'))
    })
  })
  
  // 7. URLs de páginas especiales
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
})