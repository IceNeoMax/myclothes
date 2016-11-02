/**
 * Created by vjtc0n on 9/12/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import {
    Router,
    Scene
} from 'react-native-router-flux';

import Login from './Login/login';
import HomePage from './HomePage/homepage';
import Profile from './Profile/profile';
import PersonalPage from './PersonalPage/persionalPage'
import SearchPage from './PersonalPage/searchpage'
import SearchedMemberPage from './PersonalPage/searchedmemberpage';
import Icon from 'react-native-vector-icons/FontAwesome'
import ProductPage from './ProductPage/productpage'

class TabIcon extends Component {
    render () {
        var color = this.props.selected ? '#FF3366' : '#FFB3B3';
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                <Icon style={{color: color}} name={this.props.iconName} size={30} />
            </View>
        )
    }
}

class Main extends Component {
    render() {

        return(
            <Router navigationBarStyle={{backgroundColor: 'white', height: 0}}
                    sceneStyle={{ backgroundColor: 'white' }}>
                <Scene key='root' hideNavbar>
                    <Scene key='LoginMain'
                           component={Login}
                           type='replace'
                           /*initial*//>
                    <Scene key='Product'
                           hideNavBar
                           component={ProductPage}/>
                    <Scene key='Tabbar'
                           tabs
                           hideNavBar
                           tabBarStyle={{ height: 50, borderTopWidth: 0.5, backgroundColor: 'white'}}
                           default='Main'
                           type='replace'
                           initial>
                        <Scene key='Main'
                               title='Main'
                               iconName={"home"}
                               icon={TabIcon}
                               hideNavBar>
                            <Scene key='HomePage'
                                   hideNavBar
                                   component={HomePage}
                                   type="refresh"
                                   initial />
                            <Scene key='SearchInHome'
                                   hideNavBar
                                   component={SearchPage} />
                        </Scene>
                        <Scene key='PersonalPage'
                               title='Timeline'
                               icon={TabIcon}
                               iconName={"group"}
                               hideNavBar >
                            <Scene key='Personal'
                                   hideNavBar
                                   component={PersonalPage}
                                   initial />
                            <Scene key='Search'
                                   hideNavBar
                                   component={SearchPage} />
                            <Scene key='SearchedMember'
                                   hideNavBar
                                   component={SearchedMemberPage} />
                        </Scene>
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