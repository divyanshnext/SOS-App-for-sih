import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth1 } from '../firebaseConfig'; // Ensure this file is correctly named and located
import { LoginScreenProps } from '../types'; // Import the props type from types.ts

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth1, email, password)
      .then(() => {
        navigation.replace('Form'); // Navigate to Form screen after signup
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth1, email, password)
      .then(() => {
        navigation.replace('Form'); // Navigate to Form screen after login
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          // User does not exist, navigate to Signup screen
          navigation.replace('Signup'); // Ensure you have a Signup screen in your navigation
        } else {
          setError(error.message);
          console.log(error);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Women Safety SOS App</Text>
      <Text>{isSignup ? 'Sign up to create an account' : 'Sign in to access the app'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title={isSignup ? "Sign Up" : "Sign In"} 
        onPress={isSignup ? handleSignup : handleLogin} 
      />
      <Button
        title={isSignup ? "Existing User : Switch to Sign In" : "New User : Switch to Sign Up"}
        onPress={() => setIsSignup(!isSignup)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import { LoginScreenProps } from '../types'; // Import the props type from types.ts
// import { NavigationHelpersContext } from '@react-navigation/native';

// export default function LoginScreen({ navigation }: LoginScreenProps) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const handleSignup=()=>{
//     createUserWithEmailAndPassword(auth,email,password).then(()=>{
//       navigation.replace('Login'); // navigate to login after signup
//     }).catch((error)=>{
//       setError(error.message);
//     })
//   }
//   const handleLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then(() => {
//         navigation.replace('Form'); // Navigate to Form screen after login
//       })
//       .catch((error) => {
//         setError(error.message);
//         console.log(error.code);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Women Safety SOS App</Text>
//       <Text>Sign in to access the app.</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Sign In" onPress={handleLogin} />
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   error: {
//     color: 'red',
//     marginTop: 10,
//   },
// });
