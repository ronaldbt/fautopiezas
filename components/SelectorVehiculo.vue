<template>
  <div class="bg-white rounded-xl p-6 shadow-lg">
    
    <!-- Tabs -->
    <div class="mb-4 border-b border-gray-200">
      <nav class="flex gap-2" aria-label="Tabs">
        <button
          class="px-4 py-2 rounded-t-md text-sm font-semibold"
          :class="activeTab === 'datos' ? 'bg-blue-50 text-blue-700 border border-gray-200 border-b-0' : 'text-gray-600 hover:text-gray-800'"
          @click="activeTab = 'datos'"
        >
          Datos
        </button>
        <button
          class="px-4 py-2 rounded-t-md text-sm font-semibold"
          :class="activeTab === 'vin' ? 'bg-blue-50 text-blue-700 border border-gray-200 border-b-0' : 'text-gray-600 hover:text-gray-800'"
          @click="activeTab = 'vin'"
        >
          N° VIN
        </button>
      </nav>
    </div>

    <!-- Contenido pestaña: Datos -->
    <div v-if="activeTab === 'datos'" class="flex flex-col lg:flex-row gap-4 items-end">
      <!-- Selector de Marca -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Marca</label>
        <select 
          v-model="marcaSeleccionada" 
          @change="onMarcaChange"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        >
          <option value="" class="text-gray-500">Seleccionar marca</option>
          <option v-for="marca in marcas" :key="marca.slug" :value="marca" class="text-gray-900">
            {{ marca.nombre }}
          </option>
        </select>
      </div>

      <!-- Selector de Modelo -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
        <select 
          v-model="modeloSeleccionado" 
          @change="onModeloChange"
          :disabled="!marcaSeleccionada"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
          :class="marcaSeleccionada ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-400'"
        >
          <option value="" class="text-gray-500">Seleccionar modelo</option>
          <option v-for="modelo in modelos" :key="modelo.slug" :value="modelo" class="text-gray-900">
            {{ modelo.nombre }}
          </option>
        </select>
      </div>

      <!-- Selector de Año -->
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Año</label>
        <select 
          v-model="añoSeleccionado" 
          :disabled="!modeloSeleccionado"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
          :class="modeloSeleccionado ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-400'"
        >
          <option value="" class="text-gray-500">Seleccionar año</option>
          <option v-for="año in años" :key="año" :value="año" class="text-gray-900">
            {{ año }}
          </option>
        </select>
      </div>

      <!-- Botón de búsqueda -->
      <button 
        @click="buscarRepuestos"
        :disabled="!marcaSeleccionada || !modeloSeleccionado || !añoSeleccionado"
        class="px-6 py-2 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        Buscar Repuestos
      </button>
    </div>

    <!-- Contenido pestaña: VIN -->
    <div v-else class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Número de VIN</label>
        <div class="flex flex-col sm:flex-row gap-2">
          <input
            v-model="vin"
            maxlength="17"
            placeholder="Ingresa VIN de 17 caracteres (sin I, O, Q)"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 uppercase tracking-wider"
          />
          <select
            v-model="vinYear"
            :disabled="!vinValido"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">Año (opcional)</option>
            <option v-for="y in vinYearCandidates" :key="y" :value="y">{{ y }}</option>
          </select>
          <button
            @click="buscarPorVIN"
            :disabled="!vinValido || vinLoading"
            class="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {{ vinLoading ? 'Buscando…' : 'Buscar VIN' }}
          </button>
        </div>
        <p v-if="vinError" class="mt-1 text-sm text-red-600">{{ vinError }}</p>
        <p v-else-if="vin && !vinValido" class="mt-1 text-sm text-gray-500">El VIN debe tener 17 caracteres válidos.</p>
        <p class="mt-1 text-xs text-gray-500">La búsqueda por VIN usa la API pública gratuita de NHTSA (vPIC).</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Composables
const { getMarcas, getModelosByMarca } = useVehiculos()

// Variables reactivas
const marcaSeleccionada = ref('')
const modeloSeleccionado = ref('')
const añoSeleccionado = ref('')
const modelos = ref([])
const años = ref([])
const loadingModelos = ref(false)

