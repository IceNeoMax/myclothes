/**
 * Created by vjtc0n on 11/5/16.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    ListView
} from 'react-native';

import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');
DATA = [];

for (var i=0; i<=10; i++) {
    DATA.push({
        img: 'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg',
        name: 'Ao thun',
        quantity: 1,
        money: 20
    })
}


class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            selectedCurrent: true,
            selectedHistoty: false,
        };
    }

    onPress(event, id) {
        if (id == 1){
            this.setState({
                selectedCurrent: true,
                selectedHistoty: false,
            })
        } else if (id == 2) {
            this.setState({
                selectedCurrent: false,
                selectedHistoty: true,
            })
        }
    }

    renderCurrentRow(property) {
        return (
            <View style={{flexDirection: 'row', height: 100}}>
                <View style={{flex: 2/3, flexDirection: 'row'}}>
                    <ImageP
                        style={{borderWidth: 0.5, borderColor: 'gray', borderRadius: 10, flex: 1/3}}
                        source={{uri: property.img}}
                        indicator={Progress.CircleSnail}/>
                    <View style={{flexDirection: 'column', flex: 2/3, justifyContent: 'space-between', marginLeft: 10}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.productNameText}>{property.name}</Text>
                            <Text style={[styles.resultText, {marginLeft: 10}]}>M</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.totalText}>$</Text>
                            <Text style={styles.totalText}>{property.money}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1/3, alignItems: 'center'
                    , borderWidth: 0, justifyContent: 'space-between'
                    , flexDirection: 'row'}}>
                    <View style={{ flex: 1/4}}>
                        <ButtonAPSL style={{alignItems: 'center', borderWidth: 0
                            , justifyContent: 'center', marginTop: 10}}>
                            <Icon
                                color='#FF9E47'
                                size={30}
                                name="minus-square" />
                        </ButtonAPSL>
                    </View>
                    <View style={{flex: 1/3, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: 'gray', fontSize: 20}}>{property.quantity}</Text>
                    </View>
                    <View style={{ flex: 1/4}}>
                        <ButtonAPSL style={{alignItems: 'center', borderWidth: 0
                            , justifyContent: 'center', marginTop: 10}}>
                            <Icon
                                color='#FF9E47'
                                size={30}
                                name="plus-square" />
                        </ButtonAPSL>
                    </View>
                </View>
            </View>
        )
    }

    renderCurrent() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 2/3, margin: 15, borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
                    <ListView
                        scrollEnabled={true}
                        style={styles.listView}
                        contentContainerStyle={{}}
                        renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                     style={{ flex: 1
                                                                         , height: 10
                                                                     }} />}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderCurrentRow.bind(this)}
                        enableEmptySections={true}/>
                </View>
                <View style={{flex: 1/3}}>
                    <View style={{flex: 3/4, flexDirection: 'row', margin: 10, marginTop: 0, marginBottom: 20}}>
                        <View style={{flex: 1/2, flexDirection: 'column', justifyContent: 'space-between'}}>
                            <Text style={styles.resultText}>Subtotal</Text>
                            <Text style={styles.resultText}>Shipping</Text>
                            <View style={{borderWidth: 0.5, borderColor: 'gray'}}/>
                            <Text style={styles.totalText}>Total</Text>
                        </View>
                        <View style={{flex: 1/2, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.resultText}>$</Text>
                                <Text style={styles.resultText}>100</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.resultText}>$</Text>
                                <Text style={styles.resultText}>10</Text>
                            </View>
                            <View style={{borderWidth: 0.5, alignSelf: 'stretch', borderColor: 'gray'}}/>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.totalText}>$</Text>
                                <Text style={styles.totalText}>110</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1/4, alignItems: 'center', justifyContent: 'center'}}>
                        <ButtonAPSL style={{backgroundColor: '#365FB7', flex: 2/3, justifyContent: 'center'
                            , marginLeft: 20, marginRight: 20, borderWidth: 0}}>
                            <Text style={{color: 'white', alignSelf: 'center', fontSize: 20}}>Complete Order</Text>
                        </ButtonAPSL>
                    </View>
                </View>
            </View>
        )
    }

    renderHistory() {
        return (
            <View>
                <Text>CDE</Text>
            </View>
        )
    }

    render() {
        let tab = this.state.selectedCurrent ? this.renderCurrent() : this.renderHistory();

        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Text style={{fontSize: 20, color: 'white'}}>Shopping Cart</Text>
                </View>

                <View style={{ backgroundColor: '#cccccc'}}>
                    <View style={{ flexDirection: 'row', height: 35,
                        borderWidth: 0, backgroundColor: '#365FB7'
                    }}>
                        <ButtonAPSL
                            onPress={(e)=> {this.onPress(e, 1)}}
                            style={this.state.selectedCurrent ? styles.typeOfClothesButtonPress : styles.typeOfClothesButton}>
                            <Text style={{color: 'white'}}>Current</Text>
                        </ButtonAPSL>
                        <ButtonAPSL
                            onPress={(e)=> {this.onPress(e, 2)}}
                            style={this.state.selectedHistoty ? styles.typeOfClothesButtonPress : styles.typeOfClothesButton}>
                            <Text style={{color: 'white'}}>History</Text>
                        </ButtonAPSL>
                    </View>
                </View>
                {tab}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        height: 50,
        backgroundColor: '#f66f88',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeOfClothesButton: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 0 ,
        justifyContent: 'center',
        borderRadius: 0,
        borderLeftWidth: 0,
        borderWidth: 0,
        backgroundColor: '#365FB7',
        height: 30
    },
    typeOfClothesButtonPress: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 0 ,
        justifyContent: 'center',
        borderRadius: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#365FB7',
        borderBottomWidth: 6,
        borderBottomColor: '#FF3366',
        height: 35
    },
    listView: {
        flex: 1,
    },
    resultText: {
        fontWeight: 'bold',
        color: 'gray'
    },
    totalText: {
        fontWeight: 'bold',
        color: '#365FB7'
    },
    productNameText: {
        fontWeight: 'bold',
        color: '#f66f88'
    }
});

module.exports = ShoppingCart;