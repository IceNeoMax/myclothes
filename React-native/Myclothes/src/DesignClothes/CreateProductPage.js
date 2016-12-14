/**
 * Created by vjtc0n on 12/14/16.
 */
/**
 * Created by vjtc0n on 12/14/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import Modal from 'react-native-modalbox'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as API from './libs/backend'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    ListView,
    Platform,
    TextInput,
    Alert
} from 'react-native';

const window = Dimensions.get('window');
const stickerUrl = 'https://sg-static-cdn.sgsr.us/data/StickerGiant-Silkscreen-Stickers-Examples__57fd5e0f507a9.png?v122';
const productUrl = 'http://img07.deviantart.net/a98b/i/2012/042/5/1/conqueror_staff_shirt_design_by_johnetorres-d4pfo5l.jpg';

function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

class CreateProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stickerName: '',
            stickerPrice: 10,
            stickerModalOpened: false,
            productModalOpened: false
        }
    }

    onBackPress() {
        Actions.pop()
    }

    componentWillMount() {

    }


    onChangeStickerName (text) {
        this.setState({
            stickerName: text
        })
    }

    onChangeStickerPrice (text) {
        this.setState({
            stickerPrice: parseInt(text)
        })
    }

    onStickerModal() {
        this.setState({
            stickerModalOpened: true
        })
    }

    onShirtModal() {
        this.setState({
            productModalOpened: true
        })
    }

    onStickerClose() {
        this.setState({
            stickerModalOpened: false
        })
    }

    onShirtClose() {
        this.setState({
            productModalOpened: false
        })
    }

    onCreateSticker() {
        console.log(this.state.stickerPrice)
    }

    onCreateProduct() {

    }

    render() {
        var closeButton =   <View style={styles.backdropModal}>
                                <ButtonAPSL
                                    textStyle={{color: 'white'}}
                                    onPress={() => this.onStickerClose()}
                                    style={styles.closeButton}>X</ButtonAPSL>
                            </View>;
        var closeProductButton =   <View style={styles.backdropModal}>
                                        <ButtonAPSL
                                            textStyle={{color: 'white'}}
                                            onPress={() => this.onShirtClose()}
                                            style={styles.closeButton}>X</ButtonAPSL>
                                    </View>;
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1, marginBottom: 50}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <View style={styles.navBar}>
                    <Icon
                        onPress={() => this.onBackPress()}
                        name="angle-left"
                        size={40}
                        style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Creating Products</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <View style={{flex: 1, justifyContent: 'center',}}>

                    <View style={{flex: 1/2}}>
                        <View style={{height: 200}}>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: stickerUrl}}
                                style={{height: 200}}/>
                        </View>
                        <ButtonAPSL
                            onPress={() => this.onStickerModal()}
                            style={{ marginTop: 30, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>Create a Sticker</Text>
                        </ButtonAPSL>
                    </View>
                    <View style={{flex: 1/2}}>
                        <View style={{height: 190, alignSelf: 'center'}}>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: productUrl}}
                                style={{height: 190, width: 300}}/>
                        </View>
                        <ButtonAPSL
                            onPress={() => this.onShirtModal()}
                            style={{ marginTop: 30, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>Create a Shirt</Text>
                        </ButtonAPSL>
                    </View>
                </View>
                <Modal
                    animationDuration={200}
                    backdropOpacity={0}
                    position="center"
                    isDisable={false}
                    swipeToClose={false}
                    backButtonClose={true}
                    backdropContent={closeButton}
                    onClosed={() => this.onStickerClose()}
                    style={styles.modal}
                    isOpen={this.state.stickerModalOpened}>
                    <View style={{marginTop: 20}}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Sticker Name</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.inputBar}
                                    underlineColorAndroid="white"
                                    onChangeText={(text) => this.onChangeStickerName(text)}
                                    placeholder="Sticker Name"/>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Set Price</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.inputBar}
                                    underlineColorAndroid="white"
                                    onChangeText={(text) => this.onChangeStickerPrice(text)}
                                    placeholder="Set price for this sticker..."/>
                            </View>
                        </View>
                        <ButtonAPSL
                            onPress={() => this.onCreateSticker()}
                            style={{ marginTop: 30, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>Create a Sticker</Text>
                        </ButtonAPSL>
                    </View>
                </Modal>
                <Modal
                    animationDuration={200}
                    backdropOpacity={0}
                    position="center"
                    isDisable={false}
                    swipeToClose={false}
                    backButtonClose={true}
                    backdropContent={closeProductButton}
                    onClosed={() => this.onShirtClose()}
                    style={styles.modal}
                    isOpen={this.state.productModalOpened}>
                    <View style={{marginTop: 50}}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Product Name</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.inputBar}
                                    underlineColorAndroid="white"
                                    onChangeText={(text) => this.onChangeStickerName(text)}
                                    placeholder="Product Name"/>
                            </View>
                        </View>
                        <ButtonAPSL
                            onPress={() => this.onCreateProduct()}
                            style={{ marginTop: 30, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>Create a Product</Text>
                        </ButtonAPSL>
                    </View>
                </Modal>
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
    inputBar: {
        borderWidth: 0,
        padding: 0,
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    inputContainer: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    label: {
        fontWeight: 'bold'
    },
    inputWrap: {
        borderBottomWidth: 3,
        borderColor: '#f66f88',
        borderRadius: 25,
        backgroundColor: '#fccfd7'
    },
    modal: {
        position: 'absolute',
        height: 300,
        borderRadius: 10,
        width: 350
    },
    closeButton: {
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        backgroundColor: "transparent",
        margin: 5,
        padding: 0,
        borderWidth: 0,
        alignSelf: 'flex-end'
    },
    listview: {
        margin: 20,

    },
    backdropModal: {
        width: window.width,
        height: window.height,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});

export default connect(mapStateToProps)(CreateProductPage)