// VIN
const vin = ref('')
const vinLoading = ref(false)
const vinError = ref('')
const vinValido = computed(() => /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin.value.trim()))
const vinYear = ref('')
const vinYearCandidates = computed(() => {
  const val = vin.value.trim().toUpperCase()
  if (val.length !== 17) return []
  const yearChar = val[9]
  const map = {
    A: [1980, 2010, 2040], B: [1981, 2011, 2041], C: [1982, 2012, 2042], D: [1983, 2013, 2043], E: [1984, 2014, 2044],
    F: [1985, 2015, 2045], G: [1986, 2016, 2046], H: [1987, 2017, 2047], J: [1988, 2018, 2048], K: [1989, 2019, 2049],
    L: [1990, 2020, 2050], M: [1991, 2021, 2051], N: [1992, 2022, 2052], P: [1993, 2023, 2053], R: [1994, 2024, 2054],
    S: [1995, 2025, 2055], T: [1996, 2026, 2056], V: [1997, 2027, 2057], W: [1998, 2028, 2058], X: [1999, 2029, 2059],
    Y: [2000, 2030, 2060], 1: [2001, 2031, 2061], 2: [2002, 2032, 2062], 3: [2003, 2033, 2063], 4: [2004, 2034, 2064],
    5: [2005, 2035, 2065], 6: [2006, 2036, 2066], 7: [2007, 2037, 2067], 8: [2008, 2038, 2068], 9: [2009, 2039, 2069]
  }
  const candidates = map[yearChar] || []
  const current = new Date().getFullYear()
  return candidates.filter(y => y <= current).sort((a, b) => b - a)
})

// Tabs
const activeTab = ref('datos')

// Obtener marcas
const marcas = getMarcas()

// Función para manejar cambio de marca
const onMarcaChange = async () => {
  modeloSeleccionado.value = ''
  añoSeleccionado.value = ''
  años.value = []
  
  if (marcaSeleccionada.value) {
    loadingModelos.value = true
    try {
      // Cargar modelos desde el archivo JSON específico de la marca
      const marcaData = await import(`~/data/marcas/${marcaSeleccionada.value.slug}.json`)
      const marcaInfo = marcaData.default || marcaData
      modelos.value = marcaInfo.modelos || []
    } catch (error) {
      console.error('Error cargando modelos:', error)
      // Fallback: usar el composable si no existe el archivo específico
      try {
        modelos.value = await getModelosByMarca(marcaSeleccionada.value.slug)
      } catch (fallbackError) {
        console.error('Error en fallback:', fallbackError)
        modelos.value = []
      }
    } finally {
      loadingModelos.value = false
    }
  } else {
    modelos.value = []
  }
}

// Función para manejar cambio de modelo
const onModeloChange = () => {
  añoSeleccionado.value = ''
  
  if (modeloSeleccionado.value && modeloSeleccionado.value.años) {
    // Filtrar años desde 1970 en adelante y usar los años específicos del modelo
    const añosModelo = modeloSeleccionado.value.años.filter(año => año >= 1970)
    años.value = añosModelo.sort((a, b) => b - a) // Ordenar de mayor a menor
  } else {
    // Años genéricos desde 1970 hasta el año actual
    const añoActual = new Date().getFullYear()
    años.value = Array.from({ length: añoActual - 1970 + 1 }, (_, i) => añoActual - i)
  }
}

// Función para buscar repuestos
const buscarRepuestos = () => {
  // Validación estricta de todos los campos requeridos
  if (!marcaSeleccionada.value || !marcaSeleccionada.value.slug) {
    alert('Por favor selecciona una marca')
    return
  }
  
  if (!modeloSeleccionado.value || !modeloSeleccionado.value.slug) {
    alert('Por favor selecciona un modelo')
    return
  }
  
  if (!añoSeleccionado.value || añoSeleccionado.value === '' || añoSeleccionado.value === 'undefined') {
    alert('Por favor selecciona un año')
    return
  }
  
  // Solo navegar si todos los valores son válidos
  const marcaSlug = String(marcaSeleccionada.value.slug).trim()
  const modeloSlug = String(modeloSeleccionado.value.slug).trim()
  const año = String(añoSeleccionado.value).trim()
  
  if (marcaSlug && modeloSlug && año && año !== 'undefined') {
    navigateTo(`/repuestos/${marcaSlug}/${modeloSlug}/${año}`)
  } else {
    alert('Por favor completa todos los campos correctamente')
  }
}

