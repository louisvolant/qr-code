// src/components/QRCodeScanner.tsx

'use client';

import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';

function QRCodeScanner() {
  const [result, setResult] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
          if (imageData) {
            decodeQR(imageData);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to start camera capture
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  // Function to stop camera capture
  const stopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsCapturing(false);
    }
  };

  // Function to capture frame and decode QR
  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        decodeQR(imageData);
      }
    }
  };

  // Function to decode QR code from image data
  const decodeQR = (imageData: ImageData) => {
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      setResult(code.data);
      stopCapture();
    } else {
      setResult('No QR code detected');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">QR Code Scanner</h1>
      <div className="w-full max-w-md">
        <input
          type="file"
          onChange={handleImageUpload}
          className="mb-4 p-2 w-full border border-gray-300 rounded"
        />
        <button
          onClick={isCapturing ? stopCapture : startCapture}
          className="mb-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isCapturing ? 'Stop Camera' : 'Start Camera'}
        </button>
        {isCapturing && (
          <button
            onClick={captureFrame}
            className="mb-4 p-2 w-full bg-green-500 text-white rounded hover:bg-green-600"
          >
            Capture and Scan
          </button>
        )}
        <div className="relative">
          <video
            ref={videoRef}
            className={`w-full ${isCapturing ? 'block' : 'hidden'}`}
            autoPlay
            playsInline
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        {result && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRCodeScanner;
