/**
 * Created by vjtc0n on 11/10/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
    Image,
    Platform
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as API from '../../Profile/libs/backend'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import ButtonAPSL from 'apsl-react-native-button'
const SWIPER_HEIGHT = 180;
import CreditCard, {CardImages} from 'react-native-credit-card';
import Swiper from 'react-native-swiper';
const {height, width} = Dimensions.get('window');



function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: 'name',
            number: '',
            name: '',
            cvc: '',
            expiry: '',
            index: 0,
            type: 'visa',
            isExist: false,
            payment_id: ''
        }
    }

    componentWillMount() {
        API.getUserInfo(this.props.global.user.token.userId)
            .then((json) => {
                if (json.payments.length == 0) {
                    this.setState({
                        isExist: false
                    })
                } else {
                    this.setState({
                        isExist: true,
                        name: json.payments[0].full_name,
                        cvc: json.payments[0].secret_code.toString(),
                        number: json.payments[0].card_seri,
                        expiry: json.payments[0].expiry,
                        type: json.payments[0].payment_card
                    })
                }
            })
    }

    onNext() {
        this.swiper.scrollBy(1);
    }

    componentDidMount() {
        this.refs['number'].focus();
    }

    onMomentumScrollEnd(e, state, context) {
        var indexMap = [
            'number',
            'name',
            'expiry',
            'cvc',
            'type',
        ];
        this.setState({
            index: state.index,
            focused: indexMap[state.index]
        }, () => {
            try {
                this.refs[indexMap[state.index]].focus();
            } catch(e) {

            }
        });
    }

    onConfirm() {
        console.log(this.state)
        if (this.state.isExist == false) {
            API.createPayment({
                user_id: this.props.global.user.token.userId,
                full_name: this.state.name,
                payment_card: this.state.type,
                card_seri: this.state.number,
                secret_code: this.state.cvc,
                expiry: this.state.expiry
            })
                .then((json) => {
                    this.setState({
                        isExist: true
                    })
                })
        } else {
            API.updatePayment(this.state.payment_id, {
                full_name: this.state.name,
                payment_card: this.state.type,
                card_seri: this.state.number,
                secret_code: this.state.cvc,
                expiry: this.state.expiry
            })
        }
    }

    onBackPress() {
        Actions.pop()
    }

    render() {
        var cardTypes = [];
        for (var key in CardImages) {
            cardTypes.push({type: key, image: CardImages[key]});
        }
        if (this.state.restoring) {
            return null;
        }

        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Icon
                        onPress={() => this.onBackPress()}
                        name="angle-left"
                        size={40}
                        style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Payment</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.container}>
                        <Image style={styles.background} source={require('./images/background.png')} resizeMode={'cover'} />
                        <CreditCard
                            type={this.state.type}
                            style={{marginVertical: 10, marginHorizontal: 10, marginBottom: 0, elevation: 3, alignSelf: 'center'}}
                            imageFront={require('./images/card-front.png')}
                            imageBack={require('./images/card-back.png')}
                            shiny={false}
                            bar={false}
                            focused={this.state.focused}
                            number={this.state.number}
                            name={this.state.name}
                            expiry={this.state.expiry}
                            cvc={this.state.cvc}/>

                        <Swiper
                            style={styles.wrapper}
                            height={SWIPER_HEIGHT}
                            showsButtons={false}
                            onMomentumScrollEnd = {this.onMomentumScrollEnd.bind(this)}
                            ref={(swiper) => {this.swiper = swiper}}
                            index={this.state.index}>
                            <View style={styles.slide}>
                                <View style={styles.card}>
                                    <Text style={styles.textNumber}>CARD NUMBER</Text>
                                    <TextInput
                                        ref="number"
                                        autoFocus={true}
                                        value={this.state.number}
                                        style={styles.textInput}
                                        onChangeText={(number) => this.setState({number})}/>
                                </View>
                            </View>
                            <View style={styles.slide}>
                                <View style={styles.card}>
                                    <Text style={styles.textName}>CARD HOLDER'S NAME</Text>
                                    <TextInput
                                        ref="name"
                                        value={this.state.name}
                                        style={styles.textInput}
                                        onChangeText={(name) => this.setState({name})}/>
                                </View>
                            </View>
                            <View style={styles.slide}>
                                <View style={styles.card}>
                                    <Text style={styles.textName}>EXPIRY</Text>
                                    <TextInput
                                        ref="expiry"
                                        value={this.state.expiry}
                                        style={styles.textInput}
                                        onChangeText={(expiry) => this.setState({expiry})}/>
                                </View>
                            </View>
                            <View style={styles.slide}>
                                <View style={styles.card}>
                                    <Text style={styles.textCvc}>CVV/CVC NUMBER</Text>
                                    <TextInput
                                        ref="cvc"
                                        value={this.state.cvc}
                                        style={styles.textInput}
                                        onChangeText={(cvc) => this.setState({cvc})}/>
                                </View>
                            </View>
                            <View style={styles.slide}>
                                <View style={styles.card}>
                                    <Text style={styles.textNumber}>CARD TYPE</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        {cardTypes.map((cardType) => {
                                            return (
                                                <TouchableOpacity key={cardType.type} onPress={() => this.setState({type: cardType.type})}>
                                                    <View>
                                                        <Image source={{uri: cardType.image}} style={{width: 57, height: 35, marginHorizontal: 5}} />
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        </Swiper>
                        <ButtonAPSL
                            onPress={() => this.onNext()}
                            style={{ marginTop: 0, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>Next</Text>
                        </ButtonAPSL>
                        <ButtonAPSL
                            onPress={() => this.onConfirm()}
                            style={{ marginTop: 10, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>{(this.state.isExist == true) ? 'Update' : ' Create'}</Text>
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
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height
    },
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        paddingTop: 30
    },
    wrapper: {
        height: SWIPER_HEIGHT,
    },
    slide: {
        height: SWIPER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {

    },
    card: {
        marginHorizontal: 10,
        marginBottom: 30,
        backgroundColor: '#fff',
        borderRadius: 3,
        elevation: 3,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        height: 70,
        flexDirection: 'column'
    },
    button: {
        height: 40,
        backgroundColor: '#1ba549',
        justifyContent: 'center',
    },
    textButton: {
        textAlign: 'center',
        color: '#fff'
    },
    textInput: {
        height: 30,
        borderWidth: 0.5,
        padding: 0,
        borderColor: 'gray',
        borderRadius: 5
    }

});

export default connect(mapStateToProps)(Payment)