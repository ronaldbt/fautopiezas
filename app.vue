<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Meta tags globales para AutoPiezas360
useHead({
  title: 'AutoPiezas360 Chile - Repuestos Importados con Descuento',
  meta: [
    { name: 'description', content: 'Repuestos importados para autos con 50% de descuento. Importación directa desde fábrica. Envío a todo Chile en 7 días.' },
    { name: 'keywords', content: 'repuestos importados chile, autopartes descuento, repuestos toyota baratos, repuestos nissan importados, autopiezas360' }
  ]
})
</script>

<style>
/* Tailwind CSS será cargado automáticamente por Nuxt */
</style>