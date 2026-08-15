import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

describe('Select Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('renders with label and options', () => {
    render(<Select label="Department" options={options} />);
    // The label is not associated with the select using htmlFor, so getByLabelText won't work
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    // Check for the default option
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalled();
    // Optional: Check if called with the correct value
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'option2'
      })
    }));
  });

  it('shows error message', () => {
    render(<Select options={options} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
    // Check if the error class is applied
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500');
  });

  it('renders with default value', () => {
    render(<Select options={options} value="option2" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('handles disabled state', () => {
    render(<Select options={options} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  // Additional tests
  it('has fullWidth by default', () => {
    render(<Select options={options} />);
    const container = screen.getByRole('combobox').parentElement;
    expect(container).toHaveClass('w-full');
    expect(screen.getByRole('combobox')).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    render(<Select options={options} className="custom-select" />);
    expect(screen.getByRole('combobox')).toHaveClass('custom-select');
  });

  it('does not apply fullWidth when fullWidth is false', () => {
    render(<Select options={options} fullWidth={false} />);
    const container = screen.getByRole('combobox').parentElement;
    expect(container).not.toHaveClass('w-full');
    expect(screen.getByRole('combobox')).not.toHaveClass('w-full');
  });
});