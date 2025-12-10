import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const marcasDir = join(process.cwd(), 'data', 'marcas')
    const files = await readdir(marcasDir)
    const jsonFiles = files.filter(f => f.endsWith('.json'))

    const marcas = []

    for (const file of jsonFiles) {
      try {
        const filePath = join(marcasDir, file)
        const content = await readFile(filePath, 'utf-8')
        const data = JSON.parse(content)
        
        if (data.marca && data.marca.activa) {
          marcas.push({
            slug: data.marca.slug,
            nombre: data.marca.nombre,
            id: data.marca.id
          })
        }
      } catch (error) {
        console.error(`Error leyendo archivo ${file}:`, error)
      }
    }

    return {
      success: true,
      marcas: marcas.sort((a, b) => a.nombre.localeCompare(b.nombre))
    }
  } catch (error: any) {
    console.error('Error listando marcas:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error al listar las marcas'
    })
  }
})


