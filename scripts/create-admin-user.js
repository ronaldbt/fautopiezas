// Script para crear usuarios admin/vendedor desde código
// Ejecutar con: node scripts/create-admin-user.js

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

// Configuración de Firebase (usa las mismas variables de entorno)
const firebaseConfig = {
  apiKey: "AIzaSyAkQfbzW3vaR0_liU36ZjRuqKY5XS6L8xg",
  authDomain: "repuestos-d6c3d.firebaseapp.com",
  projectId: "repuestos-d6c3d",
  storageBucket: "repuestos-d6c3d.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Función para crear usuario admin
async function createAdminUser() {
  try {
    // Datos del usuario
    const userData = {
      email: 'admin@autoventas360.cl',
      password: 'Admin123456!', // Cambia esta contraseña
      displayName: 'Administrador Principal',
      phone: '+56912345678',
      role: 'admin'
    }

    console.log('Creando usuario admin...')
    
    // Crear en Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    )
    
    console.log('Usuario creado en Auth:', userCredential.user.uid)

    // Crear documento en Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userData.email,
      displayName: userData.displayName,
      phone: userData.phone,
      role: userData.role,
      subscribeNewsletter: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      totalPedidos: 0,
      permissions: ['all'],
      active: true
    })

    console.log('✅ Usuario admin creado exitosamente!')
    console.log('Email:', userData.email)
    console.log('Password:', userData.password)
    console.log('UID:', userCredential.user.uid)
    
  } catch (error) {
    console.error('❌ Error creando usuario:', error.message)
  }
}

// Función para crear usuario vendedor
async function createVendedorUser() {
  try {
    const userData = {
      email: 'vendedor@autoventas360.cl',
      password: 'Vendedor123!', // Cambia esta contraseña
      displayName: 'Juan Vendedor',
      phone: '+56987654321',
      role: 'vendedor'
    }

    console.log('Creando usuario vendedor...')
    
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    )
    
    console.log('Usuario creado en Auth:', userCredential.user.uid)

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userData.email,
      displayName: userData.displayName,
      phone: userData.phone,
      role: userData.role,
      subscribeNewsletter: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      totalPedidos: 0,
      comision: 5.0,
      active: true
    })

    console.log('✅ Usuario vendedor creado exitosamente!')
    console.log('Email:', userData.email)
    console.log('Password:', userData.password)
    console.log('UID:', userCredential.user.uid)
    
  } catch (error) {
    console.error('❌ Error creando usuario:', error.message)
  }
}

// Función para crear usuario superadmin
async function createSuperAdminUser() {
  try {
    const userData = {
      email: 'superadmin@autoventas360.cl',
      password: 'SuperAdmin123!', // Cambia esta contraseña
      displayName: 'Super Administrador',
      phone: '+56955555555',
      role: 'superadmin'
    }

    console.log('Creando usuario superadmin...')
    
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    )
    
    console.log('Usuario creado en Auth:', userCredential.user.uid)

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userData.email,
      displayName: userData.displayName,
      phone: userData.phone,
      role: userData.role,
      subscribeNewsletter: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      totalPedidos: 0,
      permissions: ['all', 'system'],
      active: true
    })

    console.log('✅ Usuario superadmin creado exitosamente!')
    console.log('Email:', userData.email)
    console.log('Password:', userData.password)
    console.log('UID:', userCredential.user.uid)
    
  } catch (error) {
    console.error('❌ Error creando usuario:', error.message)
  }
}

// Ejecutar funciones
async function main() {
  console.log('🚀 Iniciando creación de usuarios...\n')
  
  // Crear los usuarios
  await createAdminUser()
  console.log('\n')
  
  await createVendedorUser()
  console.log('\n')
  
  await createSuperAdminUser()
  
  console.log('\n✅ Todos los usuarios creados!')
  console.log('Ahora puedes hacer login con estas credenciales.')
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { createAdminUser, createVendedorUser, createSuperAdminUser }






























