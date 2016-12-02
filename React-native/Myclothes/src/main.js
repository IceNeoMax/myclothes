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
import Icon from 'react-native-vector-icons/FontAwesome'
import ProductPage from './ProductPage/productpage'
import ShoppingCart from './ShoppingCart/shoppingcart'
import Payment from './Payment/payment'
import DesignClothes from './DesignClothes/designclothes'
import ReportManagement from  './Profile/reportmanagement';
import OrderManagement from './Profile/ordermanagement'
import StaffManagement from './Profile/staffmanagement'
import PersonalWall from './PersonalWall/personalwall'
import DetailPost from './PersonalPage/detailpost'
import SearchProduct from './SearchProduct/searchproduct'
import Register from './Login/register'

class TabIcon extends Component {
    render () {
        var color = this.props.selected ? '#00b0e6' : '#d9d9d9';
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
                           initial
                           type='replace'/>
                    <Scene key='Register'
                           component={Register}
                           type='replace'/>
                    <Scene key='Product'
                           hideNavBar
                           component={ProductPage}/>
                    <Scene key='PersonalWall'
                           hideNavBar
                           //initial
                           component={PersonalWall}/>
                    <Scene key='Tabbar'
                           tabs
                           hideNavBar
                           tabBarStyle={{ height: 50, borderTopWidth: 0, backgroundColor: '#f66f88'}}
                           default='Main'
                           //initial
                           type='replace'>
                        <Scene key='Main'
                               title='Main'
                               iconName={"home"}
                               icon={TabIcon}
                               //initial
                               hideNavBar>
                            <Scene key='HomePage'
                                   hideNavBar
                                   component={HomePage}
                                   type="refresh"/>

                            <Scene key='SearchInHome'
                                   hideNavBar
                                   component={SearchPage} />
                        </Scene>
                        <Scene key='SearchProduct'
                               title='SearchProduct'
                               icon={TabIcon}
                               iconName={"search"}
                               hideNavBar
                               //initial
                               component={SearchProduct} />
                        <Scene key='ShoppingCart'
                               title='Shopping'
                               icon={TabIcon}
                               iconName={"shopping-bag"}
                               hideNavBar
                               //initial
                               component={ShoppingCart} />
                        <Scene key='PersonalPage'
                               title='Timeline'
                               icon={TabIcon}
                               iconName={"group"}
                               initial
                               hideNavBar >
                            <Scene key='Personal'
                                   hideNavBar
                                   initial
                                   component={PersonalPage}
                                    />
                            <Scene key='DetailPost'
                                   hideNavBar
                                   //initial
                                   component={DetailPost} />
                            <Scene key='Design'
                                   hideNavBar

                                   component={DesignClothes} />
                            <Scene key='Search'
                                   hideNavBar

                                   component={SearchPage} />
                        </Scene>
                        <Scene key='Profile'
                               title='Profile'
                               icon={TabIcon}
                               iconName={"gear"}
                               //initial
                               hideNavBar
                               >
                            <Scene key='MainProfile'
                                   hideNavBar
                                   component={Profile}
                                   />
                            <Scene key='Report'
                                   hideNavBar
                                   component={ReportManagement}/>
                            <Scene key='Order'
                                   hideNavBar
                                   component={OrderManagement}
                                   initial
                                   />
                            <Scene key='Staff'
                                   hideNavBar
                                   component={StaffManagement}
                                   />
                            <Scene key='Payment'
                                   hideNavBar
                                   //initial
                                   component={Payment} />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

module.exports = Main;