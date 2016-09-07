/**
 * Created by vjtc0n on 9/6/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AppRegistry
} from 'react-native';
import {
    Router,
    Scene
} from 'react-native-router-flux';

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
    Provider
} from 'react-redux';

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore'

/**
 * ### Translations
 */
var I18n = require('react-native-i18n');

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true;

import Translations from './lib/translation.json';
I18n.translations = Translations;
import Login from './containers/Login';

import styles from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore} from './reducers/global/globalActions';

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import AuthInitialState from './reducers/auth/authInitialState';
import DeviceInitialState from './reducers/device/deviceInitialState';
import GlobalInitialState from './reducers/global/globalInitialState';

import pack from '../../package.json';
var VERSION = pack.version;

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState () {
    const _initState = {
        auth: new AuthInitialState(),
        device: (new DeviceInitialState()).set('isMobile', true),
        global: (new GlobalInitialState())
        //profile: new ProfileInitialState()
    };
    return _initState;
}


export default function native (platform) {
    let LoginMain = React.createClass({
        render () {
            const store = configureStore(getInitialState());

            // configureStore will combine reducers from snowflake and main application
            // it will then create the store based on aggregate state from all reducers
            store.dispatch(setPlatform(platform));
            store.dispatch(setVersion(VERSION));
            store.dispatch(setStore(store));

            // setup the router table with App selected as the initial component
            // note: See https://github.com/aksonov/react-native-router-flux/issues/948
            return (

                <Provider store={store}>
                    <Router sceneStyle={{ backgroundColor: 'white' }}>
                        <Scene key='root' hideNavBar>
                            <Scene key='Login'
                                   component={Login}
                                   type='replace' />

                        </Scene>
                    </Router>
                </Provider>
            )
        }
    });
    AppRegistry.registerComponent('Myclothes', () => LoginMain);
}
