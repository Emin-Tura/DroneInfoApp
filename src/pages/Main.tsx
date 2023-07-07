import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Button from '../components/Button';

function Main() {
  const handlePressPlus = () => {
    console.log('Plus butonuna basıldı');
  };

  const handlePressMinus = () => {
    console.log('Minus butonuna basıldı');
  };

  const handlePressLocation = () => {
    getCurrentLocation();
  };

  const handlePressNorth = () => {
    console.log('Kuzey butonuna basıldı');
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => {
        console.log('Konum alınamadı:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const defaultLatitude = 39.925533;
  const defaultLongitude = 32.866287;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satellite"
        region={{
          latitude: currentLocation?.latitude || defaultLatitude,
          longitude: currentLocation?.longitude || defaultLongitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {currentLocation && (
          <Marker coordinate={currentLocation}>
            <Button
              onPressPlus={handlePressPlus}
              onPressMinus={handlePressMinus}
              onPressLocation={handlePressLocation}
              onPressNorth={handlePressNorth}
            />
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          onPressPlus={handlePressPlus}
          onPressMinus={handlePressMinus}
          onPressLocation={handlePressLocation}
          onPressNorth={handlePressNorth}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Main;
