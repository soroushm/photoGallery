import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Gallary} from './components/Gallary';
import {Bootstrap, Provider} from './common';
import {SafeArea} from './theme';

const App = () => (
  <Provider>
    <SafeArea style={styles.container}>
      <Bootstrap>
        <Gallary />
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
