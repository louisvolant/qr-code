'use client';

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false); // État pour l'animation
  const [generated, setGenerated] = useState(false); // État pour le tick vert

  const generateQRCode = () => {
    setIsGenerating(true); // Démarre l'animation
    setGenerated(false); // Réinitialise l'état du tick

    setTimeout(() => {
      setQrCode(text || " ");
      setIsGenerating(false); // Arrête l'animation
      setGenerated(true); // Affiche le tick vert
    }, 500); // Délai de 500ms pour simuler la génération
  };

  const reset = () => {
    setText('');
    setQrCode(null);
    setGenerated(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
      <div className="w-1/2">
        <textarea
          className="border border-gray-300 rounded px-3 py-2 w-full mb-2 resize-none"
          placeholder="Enter text to convert to QR Code"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
      </div>
      <div className="flex items-center space-x-4"> {/* Conteneur pour les boutons */}
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 relative ${isGenerating ? 'animate-pulse' : ''}`} // Animation sur le bouton
          onClick={generateQRCode}
          disabled={isGenerating} // Désactive le bouton pendant la génération
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
          {generated && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      {qrCode && (
        <div className="mt-4">
          <QRCodeCanvas value={qrCode} size={256} level="H" className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;