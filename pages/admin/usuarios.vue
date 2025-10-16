<template>
  <div>
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p class="text-gray-600 mt-2">Administra usuarios del sistema</p>
        </div>
        <button
          @click="showNewUserModal = true"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Crear Usuario</span>
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <input
            v-model="filtroBusqueda"
            type="text"
            placeholder="Nombre, email..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Rol</label>
          <select
            v-model="filtroRol"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los roles</option>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select
            v-model="filtroEstado"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        
        <div class="flex items-end">
          <button
            @click="limpiarFiltros"
            class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Usuarios -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Usuario</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Email</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Rol</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Registro</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Último Acceso</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Pedidos</th>
              <th class="text-left py-4 px-6 font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="usuario in usuariosFiltrados" :key="usuario.id" class="hover:bg-gray-50">
              <td class="py-4 px-6">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-sm font-bold text-white">{{ usuario.displayName?.charAt(0).toUpperCase() || 'U' }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ usuario.displayName || 'Sin nombre' }}</p>
                    <p class="text-sm text-gray-500">{{ usuario.phone || 'Sin teléfono' }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <p class="text-sm text-gray-900">{{ usuario.email }}</p>
              </td>
              <td class="py-4 px-6">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" 
                      :class="getRoleClass(usuario.role)">
                  {{ getRoleText(usuario.role) }}
                </span>
              </td>
              <td class="py-4 px-6 text-sm text-gray-500">
                {{ formatDate(usuario.createdAt) }}
              </td>
              <td class="py-4 px-6 text-sm text-gray-500">
                {{ formatDate(usuario.lastLogin) }}
              </td>
              <td class="py-4 px-6">
                <span class="text-sm text-gray-900">{{ usuario.totalPedidos || 0 }}</span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center space-x-2">
                  <button
                    @click="verUsuario(usuario.id)"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Ver
                  </button>
                  <button
                    @click="editarUsuario(usuario)"
                    class="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Editar
                  </button>
                  <button
                    @click="crearPedidoParaUsuario(usuario)"
                    class="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Crear Pedido
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Estado Vacío -->
      <div v-if="usuariosFiltrados.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay usuarios</h3>
        <p class="text-gray-500 mb-4">Comienza creando el primer usuario</p>
        <button
          @click="showNewUserModal = true"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Crear Usuario
        </button>
      </div>
    </div>

    <!-- Modal Crear Usuario -->
    <div v-if="showNewUserModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        <!-- Header del Modal -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">Crear Usuario</h2>
                <p class="text-blue-100 mt-1">Registrar nuevo usuario en el sistema</p>
              </div>
            </div>
            <button
              @click="showNewUserModal = false"
              class="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl flex items-center justify-center transition-all duration-200"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenido del Modal -->
        <div class="p-8">
          <form @submit.prevent="crearUsuario" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  v-model="nuevoUsuario.displayName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  v-model="nuevoUsuario.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="juan@email.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  v-model="nuevoUsuario.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+56912345678"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Rol *
                </label>
                <select
                  v-model="nuevoUsuario.role"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="cliente">Cliente</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña temporal *
              </label>
              <input
                v-model="nuevoUsuario.password"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mínimo 6 caracteres"
              />
              <p class="text-xs text-gray-500 mt-1">El usuario podrá cambiar su contraseña después</p>
            </div>

            <div class="flex items-center">
              <input
                v-model="nuevoUsuario.subscribeNewsletter"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label class="ml-2 text-sm text-gray-700">
                Suscribir al newsletter
              </label>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                @click="showNewUserModal = false"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                <span v-if="loading">Creando...</span>
                <span v-else>Crear Usuario</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Layout específico para admin
definePageMeta({
  layout: 'dashboard-professional',
  middleware: 'admin'
})

// SEO - No indexar páginas privadas
useHead({
  title: 'Gestión de Usuarios - AutoVentas360',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const authStore = useAuthStore()

// Estado
const usuarios = ref([])
const showNewUserModal = ref(false)
const loading = ref(false)
const filtroBusqueda = ref('')
const filtroRol = ref('')
const filtroEstado = ref('')

const nuevoUsuario = ref({
  displayName: '',
  email: '',
  phone: '',
  role: 'cliente',
  password: '',
  subscribeNewsletter: false
})

// Usuarios filtrados
const usuariosFiltrados = computed(() => {
  let filtrados = usuarios.value

  // Filtro de búsqueda
  if (filtroBusqueda.value) {
    const busqueda = filtroBusqueda.value.toLowerCase()
    filtrados = filtrados.filter(u => 
      u.displayName?.toLowerCase().includes(busqueda) ||
      u.email.toLowerCase().includes(busqueda)
    )
  }

  // Filtro de rol
  if (filtroRol.value) {
    filtrados = filtrados.filter(u => u.role === filtroRol.value)
  }

  return filtrados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// Función para formatear fecha
const formatDate = (date) => {
  if (!date) return 'Nunca'
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

// Función para obtener clase de rol
const getRoleClass = (role) => {
  const roleMap = {
    'admin': 'bg-red-100 text-red-800',
    'vendedor': 'bg-green-100 text-green-800',
    'cliente': 'bg-blue-100 text-blue-800'
  }
  return roleMap[role] || 'bg-gray-100 text-gray-800'
}

// Función para obtener texto de rol
const getRoleText = (role) => {
  const roleMap = {
    'admin': 'Administrador',
    'vendedor': 'Vendedor',
    'cliente': 'Cliente'
  }
  return roleMap[role] || role
}

// Función para limpiar filtros
const limpiarFiltros = () => {
  filtroBusqueda.value = ''
  filtroRol.value = ''
  filtroEstado.value = ''
}

// Función para ver usuario
const verUsuario = (usuarioId) => {
  navigateTo(`/admin/usuarios/${usuarioId}`)
}

// Función para editar usuario
const editarUsuario = (usuario) => {
  // TODO: Implementar edición de usuario
  console.log('Editar usuario:', usuario.id)
}

// Función para crear pedido para usuario
const crearPedidoParaUsuario = (usuario) => {
  // TODO: Implementar modal de crear pedido para usuario específico
  console.log('Crear pedido para:', usuario.id)
}

// Función para crear usuario
const crearUsuario = async () => {
  loading.value = true
  
  try {
    const { $firebaseAuth, $firestore } = useNuxtApp()
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
    
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      $firebaseAuth, 
      nuevoUsuario.value.email, 
      nuevoUsuario.value.password
    )
    
    // Actualizar perfil
    await updateProfile(userCredential.user, {
      displayName: nuevoUsuario.value.displayName
    })
    
    // Guardar en Firestore
    await setDoc(doc($firestore, 'users', userCredential.user.uid), {
      email: nuevoUsuario.value.email,
      displayName: nuevoUsuario.value.displayName,
      phone: nuevoUsuario.value.phone || '',
      role: nuevoUsuario.value.role,
      subscribeNewsletter: nuevoUsuario.value.subscribeNewsletter,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      totalPedidos: 0
    })
    
    // Limpiar formulario
    nuevoUsuario.value = {
      displayName: '',
      email: '',
      phone: '',
      role: 'cliente',
      password: '',
      subscribeNewsletter: false
    }
    
    showNewUserModal.value = false
    
    // Recargar lista de usuarios
    await cargarUsuarios()
    
    alert('Usuario creado exitosamente')
    
  } catch (error) {
    console.error('Error creando usuario:', error)
    alert('Error al crear el usuario: ' + error.message)
  } finally {
    loading.value = false
  }
}

// Cargar usuarios
const cargarUsuarios = async () => {
  try {
    const { $firestore } = useNuxtApp()
    const { collection, getDocs, query, orderBy } = await import('firebase/firestore')
    
    const usuariosQuery = query(
      collection($firestore, 'users'),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(usuariosQuery)
    usuarios.value = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      usuarios.value.push({
        id: doc.id,
        email: data.email,
        displayName: data.displayName,
        phone: data.phone,
        role: data.role,
        subscribeNewsletter: data.subscribeNewsletter,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate() || null,
        totalPedidos: data.totalPedidos || 0
      })
    })
    
  } catch (error) {
    console.error('Error cargando usuarios:', error)
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>
