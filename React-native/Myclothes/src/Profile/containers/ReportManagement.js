/**
 * Created by vjtc0n on 11/23/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import { ImageViewer } from 'react-native-image-fit'
import { SwipeListView } from 'react-native-swipe-list-view';
import ViewMoreText from 'react-native-view-more-text';

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

var DATA = [];

for (var i=0; i<=10; i++) {
    DATA.push({
        img: 'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg',
        name: 'Khanh',
        comment: 'Thường trực Tỉnh ủy đang xem xét, giao cơ' +
        ' quan liên quan làm rõ trách nhiệm các cá nhân, địa phương đối với quá trình giải quyết vụ ' +
        'việc liên quan đến Công ty Long Sơn, dẫn đến vụ án đau lòng. Các cán bộ liên quan cũng phải ' +
        'kiểm điểm trách nhiệm của mình để có hướng xử lý. Vụ việc cũng được Tỉnh ủy báo cáo cho ' +
        'Ban Bí thư Trung ương Đảng.',
        reported: Math.floor((Math.random() * 100) + 1).toString()
    })
}

class ReportManagement extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        }
    }

    onBackPress() {
        Actions.pop();
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

    renderRow(property) {
        return (
            <View style={{ backgroundColor: 'white', borderRightWidth: 5, borderColor: '#f66f88', marginRight: 5}}>
                <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 20}}>
                    <View>
                        <Image
                            style={{height: 30, width: 30, borderRadius: 15, borderWidth: 0.5, borderColor: 'gray'}}
                            source={{uri: property.img}}
                            resizeMode='stretch'/>
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 5}}>
                        <TouchableOpacity>
                            <Text style={{fontWeight: 'bold', color: '#365FB7'}}>{property.name}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 280}}>
                            <ViewMoreText
                                renderViewMore={this.renderViewMore}
                                renderViewLess={this.renderViewLess}
                                numberOfLines={4}>
                                <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{property.comment}</Text>
                            </ViewMoreText>
                        </View>
                        <View>
                            <Text style={{color: 'red'}}>Reported: {property.reported}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderHiddenRow(data, secId, rowId, rowMap) {
        return (
            <View style={styles.rowBack}>
                <View style={{flex: 1/2}}/>
                <ButtonAPSL style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                    <Text style={styles.backTextWhite}>Remove</Text>
                </ButtonAPSL>
                <ButtonAPSL style={[styles.backRightBtn, styles.backRightBtnRight]}
                                  onPress={ () => this.deleteRow(secId, rowId, rowMap) }>
                    <Text style={styles.backTextWhite}>Delete</Text>
                </ButtonAPSL>
            </View>
        )
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        var NEWDATA = DATA;
        NEWDATA.splice(rowId, 1);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(NEWDATA)});
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
                    <Text style={{fontSize: 20, color: 'white'}}>Report</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <SwipeListView
                    renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                 style={{ flex: 1
                                                                     , height: 10
                                                                     , borderBottomWidth: 0.5}} />}
                    style={{}}
                    rightOpenValue={-200}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderHiddenRow={(data, secId, rowId, rowMap) => this.renderHiddenRow(data, secId, rowId, rowMap)}
                    scrollEnabled={true}/>
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
    rowBack: {
        flexDirection: 'row',
    },
    backRightBtn: {
        flex: 1/4,
        height: 50,
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 0
    },
    backRightBtnLeft: {
        backgroundColor: '#3498DB',
    },
    backRightBtnRight: {
        backgroundColor: '#E74C3C',
    },
    backTextWhite: {
        color: '#ECF0F1'
    },

});

module.exports = ReportManagement;