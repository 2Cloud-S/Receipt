'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          PDF Receipt Generator
        </Link>
        {user && (
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="flex items-center hover:text-indigo-200 transition-colors">
              <FaUser className="mr-2" />
              {user.displayName || 'Profile'}
            </Link>
            <button
              onClick={signOut}
              className="flex items-center hover:text-indigo-200 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
