import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';

describe('UserForm Component', () => {
  it('renders the form elements', () => {
    render(<UserForm />);
    const firstNameInput = screen.getByLabelText('first_name');
    const lastNameInput = screen.getByLabelText('last_name');
    const usernameInput = screen.getByLabelText('username');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByText('Submit');

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('handles user input changes', () => {
    render(<UserForm />);
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(usernameInput).toHaveValue('johndoe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits the form', () => {
    const mockPostUser = jest.fn();
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => ({ id: 1 }) });

    render(<UserForm />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockPostUser).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/userprofile');
  });
});