/**
 * Created by vjtc0n on 9/12/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Provider } from 'react-redux/native';
import configureStore from './store/store';
import Main from './main';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {() => <Main />}
            </Provider>
        );
    }
}

module.exports = App;
