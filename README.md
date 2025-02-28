## 📋 Overview

GrabFromDrive is a React-based web application that allows users to process Google Drive video and audio URLs for direct downloading. The application transforms standard Google Drive sharing URLs into direct download links, making it easier to download media content from Google Drive.

## ✨ Features

- **URL Processing**: Transform Google Drive sharing URLs into direct download links
- **Dual Media Support**: Process both video and audio URLs simultaneously
- **Validation**: Verify URL format and content type before processing
- **Direct Downloads**: Generate downloadable links with proper filenames
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and shadcn/ui
- **Accessibility**: Fully accessible components with keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router v7
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner Toast

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devchristian1337/grabfromdrive.git
   cd grabfromdrive
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Usage

1. Enter a Google Drive video URL in the video input field
2. Enter a Google Drive audio URL in the audio input field (optional)
3. Click "Process URLs" to generate direct download links
4. Use the download buttons to save the media files to your device

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 👨‍💻 Author

- [devchristian1337](https://github.com/devchristian1337)
