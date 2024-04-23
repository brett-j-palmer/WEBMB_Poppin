import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import axios from 'axios';

//Mock necessary components for the test
const mockNavigate = jest.fn();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: () => 'Link' 
}));



// Test if a valid username/password results in a successful registration
test('successful registration navigates to login page', async () => {
  render(<Register />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const registerButton = screen.getByRole('button', { name: /register/i });

  // Simulate user entering valid username and password
  fireEvent.change(usernameInput, { target: { value: 'testUser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  fireEvent.click(registerButton);   // Simulate register submission

  await axios.post;

  // Check if axios.post was called correctly to add a user,
  expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/users/add', {
    username: 'testUser', 
    password: 'password123'
  });

  // Check if navigation to login was triggered
  expect(mockNavigate).toHaveBeenCalledWith('/login');
});


// Test if a short username results in a failure to register
test('short username is rejected', async () => {
  render(<Register />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const registerButton = screen.getByRole('button', { name: /register/i });

  // Simulate user entering short username and valid password
  fireEvent.change(usernameInput, { target: { value: 'te' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  fireEvent.click(registerButton);   // Simulate form submission

  await axios.post;

  // Check if axios.post was not called
  expect(axios.post).not.toHaveBeenCalled();
  // Check if navigation to login was not called
  expect(mockNavigate).not.toHaveBeenCalled();
});

// Test if no password results in a failure to register
test('empty password field is rejected', async () => {
  render(<Register />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const registerButton = screen.getByRole('button', { name: /register/i });

  // Simulate user entering a valid username and no password
  fireEvent.change(usernameInput, { target: { value: 'test' } });
  fireEvent.change(passwordInput, { target: { value: '' } });
  
  fireEvent.click(registerButton);   // Simulate form submission

  await axios.post;

  // Check if axios.post was not called
  expect(axios.post).not.toHaveBeenCalled();
  // Check if navigation to login was not called
  expect(mockNavigate).not.toHaveBeenCalled();
});


// Test if an existing username attempted to register triggers the correct error message
test('existing username registration shows username is already taken', async () => {
  // Mock axios.post to simulate a conflict error
  axios.post.mockRejectedValueOnce({
    response: {
      status: 409,
      data: { message: 'Username is already taken' }
    }
  });

  render(<Register />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const registerButton = screen.getByRole('button', { name: /register/i });

  // Simulate user entering an existing username
  fireEvent.change(usernameInput, { target: { value: 'existingUser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(registerButton);

  const errorMessage = await screen.findByText(/username is already taken/i);
  
  //Check if the error message appears
  expect(errorMessage).toBeInTheDocument();
  //Check if the page does not reroute to Login
  expect(mockNavigate).not.toHaveBeenCalled();

});