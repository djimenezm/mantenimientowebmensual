import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CalculatorForm from '@/components/CalculatorForm';

const trackEvent = vi.fn();

describe('CalculatorForm', () => {
  beforeEach(() => {
    trackEvent.mockClear();
    window.va = trackEvent;
  });

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
    expect(within(resultCard!).getByText(/^cuota minima defendible$/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/cuota recomendada sin iva/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/colchon entre minimo y recomendado/i)).toBeInTheDocument();
    expect(within(resultCard!).getAllByText(/total mensual con iva/i).length).toBeGreaterThan(0);
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
    expect(screen.getByText('Resumen copiado.')).toBeInTheDocument();
  });

  it('normalizes decimal billable hours to a whole number on blur', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const hoursInput = screen.getByRole('spinbutton', {
      name: /horas facturables al mes/i,
    });

    await user.clear(hoursInput);
    await user.type(hoursInput, '80.4');
    await user.tab();

    expect(hoursInput).toHaveValue(80);
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
