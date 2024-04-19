import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Rating from './Rating';

describe('Rating component', () => {
  it('calls onChange with valid rating when input changes', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<Rating onChange={mockOnChange} />);

    const input = getByPlaceholderText('Rate:');
    
    
    fireEvent.change(input, { target: { value: '5' } });


    expect(mockOnChange).toHaveBeenCalledWith(5);
  });

  it('does not call onChange with invalid rating', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<Rating onChange={mockOnChange} />);

    const input = getByPlaceholderText('Rate:');

    fireEvent.change(input, { target: { value: '-1' } });

    expect(mockOnChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '11' } });
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});


