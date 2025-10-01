<template>
  <nav class="flex items-center space-x-2 text-sm text-gray-600 py-4" aria-label="Breadcrumb">
    <NuxtLink 
      to="/" 
      class="hover:text-blue-600 transition-colors"
      itemscope 
      itemtype="https://schema.org/Thing"
      itemprop="item"
    >
      <span itemprop="name">Inicio</span>
    </NuxtLink>
    
    <template v-for="(item, index) in breadcrumbItems" :key="index">
      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      
      <NuxtLink 
        v-if="!item.isLast"
        :to="item.url" 
        class="hover:text-blue-600 transition-colors"
        itemscope 
        itemtype="https://schema.org/Thing"
        itemprop="item"
      >
        <span itemprop="name">{{ item.name }}</span>
      </NuxtLink>
      
      <span 
        v-else 
        class="text-gray-800 font-medium"
        itemscope 
        itemtype="https://schema.org/Thing"
        itemprop="item"
      >
        <span itemprop="name">{{ item.name }}</span>
      </span>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>