import { render, screen } from '@testing-library/react';
import LeadMagnetForm from '@/components/LeadMagnetForm';

describe('LeadMagnetForm', () => {
  it('renders a capture form with email field and submit button', () => {
    render(<LeadMagnetForm source="test" />);

    expect(screen.getByRole('heading', { name: /te enviamos el kit de mantenimiento web/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /quiero el kit/i })).toBeInTheDocument();
    expect(screen.getByText(/privacidad/i)).toBeInTheDocument();
  });
});
