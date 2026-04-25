import { getSiteUrl, siteConfig } from '@/lib/site';

type LeadMagnetFormProps = {
  source: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function LeadMagnetForm({
  source,
  title = 'Te enviamos el kit de mantenimiento web',
  description = 'Deja tu email y te enviaremos acceso al kit con checklist mensual, ejemplo de alcance y estructura de cuota para vender mejor soporte recurrente.',
  buttonLabel = 'Quiero el kit',
}: LeadMagnetFormProps) {
  const siteUrl = getSiteUrl();
  const thankYouUrl = new URL('/gracias-kit-mantenimiento', siteUrl).toString();
  const resourceUrl = new URL('/kit-mantenimiento-web', siteUrl).toString();
  const downloadUrl = new URL('/recursos/kit-mantenimiento-web.txt', siteUrl).toString();
  const formAction = `https://formsubmit.co/${siteConfig.contactEmail}`;

  return (
    <section className="lead-card" aria-labelledby={`lead-form-title-${source}`}>
      <div className="lead-card-copy">
        <span className="eyebrow">Lista de interes</span>
        <h2 id={`lead-form-title-${source}`}>{title}</h2>
        <p>{description}</p>
      </div>

      <form className="lead-form" action={formAction} method="POST">
        <input
          type="hidden"
          name="_subject"
          value="Nueva solicitud del kit de mantenimiento web"
        />
        <input
          type="hidden"
          name="_autoresponse"
          value={`Gracias por pedir el kit de mantenimiento web. Puedes verlo aqui: ${resourceUrl} y descargar la version en texto aqui: ${downloadUrl}. Si publicamos mejoras importantes, te avisaremos en este mismo email.`}
        />
        <input type="hidden" name="_next" value={thankYouUrl} />
        <input type="hidden" name="origen" value={source} />
        <input type="hidden" name="interes" value="kit-mantenimiento-web" />
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="tu@email.com" required />
        </label>
        <input type="text" name="_honey" className="honey-field" tabIndex={-1} autoComplete="off" />
        <button type="submit" className="primary-button">
          {buttonLabel}
        </button>
        <p className="form-note">
          Al enviar el formulario aceptas que usemos tu email para darte acceso a este recurso y
          avisarte de futuras actualizaciones relacionadas. Mas informacion en{' '}
          <a href="/privacidad">privacidad</a>.
        </p>
      </form>
    </section>
  );
}
