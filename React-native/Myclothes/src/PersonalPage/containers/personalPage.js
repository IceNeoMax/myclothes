/**
 * Created by vjtc0n on 9/22/16.
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
    ListView,
    RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as personalActions from '../actions/personalPage';

import {Actions} from 'react-native-router-flux'
import Timeline from '../../Timeline/timeline'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ButtonAPSL from 'apsl-react-native-button'
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

import Comment from '../../Comment/commentmodal';

import Swiper from 'react-native-swiper'

var DATA = [];


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

class PersonalPage extends Component {

    constructor (props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            imgList: [
                'http://i.imgur.com/cxsKyMB.png',
                'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
                'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg'
            ],
            opacityImg: new Animated.Value(0),
            scrollDirection: '',
            heightSearchBar: new Animated.Value(40),
            rootViewHeight: 0,
            searchIconSize: new Animated.Value(20),
            dataSource: ds.cloneWithRows(DATA),
            isModalOpened: false,
            currentPostId: '',
            currentUserId: '',
            isRefreshing: false

        };
        this.onFocus = this.onFocus.bind(this)
    }


    onScroll(event) {
        var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = (currentOffset > this.offset || currentOffset == this.offset ) ? 'down' : 'up';
        this.offset = currentOffset;

        if (currentOffset < 1){
            direction = 'up'
        } else if (currentOffset > this.state.rootViewHeight ){
            direction = 'down'
        }

        this.setState({
            scrollDirection: direction
        });
        this.changeHeightWhileScrolling(direction);
    }

    changeHeightWhileScrolling(direction){
        if (direction == 'up'){
            Animated.parallel([
                Animated.timing(this.state.heightSearchBar, {
                    toValue: 40,
                    duration: 200
                }),

                Animated.timing(this.state.searchIconSize, {
                    toValue: 20,
                    duration: 200
                })
            ]).start();


        } else if (direction == 'down') {
            Animated.parallel([
                Animated.timing(this.state.heightSearchBar, {
                    toValue: 0,
                    duration: 200
                }),

                Animated.timing(this.state.searchIconSize, {
                    toValue: 0,
                    duration: 200
                })
            ]).start();

        }
    }

    onFocus() {
        Actions.Search();
    }

    componentWillReceiveProps(props) {
        /*const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.personal.form.allPost.posts)
        })*/
    }

    componentWillMount() {
        setTimeout(this.measureMainComponent.bind(this));
        this.props.actions.getPosts(this.props.global.user.token.userId, 10)
            .then(() => {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(this.props.personal.form.allPost.posts)
                })
            })

    }
    measureMainComponent() {
        this.refs.rootView.measure((ox, oy, width, height) => {
            this.setState({
                rootViewHeight: height
            });
        });
    }

    onPostingPress() {
        console.log('OK')
    }

    onCommentPress = (post_id, user_id) => {
        //console.log(post_id)
        this.setState({
            isModalOpened: true,
            currentPostId: post_id,
            currentUserId: user_id
        })
    }

    onModalClosed() {
        this.setState({
            isModalOpened: false
        })
    }

    onRefresh() {
        this.setState({ isRefreshing: true });
        console.log("ABC")
        this.setState({ isRefreshing: false });
    }

    renderRow(property, sectionID, rowID) {
        return (
            <View style={{backgroundColor: 'transparent'}}>
                <Timeline
                    onCommentPress={this.onCommentPress}
                    rowID={rowID}
                    property={property}/>
            </View>
        )
    }

    renderHeader() {
        return (
            <ButtonAPSL
                onPress={() => this.onPostingPress()}
                style={styles.postBox}>
                <View style={{flex: 1, height: 60, backgroundColor: 'white', flexDirection: 'row'}}>
                    <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
                        <ImageP
                            resizeMode='stretch'
                            indicator={Progress.CircleSnail}
                            style={{ height: 50, borderRadius: 25, width: 50 }}
                            source={{uri: this.state.imgList[1]}}/>
                    </View>
                    <View style={{flex: 5/6, justifyContent: 'center'}}>
                        <Text style={{color: 'gray', marginLeft: 10}}>Let's create an album...</Text>
                    </View>
                </View>
            </ButtonAPSL>
        )
    }

    render() {

        return (
            <View
                ref='rootView'
                style={{flex: 1, marginBottom: 50}}>
                <Animated.View style={[{height: this.state.heightSearchBar}, styles.navBarContainer]}>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: Platform.OS == 'android' ? 7 : 0}}>
                        <View style={styles.searchIcon}>
                            <AnimatedIcon name="search" style={{ color: '#ffccda'
                                , alignSelf: 'center', fontSize: this.state.searchIconSize}} />
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput
                                underlineColorAndroid='#FF90AD'
                                placeholderTextColor='#ffccda'
                                placeholder='Searching...'
                                style={{flex: 1, padding: 0,}}
                                onFocus={this.onFocus} />
                        </View>
                    </View>
                </Animated.View>
                <View
                    //scrollEventThrottle={16}
                    style={{flexDirection: 'column', flex: 1}}>
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.onRefresh()}
                                colors={['#EA0000']}
                                tintColor="black"
                                title="loading..."
                                titleColor="black"
                                progressBackgroundColor="white"
                            />
                        }
                        onScroll={(event) => {this.onScroll(event)}}
                        renderHeader={() => this.renderHeader()}
                        removeClippedSubviews={false}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 7, backgroundColor: '#cccccc'}} />}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderRow(rowData, sectionID, rowID)}
                        enableEmptySections={true}/>
                </View>
                <Comment
                    isProduct={false}
                    post_id={this.state.currentPostId}
                    user_id={this.state.currentUserId}
                    onClosed={() => this.onModalClosed()}
                    isOpen={this.state.isModalOpened}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flex: 9/10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
        backgroundColor: '#FF90AD',
        marginRight: 20,
        marginBottom: 7
    },
    postBox: {
        height: 75,
        width: window.width,
        flexDirection: 'row',
        backgroundColor: '#cccccc',
        borderRadius: 0,
        borderWidth: 0
    },
    navBarContainer: {
        backgroundColor: '#f66f88'
    },
    searchIcon: {
        flex: 1/10,
        borderRightWidth: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#FF90AD',
        marginLeft: 20,
        marginBottom: 7,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)