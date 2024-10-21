'use client';  // Add this line at the top of the file

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileInvoiceDollar, FaHistory, FaUser } from 'react-icons/fa';
import ReceiptForm, { ReceiptFormData } from './ReceiptForm';
import ReceiptPreview from './ReceiptPreview';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { ReceiptData } from '../types';

// Add these type definitions at the top of the file
import { ReactNode } from 'react';

// Update the ReceiptData interface
interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const { user } = useAuth();

  const handleGeneratePDF = async (data: ReceiptFormData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-pdf`, data, {
        responseType: 'blob',
      });

      if (response.data.size === 0) {
        throw new Error('Received empty PDF from server');
      }

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Calculate subtotal, taxAmount, and total
      const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
      const taxAmount = subtotal * (data.taxRate / 100);
      const total = subtotal + taxAmount;

      setReceiptData({
        ...data,
        pdfUrl,
        subtotal,
        taxAmount,
        total,
      });

      console.log('PDF received and processed successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
        {user && (
          <p className="text-xl text-gray-600">
            {user.email}
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <DashboardCard
          icon={<FaFileInvoiceDollar className="text-4xl text-indigo-500" />}
          title="Create Receipt"
          description="Generate a new receipt quickly and easily."
        />
        <DashboardCard
          icon={<FaHistory className="text-4xl text-green-500" />}
          title="Receipt History"
          description="View and manage your previously generated receipts."
        />
        <Link href="/profile" className="block">
          <DashboardCard
            icon={<FaUser className="text-4xl text-blue-500" />}
            title="User Profile"
            description="View and edit your profile information"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Generate New Receipt</h2>
          <ReceiptForm onSubmit={handleGeneratePDF} />
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Receipt Preview</h2>
          <ReceiptPreview receiptData={receiptData} />
        </motion.div>
      </div>
    </div>
  );
};

// Update the DashboardCard component definition
const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full"
    >
      {icon}
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Dashboard;
