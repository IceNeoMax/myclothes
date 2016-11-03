/**
 * Created by vjtc0n on 11/1/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import { ImageViewer } from 'react-native-image-fit'
import PhotoView from 'react-native-photo-view';
import CommentModal from '../../Comment/commentmodal'

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
            sizeList: {
                selectedXS: false,
                selectedS: false,
                selectedM: true,
                selectedL: false,
                selectedXL: false
            },
            colorList: {
                selected1: false,
                selected2: false,
                selected3: true,
                selected4: false,
                selected5: false
            },
            isLiked: false,
            isModalOpened: false
        };
    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    onCirclePress(id) {
        switch (id) {
            case 1:
                return this.setState({
                    sizeList: {
                        selectedXS: true,
                        selectedS: false,
                        selectedM: false,
                        selectedL: false,
                        selectedXL: false
                    }
                });
            case 2:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: true,
                        selectedM: false,
                        selectedL: false,
                        selectedXL: false
                    }
                })
            case 3:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: false,
                        selectedM: true,
                        selectedL: false,
                        selectedXL: false
                    }
                })
            case 4:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: false,
                        selectedM: false,
                        selectedL: true,
                        selectedXL: false
                    }
                })
            case 5:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: false,
                        selectedM: false,
                        selectedL: false,
                        selectedXL: true
                    }
                })

            case 6:
                return this.setState({
                    colorList: {
                        selected1: true,
                        selected2: false,
                        selected3: false,
                        selected4: false,
                        selected5: false
                    }
                });
            case 7:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: true,
                        selected3: false,
                        selected4: false,
                        selected5: false
                    }
                })
            case 8:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: false,
                        selected3: true,
                        selected4: false,
                        selected5: false
                    }
                })
            case 9:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: false,
                        selected3: false,
                        selected4: true,
                        selected5: false
                    }
                })
            case 10:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: false,
                        selected3: false,
                        selected4: false,
                        selected5: true
                    }
                })
        }
    }

    onHeartPress() {

        this.setState({
            isLiked: true
        })
    }

    onCommentPress() {
        this.setState({
            isModalOpened: true
        })
    }

    onModalClosed() {
        this.setState({
            isModalOpened: false
        })
    }

    onSharePress() {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Icon name="angle-left"
                          size={40}
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
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(1)}
                                        style={this.state.sizeList.selectedXS ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>XS</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(2)}
                                        style={this.state.sizeList.selectedS ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>S</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(3)}
                                        style={this.state.sizeList.selectedM ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>M</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(4)}
                                        style={this.state.sizeList.selectedL ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>L</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(5)}
                                        style={this.state.sizeList.selectedXL ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>XL</Text>
                                    </ButtonAPSL>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                <Text style={{color: 'gray'}}>Color</Text>
                                <View style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(6)}
                                        style={[this.state.colorList.selected1 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'red'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(7)}
                                        style={[this.state.colorList.selected2 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'black'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(8)}
                                        style={[this.state.colorList.selected3 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'green'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(9)}
                                        style={[this.state.colorList.selected4 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'blue'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(10)}
                                        style={[this.state.colorList.selected5 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'purple'}]}>
                                    </ButtonAPSL>
                                </View>
                            </View>

                            <View style={{flexDirection: 'column', height: 180,}}>
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
                                            <Image
                                                source={{uri: this.state.imgList[1]}}
                                                style={{height: 50, width: 50, borderWidth: 0.5, borderRadius: 25, borderColor: 'gray'}}
                                            />
                                            <Text style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>Khanh</Text>
                                        </View>
                                    </View>
                                    <View style={{height: 60, width: 150, marginLeft: 70, flexDirection: 'column'}}>
                                        <Text style={{color: 'gray'}}>Social</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'
                                            , marginTop: 15, justifyContent: 'space-between'}}>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon
                                                    onPress={() => this.onHeartPress()}
                                                    name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={20} />
                                            </View>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon
                                                    onPress={() => this.onCommentPress()}
                                                    name='comment' style={{color: '#735DD3'}} size={20} />
                                                <Text style={{fontSize: 12, marginLeft: 2}}>11</Text>
                                            </View>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon
                                                    onPress={() => this.onSharePress()}
                                                    name='share-alt' style={{color: '#FF7F66'}} size={20} />
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
                <CommentModal
                    onClosed={() => this.onModalClosed()}
                    isOpen={this.state.isModalOpened}/>
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
    },
    selectedCirclePress: {
        flexDirection: 'row',
        borderWidth: 0.5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        backgroundColor: 'gray'
    },
    selectedCircleColorPress: {
        flexDirection: 'row',
        borderWidth: 4,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        borderColor: '#F2385A'
    }

});

module.exports = ProductPage;