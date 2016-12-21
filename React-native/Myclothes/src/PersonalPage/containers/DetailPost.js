/**
 * Created by vjtc0n on 11/30/16.
 */
import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Animated,
    Dimensions,
    Platform,
    ListView
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Timeline from '../../Timeline/timeline'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ButtonAPSL from 'apsl-react-native-button'
import Detail from '../../Timeline/detail'
import ViewMoreText from 'react-native-view-more-text';
import Comment from '../../Comment/commentmodal';
import * as API from '../libs/backend'
import Modal from 'react-native-modalbox'

import * as personalActions from '../actions/personalPage';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const window = Dimensions.get('window');
var DATA = [];
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

class DetailPost extends Component {
    constructor (props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            imgList: [
                'http://i.imgur.com/cxsKyMB.png',
                'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
                'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg'
            ],
            dataSource: ds.cloneWithRows(DATA),
            isPostModalOpened: false,
            isProductModalOpened: false,
            currentPostId: '',
            currentUserId: '',
            numberOfLike: 0,
            isLiked: false,
            numberOfShare: 0,
            numberOfComment: 0,
            currentProductId: '',
            isConfigurePostOpened: false,
            album_name: '',
            description: ''
        };
    }

    componentWillMount() {
        //console.log(this.props.property);
        this.setState({
            album_name: this.props.property.album_name,
            description: this.props.property.description
        })

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.property.products),
        })

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

    renderViewMore(onPress){
        return(
            <Text
                style={{color: '#365FB7', alignSelf: 'flex-end'}}
                onPress={onPress}>View more</Text>
        )
    }

    renderViewLess(onPress){
        return(
            <Text
                style={{color: '#365FB7', alignSelf: 'flex-end'}}
                onPress={onPress}>View less</Text>
        )
    }

    onNamePress(property) {
        Actions.PersonalWall({
            property: property
        })
    }

    onChangeAlbumName(text) {
        this.setState({
            album_name: text
        })
    }

    onChangeDescription(text) {
        this.setState({
            description: text
        })
    }

    onConfigurePostPress(album_name, description) {
        this.setState({
            isConfigurePostOpened: true,
            album_name: album_name,
            description: description
        })
    }

    onConfigurePostClose() {
        this.setState({
            isConfigurePostOpened: false
        })
    }

    onConfigureConfirmPress(post_id) {
        API.updatePost(post_id, {
            album_name: this.state.album_name,
            description: this.state.description
        })
            .then((json) => {
                this.setState({
                    album_name: json.album_name,
                    description: json.description,
                    isConfigurePostOpened: false
                })
            })
    }

    onDeletePost(post_id) {
        console.log(post_id)
        var self = this;
        API.deletePost(post_id)
            .then((json) => {
                this.setState({
                    isConfigurePostOpened: false
                }, () => {
                    API.deleteSharedPost(post_id)
                        .then((json) => {
                            self.props.actions.setRefresh(true);
                            Actions.pop()
                        })

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

    }

    onProductCommentPress = (post_id, user_id) => {
        //console.log(post_id)
        this.setState({
            isProductModalOpened: true,
            currentProductId: post_id,
            currentUserId: user_id
        })
    };

    onPostModalClosed() {
        this.setState({
            isPostModalOpened: false
        })
    }

    onProductModalClosed() {
        this.setState({
            isProductModalOpened: false
        })
    }

    onPostComment() {
        this.setState({
            isPostModalOpened: true,
            currentPostId: this.props.property.post_id,
            currentUserId: this.props.global.user.token.userId
        })
    }

    renderRow(property) {
        //console.log(property);
        return (
            <Detail
                onProductCommentPress={this.onProductCommentPress}
                property={property}/>
        )
    }

    onBackPress() {
       Actions.pop()
    }

    renderHeader() {
        var configureIcon = null;
        if (this.props.property.member.user_id == this.props.global.user.token.userId) {
            configureIcon = <Icon
                onPress={() => this.onConfigurePostPress(this.props.property.album_name, this.props.property.description)}
                name='angle-down' size={30} color='red' style={{marginRight: 30, marginTop: 5}}/>
        }

        return(
            <View style={styles.postBox}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', marginLeft: 0
                    , flex: 1/4, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
                    <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
                        <ImageP
                            resizeMode='stretch'
                            indicator={Progress.CircleSnail}
                            style={{ height: 50, borderRadius: 25, width: 50 }}
                            source={{uri: this.props.property.member.avatar_picture}}/>
                    </View>
                    <View style={{flex: 5/6, justifyContent: 'center', flexDirection: 'column'}}>
                        <Text
                            onLongPress={() => this.onNamePress(this.props.property.member)}
                            style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>{this.props.property.member.user_name}</Text>
                        <View style={{ marginLeft: 10, flexDirection: 'row'}}>
                            <Text>{this.props.property.member.city}</Text>
                            <Text>{typeof this.props.property.member.country === 'undefined' ? " " : space}</Text>
                            <Text>{this.props.property.member.country}</Text>
                        </View>
                    </View>
                    {configureIcon}
                </View>
                <View style={{marginLeft: 20, marginRight: 20, flex: 1-1/4-1/6, marginTop: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#F2385A', fontWeight: 'bold'}}>Album name: </Text>
                        <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{this.state.album_name}</Text>
                    </View>
                    <ViewMoreText
                        style={{flex: 1}}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        numberOfLines={7}>
                        <Text style={{color: '#F2385A', fontWeight: 'bold'}}>Description: </Text>
                        <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{this.state.description}</Text>
                    </ViewMoreText>
                </View>
                <View style={{borderWidth: 0.3, marginTop: 5, marginLeft: 30, marginRight: 30}} />
                <View style={{ flexDirection: 'row', alignItems: 'center'
                    , backgroundColor: 'white', borderBottomRightRadius: 10, borderBottomLeftRadius: 10
                    , justifyContent: 'space-between', flex: 1/6}}>
                    <View style={{flex: 1/3, flexDirection: 'row'
                        , borderRightWidth: 1
                        , alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onHeartPress()}
                            name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfLike}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row'
                        , borderRightWidth: 1
                        , alignItems: 'center',justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onPostComment()}
                            name='comment' style={{color: '#735DD3'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfComment}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onSharePress()}
                            name='share-alt' style={{color: '#FF7F66'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{this.state.numberOfShare}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        var closeButton =   <View style={styles.backdropModal}>
                                <ButtonAPSL
                                    textStyle={{color: 'white'}}
                                    onPress={() => this.onConfigurePostClose()}
                                    style={styles.closeButton}>X</ButtonAPSL>
                            </View>;
        return (
            <View style={{marginBottom: 0, flex: 1, backgroundColor: '#F5FCFF'}}>
                <View style={styles.navBar}>
                    <Icon name="angle-left"
                          size={40}
                          onPress={() => this.onBackPress()}
                          style={{color: 'white', marginLeft: 10}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Detail</Text>
                    <View style={{marginRight: 20}} />
                </View>
                <ListView
                    renderHeader={() => this.renderHeader()}
                    style={{flex: 1, backgroundColor: '#F5FCFF',}}
                    removeClippedSubviews={false}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 7, backgroundColor: '#F5FCFF'}} />}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}/>
                <Comment
                    isProduct={false}
                    post_id={this.state.currentPostId}
                    user_id={this.state.currentUserId}
                    onClosed={() => this.onPostModalClosed()}
                    isOpen={this.state.isPostModalOpened}/>
                <Comment
                    isProduct={true}
                    post_id={this.state.currentProductId}
                    user_id={this.state.currentUserId}
                    onClosed={() => this.onProductModalClosed()}
                    isOpen={this.state.isProductModalOpened}/>
                <Modal
                    animationDuration={200}
                    backdropOpacity={0}
                    position="center"
                    isDisable={false}
                    swipeToClose={false}
                    backButtonClose={true}
                    backdropContent={closeButton}
                    onClosed={() => this.onConfigurePostClose()}
                    style={styles.modal}
                    isOpen={this.state.isConfigurePostOpened}>
                    <View style={{marginTop: 20}}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Album Name</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    defaultValue={this.props.property.album_name}
                                    style={styles.inputBar}
                                    underlineColorAndroid="white"
                                    onChangeText={(text) => this.onChangeAlbumName(text)}
                                    placeholder="Album Name"/>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Description</Text>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    defaultValue={this.props.property.description}
                                    style={styles.inputBar}
                                    underlineColorAndroid="white"
                                    onChangeText={(text) => this.onChangeDescription(text)}
                                    placeholder="Writing something..."/>
                            </View>
                        </View>
                        <ButtonAPSL
                            onPress={() => this.onConfigureConfirmPress(this.props.property.post_id)}
                            style={{ marginTop: 30, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>Update</Text>
                        </ButtonAPSL>
                        <ButtonAPSL
                            onPress={() => this.onDeletePost(this.props.property.post_id)}
                            style={{ marginTop: 10, backgroundColor: '#FF3366'
                                , marginRight: 40, marginBottom: 20, borderWidth: 0
                                , marginLeft: 40}}>
                            <Text style={{color: 'white', fontSize: 20}}>Delete Post</Text>
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
        alignItems: 'center'
    },
    postBox: {
        flexDirection: 'column',
        borderRadius: 10,
        borderWidth: 0.5,
        height: 257,
        margin: 10,
        borderColor: 'gray'
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
        height: 380,
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

export default connect(mapStateToProps,  mapDispatchToProps)(DetailPost)