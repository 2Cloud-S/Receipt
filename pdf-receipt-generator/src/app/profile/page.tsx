'use client';

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendar, FaSave, FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await updateUserProfile({ displayName });
      await axios.post('/api/update-profile', { displayName });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-indigo-600 p-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">User Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors"
            >
              {isEditing ? <FaSave /> : <FaEdit />}
            </button>
          </div>
          <div className="p-6">
            <div className="mb-6 flex items-center">
              <FaUser className="text-2xl text-indigo-600 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-lg font-semibold border-b border-indigo-300 focus:outline-none focus:border-indigo-600"
                  />
                ) : (
                  <p className="text-lg font-semibold">{displayName || 'N/A'}</p>
                )}
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <FaEnvelope className="text-2xl text-indigo-600 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>
            <div className="mb-6 flex items-center">
              <FaCalendar className="text-2xl text-indigo-600 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="text-lg font-semibold">
                  {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            {isEditing && (
              <button
                onClick={handleSave}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 transition-colors">
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
