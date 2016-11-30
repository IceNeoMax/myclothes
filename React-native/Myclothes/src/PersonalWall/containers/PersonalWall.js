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
            isModalOpened: false
        }
    }

    componentDidMount() {

    }

    measureView() {
        this.refs.viewButton.measure((fx, fy, width, height, px, py) => {
            this.setState({
                buttonRect: {
                    x: px,
                    y: py + height
                }
            })
        })
    }

    measureButton(e) {
        let eLayout = e.nativeEvent.layout;
        console.log(eLayout)
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

    onScroll() {

    }

    renderRow(property) {
        return (
            <Timeline property={property}/>
        )
    }

    renderHeader() {
        return (
            <View>
                <View style={styles.navBar}>
                    <Icon name="angle-left"
                          size={40}
                          style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Timeline</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <View style={{height: 300}}>
                    <View style={styles.coverPicture}>
                        <View>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: this.state.imgCover}}
                                style={styles.cover}/>
                        </View>
                    </View>
                    <View style={styles.empty} />

                    <View style={styles.avartarContainer}>
                        <View style={styles.avatarPicture}>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: this.state.imgAvatar}}
                                style={styles.logo}/>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 30,}}>Khanh</Text>
                </View>
                <View style={styles.infoBarContainer}>
                    <View style={styles.infoComponentContainer}>
                        <Text style={{fontSize: 10, color: 'gray'}}>Follower</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>1234</Text>
                    </View>
                    <View style={styles.infoComponentContainer}>
                        <Text style={{fontSize: 10, color: 'gray'}}>Following</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>1234</Text>
                    </View>
                    <View style={styles.infoComponentContainer}>
                        <ButtonAPSL
                            style={{alignItems: 'center', justifyContent: 'center'
                                , borderRadius: 0, borderWidth: 0, backgroundColor: '#FFA0C3'
                                , flex: 1, marginBottom: 0}}>
                            <Text style={{color: 'white', fontSize: 20}}>Followed</Text>
                        </ButtonAPSL>
                    </View>
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
                <ListView
                    //onEndReachedThreshold={100}
                    onEndReached={() => this.onScroll()}
                    renderHeader={() => this.renderHeader()}
                    style={{flex: 1}}
                    removeClippedSubviews={false}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 7, backgroundColor: '#cccccc'}} />}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
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
                    <View style={{marginTop: 10}}>
                        <Text>ABC</Text>
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

module.exports = PersonalWall;