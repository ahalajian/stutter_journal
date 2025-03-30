# Stutter Journal

A React Native mobile application designed to help individuals who stutter track and manage their speech experiences. This app provides a platform for users to journal their stuttering moments and practice with words that they've struggled with in a fun manner.

## Features

- Daily speech journaling
- Track stuttering moments and situations
- Safe and private data storage using AsyncStorage
- Cross-platform support (iOS and Android)
- AI-powered story generation using your challenging words

## Technology Stack

- React Native (v0.76.7)
- Expo (v52.0.40)
- React Navigation
- AsyncStorage for local data persistence
- React Native Gesture Handler
- FastAPI backend server
- OpenAI GPT-3.5 Turbo for story generation
- Other supporting libraries

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (latest LTS version recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)
- Python 3.x for the backend server
- OpenAI API key

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd stutter_journal
```

2. Install frontend dependencies:

```bash
npm install
# or
yarn install
```

3. Install backend dependencies:

```bash
cd backend
pip install fastapi openai python-dotenv uvicorn
```

4. Set up environment variables:
   Create a `.env` file in the backend directory with your OpenAI API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

5. Start the backend server:

```bash
cd backend
uvicorn main:app --reload
```

6. Start the development server:

```bash
# In a new terminal, from the project root
npm start
# or
yarn start
```

## Running the App

- For iOS:

```bash
npm run ios
```

- For Android:

```bash
npm run android
```

- For web:

```bash
npm run web
```

## Project Structure

```
stutter_journal/
├── assets/           # Images, fonts, and other static assets
├── components/       # Reusable React components
├── screens/         # Application screens/pages
├── styles/          # Stylesheets
├── utils/           # Utility functions and helpers
├── backend/         # Backend related code and AI integration
└── App.js           # Main application component
```
