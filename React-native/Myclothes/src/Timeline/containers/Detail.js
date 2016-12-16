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
import * as API from '../../PersonalPage/libs/backend'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


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

function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacityImg: new Animated.Value(0),
            imgList: [],
            isLiked: false,
            numberOfLike: 0,
            numberOfComment: 0
        }
    }

    componentWillReceiveProps(props) {
        //console.log(props)
    }

    componentWillMount() {
        //onsole.log(this.props)
        API.getLikesProduct(this.props.property.product_id)
            .then((json) => {
                this.setState({
                    numberOfLike: json.count
                })
            })
        API.checkLikeProduct(this.props.property.product_id, this.props.global.user.token.userId)
            .then((json) => {
                //console.log(json)
                if (json.result != 0) {
                    this.setState({
                        isLiked: true
                    })
                }
            })

        API.countCommentProduct(this.props.property.product_id)
            .then((json) => {
                this.setState({
                    numberOfComment: json.count
                })
            })

    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    onHeartPress() {
        if (this.state.isLiked == false) {
            API.likeProduct(this.props.property.product_id, this.props.global.user.token.userId)
                .then((json) => {
                    this.setState({
                        isLiked: true
                    });
                    API.getLikesProduct(this.props.property.product_id)
                        .then((json) => {
                            this.setState({
                                numberOfLike: json.count
                            })
                        })
                })
        } else {
            API.unlikeProduct(this.props.property.product_id, this.props.global.user.token.userId)
                .then((json) => {
                    API.getLikesProduct(this.props.property.product_id)
                        .then((json) => {
                            this.setState({
                                numberOfLike: json.count
                            })
                        })
                    this.setState({
                        isLiked: false
                    })
                })
        }
    }



    onPressProduct(product_id, imgList){
        if (imgList.length < 2) {
            Actions.Product({
                isProduct: false,
                product_id: product_id
            });
        } else {
            Actions.Product({
                isProduct: true,
                product_id: product_id
            });
        }

    }

    render() {
        return (
            <View
                accessible={true}
                style={{flexDirection: 'column', height: 350, width: window.width}}>

                <ButtonAPSL
                    onPress={() => this.onPressProduct(this.props.property.product_id, this.props.property.imgList)}
                    style={{marginBottom: 0, borderRadius: 0, height: 280, width: window.width, borderWidth: 0}}>
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
                </ButtonAPSL>
                <View style={{borderWidth: 0.3, marginTop: 20, marginLeft: 30, marginRight: 30}} />
                <View style={{flex: 1/8, flexDirection: 'row'
                    , backgroundColor: '#ACF0F2'
                    , alignItems: 'center', justifyContent: 'space-between',}}>
                    <View style={{flex: 1/3, flexDirection: 'row'
                        , borderRightWidth: 1
                        , alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onHeartPress()}
                            name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={25} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfLike}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.props.onProductCommentPress(this.props.property.product_id, this.props.global.user.token.userId)}
                            name='comment' style={{color: '#735DD3'}} size={25} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfComment}</Text>
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
        flex: 1/6,
    },
});

export default connect(mapStateToProps)(Detail)