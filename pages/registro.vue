<template>
  <div>
    <!-- Header fijo -->
    <Header />

    <!-- Contenido principal con padding para compensar header fijo -->
    <main class="pt-32 min-h-screen bg-gray-50">
      <div class="max-w-md mx-auto px-4 py-12">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <!-- Logo y título -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">A</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Crear Cuenta</h1>
            <p class="text-gray-600 mt-2">Únete a Autopiezas360 y accede a ofertas exclusivas</p>
          </div>

          <!-- Formulario de registro -->
          <form @submit.prevent="register" class="space-y-6">
            <!-- Nombre completo -->
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <input
                id="fullName"
                v-model="fullName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Juan Pérez"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu@email.com"
              />
            </div>

            <!-- Teléfono -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+56912345678"
              />
            </div>

            <!-- Contraseña -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                minlength="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <p class="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
            </div>

            <!-- Confirmar contraseña -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <!-- Términos y condiciones -->
            <div class="flex items-start">
              <input
                id="terms"
                v-model="acceptTerms"
                type="checkbox"
                required
                class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="terms" class="ml-2 text-sm text-gray-600">
                Acepto los 
                <NuxtLink to="/terminos" class="text-blue-600 hover:text-blue-700">términos y condiciones</NuxtLink>
                y la 
                <NuxtLink to="/privacidad" class="text-blue-600 hover:text-blue-700">política de privacidad</NuxtLink>
              </label>
            </div>

            <!-- Newsletter -->
            <div class="flex items-center">
              <input
                id="newsletter"
                v-model="subscribeNewsletter"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="newsletter" class="ml-2 text-sm text-gray-600">
                Quiero recibir ofertas y novedades por email
              </label>
            </div>

            <!-- Botón de registro -->
            <button
              type="submit"
              :disabled="loading || !acceptTerms"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <span v-if="loading">Creando cuenta...</span>
              <span v-else>Crear Cuenta</span>
            </button>

            <!-- Error message -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <p class="text-red-600 text-sm">{{ error }}</p>
            </div>
          </form>

          <!-- Divider -->
          <div class="my-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">O regístrate con</span>
              </div>
            </div>
          </div>

          <!-- Registro con Google -->
          <button
            @click="registerWithGoogle"
            :disabled="loading"
            class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continuar con Google</span>
          </button>

          <!-- Link a login -->
          <div class="mt-6 text-center">
            <p class="text-gray-600">
              ¿Ya tienes cuenta?
              <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-medium">
                Inicia sesión aquí
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Cargar auth dinámicamente para mejor code-splitting

// Variables reactivas
const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const subscribeNewsletter = ref(false)
const loading = ref(false)
const error = ref('')

// Función de registro con email y contraseña
const register = async () => {
  loading.value = true
  error.value = ''

  // Validar contraseñas
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    loading.value = false
    return
  }

  try {
    const { $firebaseAuth } = useNuxtApp()
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
    const userCredential = await createUserWithEmailAndPassword($firebaseAuth, email.value, password.value)
    
    // Actualizar perfil del usuario
    await updateProfile(userCredential.user, {
      displayName: fullName.value
    })

    // Guardar información del usuario en Firestore con rol "cliente"
    const { $firestore } = useNuxtApp()
    const { doc, setDoc } = await import('firebase/firestore')
    await setDoc(doc($firestore, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      displayName: fullName.value,
      phone: phone.value,
      role: 'cliente',
      subscribeNewsletter: subscribeNewsletter.value,
      createdAt: new Date(),
      lastLogin: new Date()
    })
    
    // Redirigir al dashboard del cliente
    await navigateTo('/cliente')
  } catch (err) {
    console.error('Error en registro:', err)
    switch (err.code) {
      case 'auth/email-already-in-use':
        error.value = 'Ya existe una cuenta con este correo electrónico.'
        break
      case 'auth/invalid-email':
        error.value = 'El correo electrónico no es válido.'
        break
      case 'auth/weak-password':
        error.value = 'La contraseña es muy débil. Usa al menos 6 caracteres.'
        break
      default:
        error.value = 'Error al crear la cuenta. Intenta nuevamente.'
    }
  } finally {
    loading.value = false
  }
}

// Función de registro con Google
const registerWithGoogle = async () => {
  loading.value = true
  error.value = ''

  try {
    const { $firebaseAuth, $firestore } = useNuxtApp()
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth')
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup($firebaseAuth, provider)
    
    // Guardar información del usuario en Firestore con rol "cliente" si es nuevo usuario
    const { doc, setDoc, getDoc } = await import('firebase/firestore')
    const userDoc = await getDoc(doc($firestore, 'users', result.user.uid))
    
    if (!userDoc.exists()) {
      await setDoc(doc($firestore, 'users', result.user.uid), {
        email: result.user.email,
        displayName: result.user.displayName,
        phone: '',
        role: 'cliente',
        subscribeNewsletter: false,
        createdAt: new Date(),
        lastLogin: new Date()
      })
    }
    
    // Redirigir al dashboard del cliente
    await navigateTo('/cliente')
  } catch (err) {
    console.error('Error en registro con Google:', err)
    error.value = 'Error al registrarse con Google. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

// SEO Meta
useHead({
  title: 'Registrarse - Autopiezas360',
  meta: [
    { name: 'description', content: 'Crea tu cuenta en Autopiezas360 para acceder a repuestos originales, ofertas exclusivas y envío gratis.' }
  ]
})
</script>






