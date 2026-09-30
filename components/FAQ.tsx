export const faqItems = [
  {
    question: '¿Cómo saber cuánto cobrar por mantenimiento web mensual?',
    answer:
      'Empieza por tu objetivo mensual, suma tus costes fijos y calcula una referencia por hora a partir de tus horas facturables reales. Después lleva esa base a cada cliente con las horas incluidas, un buffer de incidencias, costes mensuales directos y margen.',
  },
  {
    question: '¿Qué debería incluir un plan de mantenimiento web?',
    answer:
      'Depende del servicio, pero suele incluir actualizaciones, pequeñas tareas, soporte, supervisión básica, revisiones técnicas y un límite claro de horas o alcance mensual.',
  },
  {
    question: '¿Por qué hace falta un buffer de incidencias?',
    answer:
      'Porque el mantenimiento real rara vez consume exactamente las horas pactadas. El buffer sirve para cubrir picos de soporte, pequeños imprevistos y tareas no tan visibles sin regalar tiempo todos los meses.',
  },
  {
    question: '¿El IVA cuenta como ingreso real del mantenimiento?',
    answer:
      'No. Si tu actividad lleva IVA, ese importe normalmente se repercute al cliente y luego se liquida. Por eso la herramienta lo muestra aparte para no confundirlo con lo que realmente conservas.',
  },
  {
    question: '¿Sirve para mantenimiento de WordPress, webs corporativas o landing pages?',
    answer:
      'Sí. La lógica es útil para cualquier servicio recurrente de mantenimiento o soporte web donde necesites fijar una cuota mensual con una base económica más clara.',
  },
  {
    question: '¿La calculadora sustituye a una gestoría o a un asesor fiscal?',
    answer:
      'No. Sirve para orientarte y evitar cobrar la cuota mensual a ojo, pero no reemplaza una revisión profesional si necesitas un encaje fiscal o contractual exacto.',
  },
] as const;

export default function FAQ() {
  return (
    <section className="section alt" id="faq" aria-labelledby="faq-title">
      <div className="container text-block">
        <h2 id="faq-title">Preguntas frecuentes</h2>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
