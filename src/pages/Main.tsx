import React, {useEffect, useState, useRef} from 'react';
import {Alert, Dimensions, Image, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Button from '../components/Button';

function Main() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handlePressPlus = () => {
    const map = mapRef.current;
    if (map) {
      const region = {
        latitude,
        longitude,
        latitudeDelta: latitudeDelta / 2,
        longitudeDelta: longitudeDelta / 2,
      };
      map.animateToRegion(region, 500);
    }
  };

  const handlePressMinus = () => {
    const map = mapRef.current;
    if (map) {
      const region = {
        latitude,
        longitude,
        latitudeDelta: latitudeDelta * 2,
        longitudeDelta: longitudeDelta * 2,
      };
      map.animateToRegion(region, 500);
    }
  };
  const handlePressLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          },
          1000,
        );
      },
      error => {
        Alert.alert('Hata', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handlePressMarker = () => {
    const map = mapRef.current;
    if (map) {
      map
        .getCamera()
        .then((camera: {center: {latitude: any; longitude: any}}) => {
          const {latitude, longitude} = camera.center;
          setMarkers([...markers, {latitude, longitude}]);
        });
    }
  };

  const [latitude, setLatitude] = useState(39.925533);
  const [longitude, setLongitude] = useState(32.866287);
  const [latitudeDelta, setLatitudeDelta] = useState(0.002);
  const [longitudeDelta, setLongitudeDelta] = useState(
    (Dimensions.get('window').width / Dimensions.get('window').height) * 0.002,
  );

  const [markers, setMarkers] = useState([]);

  const onChangeValue = (region: {
    latitude: React.SetStateAction<number>;
    longitude: React.SetStateAction<number>;
    latitudeDelta: React.SetStateAction<number>;
    longitudeDelta: React.SetStateAction<number>;
  }) => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
    setLatitudeDelta(region.latitudeDelta);
    setLongitudeDelta(region.longitudeDelta);
  };

  useEffect(() => {
    handlePressLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satellite"
        onRegionChangeComplete={onChangeValue}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        ref={mapRef}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            title={`Bölge ${index + 1}`}
          />
        ))}
        {markers.length > 1 && (
          <Polyline
            coordinates={markers}
            strokeColor="#FAFF04"
            strokeWidth={1}
          />
        )}
      </MapView>
      <View
        style={{
          top: '50%',
          left: '50%',
          marginLeft: -24,
          marginTop: -48,
          position: 'absolute',
        }}>
        <Image
          source={require('../assets/icon/marker-icon.png')}
          style={{width: 48, height: 48}}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPressPlus={handlePressPlus}
          onPressMinus={handlePressMinus}
          onPressLocation={handlePressLocation}
          onPressMarker={handlePressMarker}
          onPressClear={() => setMarkers([])}
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
