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

var DATA = {
    imgAvatar: 'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
    name: 'Khanh',
    city: 'Hanoi',
    country: 'Vietnam',
    numberOfLike: 20,
    numberOfComment: 30,
    numberOfShare: 40,
    imgList: [],
    post: 'Thường trực Tỉnh ủy đang xem xét, giao cơ' +
    ' quan liên quan làm rõ trách nhiệm các cá nhân, địa phương đối với quá trình giải quyết vụ ' +
    'việc liên quan đến Công ty Long Sơn, dẫn đến vụ án đau lòng. Các cán bộ liên quan cũng phải ' +
    'kiểm điểm trách nhiệm của mình để có hướng xử lý. Vụ việc cũng được Tỉnh ủy báo cáo cho ' +
    'Ban Bí thư Trung ương Đảng.'
};
var space = ', ';

for (var i=0; i<=5; i++) {
    DATA.imgList.push({
        img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg',
        numberOfLike: 20,
        numberOfComment: 30,
        numberOfShare: 40,
    })
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
            dataSource: ds.cloneWithRows(DATA.imgList)
        };
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

    onNamePress() {
        console.log("OK")
    }

    onHeartPress() {

        this.setState({
            isLiked: true
        })
    }

    onSharePress() {

    }

    renderRow(property) {
        //console.log(property);
        return (
            <Detail property={property}/>
        )
    }

    renderHeader() {
        return(
            <View style={styles.postBox}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1/4}}>
                    <View style={{flex: 1/6, alignItems: 'center', justifyContent: 'center'}}>
                        <ImageP
                            resizeMode='stretch'
                            indicator={Progress.CircleSnail}
                            style={{ height: 50, borderRadius: 25, width: 50 }}
                            source={{uri: DATA.imgAvatar}}/>
                    </View>
                    <View style={{flex: 5/6, justifyContent: 'center', flexDirection: 'column'}}>
                        <Text
                            onLongPress={() => this.onNamePress()}
                            style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>Khanh</Text>
                        <View style={{ marginLeft: 10, flexDirection: 'row'}}>
                            <Text>{DATA.city}</Text>
                            <Text>{space}</Text>
                            <Text>{DATA.country}</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft: 20, marginRight: 20, flex: 1-1/4-1/6}}>
                    <ViewMoreText
                        style={{flex: 1}}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        numberOfLines={7}>
                        <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{DATA.post}</Text>
                    </ViewMoreText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1/6}}>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onHeartPress()}
                            name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{DATA.numberOfLike}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
                        <Icon
                            name='comment' style={{color: '#735DD3'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{DATA.numberOfComment}</Text>
                    </View>
                    <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            onPress={() => this.onSharePress()}
                            name='share-alt' style={{color: '#FF7F66'}} size={20} />
                        <Text style={{fontSize: 12, marginLeft: 5, fontWeight: 'bold', color: 'gray'}}>{DATA.numberOfShare}</Text>
                    </View>
                </View>
                <View style={{ height: 7, backgroundColor: '#cccccc'}} />
            </View>
        )
    }

    render() {
        return (
            <View style={{marginBottom: 50, flex: 1}}>
                <View style={styles.navBar}>
                    <Icon name="angle-left"
                          size={40}
                          style={{color: 'white', marginLeft: 10}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Detail</Text>
                    <View style={{marginRight: 20}} />
                </View>
                <ListView
                    renderHeader={() => this.renderHeader()}
                    style={{flex: 1}}
                    removeClippedSubviews={false}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 7, backgroundColor: '#cccccc'}} />}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}/>
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
        borderRadius: 0,
        borderWidth: 0,
        height: 257
    },
});

module.exports = DetailPost;