import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: jest.fn(),
  };

  it('renders pagination controls', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} totalItems={100} itemsPerPage={10} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls onPageChange when page is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination 
        {...defaultProps} 
        onPageChange={onPageChange}
        currentPage={1}
      />
    );
    
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not render when there is only one page', () => {
    render(<Pagination {...defaultProps} totalItems={5} itemsPerPage={10} />);
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
  });

  it('shows correct page numbers', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const pageButtons = screen.getAllByRole('button').filter(
      btn => !isNaN(Number(btn.textContent))
    );
    expect(pageButtons.length).toBeGreaterThan(0);
  });
});