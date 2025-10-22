export interface QuoteItemInput {
  itemCode?: string
  descripcion: string
  marca?: string
  cantidad: number
  precioUnitario: number
  descuentoUnit?: number
  fotoPreview?: string | null
}

export interface VehicleInfo {
  marca: string | null
  modelo: string | null
  ano: number | null
  vin?: string | null
}

export interface CreateQuoteInput {
  userId: string
  userEmail?: string | null
  userName?: string | null
  userPhone?: string | null
  vehicle: VehicleInfo
  currency: 'CLP' | 'USD'
  condicionesPago?: string
  plazoEntrega?: string
  validez?: string
  validaHasta?: Date | null
  items: QuoteItemInput[]
  // Nuevo: modo total final sin unitarios
  modoTotalFinal?: boolean
  totalFinal?: number
  creadaPor: { userId: string | null; nombre: string | null; role: 'admin' | 'vendedor' | 'cliente' }
}

export const useCotizaciones = () => {
  const computeTotals = (items: QuoteItemInput[], opts?: { modoTotalFinal?: boolean; totalFinal?: number }) => {
    if (opts?.modoTotalFinal && typeof opts.totalFinal === 'number') {
      const total = Math.max(0, opts.totalFinal)
      return { subTotal: total, descuento: 0, impuestos: 0, envio: 0, total }
    }
    const subTotal = items.reduce((acc, it) => acc + (it.cantidad * it.precioUnitario - (it.descuentoUnit || 0)), 0)
    return { subTotal, descuento: 0, impuestos: 0, envio: 0, total: subTotal }
  }

  const createQuote = async (input: CreateQuoteInput) => {
    const { $firestore } = useNuxtApp()
    const { collection, addDoc, serverTimestamp, doc, getDoc, setDoc } = await import('firebase/firestore')

    // Datos del cliente (denormalización)
    let userEmail = input.userEmail || null
    let userName = input.userName || null
    let userPhone = input.userPhone || null
    if (!userEmail || !userName) {
      const snap = await getDoc(doc($firestore, 'users', input.userId))
      const u = snap.data() || {}
      userEmail = userEmail || u.email || null
      userName = userName || u.displayName || u.email || null
      userPhone = userPhone || u.phone || null
    }

    const numero = `COT-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`
    const totals = computeTotals(input.items, { modoTotalFinal: input.modoTotalFinal, totalFinal: input.totalFinal })

    const quoteData: any = {
      numero,
      status: 'borrador',
      version: 1,
      vehicle: input.vehicle,
      currency: input.currency,
      condicionesPago: input.condicionesPago || '',
      plazoEntrega: input.plazoEntrega || '',
      validez: input.validez || 'Válida por 5 días',
      validaHasta: input.validaHasta || null,
      ...totals,
      modoTotalFinal: !!input.modoTotalFinal,
      totalFinal: typeof input.totalFinal === 'number' ? input.totalFinal : undefined,
      userId: input.userId,
      userEmail,
      userName,
      userPhone,
      creadaPor: input.creadaPor,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastEventAt: serverTimestamp(),
      searchableText: `${numero} ${userEmail || ''} ${userName || ''} ${(input.vehicle.marca || '')} ${(input.vehicle.modelo || '')}`.toLowerCase()
    }

    const quotesCol = collection($firestore, 'cotizaciones')
    const ref = await addDoc(quotesCol, quoteData)

    // Items
    for (const it of input.items) {
      const subtotalLinea = input.modoTotalFinal ? null : (it.cantidad * it.precioUnitario - (it.descuentoUnit || 0))
      await addDoc(collection($firestore, `cotizaciones/${ref.id}/items`), {
        ...it,
        subtotalLinea
      })
    }

    // Evento
    await addDoc(collection($firestore, `cotizaciones/${ref.id}/events`), {
      type: 'creada',
      description: 'Cotización creada',
      byUserId: input.creadaPor.userId,
      byName: input.creadaPor.nombre,
      byRole: input.creadaPor.role,
      createdAt: serverTimestamp()
    })

    return { id: ref.id, numero }
  }

  const addDoc = async (...args: any[]) => {
    const { addDoc } = await import('firebase/firestore')
    return (addDoc as any)(...args)
  }

  const listQuotes = async (opts: { status?: string; userId?: string; text?: string; order?: 'createdAt' | 'lastEventAt' } = {}) => {
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore')
    const filters: any[] = []
    if (opts.status) filters.push(where('status', '==', opts.status))
    if (opts.userId) filters.push(where('userId', '==', opts.userId))
    const q = query(collection($firestore, 'cotizaciones'), ...filters, orderBy(opts.order || 'createdAt', 'desc'))
    const snap = await getDocs(q)
    const items: any[] = []
    snap.forEach(d => items.push({ id: d.id, ...d.data() }))
    // Filtro de texto en cliente (sobre denormalizado)
    if (opts.text) {
      const t = opts.text.toLowerCase()
      return items.filter(i => (i.searchableText || '').includes(t))
    }
    return items
  }

  const getQuoteWithItems = async (id: string) => {
    const { $firestore } = useNuxtApp()
    const { doc, getDoc, collection, getDocs } = await import('firebase/firestore')
    const qDoc = await getDoc(doc($firestore, 'cotizaciones', id))
    const data = qDoc.data() || {}
    const itemsSnap = await getDocs(collection($firestore, `cotizaciones/${id}/items`))
    const items: any[] = []
    itemsSnap.forEach(d => items.push({ id: d.id, ...d.data() }))
    return { id, ...data, items }
  }

  // Eliminar cotización con sus subcolecciones (items y events)
  const deleteQuote = async (id: string) => {
    const { $firestore } = useNuxtApp()
    const { doc, deleteDoc, collection, getDocs } = await import('firebase/firestore')
    // Borrar items
    const itemsSnap = await getDocs(collection($firestore, `cotizaciones/${id}/items`))
    const eventsSnap = await getDocs(collection($firestore, `cotizaciones/${id}/events`))
    const deletions: Promise<any>[] = []
    itemsSnap.forEach(d => deletions.push(deleteDoc(doc($firestore, `cotizaciones/${id}/items`, d.id))))
    eventsSnap.forEach(d => deletions.push(deleteDoc(doc($firestore, `cotizaciones/${id}/events`, d.id))))
    await Promise.all(deletions)
    // Borrar doc principal
    await deleteDoc(doc($firestore, 'cotizaciones', id))
  }

  const updateQuoteStatus = async (id: string, status: string, actor: { userId: string | null; nombre: string | null; role: string }, description?: string) => {
    const { $firestore } = useNuxtApp()
    const { doc, updateDoc, serverTimestamp, collection, addDoc } = await import('firebase/firestore')
    await updateDoc(doc($firestore, 'cotizaciones', id), { status, updatedAt: serverTimestamp(), lastEventAt: serverTimestamp() })
    await addDoc(collection($firestore, `cotizaciones/${id}/events`), { type: status, description: description || '', byUserId: actor.userId, byName: actor.nombre, byRole: actor.role, createdAt: serverTimestamp() })
  }

  // Actualizar cotización e items (sobrescribe items)
  const updateQuote = async (id: string, input: CreateQuoteInput) => {
    const { $firestore } = useNuxtApp()
    const { doc, updateDoc, serverTimestamp, collection, getDocs, deleteDoc, addDoc } = await import('firebase/firestore')
    const totals = computeTotals(input.items, { modoTotalFinal: input.modoTotalFinal, totalFinal: input.totalFinal })
    await updateDoc(doc($firestore, 'cotizaciones', id), {
      vehicle: input.vehicle,
      currency: input.currency,
      condicionesPago: input.condicionesPago || '',
      plazoEntrega: input.plazoEntrega || '',
      validez: input.validez || 'Válida por 5 días',
      validaHasta: input.validaHasta || null,
      ...totals,
      modoTotalFinal: !!input.modoTotalFinal,
      totalFinal: typeof input.totalFinal === 'number' ? input.totalFinal : undefined,
      updatedAt: serverTimestamp(),
      lastEventAt: serverTimestamp(),
    })

    // Reemplazar items
    const existing = await getDocs(collection($firestore, `cotizaciones/${id}/items`))
    const deletions: Promise<any>[] = []
    existing.forEach(d => deletions.push(deleteDoc(d.ref)))
    await Promise.all(deletions)
    for (const it of input.items) {
      const subtotalLinea = input.modoTotalFinal ? null : (it.cantidad * it.precioUnitario - (it.descuentoUnit || 0))
      await addDoc(collection($firestore, `cotizaciones/${id}/items`), { ...it, subtotalLinea })
    }
  }

  // Construye el HTML base de la cotización para reutilizar en preview y PDF
  const buildQuoteHtml = (quote: any) => `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #1e40af;padding-bottom:12px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="font-size:20px;font-weight:800;color:#1e40af;">AutoVentas360.cl</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:22px;font-weight:800;color:#1e40af;">COTIZACIÓN</div>
          <div style="color:#6b7280;font-size:12px;">${quote.numero}</div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
        <div>
          <div style="font-weight:600;font-size:12px;color:#374151;">Cliente</div>
          <div style="font-size:12px;color:#111827;">${quote.userName || ''}</div>
          <div style="font-size:12px;color:#6b7280;">${quote.userEmail || ''} • ${quote.userPhone || ''}</div>
        </div>
        <div>
          <div style="font-weight:600;font-size:12px;color:#374151;">Vehículo</div>
          <div style="font-size:12px;color:#111827;">${quote.vehicle?.marca || ''} ${quote.vehicle?.modelo || ''} ${quote.vehicle?.ano || ''}</div>
          <div style="font-size:12px;color:#6b7280;">VIN: ${quote.vehicle?.vin || '-'}</div>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">
        <thead>
          <tr>
            <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px;font-size:12px;color:#6b7280;">Ítem</th>
            <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px;font-size:12px;color:#6b7280;">Descripción</th>
            <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px;font-size:12px;color:#6b7280;">Marca</th>
            <th style="text-align:center;border-bottom:1px solid #e5e7eb;padding:10px;font-size:12px;color:#6b7280;">Foto</th>
            <th style="text-align:right;border-bottom:1px solid #e5e7eb;padding:10px;font-size:12px;color:#6b7280;">Cant.</th>
            ${quote.modoTotalFinal ? '' : '<th style="text-align:right;border-bottom:1px solid #e5e7eb;padding:10px;font-size:12px;color:#6b7280;">P. Unit.</th>'}
            ${quote.modoTotalFinal ? '' : '<th style="text-align:right;border-bottom:1px solid #e5e7eb;padding:10px;font-size:12px;color:#6b7280;">Subtotal</th>'}
          </tr>
        </thead>
        <tbody>
          ${
            (quote.items || []).map((it: any, idx: number) => `
              <tr>
                <td style="padding:12px 10px;border-bottom:1px solid #f3f4f6;font-size:12px;color:#374151;vertical-align:middle;">${it.itemCode || idx + 1}</td>
                <td style="padding:12px 10px;border-bottom:1px solid #f3f4f6;font-size:12px;color:#111827;vertical-align:middle;">${it.descripcion}</td>
                <td style="padding:12px 10px;border-bottom:1px solid #f3f4f6;font-size:12px;color:#374151;vertical-align:middle;">${it.marca || '-'}</td>
                <td style="padding:12px 10px;border-bottom:1px solid #f3f4f6;text-align:center;font-size:12px;color:#374151;vertical-align:middle;">${it.fotoPreview ? `<img src="${it.fotoPreview}" style="width:50px;height:50px;object-fit:cover;border-radius:4px;display:block;margin:0 auto;" />` : '-'}</td>
                <td style="padding:12px 10px;border-bottom:1px solid #f3f4f6;text-align:right;font-size:12px;color:#374151;vertical-align:middle;">${it.cantidad}</td>
                ${quote.modoTotalFinal ? '' : `<td style="padding:12px 10px;border-bottom:1px solid #f3f4f6;text-align:right;font-size:12px;color:#374151;vertical-align:middle;">${new Intl.NumberFormat('es-CL',{style:'currency',currency:quote.currency}).format(it.precioUnitario)}</td>`}
                ${quote.modoTotalFinal ? '' : `<td style=\"padding:12px 10px;border-bottom:1px solid #f3f4f6;text-align:right;font-size:12px;color:#111827;vertical-align:middle;\">${new Intl.NumberFormat('es-CL',{style:'currency',currency:quote.currency}).format((it.cantidad*it.precioUnitario)-(it.descuentoUnit||0))}</td>`}
              </tr>
            `).join('')
          }
        </tbody>
      </table>
      <div style="display:flex;justify-content:flex-end;margin-top:12px;">
        <div style="width:260px;">
          ${quote.modoTotalFinal ? '' : `<div style="display:flex;justify-content:space-between;font-size:12px;color:#374151;padding:4px 0;"><span>Subtotal</span><span>${new Intl.NumberFormat('es-CL',{style:'currency',currency:quote.currency}).format(quote.subTotal||0)}</span></div>`}
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#374151;padding:4px 0;">
            <span>Descuento</span>
            <span>${new Intl.NumberFormat('es-CL',{style:'currency',currency:quote.currency}).format(quote.descuento||0)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#374151;padding:4px 0;">
            <span>Impuestos</span>
            <span>${new Intl.NumberFormat('es-CL',{style:'currency',currency:quote.currency}).format(quote.impuestos||0)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#374151;padding:4px 0;">
            <span>Envío</span>
            <span>${new Intl.NumberFormat('es-CL',{style:'currency',currency:quote.currency}).format(quote.envio||0)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:14px;color:#111827;font-weight:700;padding:8px 0;border-top:1px solid #e5e7eb;">
            <span>Total</span>
            <span>${new Intl.NumberFormat('es-CL',{style:'currency',currency:quote.currency}).format(quote.total||0)}</span>
          </div>
        </div>
      </div>
      <div style="margin-top:8px;font-size:10px;color:#6b7280;">
        <div>Condiciones de pago: ${quote.condicionesPago || '-'}</div>
        <div>Plazo de entrega: ${quote.plazoEntrega || '-'}</div>
        <div>Validez: ${quote.validez || '-'}${quote.validaHasta ? ' (hasta '+ new Date(quote.validaHasta.seconds?quote.validaHasta.seconds*1000:quote.validaHasta).toLocaleDateString('es-CL') +')' : ''}</div>
      </div>
      <div style="margin-top:16px;color:#9ca3af;font-size:10px;">Esta cotización es informativa y puede variar según disponibilidad. No incluye instalación.</div>
    `

  // Generación de PDF del lado del cliente (sin Functions ni Storage)
  const generateQuotePdfClient = async (quote: any) => {
    const [{ jsPDF }, html2canvas] = await Promise.all([
      import('jspdf'),
      import('html2canvas')
    ])

    // Crear HTML temporal con estilo para PDF
    const container = document.createElement('div')
    container.style.width = '800px'
    container.style.padding = '24px'
    container.style.fontFamily = 'Inter, Arial, sans-serif'
    container.innerHTML = buildQuoteHtml(quote)

    document.body.appendChild(container)
    const canvas = await (html2canvas as any).default(container, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc: Document) => {
        try {
          // Remover estilos globales para evitar colores modernos no soportados (oklch)
          const head = clonedDoc.querySelector('head')
          head?.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => el.parentNode?.removeChild(el))
          // Forzar fondo blanco del body clonado
          const body = clonedDoc.querySelector('body') as HTMLElement | null
          if (body) body.style.backgroundColor = '#ffffff'
        } catch (_) {}
      }
    })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const ratio = pageWidth / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 24, canvas.width * ratio, canvas.height * ratio, '', 'FAST')
    pdf.save(`${quote.numero}.pdf`)
    document.body.removeChild(container)
  }

  return { createQuote, listQuotes, getQuoteWithItems, updateQuoteStatus, generateQuotePdfClient, buildQuoteHtml, deleteQuote, updateQuote }
}


