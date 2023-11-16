import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserForm from './UserForm';

// Mocking the props
const mockProps = {
  setProfileUser: jest.fn(),
};

describe('UserForm', () => {
  test('renders user form correctly', () => {
    render(<UserForm {...mockProps} />, { wrapper: MemoryRouter });
    
    // Check if the form elements are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up for an Account here!/i)).toBeInTheDocument();
  });

  test('handles form submission correctly', async () => {
    render(<UserForm {...mockProps} />, { wrapper: MemoryRouter });
    
    // Mock user input
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Mock form submission
    fireEvent.click(screen.getByText(/Sign up for an Account here!/i));

    // You can add assertions here based on the expected behavior after form submission
    // For example, check if setProfileUser has been called with the correct arguments
    expect(mockProps.setProfileUser).toHaveBeenCalledWith({
      id: '',
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
    });
  });


});
