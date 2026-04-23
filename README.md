# Cuanto Cobrar Mantenimiento Web

MVP en Next.js para calcular cuanto cobrar por mantenimiento web mensual a partir de un objetivo mensual, unos costes fijos, tus horas facturables, las horas incluidas por cliente, un buffer de incidencias y una reserva fiscal orientativa.

## Requisitos

- Node.js 20.9 o superior
- npm 10 o superior

## Arranque en local

```bash
npm install
npm run dev
```

Despues abre:

```bash
http://localhost:3003
```

## Variable de entorno

Para produccion, configura:

```bash
NEXT_PUBLIC_SITE_URL=https://www.mantenimientowebmensual.es
```

## Estructura

```text
mantenimiento-web-mensual/
  app/
    aviso-legal/page.tsx
    cookies/page.tsx
    privacidad/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    CalculatorForm.tsx
    FAQ.tsx
    Footer.tsx
    Header.tsx
    ResultCard.tsx
  lib/
    calculator.ts
    format.ts
    site.ts
  public/
  .env.example
  .gitignore
  next-env.d.ts
  next.config.ts
  package.json
  README.md
  tsconfig.json
```
