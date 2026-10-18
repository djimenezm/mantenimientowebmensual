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

## Rastreo y respuesta del servidor

- `vercel.json` sitúa las funciones en París (`cdg1`), cerca del público español.
- `/ads.txt` se genera al compilar con el ID de editor configurado. Cambiar ese ID requiere un nuevo despliegue; no contiene datos de visitantes.
- `app/sitemap.ts` registra fechas de cambios editoriales reales. No actualices `lastContentUpdates` solo por desplegar o cambiar estilos.
- Las solicitudes de indexación ya aceptadas no se repiten para intentar adelantar la cola. La aprobación de AdSense y la indexación son procesos independientes de Google.

## Revisión local antes de publicar

La revisión local del 17 de octubre de 2026 unifica la titularidad en
`lib/site.ts` y añade desde el bloque de método de la portada un enlace HTML a
`/cuanto-cobrar-mantenimiento-web-mensual`. La auditoría pública detectó que
esa guía estaba en el sitemap, pero no enlazada desde la portada.
`siteIdentity.test.tsx` comprueba el responsable en pie, aviso legal y privacidad;
`homeVisualStructure.test.ts` conserva el enlace de descubrimiento.

La corrección se validó con pruebas, compilación y navegación en móvil. No
cambia las fórmulas, anuncios, URLs canónicas ni solicitudes a Google.

## Revisión de utilidad tras el rechazo de AdSense

El 18 de octubre de 2026 AdSense mostró para este dominio «Requiere su atención»
por «Contenido de poco valor»; `ads.txt` figuraba como «Autorizado». El panel no
identifica una página concreta ni garantiza que una corrección determinada
resuelva el rechazo. No confundir esta evaluación con la indexación de la guía.

- La guía principal conserva su URL y ahora documenta los ocho datos de un caso
  hipotético, sus operaciones, IVA separado, capacidad y límites del modelo.
- Los importes de portada, guía y FAQ se calculan con `lib/calculator.ts` y los
  escenarios ya existentes en `lib/packageExamples.ts`. No son tarifas de mercado.
- El porcentaje extra se describe como recargo sobre coste, no como margen de
  beneficio garantizado. Las fórmulas y el seguimiento de uso no cambian.
- El recurso público conserva su URL y añade ficha editable, registro de tareas,
  aprobación de extras y cierre del periodo. No exige registro ni correo.
- El sitemap y los datos de artículo registran solo las páginas revisadas, con
  fecha real. No se crean nuevas rutas para variantes de palabras clave.

`tests/editorialMaintenance.test.tsx` verifica importes, capacidad, coherencia de
FAQ, responsabilidad, enlaces y acceso al recurso en HTML generado en servidor.
No solicitar otra revisión hasta comprobar la versión publicada y decidir que
las mejoras responden al sitio completo. No activar anuncios ni modificar los
seguimientos automáticos durante esta corrección.

1. Ejecutar `npm run lint`, `npm test` y `npm run build`.
2. Probar un cálculo y un valor inválido.
3. Recorrer las guías y el formulario del recurso.
4. Comprobar `/sitemap.xml`, `/robots.txt` y `/ads.txt`.
