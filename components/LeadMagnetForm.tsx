import { getSiteUrl, siteConfig } from '@/lib/site';

type LeadMagnetFormProps = {
  source: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function LeadMagnetForm({
  source,
  title = 'Apuntate al kit de mantenimiento web',
  description = 'Deja tu email y te avisaremos cuando publiquemos el kit gratuito con checklist de mantenimiento, estructura de cuota mensual y ejemplo de alcance para soporte recurrente.',
  buttonLabel = 'Quiero que me aviseis',
}: LeadMagnetFormProps) {
  const siteUrl = getSiteUrl();
  const thankYouUrl = new URL('/gracias-kit-mantenimiento', siteUrl).toString();
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
          value="Gracias por apuntarte al kit de mantenimiento web. Te avisaremos cuando publiquemos el recurso y las plantillas asociadas."
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
          Al enviar el formulario aceptas que usemos tu email para avisarte sobre este recurso.
          Mas informacion en <a href="/privacidad">privacidad</a>.
        </p>
      </form>
    </section>
  );
}
