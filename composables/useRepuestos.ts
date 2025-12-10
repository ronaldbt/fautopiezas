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
  anio: number
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
  anio?: number
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
      console.log('🔍 [getRepuestos] Buscando productos con filtros:', filtros)
      const repuestosRef = collection($firestore, 'repuestos')
      let q = query(repuestosRef, where('activo', '==', true))

      // Aplicar filtros
      if (filtros.marca) {
        const marcaFiltro = filtros.marca.toLowerCase()
        console.log('🔍 [getRepuestos] Filtrando por marca:', marcaFiltro)
        q = query(q, where('marca', '==', marcaFiltro))
      }
      // Guardar el filtro de modelo para filtrar en memoria después
      // (Firestore es case-sensitive y puede haber diferencias de mayúsculas)
      // Por ahora NO filtramos por modelo en la query inicial para evitar problemas de case
      // Filtraremos en memoria después
      const modeloFiltro = filtros.modelo
      // if (filtros.modelo) {
      //   console.log('🔍 [getRepuestos] Filtrando por modelo (en query):', filtros.modelo)
      //   q = query(q, where('modelo', '==', filtros.modelo))
      // }
      if (filtros.anio) {
        console.log('🔍 [getRepuestos] Filtrando por año:', filtros.anio)
        q = query(q, where('anio', '==', filtros.anio))
      }
      if (filtros.categoria) {
        const categoriaFiltro = filtros.categoria.toLowerCase()
        console.log('🔍 [getRepuestos] Filtrando por categoría:', categoriaFiltro)
        q = query(q, where('categoria', '==', categoriaFiltro))
      }
      if (filtros.subcategoria) {
        const subcategoriaFiltro = filtros.subcategoria.toLowerCase()
        console.log('🔍 [getRepuestos] Filtrando por subcategoría:', subcategoriaFiltro)
        q = query(q, where('subcategoria', '==', subcategoriaFiltro))
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

      // Limitar resultados (aumentar límite si hay filtros específicos)
      const limite = filtros.limite || (filtros.marca && filtros.modelo && filtros.anio ? 200 : 20)
      q = query(q, limit(limite))
      console.log(`📊 [getRepuestos] Límite de resultados: ${limite}`)

      const querySnapshot = await getDocs(q)
      const repuestos: Repuesto[] = []

      console.log(`📦 [getRepuestos] Documentos encontrados en query: ${querySnapshot.size}`)

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        console.log(`📄 [getRepuestos] Documento ${doc.id}:`, {
          marca: data.marca,
          modelo: data.modelo,
          anio: data.anio,
          categoria: data.categoria,
          subcategoria: data.subcategoria,
          nombre: data.nombre,
          activo: data.activo
        })
        repuestos.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Repuesto)
      })

      // Filtrado adicional en memoria para manejar diferencias de case en modelo y otros campos
      let repuestosFiltrados = repuestos
      
      // Si hay filtro de modelo, aplicar filtrado case-insensitive
      if (filtros.modelo) {
        const modeloBuscado = filtros.modelo.toLowerCase()
        repuestosFiltrados = repuestos.filter(r => {
          const modeloProducto = (r.modelo || '').toLowerCase()
          return modeloProducto === modeloBuscado
        })
        console.log(`🔍 [getRepuestos] Después de filtro case-insensitive de modelo: ${repuestosFiltrados.length} productos (de ${repuestos.length} totales)`)
        
        // Si no encontramos resultados con el filtro case-insensitive, 
        // intentar buscar sin el filtro de modelo en la query inicial
        if (repuestosFiltrados.length === 0 && repuestos.length > 0) {
          console.log('⚠️ [getRepuestos] No se encontraron productos con el modelo exacto, pero hay productos en la query')
          console.log('📋 [getRepuestos] Modelos encontrados:', [...new Set(repuestos.map(r => r.modelo))])
        }
      }
      
      // También verificar otros filtros en memoria por si acaso
      if (filtros.marca && repuestosFiltrados.length > 0) {
        const marcaBuscada = filtros.marca.toLowerCase()
        const antes = repuestosFiltrados.length
        repuestosFiltrados = repuestosFiltrados.filter(r => 
          (r.marca || '').toLowerCase() === marcaBuscada
        )
        if (antes !== repuestosFiltrados.length) {
          console.log(`🔍 [getRepuestos] Filtrado adicional por marca: ${repuestosFiltrados.length} productos`)
        }
      }
      
      if (filtros.categoria && repuestosFiltrados.length > 0) {
        const categoriaBuscada = filtros.categoria.toLowerCase()
        const antes = repuestosFiltrados.length
        repuestosFiltrados = repuestosFiltrados.filter(r => 
          (r.categoria || '').toLowerCase() === categoriaBuscada
        )
        if (antes !== repuestosFiltrados.length) {
          console.log(`🔍 [getRepuestos] Filtrado adicional por categoría: ${repuestosFiltrados.length} productos`)
        }
      }

      console.log(`✅ [getRepuestos] Total productos procesados: ${repuestosFiltrados.length}`)

      // Filtrar por búsqueda de texto si se proporciona
      if (filtros.busqueda) {
        const termino = filtros.busqueda.toLowerCase()
        const filtrados = repuestosFiltrados.filter(repuesto => 
          repuesto.nombre.toLowerCase().includes(termino) ||
          repuesto.descripcion.toLowerCase().includes(termino) ||
          repuesto.searchTerms.some(term => term.toLowerCase().includes(termino))
        )
        console.log(`🔍 [getRepuestos] Después de búsqueda de texto: ${filtrados.length} productos`)
        return filtrados
      }

      console.log(`✅ [getRepuestos] Retornando ${repuestosFiltrados.length} productos`)
      return repuestosFiltrados
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

  // Obtener repuestos por slug (case-insensitive)
  const getRepuestoBySlug = async (slug: string): Promise<Repuesto | null> => {
    try {
      const repuestosRef = collection($firestore, 'repuestos')
      const slugLower = slug.toLowerCase()
      
      // Intentar primero con el slug exacto (puede tener mayúsculas)
      let q = query(repuestosRef, where('slug', '==', slug), where('activo', '==', true))
      let querySnapshot = await getDocs(q)
      
      // Si no se encuentra, intentar con el slug en minúsculas
      if (querySnapshot.empty && slug !== slugLower) {
        q = query(repuestosRef, where('slug', '==', slugLower), where('activo', '==', true))
        querySnapshot = await getDocs(q)
      }
      
      // Si aún no se encuentra, buscar todos los activos y filtrar en memoria (case-insensitive)
      if (querySnapshot.empty) {
        q = query(repuestosRef, where('activo', '==', true), limit(100))
        querySnapshot = await getDocs(q)
        
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
        
        // Buscar por slug case-insensitive
        const repuestoEncontrado = repuestos.find(r => 
          (r.slug || '').toLowerCase() === slugLower
        )
        
        if (repuestoEncontrado) {
          return repuestoEncontrado
        }
      }
      
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
      console.log('📝 [useRepuestos] Guardando producto en Firestore...')
      console.log('📦 [useRepuestos] Datos del producto:', repuestoData)
      
      const repuestosRef = collection($firestore, 'repuestos')
      console.log('✅ [useRepuestos] Referencia a colección "repuestos" creada')
      
      const now = new Date()
      
      const nuevoRepuesto = {
        ...repuestoData,
        createdAt: now,
        updatedAt: now
      }

      console.log('💾 [useRepuestos] Producto a guardar:', nuevoRepuesto)
      const docRef = await addDoc(repuestosRef, nuevoRepuesto)
      console.log('✅ [useRepuestos] Producto guardado exitosamente!')
      console.log('🆔 [useRepuestos] ID del documento:', docRef.id)
      console.log('📍 [useRepuestos] Ruta completa en Firestore: repuestos/' + docRef.id)
      console.log('📋 [useRepuestos] Para verlo en Firestore Console:')
      console.log('   1. Ve a https://console.firebase.google.com')
      console.log('   2. Selecciona tu proyecto')
      console.log('   3. Ve a Firestore Database')
      console.log('   4. Busca la colección: "repuestos"')
      console.log('   5. Busca el documento con ID:', docRef.id)
      
      return docRef.id
    } catch (error) {
      console.error('❌ [useRepuestos] Error al crear repuesto:', error)
      console.error('❌ [useRepuestos] Detalles del error:', error.message, error.stack)
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
      anio: repuesto.anio,
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
