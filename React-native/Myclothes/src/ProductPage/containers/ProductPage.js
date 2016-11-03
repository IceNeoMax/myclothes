/**
 * Created by vjtc0n on 11/1/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import { ImageViewer } from 'react-native-image-fit'

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

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgList: [
                'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
                'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg'
            ],
            opacityImg: new Animated.Value(0),
        };
    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Icon name="angle-left"
                          size={20}
                          style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Ao thun</Text>
                    <View style={{marginRight: 20}} />
                </View>
                <View style={{flex: 1}}>
                    <ScrollView style={{flex: 1}}>
                        <View style={{height: 253, width: window.width - 10, alignSelf: 'center',
                            borderBottomColor: '#365FB7'}}>
                            <Swiper showsButtons={true}
                                    autoplay={true}
                                    height={250}
                                    width={window.width - 12} >
                                {
                                    this.state.imgList.map((img, i) => {
                                        return(
                                            <View key={i}>
                                                <Animated.Image source={{uri: img}}
                                                                resizeMode='stretch'
                                                                style={{height:250, width: window.width - 12, opacity: this.state.opacityImg}}
                                                                onLoad={() => {this.onLoadingImg()}} />
                                            </View>
                                        )
                                    })
                                }
                            </Swiper>
                        </View>

                        <View>
                            <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                <Text style={{color: 'gray'}}>Size</Text>
                                <View style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={styles.selectedCircle}>
                                        <Text style={{fontSize: 18, backgroundColor: 'white'}}>XS</Text>
                                    </View>
                                    <View style={styles.selectedCircle}>
                                        <Text style={{fontSize: 18, backgroundColor: 'white'}}>S</Text>
                                    </View>
                                    <View style={styles.selectedCircle}>
                                        <Text style={{fontSize: 18, backgroundColor: 'white'}}>M</Text>
                                    </View>
                                    <View style={styles.selectedCircle}>
                                        <Text style={{fontSize: 18, backgroundColor: 'white'}}>L</Text>
                                    </View>
                                    <View style={styles.selectedCircle}>
                                        <Text style={{fontSize: 18, backgroundColor: 'white'}}>XL</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                <Text style={{color: 'gray'}}>Color</Text>
                                <View style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={[styles.selectedCircle, {backgroundColor: 'red'}]}>
                                    </View>
                                    <View style={[styles.selectedCircle, {backgroundColor: 'black'}]}>
                                    </View>
                                    <View style={[styles.selectedCircle, {backgroundColor: 'green'}]}>
                                    </View>
                                    <View style={[styles.selectedCircle, {backgroundColor: 'blue'}]}>
                                    </View>
                                    <View style={[styles.selectedCircle, {backgroundColor: 'purple'}]}>
                                    </View>
                                </View>
                            </View>

                            <View style={{flexDirection: 'column', height: 180, marginTop: 10}}>
                                <View style={{flex: 0.75/3, flexDirection: 'column', marginLeft: 100, marginRight: 100}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        borderRadius: 10, backgroundColor: '#365FB7'}}>
                                        <Text style={{fontSize: 30, color: 'white'}}>Price : $ </Text>
                                        <Text style={{fontSize: 30, color: 'white'}}>10</Text>
                                    </View>
                                </View>
                                <View style={{flex: 0.75*2/3, marginLeft: 20, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{color: 'gray'}}>Author</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <ImageViewer
                                                source={{uri: this.state.imgList[1]}}
                                                mainImageStyle={{height: 50, width: 50, borderWidth: 0.5, borderRadius: 25, borderColor: 'gray'}}
                                                doubleTapEnabled={true}/>
                                            <Text style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>Khanh</Text>
                                        </View>
                                    </View>
                                    <View style={{height: 60, width: 150, marginLeft: 70, flexDirection: 'column'}}>
                                        <Text style={{color: 'gray'}}>Social</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'
                                            , marginTop: 20, justifyContent: 'space-between'}}>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon name='heart' style={{color: '#F2385A'}} size={20} />
                                                <Text style={{fontSize: 12, marginLeft: 2}}>23</Text>
                                            </View>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon name='comment' style={{color: '#735DD3'}} size={20} />
                                                <Text style={{fontSize: 12, marginLeft: 2}}>11</Text>
                                            </View>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon name='share-alt' style={{color: '#FF7F66'}} size={20} />
                                                <Text style={{fontSize: 12, marginLeft: 2}}>5</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex: 1/4, alignItems: 'center', justifyContent: 'center',}}>
                                    <ButtonAPSL style={{backgroundColor: '#365FB7', flex: 2/3, justifyContent: 'center'
                                        , marginLeft: 20, marginRight: 20, borderWidth: 0}}>
                                        <Text style={{color: 'white', alignSelf: 'center', fontSize: 20}}>Add to cart</Text>
                                    </ButtonAPSL>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
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
    selectedCircle: {
        flexDirection: 'row',
        borderWidth: 0.5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20
    }

});

module.exports = ProductPage;