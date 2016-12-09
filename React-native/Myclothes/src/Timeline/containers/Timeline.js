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
import Comment from '../../Comment/commentmodal';

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
            shareOfMember: [],
            sharedPost: [],
            isModalOpened: false,
            numberOfLike: 0,
            isLiked: false,
            numberOfShare: 0,
            numberOfComment: 0
        }
    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    componentWillReceiveProps(props) {
        if (typeof props.property.share_id != 'undefined') {
            API.getSharePost(this.props.property.share_id)
                .then((json) => {
                    //console.log(json)
                    this.props.personal.form.allPost.posts[props.rowID].products = json.products;
                    this.setState({
                        shareOfMember: json.member,
                        sharedPost: json
                    }, () => {
                        //console.log(this.state.shareOfMember)
                    });
                    var imgArray = [];
                    //console.log(this.props.products)
                    if (typeof props.products == 'undefined') {
                        json.products.forEach(function (product) {
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
                    } else {
                        props.property.products.forEach(function (product) {
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

                })
        } else {
            this.setState({
                sharedPost: props.property
            });
            var imgArray = [];
            props.property.products.forEach(function (product) {
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

        API.getLikesPost(props.property.post_id)
            .then((json) => {
                this.setState({
                    numberOfLike: json.count
                })
            })
        API.checkLikePost(props.property.post_id, this.props.global.user.token.userId)
            .then((json) => {
                //console.log(json)
                if (json.result != 0) {
                    this.setState({
                        isLiked: true
                    })
                }
            })
        API.countSharePost(props.property.post_id)
            .then((json) => {
                this.setState({
                    numberOfShare: json.count
                })
            })

        API.countCommentPost(props.property.post_id)
            .then((json) => {
                this.setState({
                    numberOfComment: json.count
                })
            })
    }

    componentWillMount() {
        //console.log(this.props.property)
        if (typeof this.props.property.share_id != 'undefined') {
            API.getSharePost(this.props.property.share_id)
                .then((json) => {
                    //console.log(json)
                    this.props.personal.form.allPost.posts[this.props.rowID].products = json.products;
                    this.setState({
                        shareOfMember: json.member,
                        sharedPost: json
                    }, () => {
                        //console.log(this.state.shareOfMember)
                    });
                    var imgArray = [];
                    //console.log(this.props.products)
                    if (typeof this.props.products == 'undefined') {
                        json.products.forEach(function (product) {
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
                    } else {
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

                })
        } else {
            this.setState({
                sharedPost: this.props.property
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
        }

        API.getLikesPost(this.props.property.post_id)
            .then((json) => {
                this.setState({
                    numberOfLike: json.count
                })
            })
        API.checkLikePost(this.props.property.post_id, this.props.global.user.token.userId)
            .then((json) => {
                //console.log(json)
                if (json.result != 0) {
                    this.setState({
                        isLiked: true
                    })
                }
            })
        API.countSharePost(this.props.property.post_id)
            .then((json) => {
                this.setState({
                    numberOfShare: json.count
                })
            })

        API.countCommentPost(this.props.property.post_id)
            .then((json) => {
                this.setState({
                    numberOfComment: json.count
                })
            })
    }

    onHeartPress() {
        if (this.state.isLiked == false) {
            API.likePost(this.props.property.post_id, this.props.global.user.token.userId)
                .then((json) => {
                    this.setState({
                        isLiked: true
                    });
                    API.getLikesPost(this.props.property.post_id)
                        .then((json) => {
                            this.setState({
                                numberOfLike: json.count
                            })
                        })
                })
        } else {
            API.unlikePost(this.props.property.post_id, this.props.global.user.token.userId)
                .then((json) => {
                    API.getLikesPost(this.props.property.post_id)
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

    onSharePress() {
        API.createShareRelation(this.props.property.post_id, this.props.global.user.token.userId)
            .then((json) => {
                API.createSharePost(this.props.property.post_id, this.props.global.user.token.userId)
                    .then((json) => {
                        API.countSharePost(this.props.property.post_id)
                            .then((json) => {
                                this.setState({
                                    numberOfShare: json.count
                                })
                            })
                    })
            })
    }

    onNamePress() {
        Actions.PersonalWall({
            property: this.props.property.member
        })
    }

    onPostPress() {
        //console.log(this.state.sharedPost)
        Actions.DetailPost({
            property: this.state.sharedPost
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
        //console.log(this.props.property.member)
        return (
            <View
                accessible={true}
                style={{flexDirection: 'column', height: 400,}}>
                <View style={styles.postBox}>
                    <View style={{flex: 1, borderTopWidth: 3, borderColor: '#f66f88'
                        , borderTopLeftRadius: 10, borderTopRightRadius: 10
                        , flexDirection: 'row',}}>
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
                                <Text>{(typeof this.props.property.member.country === 'undefined' ? " " : space)}</Text>
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
                <View style={{flex: 1/8, flexDirection: 'row', alignItems: 'center', backgroundColor: '#ACF0F2'
                    , borderTopWidth: 0.5, marginLeft: 0, marginRight: 0, borderColor: 'gray'
                    , justifyContent: 'space-between',}}>
                    <View style={{flex: 1/3, flexDirection: 'row'
                        , borderRightWidth: 1
                        , alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onHeartPress()}
                            name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={25} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfLike}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row'
                        , borderRightWidth: 1
                        , alignItems: 'center',justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.props.onCommentPress(this.props.property.post_id, this.props.global.user.token.userId)}
                            name='comment' style={{color: '#735DD3'}} size={25} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfComment}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onSharePress()}
                            name='share-alt' style={{color: '#FF7F66'}} size={25} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfShare}</Text>
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
        backgroundColor: 'white',
        overflow: 'hidden',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
