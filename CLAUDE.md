# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Firebase Deployment
- `npm run deploy` - Full deployment (build + deploy to Firebase)
- `npm run deploy:hosting` - Deploy only hosting
- `npm run deploy:firestore` - Deploy only Firestore rules and indexes

### Prerequisites
- Firebase CLI must be installed globally: `npm install -g firebase-tools`
- Must be logged into Firebase: `firebase login`

## Architecture

This is a Nuxt 3 e-commerce application for automotive parts built with:
- **Frontend**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS  
- **Backend**: Firebase Firestore (NoSQL database)
- **Deployment**: Firebase Hosting (static site generation)

### Key Architectural Patterns

#### Static Site Generation (SSG)
- Configured with `ssr: false` for Firebase Hosting compatibility
- Pre-renders critical routes in `nuxt.config.ts` nitro.prerender.routes
- Uses dynamic route generation for SEO-optimized URLs

#### Dynamic Routing Structure
```
/repuestos/[marca]/[modelo]/[año]/[categoria]/[repuesto]
```
Pages are organized hierarchically:
- `/repuestos/[marca]/index.vue` - Brand listings
- `/repuestos/[marca]/[modelo]/[año]/[categoria]/index.vue` - Category listings  
- `/repuestos/[marca]/[modelo]/[año]/[categoria]/[repuesto].vue` - Individual parts

#### Data Layer Architecture
- **Composables**: `useRepuestos.ts`, `useVehiculos.ts` for data fetching logic
- **Firebase Integration**: Client-side Firestore queries with real-time updates
- **Static Data**: Brand/model data in `/data/` directory for performance

#### Component Architecture
- **SelectorVehiculo.vue**: Main vehicle selection interface with cascading dropdowns
- **RepuestoCard.vue**: Reusable product card with pricing and stock info
- **FiltrosRepuestos.vue**: Advanced filtering system for parts catalog

### Database Schema (Firestore)

#### Collections
- `repuestos`: Main parts collection with fields: marca, modelo, año, categoria, nombre, precio, stock, codigoOEM
- `marcas`: Vehicle brands with metadata: nombre, slug, modelos count, pricing
- `categorias`: Part categories for classification
- `modelos`: Vehicle models (if using dynamic model data)

#### Key Indexes
- Composite index: marca + modelo + año + categoria (for hierarchical filtering)
- Composite index: categoria + precio (for price-based filtering)
- Composite index: activo + destacado + createdAt (for featured/active parts)

### Environment Configuration
- Uses Nuxt `runtimeConfig` for Firebase credentials
- Public config for client-side Firebase SDK
- Private config for server-side operations (service account key)

### SEO Implementation
- Dynamic meta tags per route with Open Graph support
- Sitemap generation for search engine indexing
- Structured URLs for better crawlability
- Schema.org markup (referenced in README)

### Firebase Security
- Read-only access for public collections (repuestos, marcas, categorias)
- Write access restricted to server-side operations only
- User collection with proper auth-based access control

## Key Files to Understand
- `nuxt.config.ts` - Main configuration including Firebase setup and SEO
- `firebase.json` - Firebase deployment and hosting configuration
- `firestore.rules` - Database security rules
- `composables/useRepuestos.ts` - Main data fetching logic
- `pages/repuestos/` - Dynamic routing implementation