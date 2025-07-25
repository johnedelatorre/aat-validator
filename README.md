# AAT Sponsor Analyzer

A React-based application for analyzing and validating sponsor content in video frames.

## Features

- **Frame Analysis**: Upload and analyze video frames for sponsor content
- **Sponsor Selection**: Search and select sponsors from a comprehensive database
- **Auto-Detection**: Simulate AI-powered detection of logos, brand icons, and taglines
- **Batch Processing**: Process multiple frames in batches with validation workflow
- **Keyboard Navigation**: Full keyboard support for efficient workflow

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Shadcn/ui** component library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johnedelatorre/aat-validator.git
cd aat-validator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development Workflow

- **main branch**: Development and local changes
- **production branch**: Approved code for deployment to Vercel

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on Vercel, pulling from the `production` branch. 