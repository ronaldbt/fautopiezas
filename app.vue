<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Meta tags globales para FAutopiezas
useHead({
  title: 'FAutopiezas Chile - Repuestos para Autos',
  meta: [
    { name: 'description', content: 'Los mejores repuestos para autos en Chile. Stock inmediato, envío gratis, garantía extendida.' },
    { name: 'keywords', content: 'repuestos autos chile, autopartes chile, repuestos toyota chile, repuestos nissan chile' }
  ]
})
</script>

<style>
/* Tailwind CSS será cargado automáticamente por Nuxt */
</style>