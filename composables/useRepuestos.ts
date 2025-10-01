import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore'

export interface Repuesto {
  id?: string
  marca: string
  modelo: string
  año: number
  categoria: string
  subcategoria?: string
  nombre: string
  descripcion: string
  precio: number
  precioOriginal?: number
  descuento?: number
  stock: boolean
  cantidad?: number
  imagen?: string
  imagenes?: string[]
  codigoOEM?: string
  codigoAlternativo?: string[]
  compatibilidad: string[]
  marcaRepuesto?: string
  garantia?: number // meses
  peso?: number // kg
  dimensiones?: {
    largo: number
    ancho: number
    alto: number
  }
  caracteristicas?: Record<string, any>
  tags: string[]
  activo: boolean
  destacado: boolean
  createdAt: Date
  updatedAt: Date
  // Campos para SEO
  slug: string
  metaTitle?: string
  metaDescription?: string
  // Campos para búsqueda
  searchTerms: string[]
}

export interface FiltrosRepuestos {
  marca?: string
  modelo?: string
  año?: number
  categoria?: string
  subcategoria?: string
  precioMin?: number
  precioMax?: number
  stock?: boolean
  destacado?: boolean
  busqueda?: string
  ordenarPor?: 'precio' | 'nombre' | 'fecha' | 'relevancia'
  orden?: 'asc' | 'desc'
  limite?: number
  pagina?: number
}

export const useRepuestos = () => {
  const { $firestore } = useNuxtApp()
  
  if (!$firestore) {
    throw new Error('Firestore no está disponible')
  }

  // Obtener repuestos con filtros
  const getRepuestos = async (filtros: FiltrosRepuestos = {}): Promise<Repuesto[]> => {
    try {
      const repuestosRef = collection($firestore, 'repuestos')
      let q = query(repuestosRef, where('activo', '==', true))

      // Aplicar filtros
      if (filtros.marca) {
        q = query(q, where('marca', '==', filtros.marca))
      }
      if (filtros.modelo) {
        q = query(q, where('modelo', '==', filtros.modelo))
      }
      if (filtros.año) {
        q = query(q, where('año', '==', filtros.año))
      }
      if (filtros.categoria) {
        q = query(q, where('categoria', '==', filtros.categoria))
      }
      if (filtros.subcategoria) {
        q = query(q, where('subcategoria', '==', filtros.subcategoria))
      }
      if (filtros.stock !== undefined) {
        q = query(q, where('stock', '==', filtros.stock))
      }
      if (filtros.destacado !== undefined) {
        q = query(q, where('destacado', '==', filtros.destacado))
      }
      if (filtros.precioMin) {
        q = query(q, where('precio', '>=', filtros.precioMin))
      }
      if (filtros.precioMax) {
        q = query(q, where('precio', '<=', filtros.precioMax))
      }

      // Ordenar
      const ordenarPor = filtros.ordenarPor || 'relevancia'
      const orden = filtros.orden || 'desc'
      
      if (ordenarPor === 'precio') {
        q = query(q, orderBy('precio', orden))
      } else if (ordenarPor === 'nombre') {
        q = query(q, orderBy('nombre', orden))
      } else if (ordenarPor === 'fecha') {
        q = query(q, orderBy('createdAt', orden))
      }

      // Limitar resultados
      const limite = filtros.limite || 20
      q = query(q, limit(limite))

      const querySnapshot = await getDocs(q)
      const repuestos: Repuesto[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        repuestos.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Repuesto)
      })

      // Filtrar por búsqueda de texto si se proporciona
      if (filtros.busqueda) {
        const termino = filtros.busqueda.toLowerCase()
        return repuestos.filter(repuesto => 
          repuesto.nombre.toLowerCase().includes(termino) ||
          repuesto.descripcion.toLowerCase().includes(termino) ||
          repuesto.searchTerms.some(term => term.toLowerCase().includes(termino))
        )
      }

      return repuestos
    } catch (error) {
      console.error('Error al obtener repuestos:', error)
      throw error
    }
  }

  // Obtener un repuesto por ID
  const getRepuestoById = async (id: string): Promise<Repuesto | null> => {
    try {
      const repuestoRef = doc($firestore, 'repuestos', id)
      const repuestoSnap = await getDoc(repuestoRef)
      
      if (repuestoSnap.exists()) {
        const data = repuestoSnap.data()
        return {
          id: repuestoSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Repuesto
      }
      return null
    } catch (error) {
      console.error('Error al obtener repuesto:', error)
      throw error
    }
  }

  // Obtener repuestos por slug
  const getRepuestoBySlug = async (slug: string): Promise<Repuesto | null> => {
    try {
      const repuestosRef = collection($firestore, 'repuestos')
      const q = query(repuestosRef, where('slug', '==', slug), where('activo', '==', true))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Repuesto
      }
      return null
    } catch (error) {
      console.error('Error al obtener repuesto por slug:', error)
      throw error
    }
  }

  // Crear un nuevo repuesto
  const crearRepuesto = async (repuestoData: Omit<Repuesto, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const repuestosRef = collection($firestore, 'repuestos')
      const now = new Date()
      
      const nuevoRepuesto = {
        ...repuestoData,
        createdAt: now,
        updatedAt: now
      }

      const docRef = await addDoc(repuestosRef, nuevoRepuesto)
      return docRef.id
    } catch (error) {
      console.error('Error al crear repuesto:', error)
      throw error
    }
  }

  // Actualizar un repuesto
  const actualizarRepuesto = async (id: string, repuestoData: Partial<Repuesto>): Promise<void> => {
    try {
      const repuestoRef = doc($firestore, 'repuestos', id)
      const updateData = {
        ...repuestoData,
        updatedAt: new Date()
      }
      
      await updateDoc(repuestoRef, updateData)
    } catch (error) {
      console.error('Error al actualizar repuesto:', error)
      throw error
    }
  }

  // Eliminar un repuesto (soft delete)
  const eliminarRepuesto = async (id: string): Promise<void> => {
    try {
      await actualizarRepuesto(id, { activo: false })
    } catch (error) {
      console.error('Error al eliminar repuesto:', error)
      throw error
    }
  }

  // Buscar repuestos por término de búsqueda
  const buscarRepuestos = async (termino: string, filtros: Omit<FiltrosRepuestos, 'busqueda'> = {}): Promise<Repuesto[]> => {
    return await getRepuestos({
      ...filtros,
      busqueda: termino
    })
  }

  // Obtener repuestos destacados
  const getRepuestosDestacados = async (limite: number = 10): Promise<Repuesto[]> => {
    return await getRepuestos({
      destacado: true,
      limite
    })
  }

  // Obtener repuestos por categoría
  const getRepuestosByCategoria = async (categoria: string, limite: number = 20): Promise<Repuesto[]> => {
    return await getRepuestos({
      categoria,
      limite
    })
  }

  // Obtener repuestos relacionados
  const getRepuestosRelacionados = async (repuesto: Repuesto, limite: number = 5): Promise<Repuesto[]> => {
    return await getRepuestos({
      marca: repuesto.marca,
      modelo: repuesto.modelo,
      año: repuesto.año,
      categoria: repuesto.categoria,
      limite
    })
  }

  return {
    getRepuestos,
    getRepuestoById,
    getRepuestoBySlug,
    crearRepuesto,
    actualizarRepuesto,
    eliminarRepuesto,
    buscarRepuestos,
    getRepuestosDestacados,
    getRepuestosByCategoria,
    getRepuestosRelacionados
  }
}
