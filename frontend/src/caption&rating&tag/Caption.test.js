import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Caption from './Caption';

describe('Caption component', () => {
  it('calls onChange with valid caption when input length is between 1 and 399 characters', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<Caption value="" onChange={mockOnChange} />);

    const input = getByPlaceholderText('Enter Caption:');

    fireEvent.change(input, { target: { value: 'This is a valid caption.' } });
    expect(mockOnChange).toHaveBeenCalledWith('This is a valid caption.');
  });

  it('does not call onChange with invalid caption when input length is less than or equal to 0 characters or more than 399 characters', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<Caption value="" onChange={mockOnChange} />);

    const input = getByPlaceholderText('Enter Caption:');

    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu' } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
