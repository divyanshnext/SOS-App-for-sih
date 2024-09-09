import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

type Location = {
  latitude: number;
  longitude: number;
};

export default function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setMapVisible(true);
      },
      (error) => {
        console.log(error);
        Alert.alert('Error', 'Could not get location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSosPress = () => {
    Alert.alert('SOS', 'SOS Activated!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS App</Text>
      <Text style={styles.subtitle}>Your safety, our priority.</Text>
      <Button title="Activate SOS" onPress={handleSosPress} />

      {mapVisible && location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} />
        </MapView>
      )}
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
  map: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});