// Normalizador de strings para comparar nombres
const normalizar = (texto) => {
  if (!texto) return ''
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]/g, '')
}

// Mapas de alias de marcas comunes entre vPIC y nuestro dataset
const aliasMarcas = {
  'mercedesbenz': 'mercedes-benz',
  'landrover': 'land-rover',
  'rollsroyce': 'rolls-royce',
  'alfa\s*romeo': 'alfa-romeo',
}

// Helper: fetch con fallback CORS público (AllOrigins) solo frontend
const fetchJSONConFallback = async (url) => {
  console.log('[VIN] fetchJSONConFallback -> url primaria:', url)
  try {
    const res = await fetch(url, { mode: 'cors' })
    console.log('[VIN] respuesta primaria status:', res.status)
    if (!res.ok) throw new Error('respuesta no OK')
    const json = await res.json()
    console.log('[VIN] json primaria (recortado):', Array.isArray(json?.Results) ? { Count: json.Count, Results0: json.Results?.[0] } : json)
    return json
  } catch (e) {
    console.warn('[VIN] primaria falló, probando fallback AllOrigins. Error:', e)
    // Fallback AllOrigins (gratuito, sin límite estricto, no requiere backend)
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
    console.log('[VIN] url fallback:', proxied)
    const res2 = await fetch(proxied)
    console.log('[VIN] respuesta fallback status:', res2.status)
    if (!res2.ok) throw new Error('fallback CORS falló')
    const json2 = await res2.json()
    console.log('[VIN] json fallback (recortado):', Array.isArray(json2?.Results) ? { Count: json2.Count, Results0: json2.Results?.[0] } : json2)
    return json2
  }
}

