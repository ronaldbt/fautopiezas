import { ref, computed } from 'vue'

export interface ItemCarrito {
  id: string
  nombre: string
  precio: number
  cantidad: number
  imagen?: string
  marca: string
  modelo: string
  anio: number
  categoria: string
  slug: string
  stock: boolean
  codigoOEM?: string
}

const carrito = ref<ItemCarrito[]>([])

export const useCarrito = () => {
  // Cargar carrito desde localStorage al inicializar
  if (process.client) {
    const carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
      try {
        carrito.value = JSON.parse(carritoGuardado)
      } catch (error) {
        console.error('Error cargando carrito desde localStorage:', error)
        carrito.value = []
      }
    }
  }

  // Guardar carrito en localStorage cuando cambie
  const guardarCarrito = () => {
    if (process.client) {
      localStorage.setItem('carrito', JSON.stringify(carrito.value))
    }
  }

  // Agregar producto al carrito
  const agregarAlCarrito = (producto: ItemCarrito) => {
    const itemExistente = carrito.value.find(item => item.id === producto.id)
    
    if (itemExistente) {
      // Si ya existe, aumentar la cantidad
      itemExistente.cantidad += producto.cantidad || 1
    } else {
      // Si no existe, agregarlo
      carrito.value.push({
        ...producto,
        cantidad: producto.cantidad || 1
      })
    }
    
    guardarCarrito()
  }

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id: string) => {
    const index = carrito.value.findIndex(item => item.id === id)
    if (index > -1) {
      carrito.value.splice(index, 1)
      guardarCarrito()
    }
  }

  // Actualizar cantidad de un producto
  const actualizarCantidad = (id: string, cantidad: number) => {
    const item = carrito.value.find(item => item.id === id)
    if (item) {
      if (cantidad <= 0) {
        eliminarDelCarrito(id)
      } else {
        item.cantidad = cantidad
        guardarCarrito()
      }
    }
  }

  // Limpiar carrito
  const limpiarCarrito = () => {
    carrito.value = []
    guardarCarrito()
  }

  // Calcular total
  const total = computed(() => {
    return carrito.value.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  })

  // Contar items
  const cantidadItems = computed(() => {
    return carrito.value.reduce((sum, item) => sum + item.cantidad, 0)
  })

  // Verificar si el carrito está vacío
  const estaVacio = computed(() => {
    return carrito.value.length === 0
  })

  return {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    total,
    cantidadItems,
    estaVacio
  }
}


