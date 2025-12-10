<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Mi Perfil</h1>
      <p class="text-gray-600 mt-2">Gestiona tu información personal y preferencias</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Información Personal -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Información Personal</h2>
          
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                <input
                  v-model="formData.displayName"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                <input
                  v-model="formData.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p class="text-xs text-gray-500 mt-1">El email no se puede cambiar</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+56912345678"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de registro</label>
                <input
                  :value="formatDate(user?.createdAt)"
                  type="text"
                  disabled
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                <span v-if="loading">Guardando...</span>
                <span v-else>Guardar Cambios</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Avatar y Estadísticas -->
      <div class="space-y-6">
        <!-- Avatar -->
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl font-bold text-white">{{ userInitial }}</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">{{ user?.displayName || 'Usuario' }}</h3>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
          <div class="mt-4">
            <span class="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Cliente desde {{ formatDate(user?.createdAt) }}
            </span>
          </div>
        </div>

        <!-- Preferencias -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Preferencias</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Newsletter</p>
                <p class="text-xs text-gray-500">Recibir ofertas y novedades</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="formData.subscribeNewsletter"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Información de Cuenta -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Información de Cuenta</h3>
          
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">ID de Usuario:</span>
              <span class="font-mono text-gray-900">{{ user?.uid?.substring(0, 8) }}...</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Último acceso:</span>
              <span class="text-gray-900">{{ formatDate(user?.lastLogin) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Rol:</span>
              <span class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {{ user?.role || 'cliente' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Layout específico para cliente
definePageMeta({
  layout: 'dashboard-professional'
})

// SEO - No indexar páginas privadas
useHead({
  title: 'Mi Perfil - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const authStore = useAuthStore()
const { $firebaseAuth, $firestore } = useNuxtApp()

// Datos del usuario
const user = computed(() => authStore.user)
const userInitial = computed(() => user.value?.displayName?.charAt(0).toUpperCase() || 'U')

// Estado del formulario
const formData = ref({
  displayName: '',
  phone: '',
  subscribeNewsletter: false
})

const loading = ref(false)

// Cargar datos del usuario
onMounted(() => {
  if (user.value) {
    formData.value = {
      displayName: user.value.displayName || '',
      phone: user.value.phone || '',
      subscribeNewsletter: user.value.subscribeNewsletter || false
    }
  }
})

// Función para formatear fecha
const formatDate = (date) => {
  if (!date) return 'No disponible'
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

// Función para actualizar perfil
const updateProfile = async () => {
  loading.value = true
  
  try {
    const { updateProfile: updateFirebaseProfile } = await import('firebase/auth')
    const { doc, setDoc } = await import('firebase/firestore')
    
    // Actualizar perfil en Firebase Auth
    if ($firebaseAuth?.currentUser) {
      await updateFirebaseProfile($firebaseAuth.currentUser, {
        displayName: formData.value.displayName
      })
      
      // Actualizar datos en Firestore
      await setDoc(doc($firestore, 'users', $firebaseAuth.currentUser.uid), {
        displayName: formData.value.displayName,
        phone: formData.value.phone,
        subscribeNewsletter: formData.value.subscribeNewsletter,
        updatedAt: new Date()
      }, { merge: true })
      
      // Actualizar el store
      await authStore.loadUserData($firebaseAuth.currentUser.uid)
      
      // Mostrar mensaje de éxito
      alert('Perfil actualizado correctamente')
    }
  } catch (error) {
    console.error('Error actualizando perfil:', error)
    alert('Error al actualizar el perfil')
  } finally {
    loading.value = false
  }
}
</script>






























