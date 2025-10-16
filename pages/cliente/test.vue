<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold">Página de Prueba del Cliente</h1>
    <p>Si puedes ver esto, la ruta /cliente/test funciona correctamente.</p>
    <p>Usuario: {{ user?.email || 'No autenticado' }}</p>
  </div>
</template>

<script setup>
// Layout específico para cliente
definePageMeta({
  layout: 'dashboard'
})

const { $firebaseAuth } = useNuxtApp()
const user = $firebaseAuth?.currentUser

console.log('Usuario en página de prueba:', user)
</script>





