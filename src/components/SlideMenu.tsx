import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const SlideMenu = () => {
  const windowWidth = useWindowDimensions().width;

  const handleMenuToggle = () => {
    // Slide menüyü aç/kapa işlemini burada gerçekleştirin
  };

  const handleSettings = () => {
    // Ayarlar sayfasını açmak için gereken işlemleri burada yapın
  };

  return (
    <View style={[styles.container, {width: windowWidth * 0.1}]}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleMenuToggle}>
        <Image
          source={require('../assets/icon/menu-icon.png')}
          style={styles.iconImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSettings}>
        <Image
          source={require('../assets/icon/settings-icon.png')}
          style={styles.iconImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#7D7373',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconImage: {
    width: 25,
    height: 25,
  },
});

export default SlideMenu;
