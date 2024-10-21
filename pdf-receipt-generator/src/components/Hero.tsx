import { motion } from 'framer-motion';
import { FaReceipt, FaCloudUploadAlt, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-5xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PDF Receipt Generator
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Generate, manage, and analyze your receipts with ease
        </motion.p>
        <div className="flex justify-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/dashboard" className="bg-white text-blue-500 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
              Get Started
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/about" className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-blue-500 transition duration-300">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaReceipt className="text-4xl mb-4" />}
            title="Easy Generation"
            description="Create professional receipts in just a few clicks"
          />
          <FeatureCard 
            icon={<FaCloudUploadAlt className="text-4xl mb-4" />}
            title="Cloud Storage"
            description="Securely store and access your receipts from anywhere"
          />
          <FeatureCard 
            icon={<FaChartLine className="text-4xl mb-4" />}
            title="Analytics"
            description="Gain insights from your receipt data with powerful analytics"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white bg-opacity-10 p-6 rounded-lg text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default Hero;
