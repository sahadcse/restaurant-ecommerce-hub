// frontend/lib/authContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  role: string; // Adjust type as per your JWT structure
  // Add other properties as needed
}

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  user: User | null; // Adjust type as per your JWT structure
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  const router = useRouter();

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Persist token
    console.log('Token set:', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    router.push('/'); // Redirect to homepage after logout
  };

  //res.json({ user: { id: user.id, email: user.email, role: user.role }, token });
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decode JWT to get user info

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};