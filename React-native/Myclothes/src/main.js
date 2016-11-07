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
import ShoppingCart from './ShoppingCart/shoppingcart'

class TabIcon extends Component {
    render () {
        var color = this.props.selected ? '#3b5998' : '#d9d9d9';
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
            <Router navigationBarStyle={{backgroundColor: 'white', height: 0, opacity: 0}}
                    sceneStyle={{ backgroundColor: 'white', }}>
                <Scene key='root' hideNavbar>
                    <Scene key='LoginMain'
                           component={Login}
                           type='replace'
                           initial/>
                    <Scene key='Product'
                           hideNavBar
                           component={ProductPage}/>
                    <Scene key='Tabbar'
                           tabs
                           hideNavBar
                           tabBarStyle={{ height: 50, borderTopWidth: 0, backgroundColor: '#f66f88'}}
                           default='Main'
                           type='replace'>
                        <Scene key='Main'
                               title='Main'
                               iconName={"home"}
                               icon={TabIcon}
                               initial
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
                        <Scene key='ShoppingCart'
                               title='Shopping'
                               icon={TabIcon}
                               iconName={"shopping-bag"}
                               hideNavBar
                               component={ShoppingCart} />
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