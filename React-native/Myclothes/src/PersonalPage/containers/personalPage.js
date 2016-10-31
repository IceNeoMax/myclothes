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
    Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux'

import Swiper from 'react-native-swiper'

class PersonalPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            imgList: [
                'http://i.imgur.com/cxsKyMB.png',
                'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
                'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg'
            ],
            opacityImg: new Animated.Value(0),
            scrollDirection: '',
            heightSearchBar: new Animated.Value(40),
            rootViewHeight: 0
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
            Animated.timing(this.state.heightSearchBar, {
                toValue: 40,
                duration: 250
            }).start();
        } else if (direction == 'down') {
            Animated.timing(this.state.heightSearchBar, {
                toValue: 0,
                duration: 250
            }).start();
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

    render() {
        var testScroll = [];
        for(let i=0; i<50; i++){
            testScroll.push(
                <View key={i}>
                    <Text>ABC</Text>
                </View>
            )
        }

        return (
            <View
                ref='rootView'
                style={{flex: 1}}>
                <Animated.View style={{height: this.state.heightSearchBar}}>
                    <TextInput style={styles.searchBar}
                               onFocus={this.onFocus} />
                </Animated.View>
                <ScrollView
                    onScroll={(event) => {this.onScroll(event)}}
                    scrollEventThrottle={100}
                    style={{}}>
                    <View style={{height: 150, width: 150, borderWidth: 1}}>
                        <Swiper showsButtons={true}
                                style={{}}
                                height={150}
                                width={150} >
                            {
                                this.state.imgList.map((img, i) => {
                                    return(
                                        <View key={i}>
                                            <Animated.Image source={{uri: img}}
                                                   resizeMode={Image.resizeMode.stretch}
                                                   style={{height: 150, width: 150, opacity: this.state.opacityImg}}
                                                   onLoad={() => {this.onLoadingImg()}} />
                                        </View>
                                    )
                                })
                            }
                        </Swiper>
                    </View>
                    <View>
                        {testScroll}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flex: 1,
        borderWidth: 0.2,
        marginRight: 20,
        borderRadius: 10,
        padding: 0
    }
});

module.exports = PersonalPage;