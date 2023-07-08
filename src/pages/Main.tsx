import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, Image, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Button from '../components/Button';

function Main() {
  const mapRef = React.useRef(null);
  const handlePressPlus = () => {
    console.log('Plus butonuna basıldı');
  };

  const handlePressMinus = () => {
    console.log('Minus butonuna basıldı');
  };

  const handlePressLocation = () => {};
  const handlePressNorth = () => {
    console.log('Kuzey butonuna basıldı');
  };

  const [latitude, setLatitude] = useState(39.925533);
  const [longitude, setLongitude] = useState(32.866287);
  const [latitudeDelta, setLatitudeDelta] = useState(0.0122);
  const [longitudeDelta, setLongitudeDelta] = useState(
    (Dimensions.get('window').width / Dimensions.get('window').height) * 0.012,
  );

  const onChangeValue = (region: any) => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
    setLatitudeDelta(region.latitudeDelta);
    setLongitudeDelta(region.longitudeDelta);
    Alert.alert(JSON.stringify(region));
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
        ref={mapRef}></MapView>
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
