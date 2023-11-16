import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

jest.mock('./qrgenerator', () => () => <div>Mocked QRgenerator</div>);

const mockProps = {
  user_id: '123',
  newUser: {
    id: '123',
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
  },
  setNewUser: jest.fn(),
};

describe('UserProfile', () => {
  test('renders user profile correctly', async () => {
    render(<UserProfile {...mockProps} />);

    // Check if user details are rendered
    expect(screen.getByText(/First Name: John/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name: Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Username: johndoe/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Password: password123/i)).toBeInTheDocument();
  });

  test('handles open dropdown correctly', async () => {
    render(<UserProfile {...mockProps} />);

    // Open dropdown
    fireEvent.click(screen.getByText(/Next Steps/i));

    // Check if QR Code generation button is rendered
    await waitFor(() => {
      expect(screen.getByText(/Generate A QR Code to Track your hours!/i)).toBeInTheDocument();
    });

    // Close dropdown
    fireEvent.click(screen.getByText(/Next Steps/i));

    // Check if QR Code generation button is not rendered
    await waitFor(() => {
      expect(screen.queryByText(/Generate A QR Code to Track your hours!/i)).toBeNull();
    });
  });

  test('handles QR Code generation click correctly', async () => {
    render(<UserProfile {...mockProps} />);

    // Open dropdown
    fireEvent.click(screen.getByText(/Next Steps/i));

    // Click on QR Code generation button
    fireEvent.click(screen.getByText(/Generate A QR Code to Track your hours!/i));

    // Check if setNewUser is called with the correct arguments
    expect(mockProps.setNewUser).toHaveBeenCalledWith(mockProps.newUser);
  });

  // Add more tests as needed
});
