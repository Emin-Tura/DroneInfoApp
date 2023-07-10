import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
} from 'react-native';

interface ButtonProps {
  onPressPlus: () => void;
  onPressMinus: () => void;
  onPressLocation: () => void;
  onPressMarker: () => void;
  onPressClear: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onPressPlus,
  onPressMinus,
  onPressLocation,
  onPressMarker,
  onPressClear,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.plusMinusIcon}>
        <TouchableOpacity style={styles.button} onPress={onPressPlus}>
          <Image
            source={require('../assets/icon/plus-icon.png')}
            style={[styles.plusIconStyle]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressMinus}>
          <Image
            source={require('../assets/icon/minus-icon.png')}
            style={styles.minusIconStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.locationButton}>
        <TouchableOpacity
          style={styles.locationButtonInner}
          onPress={onPressLocation}>
          <Image
            source={require('../assets/icon/location-icon.png')}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.markerButton}>
        <TouchableOpacity
          style={styles.locationButtonInner}
          onPress={onPressMarker}>
          <Image
            source={require('../assets/icon/marker-btn-icon.png')}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.clearButton}>
        <TouchableOpacity
          style={styles.clearButtonInner}
          onPress={onPressClear}>
          <Image
            source={require('../assets/icon/clear-icon.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },

  plusIconStyle: {
    marginRight: 8,
    width: 22,
    height: 22,
  },
  minusIconStyle: {
    width: 22,
    height: 22,
  },
  plusMinusIcon: {
    backgroundColor: '#C3C0C0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 77,
    paddingRight: 7,
    borderRadius: 5,
    marginTop: 'auto',
    marginRight: 25,
  },
  locationButton: {
    marginTop: 'auto',
  },
  locationButtonInner: {
    backgroundColor: '#C3C0C0',
    borderRadius: 50,
    padding: 5,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    width: 33,
    height: 33,
  },
  markerButton: {
    marginTop: 5,
  },
  clearButton: {
    position: 'absolute',
    top: -225,
  },
  clearButtonInner: {
    backgroundColor: '#C3C0C0',
    borderRadius: 5,
    padding: 15,
    width: 45,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