// Intento de obtener fabricante (Make) usando solo el WMI (primeros 3 caracteres del VIN)
const obtenerMarcaPorWMI = async (vinStr) => {
  try {
    const wmi = String(vinStr).slice(0, 3).toUpperCase()
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeWMI/${encodeURIComponent(wmi)}?format=json`
    console.log('[VIN] DecodeWMI url:', url)
    const data = await fetchJSONConFallback(url)
    const registro = data?.Results?.find(r => r?.CommonName || r?.Name) || data?.Results?.[0]
    const nombre = registro?.CommonName || registro?.Name || ''
    console.log('[VIN] DecodeWMI resultado:', registro)
    if (nombre) return nombre
    // Fallback local: mapa de WMI conocidos → marca
    const wmiLocalMap = {
      // Europa
      'VF3': 'Peugeot', 'VF7': 'Citroen', 'VSS': 'Seat', 'WAU': 'Audi', 'WBA': 'BMW', 'WBS': 'BMW', 'WDC': 'Mercedes-Benz', 'WDD': 'Mercedes-Benz', 'WP0': 'Porsche', 'WVW': 'Volkswagen',
      // Japón / Corea
      'JHM': 'Honda', 'JTD': 'Toyota', 'JTM': 'Toyota', 'JT2': 'Toyota', 'JN1': 'Nissan', 'JN8': 'Nissan', 'KMH': 'Hyundai', 'KNA': 'Kia', 'KNM': 'Kia',
      // América
      '1G': 'Chevrolet', '2G': 'Chevrolet', '3G': 'Chevrolet', '1N': 'Nissan', '3N': 'Nissan', '1F': 'Ford', '3F': 'Ford', '1C': 'Chrysler', '2C': 'Chrysler', '3C': 'Chrysler',
      // Otros frecuentes
      'ZFA': 'Fiat', 'ZFF': 'Ferrari', 'YS3': 'Saab', 'SAL': 'Land Rover', 'SCA': 'Rolls-Royce', 'TRU': 'Audi'
    }
    const nombreLocal = wmiLocalMap[wmi] || ''
    if (nombreLocal) console.log('[VIN] Fallback WMI local →', nombreLocal)
    return nombreLocal
  } catch (e) {
    console.warn('[VIN] DecodeWMI falló:', e)
    return ''
  }
}

// Buscar por VIN usando API gratuita NHTSA vPIC
const buscarPorVIN = async () => {
  vinError.value = ''
  const vinIngresado = vin.value.trim().toUpperCase()
  if (!vinValido.value) {
    vinError.value = 'Ingresa un VIN válido de 17 caracteres.'
    return
  }

  vinLoading.value = true
  try {
    // vPIC endpoints válidos: DecodeVinValuesExtended, DecodeVinValues, DecodeVin
    const endpoints = [
      (v) => `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${encodeURIComponent(v)}?format=json`,
      (v) => `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${encodeURIComponent(v)}?format=json`,
      (v) => `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${encodeURIComponent(v)}?format=json`,
    ]

    console.log('[VIN] buscarPorVIN -> vinIngresado:', vinIngresado)

    let data = null
    let lastError = null
    for (const builder of endpoints) {
      const url = builder(vinIngresado)
      try {
        console.log('[VIN] intentando endpoint:', url)
        // Si el usuario seleccionó un año, agregar modelyear; si no, probar con candidatos
        if (vinYear.value) {
          const withYear = url + `&modelyear=${encodeURIComponent(vinYear.value)}`
          console.log('[VIN] usando modelyear seleccionado:', vinYear.value)
          data = await fetchJSONConFallback(withYear)
        } else if (vinYearCandidates.value.length > 0) {
          for (const y of vinYearCandidates.value) {
            const withYear = url + `&modelyear=${encodeURIComponent(y)}`
            console.log('[VIN] probando modelyear candidato:', y)
            const d = await fetchJSONConFallback(withYear)
            if (d && Array.isArray(d.Results) && d.Results.length > 0) {
              const r0 = d.Results[0]
              if (r0 && (r0.Make || r0.Model || r0.ModelYear)) {
                data = d
                break
              }
            }
          }
          if (!data) {
            // último intento sin modelyear
            data = await fetchJSONConFallback(url)
          }
        } else {
          data = await fetchJSONConFallback(url)
        }
        if (data && Array.isArray(data.Results) && data.Results.length > 0) break
        console.warn('[VIN] respuesta sin Results, probando siguiente endpoint', data)
      } catch (e) {
        console.warn('[VIN] endpoint falló, probando siguiente:', url, e)
        lastError = e
      }
    }

    if (!data) throw lastError || new Error('Sin datos de vPIC')

    console.log('[VIN] data.Count:', data?.Count, 'data.Results length:', data?.Results?.length)
    const item = data?.Results?.[0] || {}
    console.log('[VIN] item recibido:', item)

    const make = item.Make || ''
    const model = item.Model || ''
    const year = item.ModelYear || ''
    console.log('[VIN] parsed -> make:', make, 'model:', model, 'year:', year)

    if (!make || !model || !year) {
      console.warn('[VIN] faltan datos decodificados, intentando DecodeWMI como fallback')
      const makeFromWMI = await obtenerMarcaPorWMI(vinIngresado)
      if (!makeFromWMI) {
        vinError.value = 'No se pudo decodificar marca/modelo/año desde el VIN.'
        console.warn('[VIN] DecodeWMI tampoco retornó marca')
        return
      }
      // Con la marca, intentamos preseleccionarla y pasar al tab "Datos" para completar modelo/año
      const makeNormWMI = normalizar(makeFromWMI)
      const m = (marcas || []).find(x => normalizar(x.nombre) === makeNormWMI || makeNormWMI.includes(normalizar(x.nombre)) || normalizar(x.nombre).includes(makeNormWMI))
      if (m) {
        marcaSeleccionada.value = m
        await onMarcaChange()
        activeTab.value = 'datos'
        vinError.value = 'Se detectó la marca por VIN. Selecciona modelo y año.'
        return
      } else {
        vinError.value = `Marca detectada por VIN no está en el catálogo: ${makeFromWMI}`
        return
      }
    }

    // Encontrar marca en nuestro dataset por nombre normalizado
    const makeNorm = normalizar(make)
    const marcasLista = marcas || []
    console.log('[VIN] makeNorm:', makeNorm, 'total marcas:', marcasLista?.length)

    const encontrarMarcaSlug = () => {
      // Intento directo por coincidencia de nombre normalizado
      let encontrada = marcasLista.find(m => normalizar(m.nombre) === makeNorm)
      if (encontrada) return encontrada.slug
      // Probar alias conocidos
      const aliasKey = Object.keys(aliasMarcas).find(k => new RegExp(`^${k}$`).test(makeNorm))
      if (aliasKey) {
        const aliasSlug = aliasMarcas[aliasKey]
        const porAlias = marcasLista.find(m => m.slug === aliasSlug)
        if (porAlias) return porAlias.slug
      }
      // Coincidencia parcial
      encontrada = marcasLista.find(m => normalizar(m.nombre).includes(makeNorm) || makeNorm.includes(normalizar(m.nombre)))
      return encontrada?.slug || ''
    }

    const marcaSlug = encontrarMarcaSlug()
    console.log('[VIN] marcaSlug encontrado:', marcaSlug)
    if (!marcaSlug) {
      vinError.value = `Marca no encontrada en el catálogo: ${make}`
      return
    }

    // Cargar modelos de la marca seleccionada
    let modelosMarca = []
    try {
      const marcaData = await import(`~/data/marcas/${marcaSlug}.json`)
      const marcaInfo = marcaData.default || marcaData
      modelosMarca = marcaInfo.modelos || []
      console.log('[VIN] modelos cargados desde json:', modelosMarca?.length)
    } catch (e) {
      try {
        modelosMarca = await getModelosByMarca(marcaSlug)
        console.log('[VIN] modelos cargados desde composable:', modelosMarca?.length)
      } catch {
        modelosMarca = []
      }
    }

    if (!Array.isArray(modelosMarca) || modelosMarca.length === 0) {
      vinError.value = `No hay modelos disponibles para la marca ${make}`
      return
    }

    const modelNorm = normalizar(model)
    console.log('[VIN] modelNorm:', modelNorm)
    const modeloCoincidente = modelosMarca.find(mod => {
      const nom = normalizar(mod.nombre)
      return nom === modelNorm || nom.includes(modelNorm) || modelNorm.includes(nom)
    })
    console.log('[VIN] modeloCoincidente:', modeloCoincidente?.slug || null)

    if (!modeloCoincidente) {
      vinError.value = `Modelo no encontrado en el catálogo para ${make}: ${model}`
      return
    }

    // Determinar año disponible más cercano
    const yearNum = Number(year)
    let añoFinal = yearNum
    if (Array.isArray(modeloCoincidente.años) && modeloCoincidente.años.length > 0) {
      const tiene = modeloCoincidente.años.includes(yearNum)
      añoFinal = tiene ? yearNum : modeloCoincidente.años[0]
    }
    console.log('[VIN] año seleccionado:', añoFinal)

    // Navegar a la ruta
    navigateTo(`/repuestos/${marcaSlug}/${modeloCoincidente.slug}/${añoFinal}`)
  } catch (err) {
    vinError.value = 'Error de red al consultar vPIC. Intenta nuevamente.'
    console.error('[VIN] error general:', err)
  } finally {
    vinLoading.value = false
  }
}

// Función para contactar por WhatsApp
const contactarWhatsApp = () => {
  if (marcaSeleccionada.value && modeloSeleccionado.value && añoSeleccionado.value) {
    const mensaje = `Hola! Me interesa consultar sobre repuestos para mi vehículo:\n\n• Marca: ${marcaSeleccionada.value.nombre}\n• Modelo: ${modeloSeleccionado.value.nombre}\n• Año: ${añoSeleccionado.value}\n\n¿Podrían ayudarme?`
    const numeroWhatsApp = '+56979796841'
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensaje)}`
    
    window.open(urlWhatsApp, '_blank')
  }
}

// Exponer funciones para uso externo
defineExpose({
  marcaSeleccionada,
  modeloSeleccionado,
  añoSeleccionado,
  buscarRepuestos,
  contactarWhatsApp
})
</script>
