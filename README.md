# FAutopiezas Chile - Repuestos para Autos

Plataforma web para la venta de repuestos automotrices en Chile, desarrollada con Nuxt 3 y Firebase.

## 🚀 Características

- **Selector de Vehículos**: Interfaz intuitiva para seleccionar marca, modelo y año
- **Catálogo Dinámico**: Repuestos organizados por categorías con filtros avanzados
- **SEO Optimizado**: URLs amigables, meta tags dinámicos y sitemap automático
- **Firebase Integration**: Base de datos en tiempo real para repuestos y categorías
- **Responsive Design**: Diseño adaptativo para todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Deployment**: Firebase CLI

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Instalar Firebase CLI globalmente
npm install -g firebase-tools
```

## 🔧 Configuración

1. **Variables de Entorno**: Crear archivo `.env` con las credenciales de Firebase:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_SERVICE_ACCOUNT_KEY=your_service_account_json_here
```

2. **Firebase Setup**: Configurar proyecto en Firebase Console

3. **Firebase Login**: 
```bash
firebase login
firebase init
```

## 🚀 Desarrollo

```bash
# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Generar sitio estático
npm run generate
```

## 📱 Deploy a Firebase

```bash
# Deploy completo
npm run deploy

# Solo hosting
npm run deploy:hosting

# Solo Firestore
npm run deploy:firestore
```

## 📁 Estructura del Proyecto

```
├── components/          # Componentes Vue reutilizables
│   ├── SelectorVehiculo.vue
│   ├── RepuestoCard.vue
│   └── FiltrosRepuestos.vue
├── composables/         # Composables de Vue
│   ├── useRepuestos.ts
│   └── useVehiculos.ts
├── data/               # Datos estáticos (marcas, modelos, categorías)
├── pages/              # Páginas de la aplicación
│   └── repuestos/      # Páginas dinámicas de repuestos
├── server/             # API routes del servidor
│   └── routes/         # Rutas de API
├── firebase.json       # Configuración de Firebase
├── firestore.rules     # Reglas de seguridad de Firestore
└── firestore.indexes.json # Índices de Firestore
```

## 🔥 Funcionalidades Implementadas

### ✅ Selector de Vehículos
- Búsqueda de marcas con filtro en tiempo real
- Carga dinámica de modelos por marca
- Navegación intuitiva marca → modelo → año → categoría

### ✅ Páginas Dinámicas
- Páginas de repuestos por marca, modelo, año y categoría
- Integración completa con Firebase Firestore
- Estados de carga y error manejados

### ✅ SEO Optimizado
- Meta tags dinámicos para cada página
- Sitemap XML generado automáticamente
- URLs amigables y estructuradas
- Schema.org markup para mejor indexación

### ✅ Componentes Reutilizables
- `SelectorVehiculo`: Selector principal de vehículos
- `RepuestoCard`: Tarjeta de repuesto con información completa
- `FiltrosRepuestos`: Sistema de filtros avanzados

## 📊 Estructura de Datos

### Marcas
```json
{
  "id": "toyota",
  "nombre": "TOYOTA",
  "slug": "toyota",
  "modelos": 25,
  "precioMin": 15000,
  "activa": true,
  "popular": true
}
```

### Repuestos
```json
{
  "marca": "toyota",
  "modelo": "corolla",
  "año": 2020,
  "categoria": "motor",
  "nombre": "Filtro de Aceite Toyota Corolla 2020",
  "precio": 25000,
  "stock": true,
  "codigoOEM": "TOYOTA-FILTRO-2020",
  "garantia": 12
}
```

## 🎯 Próximas Funcionalidades

- [ ] Sistema de carrito de compras
- [ ] Autenticación de usuarios
- [ ] Panel de administración
- [ ] Sistema de pagos
- [ ] Notificaciones push
- [ ] App móvil (PWA)

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, contactar al equipo de desarrollo.

---

**FAutopiezas Chile** - Los mejores repuestos para tu auto 🚗