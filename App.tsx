import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth1 } from './firebaseConfig';
import LoginScreen from './screens/LoginScreen';
import FormScreen from './screens/FormScreen';
import SosScreen from './screens/SosScreen'; 
// import 'dotenv/config';


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  // Listen for auth changes
  onAuthStateChanged(auth1, (user) => {
    setUser(user ? user : null);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Form" component={FormScreen} />
            <Stack.Screen name="Sos" component={SosScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
