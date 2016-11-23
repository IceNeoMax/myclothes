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
    ListView
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Timeline from '../../Timeline/timeline'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ButtonAPSL from 'apsl-react-native-button'
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

import Swiper from 'react-native-swiper'

var DATA = [];

for (var i=0; i<=5; i++) {
    DATA.push({
        imgList: [
            'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg',
            'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg',
            'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg'
        ],
        imgAvatar: 'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
        name: 'Khanh',
        city: 'Hanoi',
        country: 'Vietnam',
        numberOfLike: 20,
        numberOfComment: 30,
        numberOfShare: 40
    })
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
            dataSource: ds.cloneWithRows(DATA),
            searchIconSize: new Animated.Value(20),

        };
        this.onFocus = this.onFocus.bind(this)
    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
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
                    duration: 500
                }),

                Animated.timing(this.state.searchIconSize, {
                    toValue: 20,
                    duration: 500
                })
            ]).start();


        } else if (direction == 'down') {
            Animated.parallel([
                Animated.timing(this.state.heightSearchBar, {
                    toValue: 0,
                    duration: 500
                }),

                Animated.timing(this.state.searchIconSize, {
                    toValue: 0,
                    duration: 500
                })
            ]).start();

        }
    }

    onFocus() {
        Actions.Search();
    }

    componentWillMount() {
        setTimeout(this.measureMainComponent.bind(this));
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

    renderRow(property) {
        return (
            <Timeline property={property}/>
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
                <ScrollView
                    onScroll={(event) => {this.onScroll(event)}}
                    //scrollEventThrottle={16}
                    style={{flexDirection: 'column'}}>
                    <ButtonAPSL
                        onPress={() => this.onPostingPress()}
                        style={styles.postBox}>
                        <View style={{flex: 1, marginTop: 7, marginBottom: 7, backgroundColor: 'white', flexDirection: 'row'}}>
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
                    <ListView
                        removeClippedSubviews={false}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 7, backgroundColor: '#cccccc'}} />}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections={true}/>
                </ScrollView>
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

module.exports = PersonalPage;