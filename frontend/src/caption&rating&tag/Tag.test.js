import { render, fireEvent } from '@testing-library/react';
import Tag from './Tag';

describe('Tag component', () => {
  it('calls onChange with valid tag', () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(<Tag onChange={mockOnChange} />);

    const select = getByLabelText(/tag/i);

    fireEvent.change(select, { target: { value: 'movie' } });

    expect(mockOnChange).toHaveBeenCalledWith('movie');
  });

  it('does not call onChange with invalid tag', () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(<Tag onChange={mockOnChange} />);

    const select = getByLabelText(/tag/i);

    fireEvent.change(select, { target: { value: 'invalid' } });

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
