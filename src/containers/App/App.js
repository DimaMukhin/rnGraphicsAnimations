import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CTXCanvas from '../../components/CTXCanvas/CTXCanvas';

export default class App extends React.Component { 
  render() {
    return (
      <View style={styles.container}>
        <CTXCanvas />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaaaaa',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
});
