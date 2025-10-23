import { useState } from 'react';
import { authService } from '../services/authService';
import type { Credential, User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credential: Credential) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(credential);
      setUser(user);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (credential: Credential) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.register(credential);
      setUser(user);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    login,
    logout,
    register,
    loading,
    error,
  };
};
