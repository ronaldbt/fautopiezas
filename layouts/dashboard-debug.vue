<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar Fijo -->
    <div class="w-64 bg-blue-600 text-white fixed inset-y-0 left-0 z-50">
      <div class="p-6">
        <h2 class="text-xl font-bold">Debug Sidebar</h2>
        <p class="text-sm mt-2">Si ves esto, el layout funciona</p>
        <nav class="mt-6">
          <a href="/cliente" class="block py-2 text-blue-100 hover:text-white">Dashboard</a>
          <a href="/cliente/perfil" class="block py-2 text-blue-100 hover:text-white">Perfil</a>
          <a href="/cliente/pedidos" class="block py-2 text-blue-100 hover:text-white">Pedidos</a>
        </nav>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="flex-1 ml-64">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b h-16 flex items-center px-6">
        <h1 class="text-xl font-semibold">Dashboard Cliente</h1>
      </header>

      <!-- Contenido de la página -->
      <main class="p-6">
        <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Debug:</strong> Si ves este mensaje, el layout está funcionando correctamente.
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

console.log('Layout dashboard-debug cargado')
</script>

























