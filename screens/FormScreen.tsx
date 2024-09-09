import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function FormScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [parentContact1, setParentContact1] = useState('');
  const [parentContact2, setParentContact2] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState(''); // Added name state
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log({ phone, emergencyContact, parentContact1, parentContact2, age, name });

    // Navigate to SOS screen with name parameter
    navigation.replace('Sos', { name });
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
  error: {
    color: 'red',
    marginTop: 10,
  },
});
