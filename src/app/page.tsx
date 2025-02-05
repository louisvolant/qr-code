// src/app/page.tsx
'use client';

import { useState } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import QRCodeScanner from '../components/QRCodeScanner';

export default function Home() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 mr-2 rounded-tl rounded-tr ${
            activeTab === 'generate'
              ? 'bg-blue-500 dark:bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('generate')}
        >
          Generate QR Code
        </button>
        <button
          className={`px-4 py-2 rounded-tl rounded-tr ${
            activeTab === 'scan'
              ? 'bg-blue-500 dark:bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('scan')}
        >
          Scan QR Code
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-b shadow-md p-6">
        {activeTab === 'generate' ? <QRCodeGenerator /> : <QRCodeScanner />}
      </div>
    </div>
  );
}