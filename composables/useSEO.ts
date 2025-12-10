export const useSEO = () => {
  const generateTitle = (pageType: string, data?: any) => {
    switch (pageType) {
      case 'home':
        return 'AutoPiezas360 - Repuestos Importados para Vehículos en Chile'
      case 'marca':
        return `Repuestos ${data?.marca} - AutoPiezas360 | Originales y Compatibles`
      case 'modelo':
        return `Repuestos ${data?.marca} ${data?.modelo} ${data?.año || ''} - AutoPiezas360`
      case 'categoria':
        return `${data?.categoria} para ${data?.marca} ${data?.modelo || ''} - AutoPiezas360`
      case 'producto':
        return `${data?.nombre} - ${data?.marca} ${data?.modelo || ''} | AutoPiezas360`
      case 'repuestos':
        return 'Catálogo de Repuestos Importados - AutoPiezas360'
      default:
        return 'AutoPiezas360 - Repuestos Importados con 50% Descuento'
    }
  }

  const generateDescription = (pageType: string, data?: any) => {
    switch (pageType) {
      case 'home':
        return 'Repuestos importados para tu vehículo con 50% de descuento. Importación directa desde fábrica. Toyota, Nissan, Chevrolet, BMW y más marcas. Envío a todo Chile en 7 días.'
      case 'marca':
        return `Repuestos originales y compatibles para ${data?.marca}. Importación directa con 50% descuento. Stock disponible, envío rápido a todo Chile.`
      case 'modelo':
        return `Repuestos específicos para ${data?.marca} ${data?.modelo} ${data?.año || ''}. Piezas originales y compatibles con garantía. Envío en 7 días.`
      case 'categoria':
        return `${data?.categoria} para ${data?.marca} ${data?.modelo || ''}. Repuestos de calidad con 50% descuento. Importación directa desde fábrica.`
      case 'producto':
        return `${data?.nombre} para ${data?.marca} ${data?.modelo || ''}. Código OEM: ${data?.codigoOEM || 'N/A'}. Precio: ${data?.precio ? new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(data.precio) : 'Consultar'}. Stock disponible.`
      case 'repuestos':
        return 'Catálogo completo de repuestos importados. Más de 10,000 piezas disponibles para todas las marcas. Precios con 50% descuento.'
      default:
        return 'Repuestos importados con 50% de descuento. Importación directa, calidad garantizada, envío rápido a todo Chile.'
    }
  }

  const generateKeywords = (pageType: string, data?: any) => {
    const baseKeywords = ['repuestos importados', 'autopartes chile', 'repuestos baratos', 'descuento 50%', 'importación directa']
    
    switch (pageType) {
      case 'marca':
        return [...baseKeywords, `repuestos ${data?.marca?.toLowerCase()}`, `${data?.marca?.toLowerCase()} chile`, `autopartes ${data?.marca?.toLowerCase()}`].join(', ')
      case 'modelo':
        return [...baseKeywords, `repuestos ${data?.marca?.toLowerCase()} ${data?.modelo?.toLowerCase()}`, `${data?.marca?.toLowerCase()} ${data?.modelo?.toLowerCase()} ${data?.año || ''}`, `autopartes ${data?.marca?.toLowerCase()}`].join(', ')
      case 'categoria':
        return [...baseKeywords, `${data?.categoria?.toLowerCase()}`, `${data?.categoria?.toLowerCase()} ${data?.marca?.toLowerCase()}`, `repuestos ${data?.categoria?.toLowerCase()}`].join(', ')
      case 'producto':
        return [...baseKeywords, `${data?.nombre?.toLowerCase()}`, `${data?.marca?.toLowerCase()} ${data?.modelo?.toLowerCase()}`, `${data?.codigoOEM || ''}`].join(', ')
      default:
        return [...baseKeywords, 'toyota', 'nissan', 'chevrolet', 'bmw', 'hyundai', 'ford'].join(', ')
    }
  }

  const setPageSEO = (pageType: string, data?: any, customTitle?: string, customDescription?: string) => {
    const title = customTitle || generateTitle(pageType, data)
    const description = customDescription || generateDescription(pageType, data)
    const keywords = generateKeywords(pageType, data)

    useSeoMeta({
      title,
      description,
      keywords,
      ogTitle: title,
      ogDescription: description,
      ogImage: 'https://autopiezas360.cl/og-image.jpg',
      ogUrl: `https://autopiezas360.cl${useRoute().path}`,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description
    })

    useHead({
      link: [
        { rel: 'canonical', href: `https://autopiezas360.cl${useRoute().path}` }
      ]
    })
  }

  const generateStructuredData = (type: string, data?: any) => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AutoPiezas360",
      "url": "https://autopiezas360.cl",
      "logo": "https://autopiezas360.cl/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+56-9-XXXX-XXXX",
        "contactType": "customer service",
        "areaServed": "CL",
        "availableLanguage": "Spanish"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CL",
        "addressRegion": "Región Metropolitana",
        "addressLocality": "Santiago"
      }
    }

    switch (type) {
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data?.nombre || '',
          "description": data?.descripcion || generateDescription('producto', data),
          "brand": {
            "@type": "Brand",
            "name": data?.marca || ''
          },
          "sku": data?.codigoOEM || data?.id || '',
          "offers": {
            "@type": "Offer",
            "price": data?.precio || 0,
            "priceCurrency": "CLP",
            "availability": data?.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": baseOrganization
          },
          "category": data?.categoria || '',
          "vehicleCompatibility": data?.vehicle ? `${data.vehicle.marca} ${data.vehicle.modelo} ${data.vehicle.año || ''}` : undefined
        }
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data?.breadcrumbs?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://autopiezas360.cl${item.path}`
          })) || []
        }

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "AutoPiezas360",
          "url": "https://autopiezas360.cl",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://autopiezas360.cl/buscar?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "publisher": baseOrganization
        }

      default:
        return baseOrganization
    }
  }

  const setStructuredData = (type: string, data?: any) => {
    const structuredData = generateStructuredData(type, data)
    
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(structuredData)
        }
      ]
    })
  }

  return {
    setPageSEO,
    setStructuredData,
    generateTitle,
    generateDescription,
    generateKeywords,
    generateStructuredData
  }
}