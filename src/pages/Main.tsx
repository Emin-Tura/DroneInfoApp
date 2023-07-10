import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  View,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Polygon,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Button from '../components/Button';

function Main() {
  const mapRef = useRef(null);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [latitudeDelta, setLatitudeDelta] = useState(0.002);
  const [longitudeDelta, setLongitudeDelta] = useState(
    (Dimensions.get('window').width / Dimensions.get('window').height) * 0.002,
  );

  const [markers, setMarkers] = useState([]);
  const [drawingFinished, setDrawingFinished] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'İzin Ver',
          message: 'Uygulama konumunuza erişmek istiyor',
          buttonNeutral: 'Daha Sonra',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handlePressLocation();
      } else {
        console.log('İzin Verilmedi');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePressPlus = () => {
    const map = mapRef.current;
    if (map) {
      const region = {
        latitude: currentLatitude,
        longitude: currentLongitude,
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
        latitude: currentLatitude,
        longitude: currentLongitude,
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
            latitudeDelta: 0.002,
            longitudeDelta:
              (Dimensions.get('window').width /
                Dimensions.get('window').height) *
              0.002,
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
          setPolygonCoordinates([...polygonCoordinates, {latitude, longitude}]);
          setDrawingFinished(true);
        });
    }
  };
  const onChangeValue = (region: {
    latitude: React.SetStateAction<number>;
    longitude: React.SetStateAction<number>;
    latitudeDelta: React.SetStateAction<number>;
    longitudeDelta: React.SetStateAction<number>;
  }) => {
    setCurrentLatitude(region.latitude);
    setCurrentLongitude(region.longitude);
    setLatitudeDelta(region.latitudeDelta);
    setLongitudeDelta(region.longitudeDelta);
  };

  useEffect(() => {
    requestLocationPermission();
    handlePressLocation();
  }, []);

  const handlePressClear = () => {
    setMarkers([]);
    setDrawingFinished(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satellite"
        onRegionChangeComplete={onChangeValue}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
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
        {drawingFinished && (
          <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(255, 0, 0, 0.5)"
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
          onPressClear={handlePressClear}
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
