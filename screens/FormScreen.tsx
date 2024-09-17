import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import * as Location from 'expo-location'; // Import the location module
import { db } from '../firebaseConfig'; // Firestore database import
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../types'; // Define your navigation types here
import { RouteProp } from '@react-navigation/native';

// TypeScript types for navigation
type FormScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Form'>;
  route: RouteProp<StackParamList, 'Form'>;
};

// Location type to define latitude and longitude
type LocationCoords = {
  latitude: number;
  longitude: number;
};

export default function FormScreen({ navigation }: FormScreenProps) {
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [parentContact1, setParentContact1] = useState('');
  const [parentContact2, setParentContact2] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState<LocationCoords | null>(null); // Properly typed state
  const [error, setError] = useState('');
  const [docId, setDocId] = useState<string | null>(null); // Store Firestore document ID for updating

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied.');
          return;
        }

        // Watch the position for live updates
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
            distanceInterval: 10, // Update every 10 meters
          },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setLocation({ latitude, longitude });

            // Update the user's location in Firestore if docId is set
            if (docId) {
              const docRef = doc(db, 'users', docId);
              updateDoc(docRef, { location: { latitude, longitude } });
            }
          }
        );
      } catch (e) {
        setError('Error getting live location');
      }
    })();
  }, [docId]); // Trigger when docId is set

  const handleSubmit = async () => {
    try {
      // Save the form data to Firestore
      const docRef = await addDoc(collection(db, 'users'), {
        name,
        phone,
        emergencyContact,
        parentContact1,
        parentContact2,
        age,
        location, // Initial location data
      });

      setDocId(docRef.id); // Store the document ID to update location

      console.log('Document written with ID: ', docRef.id);

      // Navigate to SOS screen with name parameter
      navigation.replace('Sos', { name });
    } catch (e) {
      console.error('Error adding document: ', e);
      setError('Failed to save data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contact Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Number"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Parent's Contact Number 1"
        value={parentContact1}
        onChangeText={setParentContact1}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Parent's Contact Number 2"
        value={parentContact2}
        onChangeText={setParentContact2}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
      />

      {/* Display location or error */}
      {location ? (
        <Text style={styles.locationText}>
          Location: {`Lat: ${location.latitude}, Lng: ${location.longitude}`}
        </Text>
      ) : (
        <Text style={styles.error}>{error}</Text>
      )}

      <Button title="Submit" onPress={handleSubmit} />
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
  locationText: {
    fontSize: 16,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
