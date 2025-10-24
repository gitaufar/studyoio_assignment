import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { Credential } from '../types';
import {
  AuthLogo,
  AuthInput,
  PasswordInput,
  ErrorAlert,
  AuthButton,
  AuthFooterLink,
} from '../components';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState<Credential>({
    email: '',
    password: '',
  });
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credential);
      navigate('/dashboard');
    } catch (err) {
      // Error handling sudah ada di useAuth
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border dark:border-dark-border">
          <AuthLogo 
            title="Studyo.IO" 
            subtitle="Admin Panel" 
            iconColor="primary"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="nama@example.com"
              value={credential.email}
              onChange={(e) => setCredential({ ...credential, email: e.target.value })}
              required
              focusColor="primary"
            />

            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={credential.password}
              onChange={(e) => setCredential({ ...credential, password: e.target.value })}
              required
              focusColor="primary"
            />

            {error && <ErrorAlert message={error} />}

            <AuthButton 
              type="submit" 
              disabled={loading} 
              loading={loading}
              variant="primary"
            >
              Login
            </AuthButton>
          </form>

          <AuthFooterLink
            text="Don't have an account?"
            linkText="Register here"
            linkTo="/register"
            linkColor="primary"
          />
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          © 2025 StudyOIO. All rights reserved.
        </p>
      </div>
    </div>
  );
};
