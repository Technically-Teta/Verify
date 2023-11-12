// Import necessary libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import EmailForm from './EmailForm';

// Mock the emailjs-com module
jest.mock('emailjs-com', () => ({
  init: jest.fn(),
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}));

describe('EmailForm component', () => {
  test('renders EmailForm component', () => {
    render(<EmailForm />);
    
    // Check if the form and its input fields are rendered
    expect(screen.getByPlaceholderText('Add Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Send custom message to community service organization')).toBeInTheDocument();
    expect(screen.getByText('Send Email')).toBeInTheDocument();
  });

  test('submits form and sends email on button click', async () => {
    render(<EmailForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Add Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Add Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Send custom message to community service organization'), { target: { value: 'Hello, this is a test message.' } });

    // Trigger form submission
    fireEvent.click(screen.getByText('Send Email'));

    // Wait for the asynchronous email sending process
    await screen.findByText('sent successfully');

    // Check if the send function was called with the correct parameters
    expect(require('emailjs-com').send).toHaveBeenCalledWith(
      process.env.REACT_APP_SERVICE,
      process.env.REACT_APP_TEMPLATE,
      process.env.REACT_APP_USER_ID,
      expect.objectContaining({
        from_name: 'John Doe',
        from_email: 'Verify-Id',
        to_name: 'john@example.com',
        message: { data: 'Hello, this is a test message.' },
      })
    );
  });
});
