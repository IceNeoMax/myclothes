/**
 * Created by vjtc0n on 12/9/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import { ImageViewer } from 'react-native-image-fit'
import { SwipeListView } from 'react-native-swipe-list-view';
import ViewMoreText from 'react-native-view-more-text';
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as API from '../libs/backend'

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
var avatarRectangle = Dimensions.get('window').width;


var uriFacCover = 'http://www.torontocitylife.com/wp-content/uploads/2013/08/London-factory-large.jpg';
var urifacAva = 'https://image.freepik.com/free-vector/vintage-factory-vector_23-2147498407.jpg';

function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

class FactoryManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: '',
            isExist: false,
            factory_id: ''
        }
    }

    onBackPress() {
        Actions.pop()
    }

    componentWillMount() {
        API.getUserInfo(this.props.global.user.token.userId)
            .then((json) => {
                console.log(json.factory[0])
                if (json.factory.length == 0) {
                    this.setState({
                        isExist: false
                    })
                } else {
                    this.setState({
                        name: json.factory[0].name,
                        phone: json.factory[0].phone,
                        address: json.factory[0].address,
                        factory_id: json.factory[0].factory_id,
                        isExist: true
                    })
                }
            })
    }

    onChangeName (text) {
        //console.log(text)
        this.setState({
            name: text
        })
    }

    onChangePhone(text) {
        this.setState({
            phone: text
        })
    }

    onChangeAddress(text) {
        this.setState({
            phone: text
        })
    }

    onConfirm() {
        if (this.state.isExist == false) {
            API.createFactory({
                user_id: this.props.global.user.token.userId,
                name: this.state.name,
                phone: this.state.phone,
                address: this.state.phone
            })
                .then((json) => {
                    this.setState({
                        isExist: true
                    })
                })
        } else {
            API.updateFactory(this.state.factory_id, {
                name: this.state.name,
                phone: this.state.phone,
                address: this.state.phone
            })
        }
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
                    <Text style={{fontSize: 20, color: 'white'}}>Factory Management</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={{height: 300}}>
                        <View style={styles.coverPicture}>
                            <View>
                                <ImageP
                                    indicator={Progress.CircleSnail}
                                    resizeMode='stretch'
                                    source={{uri: uriFacCover}}
                                    style={styles.cover}/>
                            </View>
                        </View>
                        <View style={styles.empty} />

                        <View style={styles.avartarContainer}>
                            <View style={styles.avatarPicture}>
                                <ImageP
                                    indicator={Progress.CircleSnail}
                                    resizeMode='stretch'
                                    source={{uri: urifacAva}}
                                    style={styles.logo}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.inputBar}
                                underlineColorAndroid="white"
                                onChangeText={(text) => this.onChangeName(text)}
                                defaultValue={this.state.name}
                                placeholder="Factory Name"/>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.inputBar}
                                underlineColorAndroid="white"
                                onChangeText={(text) => this.onChangePhone(text)}
                                defaultValue={this.state.phone}
                                placeholder="Phone"/>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Address</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.inputBar}
                                underlineColorAndroid="white"
                                onChangeText={(text) => this.onChangeAddress(text)}
                                defaultValue={this.state.address}
                                placeholder="Address"/>
                        </View>
                    </View>
                    <ButtonAPSL
                        onPress={() => this.onConfirm()}
                        style={{ marginTop: 30, backgroundColor: '#FF3366'
                        , marginRight: 40, marginBottom: 20, borderWidth: 0
                        , marginLeft: 40}}>
                        <Text style={{color: 'white', fontSize: 20}}>{(this.state.isExist == true) ? 'Update' : ' Create'}</Text>
                    </ButtonAPSL>
                </ScrollView>
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
    coverPicture: {
        flex: 4,
        borderRadius: 0,
        borderWidth: 0,
        //borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    avartarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: (avatarRectangle - 150)/2,
        left: (avatarRectangle - 150)/2,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: 'gray'
    },
    avatarPicture: {
        height: 150,
        borderRadius: 0,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 147,
        width: 147,
        borderRadius: 5
    },
    cover: {
        width: avatarRectangle,
        height: 300*4/5
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
    }
});

export default connect(mapStateToProps)(FactoryManagement)