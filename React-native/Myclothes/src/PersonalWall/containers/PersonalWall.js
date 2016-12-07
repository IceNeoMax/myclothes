/**
 * Created by vjtc0n on 11/25/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Popover from 'rn-popup-layout'
import Timeline from '../../Timeline/timeline'
import Modal from 'react-native-modalbox'
import * as API from '../../PersonalPage/libs/backend'
import Comment from '../../Comment/commentmodal';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const UIManager = require('NativeModules').UIManager;
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    ListView
} from 'react-native';

const window = Dimensions.get('window');
var avatarRectangle = Dimensions.get('window').width;

var DATA = [];

function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

class PersonalWall extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            buttonRect: {},
            isVisible: false,
            imgAvatar: 'https://lh5.googleusercontent.com/-d7FlATKPJP0/AAAAAAAAAAI/AAAAAAAAqFE/1ypWnKNfH5c/photo.jpg',
            imgCover: 'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
            dataSource: ds.cloneWithRows(DATA),
            isModalOpened: false,
            currentPostId: '',
            currentUserId: '',
            isCommentModalOpened: false,
            numberOfFollowing: 0,
            numberOfFollowed: 0,
            checkFollowed: false
        }
    }

    componentWillMount() {
        console.log(this.props.property)
        API.getPersonalPosts(this.props.property.user_id)
            .then((json) => {
                //console.log(json)
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(json.posts)
                })
            })
        API.getFollowing(this.props.property.user_id)
            .then((json) => {
                //console.log(json)
                this.setState({
                    numberOfFollowing: json.count
                })
            })
        API.getFollowed(this.props.property.user_id)
            .then((json) => {
                this.setState({
                    numberOfFollowed: json.count
                })
            })

        API.checkFollow(this.props.global.user.token.userId, this.props.property.user_id)
            .then((json) => {
                if (json.result != 0) {
                    this.setState({
                        checkFollowed: true
                    })
                }
            })

    }

    onCommentPress = (post_id, user_id) => {
        //console.log(post_id)
        this.setState({
            isCommentModalOpened: true,
            currentPostId: post_id,
            currentUserId: user_id
        })
    }

    measureButton(e) {
        let eLayout = e.nativeEvent.layout;
        //console.log(eLayout)
    }


    onInfoPress() {
        this.setState({
            isModalOpened: true
        })
    }

    onModalClosed() {
        this.setState({
            isModalOpened: false
        })
    }

    onCommentModalClosed() {
        this.setState({
            isCommentModalOpened: false
        })
    }

    onUnFollowed() {
        API.unFollow(this.props.global.user.token.userId, this.props.property.user_id)
            .then((json) => {
                API.getFollowed(this.props.property.user_id)
                    .then((json) => {
                        this.setState({
                            numberOfFollowed: json.count,
                            checkFollowed: false
                        })
                    })
            })
    }

    onFollow() {
        API.follow(this.props.global.user.token.userId, this.props.property.user_id)
            .then((json) => {
                API.getFollowed(this.props.property.user_id)
                    .then((json) => {
                        this.setState({
                            numberOfFollowed: json.count,
                            checkFollowed: true
                        })
                    })
            })
    }

    onScroll() {

    }

    onBackPress() {
        Actions.pop();
    }

    renderRow(property, sectionID, rowID) {
        //console.log(property)
        return (
            <Timeline
                rowID={rowID}
                onCommentPress={this.onCommentPress}
                property={property}/>
        )
    }

    renderHeader() {
        var buttonFollow = null;

        if (this.props.global.user.token.userId != this.props.property.user_id) {
            if (this.state.checkFollowed == true) {
                buttonFollow = <View style={styles.infoComponentContainer}>
                                    <ButtonAPSL
                                        onPress={() => this.onUnFollowed()}
                                        style={{alignItems: 'center', justifyContent: 'center'
                                            , borderRadius: 0, borderWidth: 0, backgroundColor: '#FFA0C3'
                                            , flex: 1, marginBottom: 0}}>
                                        <Text style={{color: 'white', fontSize: 20}}>Followed</Text>
                                    </ButtonAPSL>
                                </View>
            } else {
                buttonFollow = <View style={styles.infoComponentContainer}>
                    <ButtonAPSL
                        onPress={() => this.onFollow()}
                        style={{alignItems: 'center', justifyContent: 'center'
                            , borderRadius: 0, borderWidth: 0, backgroundColor: 'gray'
                            , flex: 1, marginBottom: 0}}>
                        <Text style={{color: 'white', fontSize: 20}}>Following</Text>
                    </ButtonAPSL>
                </View>
            }
        }


        return (
            <View>
                <View style={{height: 300}}>
                    <View style={styles.coverPicture}>
                        <View>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: this.props.property.cover_picture}}
                                style={styles.cover}/>
                        </View>
                    </View>
                    <View style={styles.empty} />

                    <View style={styles.avartarContainer}>
                        <View style={styles.avatarPicture}>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: this.props.property.avatar_picture}}
                                style={styles.logo}/>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 30,}}>{this.props.property.user_name}</Text>
                </View>
                <View style={styles.infoBarContainer}>
                    <View style={styles.infoComponentContainer}>
                        <Text style={{fontSize: 10, color: 'gray'}}>Follower</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.numberOfFollowed}</Text>
                    </View>
                    <View style={styles.infoComponentContainer}>
                        <Text style={{fontSize: 10, color: 'gray'}}>Following</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.numberOfFollowing}</Text>
                    </View>
                    {buttonFollow}
                    <View
                        ref="viewButton"
                        onLayout={(e) => this.measureButton(e)}
                        style={styles.infoComponentContainer}>
                        <ButtonAPSL
                            ref='buttonAPSL'
                            style={{marginBottom: 0, flex: 1, borderRadius: 0, borderWidth: 0}}
                            onPress={() => this.onInfoPress()}>
                            <Text style={{}}>Information</Text>
                        </ButtonAPSL>
                    </View>
                </View>


            </View>
        )
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
                    <Text style={{fontSize: 20, color: 'white'}}>Timeline</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <ListView
                    //onEndReachedThreshold={100}
                    onEndReached={() => this.onScroll()}
                    renderHeader={() => this.renderHeader()}
                    style={{flex: 1}}
                    removeClippedSubviews={false}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 7, backgroundColor: '#cccccc'}} />}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderRow(rowData, sectionID, rowID)}
                    enableEmptySections={true} >
                </ListView>
                <Modal
                    animationDuration={200}
                    backdropOpacity={0.2}
                    isDisable={false}
                    swipeToClose={false}
                    backButtonClose={true}
                    onClosed={() => this.onModalClosed()}
                    style={styles.modal}
                    isOpen={this.state.isModalOpened}>
                    <View style={{marginTop: 10, flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between'}}>
                        <View style={{}}>
                            <Text>Date of birth: {this.state.dateOfBirth}</Text>
                        </View>
                        <View style={{marginTop: 25}}>
                            <Text>City: {this.state.city}</Text>
                        </View>
                        <View style={{marginTop: 25}}>
                            <Text>Country: {this.state.country}</Text>
                        </View>
                    </View>
                </Modal>
                <Comment
                    isProduct={false}
                    post_id={this.state.currentPostId}
                    user_id={this.state.currentUserId}
                    onClosed={() => this.onCommentModalClosed()}
                    isOpen={this.state.isCommentModalOpened}/>
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
    infoBarContainer: {
        flexDirection: 'row',
        height: 70,
        width: window.width,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginTop: 10,
        borderColor: 'gray'
    },
    infoComponentContainer: {
        flex: 1/4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    modal: {
        height: 150,
        borderRadius: 10,
        width: 200,
        position: 'absolute',
        top: window.width/2 - 150,
    },
});

export default connect(mapStateToProps)(PersonalWall)