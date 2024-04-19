import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import axios from 'axios';

// Mock necessary components for the test
const mockNavigate = jest.fn();

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
  }));

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    Link: () => 'Link' 
  }));

jest.mock('./UserContext', () => ({
    useUser: () => ({
      setUsername: jest.fn(),
    })
  }));
  


describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.post.mockClear();
  });

  // Test if valid login credentials results in a redirect to ./Post
  test('valid login navigates to "/Post"', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Login successful' } });
  
    // Simulate user entering valid username and password
    render(<Login />);
    userEvent.type(screen.getByLabelText(/username/i), 'testUser');
    userEvent.type(screen.getByLabelText(/password/i), 'password123');
    userEvent.click(screen.getByRole('button', { name: /login/i }));
  
    // Check if Login navigated to Post with the correct username
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/Post', { state: { username: 'testUser' } });
    });
  });

  //Test if a username that isn't in the database prints the correct error
  test('username not in database shows error', async () => {
    axios.post.mockRejectedValue({ response: { status: 404, data: { message: 'Username not found in the database.' } }});
    render(<Login />);

    // Simulate user entering non-existent username
    userEvent.type(screen.getByLabelText(/username/i), 'nonexistentUser');
    userEvent.type(screen.getByLabelText(/password/i), 'anyPassword');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    //Check if the correct error message is displayed
    const errorMessage = await screen.findByText(/Username not found in the database./i);
    expect(errorMessage).toBeInTheDocument();
  });

  //Test if an incorrect password entered prints the correct error
  test('incorrect password shows error', async () => {
    axios.post.mockRejectedValue({ response: { status: 401, data: { message: 'Password is incorrect.' } }});
    render(<Login />);

    // Simulate user entering an incorrect password
    userEvent.type(screen.getByLabelText(/username/i), 'testUser');
    userEvent.type(screen.getByLabelText(/password/i), 'wrongPassword');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    //Check if the correct error message is displayed
    const errorMessage = await screen.findByText(/Password is incorrect./i);
    expect(errorMessage).toBeInTheDocument();
  });

  //Test if an empty and empty field prints the correct error
  test('empty fields show error message', async () => {
    render(<Login />);
    
    //Simulate the user clicking 'Login' without typing anything
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    //Check if the correct error message is displayed
    const errorMessage = await screen.findByText(/both username and password are required./i);
    expect(errorMessage).toBeInTheDocument();
  });
});
