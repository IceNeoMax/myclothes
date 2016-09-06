

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './src/index';
console.disableYellowBox = true;

class Myclothes extends Component {
  render() {
    return (
      <View>
        <Main />
      </View>
    );
  }
}


AppRegistry.registerComponent('Myclothes', () => Myclothes);
