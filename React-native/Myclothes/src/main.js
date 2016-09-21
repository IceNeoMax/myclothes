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
import {
    Router,
    Scene
} from 'react-native-router-flux';

import Login from './Login/login';
import HomePage from './HomePage/homepage';
import Profile from './Profile/profile';
import Icon from 'react-native-vector-icons/FontAwesome'

class TabIcon extends Component {
    render () {
        var color = this.props.selected ? '#FF3366' : '#FFB3B3';
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
                <Icon style={{color: color}} name={this.props.iconName} size={30} />
                <Text style={{color: color}}>{this.props.title}</Text>
            </View>
        )
    }
}

class Main extends Component {
    render() {
        return(
            <Router navigationBarStyle={{backgroundColor: 'white', height: 20}}
                    sceneStyle={{ backgroundColor: 'white' }}>
                <Scene key='root' hideNavbar>
                    <Scene key='LoginMain'
                           component={Login}
                           type='replace'
                           initial/>
                    <Scene key='Tabbar'
                           tabs
                           hideNavBar
                           tabBarStyle={{ height: 50}}
                           default='Main'>
                        <Scene key='Main'
                               title='Main'
                               iconName={"home"}
                               icon={TabIcon}
                               hideNavBar
                               component={HomePage}
                               initial />
                        <Scene key='Profile'
                               title='Profile'
                               icon={TabIcon}
                               iconName={"gear"}
                               hideNavBar
                               component={Profile} />
                    </Scene>
                </Scene>
            </Router>

        )
    }
}

module.exports = Main;