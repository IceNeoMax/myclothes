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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as personalActions from '../../PersonalPage/actions/personalPage';
import * as API from '../../PersonalPage/libs/backend'

const window = Dimensions.get('window');
var space = ', ';

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

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacityImg: new Animated.Value(0),
            imgList: [],
            shareOfMember: []
        }
    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    componentWillMount() {
        if (typeof this.props.property.share_id != 'undefined') {
            API.getSharePost(this.props.property.share_id)
                .then((json) => {
                    this.props.personal.form.allPost.posts[this.props.rowID].products = json.products;
                    this.setState({
                        shareOfMember: json.member
                    }, () => {
                        //console.log(this.state.shareOfMember)
                    });
                    var imgArray = [];
                    this.props.property.products.forEach(function (product) {
                        if (product.imgList.length < 2) {
                            imgArray.push(product.imgList[0])
                        } else {
                            imgArray.push(product.imgList[0])
                            imgArray.push(product.imgList[1])
                        }
                    });

                    if (imgArray.length < 6) {
                        this.setState({
                            imgList: imgArray
                        })
                    } else {
                        this.setState({
                            imgList: imgArray.slice(0, 6)
                        })
                    }
                })
        } else {
            var imgArray = [];
            this.props.property.products.forEach(function (product) {
                if (product.imgList.length < 2) {
                    imgArray.push(product.imgList[0])
                } else {
                    imgArray.push(product.imgList[0])
                    imgArray.push(product.imgList[1])
                }
            });

            if (imgArray.length < 6) {
                this.setState({
                    imgList: imgArray
                })
            } else {
                this.setState({
                    imgList: imgArray.slice(0, 6)
                })
            }
        }


    }

    onHeartPress() {

        this.setState({
            isLiked: true
        })
    }

    onSharePress() {

    }

    onNamePress() {
        console.log("OK")
    }

    onPostPress() {
        Actions.DetailPost({
            property: this.props.property,
            shareOfMember: this.state.shareOfMember
        })
    }

    render() {
        var share;
        typeof this.props.property.share_id != 'undefined'? (share = <View style={{flexDirection: 'row'}}>
                                                                        <Text> shared </Text>
                                                                        <Text style={{fontWeight: 'bold', color: '#173D41'}}>
                                                                            {this.state.shareOfMember.user_name}
                                                                        </Text>
                                                                        <Text>'s post</Text>
                                                                    </View>) : (share = <View/>)

        return (
            <View
                accessible={true}
                style={{flexDirection: 'column', height: 400, width: window.width}}>
                <View style={styles.postBox}>
                    <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row', marginLeft: 20, marginRight: 20}}>
                        <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
                            <ImageP
                                resizeMode='stretch'
                                indicator={Progress.CircleSnail}
                                style={{ height: 50, borderRadius: 25, width: 50, borderWidth: 0.2 }}
                                source={{uri: this.props.property.member.avatar_picture}}/>
                        </View>
                        <View style={{flex: 5/6, justifyContent: 'center', flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text
                                    onLongPress={() => this.onNamePress()}
                                    style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>
                                    {this.props.property.member.user_name}
                                </Text>
                                <View>{share}</View>
                            </View>
                            <View style={{ marginLeft: 10, flexDirection: 'row'}}>
                                <Text>{this.props.property.member.city}</Text>
                                <Text>{(typeof this.props.property.member.city === 'undefined' ? " " : space)}</Text>
                                <Text>{this.props.property.member.country}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ButtonAPSL
                    onLongPress={() => this.onPostPress()}
                    style={{height: 280, width: window.width, borderRadius: 0, borderWidth: 0}}>
                    <View style={{height: 280, width: window.width}}>
                        <Swiper showsButtons={false}
                                autoplay={true}
                                height={280}
                                width={window.width} >
                            {
                                this.state.imgList.map((img, i) => {
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
                <View style={{flex: 1/8, flexDirection: 'row', alignItems: 'center'
                    , borderTopWidth: 0.5, marginLeft: 20, marginRight: 20, borderColor: 'gray'
                    , justifyContent: 'space-between',}}>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onHeartPress()}
                            name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.props.property.likes.length}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
                        <Icon
                            name='comment' style={{color: '#735DD3'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.props.property.comments.length}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onSharePress()}
                            name='share-alt' style={{color: '#FF7F66'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.props.property.shares.length}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
