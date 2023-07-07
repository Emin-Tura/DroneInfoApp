import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Button from '../components/Button';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function Main(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const handlePressPlus = () => {
    // + butonuna basıldığında yapılacak işlemler
    console.log('Plus butonuna basıldı');
  };

  const handlePressMinus = () => {
    // - butonuna basıldığında yapılacak işlemler
    console.log('Minus butonuna basıldı');
  };

  const handlePressLocation = () => {
    // Konum butonuna basıldığında yapılacak işlemler
    console.log('Konum butonuna basıldı');
  };

  const handlePressNorth = () => {
    // Kuzey butonuna basıldığında yapılacak işlemler
    console.log('Kuzey butonuna basıldı');
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* map */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Map</Text>
        <Text style={styles.sectionDescription}>Map gelecek</Text>
      </View>
      <Button
        onPressPlus={handlePressPlus}
        onPressMinus={handlePressMinus}
        onPressLocation={handlePressLocation}
        onPressNorth={handlePressNorth}
      />
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
