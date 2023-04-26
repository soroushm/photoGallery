import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Gallery} from './components/Gallery';
import {Bootstrap, Provider} from './common';
import {SafeArea} from './theme';

const App = () => (
  <Provider>
    <SafeArea style={styles.container}>
      <Bootstrap>
        <Gallery />
      </Bootstrap>
    </SafeArea>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
});
export default App;
