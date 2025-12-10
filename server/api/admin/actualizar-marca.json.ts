import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // Solo permitir métodos POST
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    const { marca, modelo, año, categoria } = body

    if (!marca || !modelo || !año) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan parámetros requeridos: marca, modelo, año'
      })
    }

    // Ruta al archivo JSON de la marca
    const marcaSlug = marca.toLowerCase().replace(/\s+/g, '-')
    const filePath = join(process.cwd(), 'data', 'marcas', `${marcaSlug}.json`)

    // Leer el archivo JSON actual
    let marcaData
    try {
      const fileContent = await readFile(filePath, 'utf-8')
      marcaData = JSON.parse(fileContent)
    } catch (error) {
      // Si el archivo no existe, crear uno nuevo
      marcaData = {
        marca: {
          id: marcaSlug,
          nombre: marca.toUpperCase(),
          slug: marcaSlug,
          activa: true,
          popular: false
        },
        modelos: []
      }
    }

    // Buscar o crear el modelo
    const modeloSlug = modelo.toLowerCase().replace(/\s+/g, '-')
    let modeloExistente = marcaData.modelos.find((m: any) => m.slug === modeloSlug)

    if (!modeloExistente) {
      // Crear nuevo modelo
      modeloExistente = {
        id: modeloSlug,
        nombre: modelo,
        slug: modeloSlug,
        años: [],
        generaciones: [],
        categorias: [],
        activa: true,
        popular: false
      }
      marcaData.modelos.push(modeloExistente)
    }

    // Agregar año si no existe
    const añoNum = parseInt(año)
    if (!modeloExistente.años.includes(añoNum)) {
      modeloExistente.años.push(añoNum)
      modeloExistente.años.sort((a: number, b: number) => a - b)

      // Actualizar generaciones si es necesario
      if (modeloExistente.generaciones.length === 0) {
        modeloExistente.generaciones.push({
          nombre: `Generación (${Math.min(...modeloExistente.años)}-presente)`,
          años: [...modeloExistente.años],
          caracteristicas: []
        })
      } else {
        // Actualizar la primera generación para incluir todos los años
        const primeraGen = modeloExistente.generaciones[0]
        primeraGen.años = [...modeloExistente.años]
        primeraGen.nombre = `Generación (${Math.min(...modeloExistente.años)}-presente)`
      }
    }

    // Agregar categoría si se proporciona y no existe
    if (categoria) {
      const categoriaSlug = categoria.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9-]/g, '')

      if (!modeloExistente.categorias.includes(categoriaSlug)) {
        modeloExistente.categorias.push(categoriaSlug)
        modeloExistente.categorias.sort()
      }
    }

    // Guardar el archivo actualizado
    await writeFile(filePath, JSON.stringify(marcaData, null, 2), 'utf-8')

    return {
      success: true,
      message: 'Marca actualizada correctamente',
      data: {
        marca: marcaData.marca,
        modelo: modeloExistente
      }
    }
  } catch (error: any) {
    console.error('Error actualizando marca:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error al actualizar la marca'
    })
  }
})

