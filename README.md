# Women Safety SOS App

This is a React Native app for women’s safety, designed to send an SOS alert to emergency contacts during distress. It leverages Firebase for authentication and data storage.

## Features

- **User Authentication:** Firebase Authentication for user sign-up and login.
- **Real-time Database:** Firestore to store user data and emergency contact information.
- **Secure Auth State:** AsyncStorage to persist auth state across sessions.
- **SOS Alerts:** Send alerts to pre-saved emergency contacts.
  
## Tech Stack

- **React Native** (with Expo)
- **Firebase Authentication**
- **Firestore Database**
- **Firebase Analytics**
- **@react-native-async-storage/async-storage**

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/SOS-App.git
   ```

2. Navigate into the project directory:

   ```bash
   cd SOS-App
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file for environment variables like Firebase config:

   ```plaintext
   API_KEY=your_firebase_api_key
   AUTH_DOMAIN=your_firebase_auth_domain
   PROJECT_ID=your_firebase_project_id
   STORAGE_BUCKET=your_firebase_storage_bucket
   MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   APP_ID=your_firebase_app_id
   MEASUREMENT_ID=your_firebase_measurement_id
   ```

5. Make sure `.env` is included in `.gitignore` to avoid pushing sensitive information.

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add your app configuration to the `.env` file.
4. Enable Firebase Authentication and Firestore Database in the Firebase Console.

### Running the App

Start the app in development mode using Expo:

```bash
npx expo start
```

This will open Expo’s development environment where you can run the app on your phone or a simulator.

## Folder Structure

```bash
├── node_modules
├── screens
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── FormScreen.tsx
│   ├── MainScreen.tsx
├── firebaseconfig.js  # Firebase initialization and configuration
├── App.tsx            # Entry point for the app
├── .env               # Environment variables (not pushed to GitHub)
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## Important Notes

- Make sure you have set up Firebase properly with valid credentials in the `.env` file.
- To prevent sensitive data leaks, avoid pushing your `.env` file to any repository.
- Keep Firebase security rules in check to protect user data.

## Dependencies

- **Firebase:** For authentication, database, and analytics.
- **AsyncStorage:** To persist authentication state across app sessions.

## Troubleshooting

- **Auth State Persistence Error:** If you see warnings about AsyncStorage not being initialized correctly, ensure you’ve set it up like so:

  ```js
  import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  ```

- **Invalid API Key Error:** Make sure your Firebase credentials are correct and are not exposed publicly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
