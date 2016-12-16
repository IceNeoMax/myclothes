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
    ListView,
    RefreshControl,
    Alert
} from 'react-native';

import { bindActionCreators } from 'redux'
import * as personalActions from '../../PersonalPage/actions/personalPage';
import { connect } from 'react-redux'
import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import * as API from '../libs/backend'

const window = Dimensions.get('window');
var DATA = [];


var DATAHistory = [];

var SHOPCART = [];

function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...personalActions }, dispatch)
    }
}

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            selectedCurrent: true,
            selectedHistoty: false,
            dataShoppingCart: ds1.cloneWithRows(DATAHistory),
            isRefreshing: false,
            totalPrice: 0,
            shippingFee: 10
        };
    }

    componentWillReceiveProps(props) {
        console.log(props.personal.form.shopping_cart)
    }

    componentWillMount() {
        API.getHistory(this.props.global.user.token.userId)
            .then((json) => {
                //console.log(json)
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataShoppingCart: ds.cloneWithRows(json)
                })
            })
    }

    onPress(event, id) {
        if (id == 1){
            this.setState({
                selectedCurrent: true,
                selectedHistoty: false,
            }, ()=> {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(this.props.personal.form.shopping_cart)
                }, () => {
                    this.countTotalPrice();
                })
            })
        } else if (id == 2) {
            this.setState({
                selectedCurrent: false,
                selectedHistoty: true,
            }, () => {
                API.getHistory(this.props.global.user.token.userId)
                    .then((json) => {
                        console.log(json)
                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataShoppingCart: ds.cloneWithRows(json)
                        })
                    })
            })
        }
    }

    countTotalPrice() {
        var total = 0;
        //console.log(this.state.shippingFee)
        var shippingFee = this.state.shippingFee
        this.props.personal.form.shopping_cart.forEach(function (product) {
            total += product.quantity * product.price
        })
        //total += this.state.shippingFee;
        this.setState({
            totalPrice: total + shippingFee
        })
    }

    onPlusPress(rowID) {
        this.props.personal.form.shopping_cart[rowID].quantity ++;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.personal.form.shopping_cart)
        }, () => {
            this.countTotalPrice();
        })
    }

    onMinusPress(rowID) {
        if (this.props.personal.form.shopping_cart[rowID].quantity > 1) {
            this.props.personal.form.shopping_cart[rowID].quantity --;
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(this.props.personal.form.shopping_cart)
            }, () => {
                this.countTotalPrice();
            })
        } else {
            Alert.alert(
                'Alert',
                'Do you really want to delete this product?',
                [
                    {text: 'Cancel', onPress: () => {}},
                    {text: 'OK', onPress: () => {
                        this.props.personal.form.shopping_cart.splice(rowID, 1);
                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource: ds.cloneWithRows(this.props.personal.form.shopping_cart)
                        }, () => {
                            this.countTotalPrice();
                        })
                    }},
                ]
            )
        }

    }

    onCompleteOrder() {
        //console.log(this.state.shippingFee)
        var self = this;
        var tempArray = [];
        //console.log(self.props.personal.form.shopping_cart)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.personal.form.shopping_cart)
        }, () => {
            this.countTotalPrice();
            Alert.alert(
                'Alert',
                'Are you sure?',
                [
                    {text: 'Cancel', onPress: () => {}},
                    {text: 'OK', onPress: () => {
                        API.createShoppingCart(this.props.global.user.token.userId, self.state.totalPrice)
                            .then((json) => {
                                //console.log(json)
                                //console.log(self.props.personal.form.shopping_cart)
                                self.props.personal.form.shopping_cart.forEach(function (product) {
                                    tempArray.push(product)
                                    //console.log(tempArray)
                                    if (product.imgList.length > 1) {
                                        //console.log("Ao")
                                        //console.log(self)
                                        //console.log(product)
                                        API.createOrder({
                                            user_id: self.props.global.user.token.userId,
                                            shopping_cart_id: json.shopping_cart_id,
                                            product_id: product.product_id,
                                            quantity: product.quantity,
                                            size: product.size,
                                            color: product.color,
                                            factory_id: product.factory_id
                                        })
                                            .then((json) => {
                                                if (tempArray.length == self.props.personal.form.shopping_cart.length) {
                                                    self.props.personal.form.shopping_cart.splice(0, tempArray.length)
                                                    //console.log(self.props.personal.form.shopping_cart)
                                                    self.setState({
                                                        dataSource: ds.cloneWithRows([]),
                                                        totalPrice: 0
                                                    })
                                                }
                                            })
                                    } else {
                                        //console.log("sticker")
                                        API.createOrder({
                                            user_id: self.props.global.user.token.userId,
                                            shopping_cart_id: json.shopping_cart_id,
                                            product_id: product.product_id,
                                            quantity: product.quantity,
                                            accepted: true
                                        })
                                            .then((json) => {
                                                if (tempArray.length == self.props.personal.form.shopping_cart.length) {
                                                    self.props.personal.form.shopping_cart.splice(0, tempArray.length)
                                                    //console.log(self.props.personal.form.shopping_cart)
                                                    self.setState({
                                                        dataSource: ds.cloneWithRows([]),
                                                        totalPrice: 0
                                                    })
                                                }
                                            })
                                    }
                                })
                            })
                    }},
                ]
            )
        })
    }

    renderCurrentRow(property, sectionID, rowID) {
        return (
            <View style={{flexDirection: 'row', height: 100}}>
                <View style={{flex: 2/3, flexDirection: 'row'}}>
                    <ImageP
                        style={{borderWidth: 0.5, borderColor: 'gray', borderRadius: 10, flex: 1/3}}
                        source={{uri: property.imgList[0]}}
                        indicator={Progress.CircleSnail}/>
                    <View style={{flexDirection: 'column', flex: 2/3, justifyContent: 'space-between', marginLeft: 10}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.productNameText}>{property.name}</Text>
                            <Text style={[styles.resultText, {marginLeft: 10}]}>{property.size}</Text>
                            <Text style={[styles.resultText, {marginLeft: 10}]}>{property.color}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.totalText}>$</Text>
                            <Text style={styles.totalText}>{property.price}</Text>
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
                                onPress={() => this.onMinusPress(rowID)}
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
                                onPress={() => this.onPlusPress(rowID)}
                                color='#FF9E47'
                                size={30}
                                name="plus-square" />
                        </ButtonAPSL>
                    </View>
                </View>
            </View>
        )
    }

    onRefresh() {
        this.setState({ isRefreshing: true });
        //console.log(this.props.personal.form.shopping_cart)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.personal.form.shopping_cart)
        }, () => {
            this.countTotalPrice();
            this.setState({ isRefreshing: false });
        })

    }

    // Render current Shopping cart

    renderCurrent() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 2/3, margin: 15, borderBottomWidth: 0.5, borderBottomColor: 'gray'}}>
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.onRefresh()}
                                colors={['#EA0000']}
                                tintColor="black"
                                title="loading..."
                                titleColor="black"
                                progressBackgroundColor="white"
                            />
                        }
                        scrollEnabled={true}
                        style={styles.listView}
                        contentContainerStyle={{}}
                        renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                     style={{ flex: 1
                                                                         , height: 10
                                                                     }} />}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderCurrentRow(rowData, sectionID, rowID)}
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
                                <Text style={styles.resultText}>{this.state.totalPrice - this.state.shippingFee}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.resultText}>$</Text>
                                <Text style={styles.resultText}>10</Text>
                            </View>
                            <View style={{borderWidth: 0.5, alignSelf: 'stretch', borderColor: 'gray'}}/>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.totalText}>$</Text>
                                <Text style={styles.totalText}>{this.state.totalPrice}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1/4, alignItems: 'center', justifyContent: 'center'}}>
                        <ButtonAPSL
                            onPress={() => this.onCompleteOrder()}
                            style={{backgroundColor: '#365FB7', flex: 2/3, justifyContent: 'center'
                            , marginLeft: 20, marginRight: 20, borderWidth: 0}}>
                            <Text style={{color: 'white', alignSelf: 'center', fontSize: 20}}>Complete Order</Text>
                        </ButtonAPSL>
                    </View>
                </View>
            </View>
        )
    }

    renderDetail(property) {
        let checked = null;
        if (property.accepted) {
            checked = <Icon name='check-circle' color='#F2385A' size={40}/>
        } else {
            checked = <Icon name='check-circle' size={40} color='gray'/>
        }
        //checked = <Icon name='check-circle' color='#F2385A' size={40}/>
        return (
            <View style={{flexDirection: 'row', height: 100}}>
                <View style={{flex: 1/2, flexDirection: 'row'}}>
                    <ImageP
                        style={{borderWidth: 0.5, borderColor: 'gray', borderRadius: 10, flex: 1/2}}
                        source={{uri: property.product.imgList[0]}}
                        indicator={Progress.CircleSnail}/>
                    <View style={{flexDirection: 'column', flex: 1/2, justifyContent: 'space-between', marginLeft: 10}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.productNameText}>{property.product.name}</Text>
                            <Text style={[styles.resultText, {marginLeft: 10}]}>{property.product.size}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.totalText}>$</Text>
                            <Text style={styles.totalText}>{property.product.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1/2
                    , borderWidth: 0, justifyContent: 'space-between'
                    , flexDirection: 'row'}}>
                    <View style={{flex: 1/2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text>Quantity</Text>
                        <Text style={{fontWeight: 'bold', color: 'gray', fontSize: 20,}}>{property.quantity}</Text>
                        <Text style={{color: 'white'}}>ABC</Text>
                    </View>
                    <View style={{flex: 1/2, borderWidth: 0, alignItems: 'center', justifyContent: 'center'}}>
                        {checked}
                    </View>
                </View>
            </View>
        )
    }

    renderFooter(total) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'
                , marginLeft: 90, marginRight: 20
                , alignItems: 'center', }}>
                <Text style={{fontWeight: 'bold', color: 'gray'}}>Total</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.totalText, {fontSize: 25}]}>$</Text>
                    <Text style={[styles.totalText, {fontSize: 25}]}>{total}</Text>
                </View>
            </View>
        )
    }

    renderShoppingCartRow(property){
        //console.log(property)
        const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataDetail = ds2.cloneWithRows(property.orders);
        return (
            <View style={{flex: 1, height: property.orders.length*100 + 100}}>
                <Text style={{fontWeight: 'bold'}}>{property.purchase_time}</Text>
                <View style={{marginLeft: 20, marginRight: 20, marginTop: 15
                    , marginBottom: 5, }}>
                    <ListView
                        //scrollEnabled={false}
                        renderFooter={() => this.renderFooter(property.total)}
                        style={{ borderRightWidth: 2, borderColor: '#F2385A'}}
                        removeClippedSubviews={false}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 10}} />}
                        dataSource={dataDetail}
                        renderRow={this.renderDetail.bind(this)}
                        enableEmptySections={true}/>
                </View>
            </View>
        )
    }

    renderHistory() {
        return (
            <ListView
                style={{flex: 1, marginTop: 20}}
                removeClippedSubviews={false}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 7, backgroundColor: '#cccccc'}} />}
                dataSource={this.state.dataShoppingCart}
                renderRow={this.renderShoppingCartRow.bind(this)}
                enableEmptySections={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)