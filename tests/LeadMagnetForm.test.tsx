import { render, screen } from '@testing-library/react';
import LeadMagnetForm from '@/components/LeadMagnetForm';

describe('LeadMagnetForm', () => {
  it('renders a capture form with email field and submit button', () => {
    render(<LeadMagnetForm source="test" />);

    expect(screen.getByRole('heading', { name: /apuntate al kit de mantenimiento web/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /quiero que me aviseis/i })).toBeInTheDocument();
    expect(screen.getByText(/privacidad/i)).toBeInTheDocument();
  });
});
