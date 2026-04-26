import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CalculatorForm from '@/components/CalculatorForm';
import { track } from '@vercel/analytics';

vi.mock('@vercel/analytics', () => ({
  track: vi.fn(),
}));

describe('CalculatorForm', () => {
  beforeEach(() => {
    vi.mocked(track).mockClear();
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
    expect(track).not.toHaveBeenCalled();
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

    const resultCardHeading = screen.getByRole('heading', {
      name: /tu cuota mensual recomendada para mantenimiento web/i,
    });
    const resultCard = resultCardHeading.closest('section');

    expect(resultCard).not.toBeNull();
    expect(track).toHaveBeenCalledWith('maintenance_retainer_calculated', {
      hasIVA: 'yes',
      hasMargin: 'yes',
    });
    expect(resultCardHeading).toBeInTheDocument();
    expect(within(resultCard!).getByText(/referencia base por hora/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/^cuota minima defendible$/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/cuota recomendada sin iva/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/colchon entre minimo y recomendado/i)).toBeInTheDocument();
    expect(within(resultCard!).getAllByText(/total mensual con iva/i).length).toBeGreaterThan(0);
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
    await user.click(screen.getByRole('button', { name: /copiar resumen/i }));

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

    expect(track).toHaveBeenCalledTimes(1);
  });
});
