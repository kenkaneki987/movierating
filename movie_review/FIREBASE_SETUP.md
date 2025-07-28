# Firebase Google Authentication Setup

This project now includes Firebase Google authentication for user login functionality.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable Authentication in the Firebase console
4. Go to Authentication > Sign-in method
5. Enable "Google" authentication
6. Configure your Google OAuth consent screen if needed

### 2. Get Firebase Configuration

1. In your Firebase project, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web app icon (</>) to add a web app
4. Register your app and copy the configuration

### 3. Environment Variables (Optional)

Since we're using direct configuration, you can create a `.env` file for better security:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# TMDB API Key (existing)
VITE_API_KEY=your_tmdb_api_key_here
```

### 4. Features Added

- **Google Sign-In**: Users can sign in with their Google account
- **Authentication State**: User authentication state is managed globally
- **Protected Routes**: Favorites page is now protected and requires authentication
- **Logout Functionality**: Users can log out from the navbar
- **Persistent Sessions**: User sessions persist across browser refreshes
- **User Profile**: Displays user email and profile information

### 5. Security Rules

The authentication is handled client-side with Firebase Auth. Make sure to:
- Set up proper Firebase Security Rules for any database operations
- Configure authorized domains in Firebase Console
- Consider implementing additional security measures for production

### 6. Testing

1. Start the development server: `npm run dev`
2. Navigate to `/auth` to test Google sign-in
3. Try accessing `/favorites` without authentication (should redirect to sign-in)
4. Test the complete authentication flow

## File Structure

```
src/
├── components/
│   ├── GoogleLogin.jsx      # Google sign-in component
│   ├── ProtectedRoute.jsx   # Route protection component
│   └── Navbar.jsx           # Updated with auth status
├── context/
│   └── AuthContext.jsx      # Authentication state management
├── pages/
│   └── Auth.jsx             # Authentication page
├── services/
│   └── firebase.js          # Firebase configuration and auth functions
└── css/
    └── Auth.css             # Authentication styles
```

## Google Authentication Benefits

- **No Password Management**: Users don't need to remember passwords
- **Enhanced Security**: Google handles security and 2FA
- **User Experience**: One-click sign-in process
- **Profile Information**: Access to user's Google profile data
- **Cross-Platform**: Works seamlessly across devices 