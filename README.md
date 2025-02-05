# QR Code Tool

## Description

QR Code Tool is a web application built with Next.js that allows users to generate and scan QR codes. It provides a user-friendly interface for creating custom QR codes and reading QR codes using a device's camera or uploaded images.

## Features

- QR Code Generation: Create QR codes from text input
- QR Code Scanning: Scan QR codes using a device camera or uploaded images
- Responsive Design: Works on desktop and mobile devices
- Real-time Preview: See generated QR codes instantly

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- qrcode.react (for QR code generation)
- jsQR (for QR code scanning)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/qr-code-tool.git
   ```

2. Navigate to the project directory:
   ```bash
   cd qr-code-tool
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- To generate a QR code, navigate to the "Generate" tab, enter your text, and click "Generate QR Code".
- To scan a QR code, go to the "Scan" tab and either upload an image or use your device's camera.

## Building for Production

To create a production build, run:
```bash
npm run build
```

## Type Checking

Before pushing your changes, it's recommended to run type checking to catch any TypeScript errors:
```bash
npm run build
# then
npx tsc --noEmit
# or
node --no-warnings node_modules/.bin/tsc --noEmit
# or
npx --no-warnings tsc --noEmit
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [qrcode.react](https://github.com/zpao/qrcode.react)
- [jsQR](https://github.com/cozmo/jsQR)
