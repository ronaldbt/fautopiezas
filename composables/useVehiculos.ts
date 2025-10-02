import marcasData from '~/data/marcas.json'
import modelosData from '~/data/modelos.json'
import categoriasData from '~/data/categorias.json'

export interface Marca {
  id: string
  nombre: string
  slug: string
  logo?: string
  modelos: number
  precioMin: number
  activa: boolean
  popular: boolean
  orden: number
}

export interface Modelo {
  id: string
  nombre: string
  slug: string
  años: number[]
  categorias: string[]
  activa: boolean
}

export interface Categoria {
  id: string
  nombre: string
  slug: string
  icono: string
  descripcion: string
  activa: boolean
  orden: number
  subcategorias: string[]
}

export const useVehiculos = () => {
  // Obtener todas las marcas
  const getMarcas = (): Marca[] => {
    return marcasData.filter(marca => marca.activa)
  }

  // Obtener marcas populares
  const getMarcasPopulares = (): Marca[] => {
    return marcasData.filter(marca => marca.activa && marca.popular)
  }

  // Obtener una marca por slug
  const getMarcaBySlug = (slug: string): Marca | undefined => {
    return marcasData.find(marca => marca.slug === slug && marca.activa)
  }

  // Obtener modelos por marca (carga dinámica)
  const getModelosByMarca = async (marcaSlug: string): Promise<Modelo[]> => {
    try {
      // Importar dinámicamente el archivo JSON de la marca
      const marcaData = await import(`~/data/marcas/${marcaSlug}.json`)
      const marcaInfo = marcaData.default || marcaData
      return marcaInfo.modelos?.filter((modelo: Modelo) => modelo.activa) || []
    } catch (error) {
      console.error(`Error cargando modelos de ${marcaSlug}:`, error)
      return []
    }
  }

  // Obtener un modelo específico
  const getModeloBySlug = async (marcaSlug: string, modeloSlug: string): Promise<Modelo | undefined> => {
    const modelos = await getModelosByMarca(marcaSlug)
    return modelos.find(modelo => modelo.slug === modeloSlug)
  }

  // Obtener años disponibles para un modelo
  const getAñosByModelo = async (marcaSlug: string, modeloSlug: string): Promise<number[]> => {
    const modelo = await getModeloBySlug(marcaSlug, modeloSlug)
    return modelo ? modelo.años : []
  }

  // Obtener todas las categorías
  const getCategorias = (): Categoria[] => {
    return categoriasData.filter(categoria => categoria.activa)
  }

  // Obtener una categoría por slug
  const getCategoriaBySlug = (slug: string): Categoria | undefined => {
    return categoriasData.find(categoria => categoria.slug === slug && categoria.activa)
  }

  // Obtener categorías disponibles para un modelo
  const getCategoriasByModelo = async (marcaSlug: string, modeloSlug: string): Promise<Categoria[]> => {
    const modelo = await getModeloBySlug(marcaSlug, modeloSlug)
    if (!modelo) return []
    
    return categoriasData.filter(categoria => 
      categoria.activa && modelo.categorias.includes(categoria.id)
    )
  }

  // Validar combinación marca-modelo-año
  const validarVehiculo = async (marcaSlug: string, modeloSlug: string, año: number): Promise<boolean> => {
    const años = await getAñosByModelo(marcaSlug, modeloSlug)
    return años.includes(año)
  }

  // Generar URL para búsqueda de repuestos
  const generarUrlRepuestos = (marcaSlug: string, modeloSlug: string, año: number, categoriaSlug?: string): string => {
    const baseUrl = `/repuestos/${marcaSlug}/${modeloSlug}/${año}`
    return categoriaSlug ? `${baseUrl}/${categoriaSlug}` : baseUrl
  }

  // Buscar marcas por nombre
  const buscarMarcas = (query: string): Marca[] => {
    const termino = query.toLowerCase()
    return marcasData.filter(marca => 
      marca.activa && 
      (marca.nombre.toLowerCase().includes(termino) || 
       marca.slug.toLowerCase().includes(termino))
    )
  }

  // Buscar modelos por nombre
  const buscarModelos = async (marcaSlug: string, query: string): Promise<Modelo[]> => {
    const termino = query.toLowerCase()
    const modelos = await getModelosByMarca(marcaSlug)
    return modelos.filter(modelo => 
      modelo.nombre.toLowerCase().includes(termino) || 
      modelo.slug.toLowerCase().includes(termino)
    )
  }

  return {
    getMarcas,
    getMarcasPopulares,
    getMarcaBySlug,
    getModelosByMarca,
    getModeloBySlug,
    getAñosByModelo,
    getCategorias,
    getCategoriaBySlug,
    getCategoriasByModelo,
    validarVehiculo,
    generarUrlRepuestos,
    buscarMarcas,
    buscarModelos
  }
}
