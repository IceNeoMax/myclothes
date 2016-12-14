/**
 * Created by vjtc0n on 12/14/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import Modal from 'react-native-modalbox'

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


function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

class CreatePostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        }
    }

    onBackPress() {
        Actions.pop()
    }

    componentWillMount() {

    }

    onChangeName (text) {
        //console.log(text)
        this.setState({
            name: text
        })
    }

    onChangeDescription(text) {
        this.setState({
            description: text
        })
    }


    onConfirm() {
        Actions.CreateProduct();
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <View style={styles.navBar}>
                    <Icon
                        onPress={() => this.onBackPress()}
                        name="angle-left"
                        size={40}
                        style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Creating a Post</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <ScrollView style={{flex: 1,}}>
                    <View style={{height: 100}}/>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Album Name</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.inputBar}
                                underlineColorAndroid="white"
                                onChangeText={(text) => this.onChangeName(text)}
                                placeholder="Album Name"/>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Description</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                multiline={true}
                                style={[styles.inputBar, {height: 150, fontSize: 14}]}
                                underlineColorAndroid="white"
                                onChangeText={(text) => this.onChangeDescription(text)}
                                placeholder="Write something about the new album..."/>
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

export default connect(mapStateToProps)(CreatePostPage)