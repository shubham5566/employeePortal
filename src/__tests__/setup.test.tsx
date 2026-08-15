import { render, screen } from '@testing-library/react';

describe('Test Setup', () => {
  it('should work correctly', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});