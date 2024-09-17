import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth1 } from './firebaseConfig';
import LoginScreen from './screens/LoginScreen';
import FormScreen from './screens/FormScreen';
import SosScreen from './screens/SosScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth1, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once auth state is known
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // Show the LoginScreen first if the user is not authenticated
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {/* After login, show FormScreen first */}
            <Stack.Screen
              name="Form"
              component={FormScreen}
              options={{ headerShown: true, title: 'Emergency Form' }}
            />
            {/* After the form is submitted, navigate to the SosScreen */}
            <Stack.Screen
              name="Sos"
              component={SosScreen}
              options={{ headerShown: true, title: 'SOS' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
