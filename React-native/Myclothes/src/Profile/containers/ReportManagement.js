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
import * as API from '../libs/backend'

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


class ReportManagement extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        }
    }

    componentWillMount() {
        var reportedCommentArray = [];
        API.getReportComments()
            .then((json) => {
                //console.log(json)
                json.forEach(function (comment) {
                    if (comment.reportings.length != 0) {
                        reportedCommentArray.push(comment)
                    }
                })
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(reportedCommentArray)
                })
            })
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
                            source={{uri: property.member.avatar_picture}}
                            resizeMode='stretch'/>
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 5}}>
                        <TouchableOpacity>
                            <Text style={{fontWeight: 'bold', color: '#365FB7'}}>{property.member.user_name}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 280}}>
                            <ViewMoreText
                                renderViewMore={this.renderViewMore}
                                renderViewLess={this.renderViewLess}
                                numberOfLines={4}>
                                <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{property.content}</Text>
                            </ViewMoreText>
                        </View>
                        <View>
                            <Text style={{color: 'red'}}>Reported: {property.reportings.length}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderHiddenRow(data, secId, rowId, rowMap) {
        console.log(data)
        return (
            <View style={styles.rowBack}>
                <View style={{flex: 1/2}}/>
                <ButtonAPSL
                    onPress={() => this.removeRow(data, secId, rowId, rowMap)}
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                    <Text style={styles.backTextWhite}>Remove</Text>
                </ButtonAPSL>
                <ButtonAPSL
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => this.deleteRow(data, secId, rowId, rowMap)}>
                    <Text style={styles.backTextWhite}>Delete</Text>
                </ButtonAPSL>
            </View>
        )
    }
    removeRow(data, secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        var tempArray = [];
        var self = this;
        data.reportings.forEach(function (report) {
            tempArray.push(report);
            API.deleteReports(report.reporting_id)
                .then((json) => {
                    if (tempArray.length == data.reportings.length) {
                        var reportedCommentArray = [];
                        API.getReportComments()
                            .then((json) => {
                                //console.log(json)
                                json.forEach(function (comment) {
                                    if (comment.reportings.length != 0) {
                                        reportedCommentArray.push(comment)
                                    }
                                })
                                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                self.setState({
                                    dataSource: ds.cloneWithRows(reportedCommentArray)
                                })
                            })
                    }
                })
        })
    }

    deleteRow(data, secId, rowId, rowMap) {
        var self = this;
        rowMap[`${secId}${rowId}`].closeRow();
        API.deleteComment(data.comment_id)
            .then((json) => {
                var reportedCommentArray = [];
                API.getReportComments()
                    .then((json) => {
                        //console.log(json)
                        json.forEach(function (comment) {
                            if (comment.reportings.length != 0) {
                                reportedCommentArray.push(comment)
                            }
                        })
                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        self.setState({
                            dataSource: ds.cloneWithRows(reportedCommentArray)
                        })
                    })
            })
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