import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  const handleSosPress = () => {
    Alert.alert('SOS', 'SOS Activated!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS App</Text>
      <Text style={styles.subtitle}>Your safety, our priority.</Text>
      <Button title="Activate SOS" onPress={handleSosPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796b',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#004d40',
    textAlign: 'center',
  },
});
