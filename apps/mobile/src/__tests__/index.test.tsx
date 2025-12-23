import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import Home from '../app/index';
import { authClient } from '../lib/auth-client';

describe('Home screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render activity indicator while auth client is loading', async () => {
    jest.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: true,
      isRefetching: false,
      error: null,
      refetch: jest.fn()
    });

    const screen = render(<Home />);

    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should push to dashboard when auth client is loaded and user is authenticated', async () => {
    jest.mocked(authClient.useSession).mockReturnValue({
      data: {
        session: {
          id: '1',
          userId: '1',
          createdAt: new Date(),
          token: '123',
          updatedAt: new Date(),
          expiresAt: new Date()
        },
        user: {
          id: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'john.doe@example.com',
          emailVerified: false,
          name: 'John Doe',
          image: 'https://example.com/image.png'
        }
      },
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: jest.fn()
    });

    render(<Home />);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should push to sign up page when user clicks on create account', async () => {
    jest.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: jest.fn()
    });

    const screen = render(<Home />);

    fireEvent.press(screen.getByText('Create Account'));

    expect(router.push).toHaveBeenCalledWith('/sign-up');
  });

  it('should push to forget password page when user clicks on forget password', async () => {
    jest.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: jest.fn()
    });

    const screen = render(<Home />);

    fireEvent.press(screen.getByText('Forget Password?'));

    expect(router.push).toHaveBeenCalledWith('/forget-password');
  });

  it('should render sign in form when auth client is loaded and user is not authenticated', async () => {
    jest.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: jest.fn()
    });

    const screen = render(<Home />);

    expect(screen.getByTestId('heading')).toHaveTextContent('Sign In to your account');
  });

  it('should show validation errors when sign in form is submitted with invalid data', async () => {
    jest.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: jest.fn()
    });

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {
      '';
    });

    const screen = render(<Home />);

    await act(async () => {
      fireEvent.press(screen.getByText('Continue'));
    });

    expect(alertSpy).toHaveBeenCalled();
    const [title, message] = alertSpy.mock.calls[0];
    expect(title).toBe('Validation Error');
    expect(message).toContain('* Please enter a valid email');
    expect(message).toContain('* Password is required');

    alertSpy.mockRestore();
  });

  it('should submit sign in form with valid data', async () => {
    jest.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: jest.fn()
    });

    const screen = render(<Home />);

    await act(async () => {
      fireEvent.changeText(screen.getByPlaceholderText('Email Address'), 'test@example.com');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      fireEvent.press(screen.getByText('Continue'));
    });

    expect(authClient.signIn.email).toHaveBeenCalled();
  });
});
