/**
 * Created by vjtc0n on 11/23/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import { ImageViewer } from 'react-native-image-fit'
import { SwipeListView } from 'react-native-swipe-list-view';
var _  = require('lodash');

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    ListView
} from 'react-native';

import OrderRow from '../components/OrderRow'

const window = Dimensions.get('window');

var DATA = [];
for (var i=0; i<=10; i++) {
    DATA.push({
        imgAvatar: 'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg',
        imgProduct: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg',
        nameProduct: 'Ao thun',
        quantity: Math.floor((Math.random() * 100) + 1).toString(),
        size: 'M',
        id: i + Math.floor((Math.random() * 100) + 1),
        price: 20,
        total: 100,
        name: 'Khanh'
    })
}
const chosenDATA = [];

class OrderManagement extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            clearAll: false
        }
    }


    onRowSelected = (rowID, acceptable, orderID) => {
        if (acceptable == true) {
            chosenDATA.push(orderID)
        } else {
            let remove = chosenDATA.indexOf(orderID)
            chosenDATA.splice(remove, 1);
        }
    };

    renderRow(rowData, sectionID, rowID) {
        return (
            <OrderRow
                rowData={rowData}
                rowID={rowID}
                onRowSelected={this.onRowSelected}/>
        )
    }

    onAcceptPress() {
        console.log(chosenDATA)
        chosenDATA.forEach(function (orderID) {
            let removeIndex = _.findIndex(DATA, { id: orderID});
            console.log(removeIndex)
            if (removeIndex > -1) {
                DATA.splice(removeIndex, 1)
            }
        });
        chosenDATA.length = 0;
        console.log(DATA)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(DATA)
        }, () => {

        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Icon name="angle-left"
                          size={40}
                          style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Order Management</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 9/10}}>
                        <ListView
                            renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                         style={{ flex: 1
                                                                             , height: 10
                                                                             , borderBottomWidth: 0.5}} />}
                            style={{}}
                            renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderRow(rowData, sectionID, rowID)}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            scrollEnabled={true}/>
                    </View>
                    <View style={{flex: 1/10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <ButtonAPSL
                            onPress={() => this.onAcceptPress()}
                            style={{backgroundColor: '#365FB7', flex: 2/3, justifyContent: 'center'
                            , marginLeft: 20, marginRight: 20, borderWidth: 0}}>
                            <Text style={{color: 'white', alignSelf: 'center', fontSize: 20}}>Accept</Text>
                        </ButtonAPSL>
                        <ButtonAPSL style={{backgroundColor: '#365FB7', flex: 2/3, justifyContent: 'center'
                            , marginLeft: 20, marginRight: 20, borderWidth: 0}}>
                            <Text style={{color: 'white', alignSelf: 'center', fontSize: 20}}>Reject</Text>
                        </ButtonAPSL>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        height: 50,
        backgroundColor: '#f66f88',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

module.exports = OrderManagement;