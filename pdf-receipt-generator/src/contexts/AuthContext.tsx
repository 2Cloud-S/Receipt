'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { User, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, updateProfile } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profileData: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    await firebaseSignOut(auth);
  };

  const updateUserProfile = async (profileData: { displayName?: string; photoURL?: string }) => {
    if (user) {
      await updateProfile(user, profileData);
      setUser({ ...user, ...profileData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut: signOutUser, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
