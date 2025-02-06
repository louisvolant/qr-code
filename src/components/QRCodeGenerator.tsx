// src/components/QRCodeGenerator.tsx

'use client';

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  // State variables
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false); // State for animation
  const [generated, setGenerated] = useState(false); // State for green tick

  // Function to generate QR code
  const generateQRCode = () => {
    setIsGenerating(true); // Start animation
    setGenerated(false); // Reset tick state

    // Simulate generation delay
    setTimeout(() => {
      setQrCode(text || " ");
      setIsGenerating(false); // Stop animation
      setGenerated(true); // Show green tick
    }, 500); // 500ms delay to simulate generation
  };

  // Function to reset form
  const reset = () => {
    setText('');
    setQrCode(null);
    setGenerated(false);
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:text-white">
        <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
        <div className="w-1/2">
          <textarea
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full mb-2 resize-none
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter text to convert to QR Code"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            className={`bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800
                       text-white font-bold py-2 px-4 rounded mt-2 relative ${isGenerating ? 'animate-pulse' : ''}`}
            onClick={generateQRCode}
            disabled={isGenerating}
          >
            {isGenerating && (
                        <span className="animate-spin absolute left-2 top-1/2 -translate-y-1/2">
                          <svg
                            className="w-5 h-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      )}
                      Generate QR Code
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-800
                       text-white font-bold py-2 px-4 rounded mt-2"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        {qrCode && generated && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded">
            <QRCodeCanvas
              value={qrCode}
              size={256}
              level="H"
              className="mx-auto"
              // Add dark mode support for QR code
              bgColor={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#374151' : '#FFFFFF'}
              fgColor={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#FFFFFF' : '#000000'}
            />
          </div>
        )}
      </div>
    );
  };
export default QRCodeGenerator;
