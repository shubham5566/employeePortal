import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

describe('Select Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('renders with label and options', () => {
    render(<Select label="Department" options={options} />);
    expect(screen.getByLabelText('Department')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message', () => {
    render(<Select options={options} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(<Select options={options} value="option2" />);
    expect(screen.getByRole('combobox')).toHaveValue('option2');
  });

  it('handles disabled state', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});