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

var DATA = [];
var space = ', ';

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
            dataSource: ds.cloneWithRows(DATA)
        };
    }

    componentWillMount() {
        //console.log(this.props.property);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.property.products)
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
        console.log(property);
        return (
            <Detail property={property}/>
        )
    }

    onBackPress() {
        Actions.pop();
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
                            source={{uri: this.props.property.member.avatar_picture}}/>
                    </View>
                    <View style={{flex: 5/6, justifyContent: 'center', flexDirection: 'column'}}>
                        <Text
                            onLongPress={() => this.onNamePress()}
                            style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>{this.props.property.member.user_name}</Text>
                        <View style={{ marginLeft: 10, flexDirection: 'row'}}>
                            <Text>{this.props.property.member.city}</Text>
                            <Text>{typeof this.props.property.member.city === 'undefined' ? " " : space}</Text>
                            <Text>{this.props.property.member.country}</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft: 20, marginRight: 20, flex: 1-1/4-1/6}}>
                    <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{this.props.property.album_name}</Text>
                    <ViewMoreText
                        style={{flex: 1}}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        numberOfLines={7}>
                        <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{this.props.property.description}</Text>
                    </ViewMoreText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1/6}}>
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
                          onPress={() => this.onBackPress()}
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