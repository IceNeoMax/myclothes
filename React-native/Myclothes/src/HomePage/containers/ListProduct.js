/**
 * Created by vjtc0n on 10/31/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ListView,
    Dimensions,
    Image
} from 'react-native';

import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import * as API from '../libs/backend'


const window = Dimensions.get('window');
const productSize = (window.width - 30)/2;

const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
var DATA = [];

class ListProduct extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
        };
    }

    componentWillReceiveProps(props) {
        var selectedMenu = this.props.selectedMenu;
        var products =[];
        var self = this
        if (selectedMenu == 'newest') {
            console.log(selectedMenu)
            API.getNewestProducts()
                .then((json) => {
                    //console.log(json)
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(json)
                    }, () => {
                        //console.log(this.state.dataSource)
                    })
                })
        } else if (selectedMenu == 'bestWeek') {
            console.log(selectedMenu)
            API.getBestWeekProducts()
                .then((json) => {
                    //console.log(json)
                    var temp = json
                    json.products.forEach(function (product) {
                        API.getProductInfo(product._id.product_id)
                            .then((json) => {
                                //console.log(json)
                                products.push(json)
                                //console.log(products)
                                if (products.length == temp.products.length) {
                                    //console.log("OK can set State now")
                                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                    //console.log(this)
                                    self.setState({
                                        dataSource: ds.cloneWithRows(products)
                                    }, () => {
                                        //console.log(self.state.dataSource)
                                    })
                                }
                            })
                    })
                })

        } else if (selectedMenu == 'bestMonth') {
            console.log(selectedMenu)
            API.getBestMonthProducts()
                .then((json) => {
                    //console.log(json)
                    var temp = json
                    json.products.forEach(function (product) {
                        API.getProductInfo(product._id.product_id)
                            .then((json) => {
                                //console.log(json)
                                products.push(json)
                                //console.log(products)
                                if (products.length == temp.products.length) {
                                    //console.log("OK can set State now")
                                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                    //console.log(this)
                                    self.setState({
                                        dataSource: ds.cloneWithRows(products)
                                    }, () => {
                                        //console.log(self.state.dataSource)
                                    })
                                }
                            })
                    })
                })
        } else if (selectedMenu == 'top10') {
            console.log(selectedMenu)
            API.getTop10Products()
                .then((json) => {
                    //console.log(json)
                    var temp = json
                    json.products.forEach(function (product) {
                        API.getProductInfo(product._id.product_id)
                            .then((json) => {
                                //console.log(json)
                                products.push(json)
                                //console.log(products)
                                if (products.length == temp.products.length) {
                                    //console.log("OK can set State now")
                                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                    //console.log(this)
                                    self.setState({
                                        dataSource: ds.cloneWithRows(products)
                                    }, () => {
                                        //console.log(self.state.dataSource)
                                    })
                                }
                            })
                    })
                })
        }
    }

    componentWillMount() {
        API.getNewestProducts()
            .then((json) => {
                //console.log(json)
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(json)
                })
            })
    }


    onPressProduct(product_id){
        console.log('OK')
        Actions.Product({
            productID: product_id
        });
    }


    renderRow(property) {
        //console.log(property)
        //console.log(this)
        return (
            <ButtonAPSL
                onPress={() => {this.onPressProduct(property.product_id)}}
                style={styles.item}>
                <View style={{flex: 2/3,}}>
                    <ImageP
                        indicator={Progress.CircleSnail}
                        style={{ flex: 1, borderRadius: 10, width: productSize }}
                        source={{uri: property.imgList[0]}}/>
                </View>
                <View style={{flex: 1/3, flexDirection: 'row', backgroundColor: '#d5f6f6', borderRadius: 10/3}}>
                    <View style={{flex: 0.5/5}}/>
                    <View style={{flex: 4/5, flexDirection: 'column'}}>
                        <View style={{flex: 2/3, borderBottomWidth: 0.5, flexDirection: 'column'}}>
                            <Text style={{flex: 1/2, marginTop: 3, fontSize: 18,
                                fontWeight: 'bold', color: '#193441'}}>{property.name}</Text>
                            <View style={{flex: 1/2, flexDirection: 'row', opacity: 0.8}}>
                                <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='heart' style={{color: '#F2385A'}} />
                                    <Text style={{fontSize: 8, marginLeft: 2}}>{property.likes.length}</Text>
                                </View>
                                <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='share-alt' style={{color: '#FF7F66'}} />
                                    <Text style={{fontSize: 8, marginLeft: 2}}>{property.comments.length}</Text>
                                </View>
                                <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='credit-card' style={{color: '#735DD3'}} />
                                    <Text style={{fontSize: 8, marginLeft: 2}}>{property.orders.length}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1/3, flexDirection: 'row'}}>
                            <View style={{
                                flex: 1/6,
                                marginTop: 2, marginBottom: 5
                            }}>
                                <Image
                                    source={{uri: property.member.avatar_picture}}
                                    style={{ flex: 1 }}/>
                            </View>
                            <Text style={{
                                flex: 5/6,
                                fontSize: 12, fontWeight: 'bold', color: '#173D41',
                                marginTop: 5, marginLeft: 2 }}>{property.member.user_name}</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.5/5}}/>
                </View>
            </ButtonAPSL>
        )
    }

    render() {
        //console.log(this.state.dataSource)
        return (
            <ListView
                scrollEnabled={true}
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}/>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'white',
        width: productSize + 1,
        borderWidth: 0.0,
        height: productSize * 1.5,
        margin: 3,
        borderRadius: 5,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#365FB7',
    }
});

module.exports = ListProduct;