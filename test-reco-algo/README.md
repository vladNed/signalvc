# SignalVC Profile App

A simple React Native/Expo app for creating investment profiles with industry preferences and geographical targeting.

## Features

- **Name Input**: Text field for profile name
- **Industry Selection**: Multi-select chips for tech industries (Fintech, Healthcare, E-commerce, EdTech, AI/ML, SaaS, Cybersecurity, CleanTech)
- **Region Dropdown**: Geographic targeting (US, EU, India, Japan, China, Romania)
- **Local Storage**: SQLite database for persisting profiles

## Tech Stack

- [Expo](https://expo.dev) (SDK 54)
- [React Native](https://reactnative.dev) 0.81
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local database

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (Mac only) or Android Emulator, or Expo Go app on your device

### Installation

1. Navigate to the project directory:

   ```bash
   cd test-reco-algo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm start
```

This will open the Expo developer tools. From there you can:

- Press `i` to open in iOS Simulator (Mac only)
- Press `a` to open in Android Emulator
- Scan the QR code with Expo Go app on your physical device

Alternatively, run directly on a specific platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
test-reco-algo/
├── app/                    # Expo Router file-based routes
│   ├── (tabs)/
│   │   └── index.tsx       # Main profile form screen
│   └── _layout.tsx         # Root layout
├── components/             # Reusable UI components
├── constants/              # Theme and config
├── hooks/                  # Custom React hooks
├── global.css              # Tailwind CSS directives
├── tailwind.config.js      # NativeWind configuration
├── babel.config.js         # Babel configuration
└── metro.config.js         # Metro bundler configuration
```

## Database

The app uses SQLite to store profiles locally. Data is stored in `signalvc.db` with the following schema:

```sql
CREATE TABLE profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  industries TEXT NOT NULL,  -- JSON array of selected industries
  region TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [NativeWind documentation](https://www.nativewind.dev/)
- [Expo SQLite documentation](https://docs.expo.dev/versions/latest/sdk/sqlite/)
