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
import * as API from '../libs/backend'
import { connect } from 'react-redux'
const window = Dimensions.get('window');

var DATA = [];

const chosenDATA = [];


function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}
class OrderManagement extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            clearAll: false,
            factory_id: ''
        }
    }

    componentWillMount() {
        API.getUserInfo(this.props.global.user.token.userId)
            .then((json) => {
                console.log(json.factory[0])
                if (json.factory.length == 0) {
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(DATA)
                    })
                } else {
                    this.setState({
                        factory_id: json.factory[0].factory_id
                    });
                    API.getFactoryOrder(json.factory[0].factory_id)
                        .then((json) => {
                            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                            this.setState({
                                dataSource: ds.cloneWithRows(json.result.orders)
                            })
                        })
                }
            })
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
        //console.log(chosenDATA);
        var tempArray = [];
        for (let i = 0; i < chosenDATA.length; i++) {
            API.updateOrder(chosenDATA[i])
                .then((json) => {
                    tempArray.push(chosenDATA[i]);
                    // After update all orders
                    if (tempArray.length == chosenDATA.length) {
                        //console.log("OKKKKK")
                        API.getFactoryOrder(this.state.factory_id)
                            .then((json) => {
                                //console.log(json)
                                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                this.setState({
                                    dataSource: ds.cloneWithRows(json.result.orders)
                                })
                            })
                    }
                    chosenDATA.splice(i, 1);
                })
        }
        /*const data = DATA.filter(d => chosenDATA.indexOf(d.id) === -1)
                        .map(d => ({...d, acceptable: false}))
        console.log(data)
        // Set dataSource again!
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(data)
        this.setState({dataSource});*/

    }

    onRejectPress() {
        var tempArray = [];
        for (let i = 0; i < chosenDATA.length; i++) {
            API.deleteOrder(chosenDATA[i])
                .then((json) => {
                    tempArray.push(chosenDATA[i]);
                    // After update all orders
                    if (tempArray.length == chosenDATA.length) {
                        //console.log("OKKKKK")
                        API.getFactoryOrder(this.state.factory_id)
                            .then((json) => {
                                //console.log(json)
                                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                this.setState({
                                    dataSource: ds.cloneWithRows(json.result.orders)
                                })
                            })
                    }
                    chosenDATA.splice(i, 1);
                })
        }
    }

    onBackPress() {
        Actions.pop();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Icon
                        onPress={() => this.onBackPress()}
                        name="angle-left"
                          size={40}
                          style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Order Management</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 9/10, margin: 10}}>
                        <ListView
                            renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                         style={{ flex: 1
                                                                             , height: 7}} />}
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
                        <ButtonAPSL
                            onPress={() => this.onRejectPress()}
                            style={{backgroundColor: '#365FB7', flex: 2/3, justifyContent: 'center'
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

export default connect(mapStateToProps)(OrderManagement)