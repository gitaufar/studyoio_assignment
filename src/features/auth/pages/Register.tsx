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

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationError, setValidationError] = useState('');
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validasi password
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    try {
      const credential: Credential = {
        email: formData.email,
        password: formData.password,
      };
      await register(credential);
      navigate('/dashboard');
    } catch (err) {
      // Error handling sudah ada di useAuth
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border dark:border-dark-border">
          <AuthLogo 
            title="Buat Akun" 
            subtitle="Daftar untuk mengakses Admin Panel" 
            iconColor="secondary"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="nama@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              focusColor="secondary"
            />

            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              helperText="Minimal 6 karakter"
              focusColor="secondary"
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Konfirmasi Password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              focusColor="secondary"
            />

            {(validationError || error) && (
              <ErrorAlert message={validationError || error} />
            )}

            <AuthButton 
              type="submit" 
              disabled={loading} 
              loading={loading}
              variant="secondary"
            >
              Daftar
            </AuthButton>
          </form>

          <AuthFooterLink
            text="Sudah punya akun?"
            linkText="Login di sini"
            linkTo="/login"
            linkColor="secondary"
          />
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          © 2025 StudyOIO. All rights reserved.
        </p>
      </div>
    </div>
  );
};
