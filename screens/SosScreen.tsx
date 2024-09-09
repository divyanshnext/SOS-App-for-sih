import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function SosScreen({ route, navigation }) {
  // Extract the name parameter from the route
  const { name } = route.params || {};

  const handleSosPress = () => {
    // Handle SOS button press
    alert('SOS button pressed!'); // Placeholder action
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {name}, Your Safety Is in Our Hands</Text>
      <Text style={styles.subtitle}>If you feel an emergency, click the SOS button.</Text>

      <TouchableOpacity style={styles.sosButton} onPress={handleSosPress}>
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  sosButton: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  sosButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
