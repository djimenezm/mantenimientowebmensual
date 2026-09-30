import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CalculatorForm from '@/components/CalculatorForm';

const trackEvent = vi.fn();

describe('CalculatorForm', () => {
  beforeEach(() => {
    trackEvent.mockClear();
    window.va = trackEvent;
  });

  afterEach(() => vi.unstubAllGlobals());

  it('shows an error and blocks results when billable hours are 0', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const hoursInput = screen.getByRole('spinbutton', {
      name: /horas facturables al mes/i,
    });

    await user.clear(hoursInput);
    await user.type(hoursInput, '0');
    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));

    expect(screen.getByText('Las horas facturables deben ser mayores que 0.')).toBeInTheDocument();
    expect(screen.getByText('Revisa los campos marcados antes de calcular.')).toBeInTheDocument();
    expect(trackEvent).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('heading', {
        name: /tu cuota mensual recomendada para mantenimiento web/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('shows an error when the monthly target is 0', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const targetInput = screen.getByRole('spinbutton', {
      name: /objetivo mensual neto/i,
    });

    await user.clear(targetInput);
    await user.type(targetInput, '0');
    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));

    expect(screen.getByText('El objetivo mensual debe ser mayor que 0.')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: /tu cuota mensual recomendada para mantenimiento web/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('rejects a tax reserve above the supported limit', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const taxReserveInput = screen.getByRole('spinbutton', {
      name: /reserva fiscal orientativa/i,
    });

    await user.clear(taxReserveInput);
    await user.type(taxReserveInput, '100');
    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));

    expect(screen.getByText('La reserva fiscal debe ser como máximo 99.')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: /tu cuota mensual recomendada para mantenimiento web/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('renders the result card when the form is valid', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));

    const resultCardHeading = await screen.findByRole('heading', {
      name: /tu cuota mensual recomendada para mantenimiento web/i,
    });
    const resultCard = resultCardHeading.closest('section');

    expect(resultCard).not.toBeNull();
    expect(trackEvent).toHaveBeenCalledWith('event', {
      name: 'maintenance_retainer_calculated',
      data: {
        hasIVA: 'yes',
        hasMargin: 'yes',
      },
    });
    expect(resultCardHeading).toBeInTheDocument();
    expect(within(resultCard!).getByText(/referencia base por hora/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/^cuota mínima defendible$/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/cuota recomendada sin iva/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/colchón entre mínimo y recomendado/i)).toBeInTheDocument();
    expect(within(resultCard!).getAllByText(/total mensual con iva/i).length).toBeGreaterThan(0);
    expect(within(resultCard!).getByText('28 clientes')).toBeInTheDocument();
    expect(within(resultCard!).getByText('32 clientes')).toBeInTheDocument();
  });

  it('warns when the needed client portfolio exceeds the available hours', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const monthlyHours = screen.getByRole('spinbutton', { name: /horas facturables al mes/i });
    const clientHours = screen.getByRole('spinbutton', { name: /horas incluidas al mes por cliente/i });
    const buffer = screen.getByRole('spinbutton', { name: /buffer de incidencias/i });
    await user.clear(monthlyHours);
    await user.type(monthlyHours, '10');
    await user.clear(clientHours);
    await user.type(clientHours, '4');
    await user.clear(buffer);
    await user.type(buffer, '50');
    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));

    const capacity = (await screen.findByRole('heading', {
      name: /cuántos clientes como este necesitas/i,
    })).closest('.capacity-check');
    expect(capacity).toHaveTextContent('2 clientes');
    expect(capacity).toHaveTextContent('1 cliente');
    expect(capacity).toHaveTextContent(/supera tu capacidad en 2 h al mes/i);
  });

  it('tracks when the capacity comparison actually enters view', async () => {
    const user = userEvent.setup();
    let onIntersection: IntersectionObserverCallback | undefined;
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) {
        onIntersection = callback;
      }
      observe() {}
      disconnect() {}
    });

    render(<CalculatorForm />);
    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));
    await waitFor(() => expect(onIntersection).toBeDefined());
    expect(trackEvent).not.toHaveBeenCalledWith('event', expect.objectContaining({
      name: 'maintenance_capacity_viewed',
    }));

    act(() => onIntersection!([{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver));

    expect(trackEvent).toHaveBeenCalledWith('event', {
      name: 'maintenance_capacity_viewed',
      data: { outcome: 'within_capacity' },
    });
  });

  it('moves focus to the result card after a successful calculation', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));

    const resultCardHeading = await screen.findByRole('heading', {
      name: /tu cuota mensual recomendada para mantenimiento web/i,
    });
    const resultCard = resultCardHeading.closest('section');

    expect(resultCard).not.toBeNull();
    expect(resultCard).toHaveAttribute('tabindex', '-1');
    await waitFor(() => {
      expect(resultCard).toHaveFocus();
    });
  });

  it('copies a concise maintenance summary', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText,
      },
    });

    render(<CalculatorForm />);

    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));
    await user.click(await screen.findByRole('button', { name: /copiar resumen/i }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Cuota recomendada'));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Cuota mínima defendible'));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Colchón de negociación'));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Clientes similares necesarios'));
    expect(screen.getByText('Resumen copiado.')).toBeInTheDocument();
  });

  it('keeps fractional billable hours visible for correction', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const hoursInput = screen.getByRole('spinbutton', {
      name: /horas facturables al mes/i,
    });

    await user.clear(hoursInput);
    await user.type(hoursInput, '80.4');
    await user.tab();

    expect(hoursInput).toHaveValue(80.4);
  });

  it('preserves an invalid cost and focuses it after submission', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const costsInput = screen.getByRole('spinbutton', { name: /costes fijos mensuales/i });
    await user.clear(costsInput);
    await user.type(costsInput, '-100');
    await user.click(screen.getByRole('button', { name: /calcular cuota mensual/i }));

    expect(costsInput).toHaveValue(-100);
    expect(screen.getByText('Los costes fijos no pueden ser negativos.')).toBeInTheDocument();
    await waitFor(() => expect(costsInput).toHaveFocus());
    expect(screen.queryByRole('heading', { name: /tu cuota mensual recomendada para mantenimiento web/i })).not.toBeInTheDocument();
  });

  it('normalizes a pasted Spanish currency amount', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const targetInput = screen.getByRole('spinbutton', {
      name: /objetivo mensual neto/i,
    });

    await user.click(targetInput);
    await user.paste('2.500,50 €');

    expect(targetInput).toHaveValue(2500.5);
  });

  it('tracks the conversion only once per visit even if the user recalculates', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const submitButton = screen.getByRole('button', { name: /calcular cuota mensual/i });

    await user.click(submitButton);
    await user.click(submitButton);

    expect(trackEvent).toHaveBeenCalledTimes(1);
  });
});
