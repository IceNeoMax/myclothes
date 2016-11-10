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

class Timeline extends Component {
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

    render() {
        return (
            <View style={{flexDirection: 'column', height: 400, width: window.width}}>
                <View style={styles.postBox}>
                    <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row'}}>
                        <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
                            <ImageP
                                resizeMode='stretch'
                                indicator={Progress.CircleSnail}
                                style={{ height: 50, borderRadius: 25, width: 50 }}
                                source={{uri: this.props.property.imgAvatar}}/>
                        </View>
                        <View style={{flex: 5/6, justifyContent: 'center', flexDirection: 'column'}}>
                            <Text style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>Khanh</Text>
                            <View style={{ marginLeft: 10, flexDirection: 'row'}}>
                                <Text>{this.props.property.city}</Text>
                                <Text>{space}</Text>
                                <Text>{this.props.property.country}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height: 280, width: window.width}}>
                    <View style={{height: 280, width: window.width}}>
                        <Swiper showsButtons={false}
                                autoplay={true}
                                height={280}
                                width={window.width} >
                            {
                                this.props.property.imgList.map((img, i) => {
                                    return(
                                        <View key={i}>
                                            <Animated.Image 
                                                    resizeMode='contain'
                                                    source={{uri: img}}
                                                    style={{height:280, opacity: this.state.opacityImg}}
                                                    onLoad={() => {this.onLoadingImg()}} />
                                        </View>
                                    )
                                })
                            }
                        </Swiper>
                    </View>
                </View>
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

module.exports = Timeline;
