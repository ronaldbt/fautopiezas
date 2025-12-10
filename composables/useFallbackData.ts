export const useFallbackData = () => {
  const getFallbackRepuesto = (params: any) => {
    const { marca, modelo, año, categoria, repuesto } = params
    
    return {
      id: `fallback-${repuesto}`,
      nombre: repuesto.charAt(0).toUpperCase() + repuesto.slice(1).replace(/-/g, ' '),
      descripcion: `Repuesto original ${marca} ${modelo} ${año}. Pieza de alta calidad con garantía extendida.`,
      precio: null, // Sin precio - se debe consultar
      precioOriginal: null,
      descuento: 0,
      stock: false, // No en stock hasta confirmar
      cantidad: Math.floor(Math.random() * 10) + 1,
      codigoOEM: `${marca.toUpperCase()}-${repuesto.toUpperCase().replace(/-/g, '')}-${año}`,
      marca,
      modelo,
      anio: parseInt(año),
      categoria,
      garantia: 12,
      peso: 1.5,
      dimensiones: {
        largo: 15,
        ancho: 10,
        alto: 8
      },
      caracteristicas: {
        material: 'Original',
        color: 'Estándar',
        origen: 'Importado',
        tipo: 'OEM'
      },
      tags: ['original', 'garantia', 'calidad'],
      activo: true,
      destacado: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      slug: repuesto,
      searchTerms: [repuesto, marca, modelo, año, categoria],
      // Contenido fallback para SEO
      contenidoSEO: {
        descripcionLarga: `El ${repuesto.replace(/-/g, ' ')} para ${marca} ${modelo} ${año} es una pieza fundamental que garantiza el óptimo funcionamiento de tu vehículo. Este repuesto original ha sido diseñado específicamente para el modelo ${modelo} del año ${año}, asegurando una compatibilidad perfecta y un rendimiento excepcional.`,
        beneficios: [
          'Compatibilidad 100% garantizada',
          'Calidad original del fabricante',
          'Garantía extendida de 12 meses',
          'Instalación profesional disponible',
          'Stock inmediato disponible'
        ],
        especificacionesTecnicas: {
          marca: marca.charAt(0).toUpperCase() + marca.slice(1),
          modelo: modelo.charAt(0).toUpperCase() + modelo.slice(1),
          año: año,
          categoria: categoria.charAt(0).toUpperCase() + categoria.slice(1),
          tipo: 'Original',
          garantia: '12 meses'
        }
      }
    }
  }

  const getFallbackRepuestosByCategoria = (marca: string, modelo?: string, año?: string, categoria?: string, limit = 12) => {
    const repuestosComunes = [
      'pastillas-freno', 'discos-freno', 'amortiguadores', 'filtro-aire', 'filtro-aceite',
      'bateria', 'alternador', 'starter', 'bujias', 'bobinas', 'radiador', 'termostato',
      'bomba-agua', 'correa-distribucion', 'kit-embrague', 'rotulas', 'terminales-direccion',
      'parachoques', 'espejo-retrovisor', 'faros', 'stop', 'parrilla', 'neumaticos'
    ]

    const categoriaEspecifica = categoria ? [categoria] : repuestosComunes
    
    return categoriaEspecifica.slice(0, limit).map((repuesto, index) => ({
      id: `fallback-${marca}-${repuesto}-${index}`,
      nombre: repuesto.charAt(0).toUpperCase() + repuesto.slice(1).replace(/-/g, ' '),
      descripcion: `${repuesto.replace(/-/g, ' ')} original para ${marca} ${modelo || ''} ${año || ''}`,
      precio: null, // Sin precio - se debe consultar
      stock: false, // No en stock hasta confirmar
      imagen: null,
      marca,
      modelo: modelo || 'Universal',
      anio: año ? parseInt(año) : null,
      categoria: categoria || 'general',
      slug: repuesto,
      destacado: Math.random() > 0.7, // 30% destacado
      codigoOEM: `${marca.toUpperCase()}-${repuesto.toUpperCase().replace(/-/g, '')}`
    }))
  }

  const getFallbackMarcas = () => {
    return [
      { nombre: 'Toyota', slug: 'toyota', modelos: 45 },
      { nombre: 'Nissan', slug: 'nissan', modelos: 38 },
      { nombre: 'Chevrolet', slug: 'chevrolet', modelos: 32 },
      { nombre: 'BMW', slug: 'bmw', modelos: 28 },
      { nombre: 'Hyundai', slug: 'hyundai', modelos: 25 },
      { nombre: 'Ford', slug: 'ford', modelos: 30 },
      { nombre: 'Volkswagen', slug: 'volkswagen', modelos: 22 },
      { nombre: 'Honda', slug: 'honda', modelos: 18 },
      { nombre: 'Mazda', slug: 'mazda', modelos: 15 },
      { nombre: 'Kia', slug: 'kia', modelos: 20 },
      { nombre: 'Audi', slug: 'audi', modelos: 24 },
      { nombre: 'Mercedes-Benz', slug: 'mercedes-benz', modelos: 26 }
    ]
  }

  const getFallbackModelos = (marca: string) => {
    const modelosPorMarca: Record<string, string[]> = {
      toyota: ['Corolla', 'Camry', 'RAV4', 'Prius', 'Hilux', 'Yaris', 'Highlander', 'Avalon'],
      nissan: ['Sentra', 'Altima', 'X-Trail', 'Qashqai', 'Versa', 'Pathfinder', 'Murano'],
      chevrolet: ['Cruze', 'Spark', 'Aveo', 'Sonic', 'Captiva', 'Tracker', 'Onix'],
      bmw: ['Serie 3', 'Serie 5', 'X3', 'X5', 'Serie 1', 'Serie 7', 'X1', 'X6'],
      hyundai: ['Accent', 'Elantra', 'Tucson', 'Santa Fe', 'i10', 'i20', 'Creta'],
      ford: ['Focus', 'Fiesta', 'Escape', 'Explorer', 'F-150', 'Mustang', 'Ranger'],
      default: ['Modelo A', 'Modelo B', 'Modelo C', 'Modelo D', 'Modelo E']
    }

    return (modelosPorMarca[marca.toLowerCase()] || modelosPorMarca.default).map(modelo => ({
      nombre: modelo,
      slug: modelo.toLowerCase().replace(/\s+/g, '-'),
      años: Array.from({ length: 15 }, (_, i) => 2024 - i) // 2024 hacia atrás
    }))
  }

  const getFallbackCategorias = () => {
    return [
      { nombre: 'Motor', slug: 'motor', descripcion: 'Componentes del motor' },
      { nombre: 'Frenos', slug: 'frenos', descripcion: 'Sistema de frenado' },
      { nombre: 'Suspensión', slug: 'suspension', descripcion: 'Sistema de suspensión' },
      { nombre: 'Transmisión', slug: 'transmision', descripcion: 'Sistema de transmisión' },
      { nombre: 'Eléctrico', slug: 'electrico', descripcion: 'Sistema eléctrico' },
      { nombre: 'Carrocería', slug: 'carroceria', descripcion: 'Partes de carrocería' },
      { nombre: 'Filtros', slug: 'filtros', descripcion: 'Filtros del vehículo' },
      { nombre: 'Aceites', slug: 'aceites', descripcion: 'Lubricantes y aceites' },
      { nombre: 'Neumáticos', slug: 'neumaticos', descripcion: 'Neumáticos y llantas' },
      { nombre: 'Luces', slug: 'luces', descripcion: 'Sistema de iluminación' }
    ]
  }

  const getFallbackContent = (pageType: string, params?: any) => {
    switch (pageType) {
      case 'marca':
        return {
          titulo: `Repuestos ${params?.marca} - Originales y Compatibles`,
          descripcion: `Encuentra repuestos originales y compatibles para ${params?.marca}. Stock inmediato, garantía extendida, envío gratis a todo Chile.`,
          contenido: `En AutoPiezas360 Chile tenemos el catálogo más completo de repuestos para ${params?.marca}. Trabajamos con distribuidores oficiales para garantizar la calidad de cada pieza.`
        }
      
      case 'modelo':
        return {
          titulo: `Repuestos ${params?.marca} ${params?.modelo} - Todas las Piezas`,
          descripcion: `Repuestos específicos para ${params?.marca} ${params?.modelo}. Piezas originales con garantía, stock disponible, entrega rápida.`,
          contenido: `Especialistas en repuestos para ${params?.marca} ${params?.modelo}. Tenemos desde piezas de motor hasta carrocería, todas con garantía oficial.`
        }

      case 'categoria':
        return {
          titulo: `${params?.categoria} ${params?.marca} ${params?.modelo || ''} - Repuestos`,
          descripcion: `${params?.categoria} para ${params?.marca} ${params?.modelo || ''}. Repuestos de calidad, precios competitivos, garantía extendida.`,
          contenido: `Los mejores ${params?.categoria?.toLowerCase()} para tu ${params?.marca} ${params?.modelo || ''}. Calidad garantizada y precios competitivos.`
        }

      default:
        return {
          titulo: 'Repuestos Automotrices - AutoPiezas360',
          descripcion: 'Repuestos de calidad para todas las marcas. Stock inmediato, garantía extendida.',
          contenido: 'En AutoPiezas360 encontrarás los repuestos que necesitas para tu vehículo.'
        }
    }
  }

  return {
    getFallbackRepuesto,
    getFallbackRepuestosByCategoria,
    getFallbackMarcas,
    getFallbackModelos,
    getFallbackCategorias,
    getFallbackContent
  }
}