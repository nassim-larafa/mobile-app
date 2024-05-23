
---

## App Description

**Overview:**
MyReactNativeApp is a user-friendly mobile application built with React Native, designed to provide users with a smooth and secure authentication experience. The app serves as a basic template for developers to understand how to integrate React Native with a Django backend for user authentication, navigation, and state management.

**Key Features:**

1. **User Authentication:**
   - **Login Screen:** Users can log in using their credentials. The login screen features secure text input fields for username and password.
   - **Token-Based Authentication:** The app communicates with a Django backend to authenticate users. On successful login, a JWT token is stored locally for maintaining user sessions.

2. **Navigation:**
   - **Home Screen:** Upon launching the app, users are greeted with a Home screen that includes a welcome message and a navigation button to the login screen.
   - **Dashboard Screen:** After successful login, users are navigated to a Dashboard screen that displays a personalized greeting with their username.

3. **User Interface:**
   - **Customizable Header:** The app features a customizable header with a unique background color and style for each screen, enhancing the user experience.
   - **Animated Logo:** The login screen includes an animated logo placed at the top-right corner, adding a dynamic visual element to the app.

4. **Storage:**
   - **AsyncStorage:** JWT tokens and user credentials are securely stored using AsyncStorage, ensuring persistent user sessions across app restarts.

5. **Styling:**
   - **Custom Styling:** Each screen in the app is styled with a clean and modern design, including custom background colors, input fields, and buttons to provide a consistent and appealing user interface.

**Technical Stack:**
- **Frontend:** React Native
  - **Components:** View, Text, TextInput, Button, TouchableOpacity, Animated, Image
  - **Libraries:** axios for HTTP requests, AsyncStorage for local storage
- **Backend:** Django
  - **Authentication:** Django Rest Framework with JWT authentication

**User Flow:**
1. **Home Screen:** Users start on the Home screen with a welcome message and a button to navigate to the Login screen.
2. **Login Screen:** Users enter their credentials and submit the login form. On successful authentication, they are redirected to the Dashboard.
3. **Dashboard Screen:** Users see a personalized greeting and their username, confirming successful login and token storage.

**Purpose:**
This React native app is designed as a learning tool and a starting point for developers looking to build React Native applications with backend authentication. It demonstrates best practices for integrating a React Native frontend with a Django backend, handling user authentication, navigation, and state management effectively.

---

This description provides an overview of the app's purpose, features, and technical stack, making it clear and informative for anyone interested in understanding or using the app.
