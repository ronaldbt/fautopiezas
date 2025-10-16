import { Timestamp } from 'firebase/firestore'

export interface VehicleInfo {
  marca: string | null
  modelo: string | null
  ano: number | null
  vin?: string | null
}

export interface CreatePedidoInput {
  descripcion: string
  vehicle: VehicleInfo
  telefono?: string | null
  price?: number | null
  userId: string // cliente destino del pedido
  createdBy: string | null
  createdByRole: 'admin' | 'vendedor' | 'cliente'
  assignedTo?: string | null
}

export interface CreatePedidoActorMeta {
  byUserId: string | null
  byName: string | null
  byRole: 'admin' | 'vendedor' | 'cliente'
}

export const usePedidos = () => {
  const createPedido = async (input: CreatePedidoInput, actor: CreatePedidoActorMeta) => {
    const { $firestore } = useNuxtApp()
    const { collection, addDoc, serverTimestamp, doc, getDoc } = await import('firebase/firestore')

    // Obtener datos del cliente
    const clienteDoc = await getDoc(doc($firestore, 'users', input.userId))
    const cliente = clienteDoc.data() || {}

    const numero = `PED-${Date.now().toString().slice(-6)}`

    const pedidoData = {
      numero,
      descripcion: input.descripcion,
      vehicle: {
        marca: input.vehicle.marca || null,
        modelo: input.vehicle.modelo || null,
        ano: input.vehicle.ano ?? null,
        vin: input.vehicle.vin || null
      },
      telefono: input.telefono || null,
      price: input.price ?? null,

      // Estado principal (denormalizado)
      estado: 'solicitud_enviada',
      status: 'solicitud_enviada',
      fechaEstimada: null as Timestamp | null,

      // Cliente
      userId: input.userId,
      userEmail: cliente.email || null,
      userName: cliente.displayName || cliente.email || null,

      // Auditoría de creación
      createdBy: input.createdBy,
      createdByRole: input.createdByRole,
      assignedTo: input.assignedTo ?? null,

      // Metadatos y tiempos
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastEventAt: serverTimestamp(),
      prioridad: 'normal',
      notas: ''
    }

    const pedidosCol = collection($firestore, 'pedidos')
    const docRef = await addDoc(pedidosCol, pedidoData)

    // Crear primer evento
    await addDoc(collection($firestore, `pedidos/${docRef.id}/events`), {
      type: 'estado',
      status: 'solicitud_enviada',
      description: 'Pedido creado',
      byUserId: actor.byUserId,
      byName: actor.byName,
      byRole: actor.byRole,
      createdAt: serverTimestamp()
    })

    return { id: docRef.id, numero }
  }

  const updateEstado = async (pedidoId: string, nuevoEstado: string, actor: CreatePedidoActorMeta, descripcion?: string) => {
    const { $firestore } = useNuxtApp()
    const { collection, addDoc, doc, updateDoc, serverTimestamp } = await import('firebase/firestore')

    await addDoc(collection($firestore, `pedidos/${pedidoId}/events`), {
      type: 'estado',
      status: nuevoEstado,
      description: descripcion || `Estado actualizado a ${nuevoEstado}`,
      byUserId: actor.byUserId,
      byName: actor.byName,
      byRole: actor.byRole,
      createdAt: serverTimestamp()
    })

    await updateDoc(doc($firestore, 'pedidos', pedidoId), {
      estado: nuevoEstado,
      status: nuevoEstado,
      updatedAt: serverTimestamp(),
      lastEventAt: serverTimestamp()
    })
  }

  const listarPedidos = async (opts: { byUserId?: string; assignedTo?: string; status?: string; orderByField?: 'createdAt' | 'lastEventAt'; direction?: 'asc' | 'desc' } = {}) => {
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore')
    const filters: any[] = []
    if (opts.byUserId) filters.push(where('userId', '==', opts.byUserId))
    if (opts.assignedTo) filters.push(where('assignedTo', '==', opts.assignedTo))
    if (opts.status) filters.push(where('status', '==', opts.status))
    const orderField = opts.orderByField || 'createdAt'
    const dir = opts.direction || 'desc'
    const q = query(collection($firestore, 'pedidos'), ...filters, orderBy(orderField, dir))
    const snap = await getDocs(q)
    const items: any[] = []
    snap.forEach((d) => {
      const data: any = d.data()
      items.push({ id: d.id, ...data, createdAt: data.createdAt?.toDate?.() || null, updatedAt: data.updatedAt?.toDate?.() || null })
    })
    return items
  }

  const listarEventos = async (pedidoId: string, limitNum = 50) => {
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, orderBy, limit } = await import('firebase/firestore')
    const q = query(collection($firestore, `pedidos/${pedidoId}/events`), orderBy('createdAt', 'asc'), limit(limitNum))
    const snap = await getDocs(q)
    const items: any[] = []
    snap.forEach((d) => {
      const data: any = d.data()
      items.push({ id: d.id, ...data, createdAt: data.createdAt?.toDate?.() || null })
    })
    return items
  }

  return { createPedido, updateEstado, listarPedidos, listarEventos }
}


