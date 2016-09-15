

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './src/index';
console.disableYellowBox = true;

class Myclothes extends Component {
  render() {
    return (
      <App />
    );
  }
}


AppRegistry.registerComponent('Myclothes', () => Myclothes);
