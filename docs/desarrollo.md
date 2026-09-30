# Desarrollo de Cuánto Cobrar por Mantenimiento Web

Volver al [README](../README.md).

## Mapa del código

| Ubicación | Responsabilidad |
| --- | --- |
| `app/page.tsx` | Portada y acceso a la calculadora. |
| `app/*/page.tsx` | Guías, ejemplos, recurso descargable y páginas legales. |
| `components/CalculatorForm.tsx` | Estado e interacción del formulario. |
| `components/ResultCard.tsx` | Desglose y acciones del resultado. |
| `lib/calculator.ts` | Cálculo de la cuota mensual, independiente de React. |
| `lib/calculatorForm.ts` y `lib/spanishNumber.ts` | Valores iniciales, validación y lectura de importes españoles. |
| `app/globals.css` y `app/styles/` | Entrada de estilos y hojas en orden de cascada. |
| `tests/` | Pruebas de cálculo, formulario, accesibilidad y configuración. |

## Configuración

`NEXT_PUBLIC_SITE_URL` debe apuntar al dominio canónico <https://www.mantenimientowebmensual.es/>. Consulta `.env.example` para el resto de variables.

Los espacios publicitarios están preparados, pero `lib/ads.ts` exige `NEXT_PUBLIC_ADSENSE_ENABLED=true` y consentimiento gestionado para mostrarlos. No actives esa variable hasta que AdSense apruebe el sitio.

## Revisión local antes de publicar

1. Ejecutar `npm run lint`, `npm test` y `npm run build`.
2. Probar un cálculo y un valor inválido.
3. Recorrer las guías y el formulario del recurso.
4. Comprobar `/sitemap.xml`, `/robots.txt` y `/ads.txt`.
