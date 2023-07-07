import React from 'react';
import {View, StyleSheet} from 'react-native';
import Main from './src/pages/Main';
import SlideMenu from './src/components/SlideMenu';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.slideMenuContainer}>
        <SlideMenu />
      </View>
      <View style={styles.mainContainer}>
        <Main />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  slideMenuContainer: {
    width: '10%',
  },
  mainContainer: {
    flex: 1,
  },
});

export default App;
