/**
 * Created by vjtc0n on 11/30/16.
 */
/**
 * Created by vjtc0n on 11/7/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';

const window = Dimensions.get('window');
var space = ', ';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacityImg: new Animated.Value(0),
            imgList: [
                'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
                'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg'
            ],
        }
    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    onHeartPress() {

        this.setState({
            isLiked: true
        })
    }

    onSharePress() {

    }


    onImagePress() {
        console.log("OK")
    }

    render() {
        return (
            <View
                accessible={true}
                style={{flexDirection: 'column', height: 350, width: window.width}}>

                <ButtonAPSL
                    onPress={() => this.onImagePress()}
                    style={{marginBottom: 0, borderRadius: 0, height: 280, width: window.width, borderWidth: 0}}>
                    <View style={{height: 280, width: window.width}}>
                        <Animated.Image
                            resizeMode='contain'
                            source={{uri: this.props.property.img}}
                            style={{height:280, opacity: this.state.opacityImg}}
                            onLoad={() => {this.onLoadingImg()}} />
                    </View>
                </ButtonAPSL>
                <View style={{flex: 1/8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onHeartPress()}
                            name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.props.property.numberOfLike}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
                        <Icon
                            name='comment' style={{color: '#735DD3'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.props.property.numberOfComment}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onSharePress()}
                            name='share-alt' style={{color: '#FF7F66'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.props.property.numberOfShare}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postBox: {
        flexDirection: 'row',
        borderRadius: 0,
        borderWidth: 0,
        flex: 1/6
    },
});

module.exports = Detail;
