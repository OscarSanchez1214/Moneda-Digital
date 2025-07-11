# MiniApp Moneda Digital

Esta es una MiniApp lista para ser usada con World App, incluye:

- ✅ Verificación con World ID (MiniKit)
- ✅ Autenticación con NextAuth
- ✅ Estructura compatible con Vercel

## Variables de entorno

Crea un archivo `.env.local` con este contenido:

```env
APP_ID=app_tu_id_de_worldcoin
NEXTAUTH_SECRET=clave-secreta
NEXTAUTH_URL=https://moneda-digital.vercel.app
```

## Instalación

```bash
npm install
npm run dev
```

## Estructura del proyecto

- `/app/page.tsx` → Interfaz principal con botón World ID
- `/pages/api/verify.ts` → API para verificación World ID
- `/pages/api/auth/[...nextauth].ts` → Autenticación con credenciales (NextAuth)
