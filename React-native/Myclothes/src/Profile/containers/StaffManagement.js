/**
 * Created by vjtc0n on 11/24/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import { ImageViewer } from 'react-native-image-fit'
import { SwipeListView } from 'react-native-swipe-list-view';
import ViewMoreText from 'react-native-view-more-text';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as searchActions from '../../PersonalPage/actions/search';

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
    ListView,
    Platform,
    TextInput,
    Alert
} from 'react-native';

const window = Dimensions.get('window');

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
        actions: bindActionCreators({ ...searchActions }, dispatch)
    }
}

class StaffManagement extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        }
    }

    componentWillMount() {
        //this.props.actions.searchMember(this.props.global.token, ' ', 1);
        this.props.actions.searchMemberRequest();
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
            <View style={{ backgroundColor: 'white', borderRightWidth: 5, borderColor: '#f66f88', marginRight: 10}}>
                <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 20}}>
                    <View>
                        <Image
                            style={{height: 50, width: 50, borderRadius: 25, borderWidth: 0.5, borderColor: 'gray'}}
                            source={{uri: property.avatar_picture}}
                            resizeMode='cover'/>
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 5, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Text style={{fontWeight: 'bold', color: '#365FB7'}}>{property.user_name}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 280}}>
                            <ViewMoreText
                                renderViewMore={this.renderViewMore}
                                renderViewLess={this.renderViewLess}
                                numberOfLines={4}>
                                <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{property.email}</Text>
                            </ViewMoreText>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderHiddenRow(data, secId, rowId, rowMap) {
        //console.log(data)
        return (
            <View style={styles.rowBack}>
                <View style={{flex: 1/2}}/>
                <View style={{flex: 1/2, flexDirection: 'row'}}>
                    <ButtonAPSL
                        onPress={() => this.onAccept(data.user_id)}
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                        <Text style={styles.backTextWhite}>Accept</Text>
                    </ButtonAPSL>
                    <ButtonAPSL style={[styles.backRightBtn, styles.backRightBtnRight]}
                                onPress={ () => this.onDecline(data.user_id) }>
                        <Text style={styles.backTextWhite}>Decline</Text>
                    </ButtonAPSL>
                </View>
            </View>
        )
    }

    /*deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        var NEWDATA = DATA;
        NEWDATA.splice(rowId, 1);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(NEWDATA)});
    }*/

    onAccept(user_id) {
        var role_id = null;
        var flag = false;
        API.getStaffRoleId()
            .then((json) => {
                //console.log(json)
                role_id = json.result[0].id;
                //console.log(role_id)
                API.checkStaff(user_id)
                    .then((json) => {
                        json.forEach(function (role) {
                            if (role.name == 'staff') {
                                flag = true
                            }
                        })

                        if (flag == false) {
                            API.addStaffRole(user_id, role_id)
                                .then((json) => {

                                })
                        } else {
                            Alert.alert(
                                'Alert',
                                'This user has been already a staff',
                                [
                                    {text: 'OK', onPress: () => {}},
                                ]
                            )
                        }

                    })
            })
    }

    onDecline(user_id) {
        var role_id = null;
        API.getStaffRoleId()
            .then((json) => {
                role_id = json.result[0].id;
                console.log(role_id)
                API.deleteStaff(user_id, role_id)
                    .then((json) => {
                        console.log(json)
                    })
            })
    }

    finishedSearchingMember(token, text, limit, callback) {
        this.props.actions.searchMember(token, text, limit);
        if (callback && typeof(callback) === "function") {
            callback();
        }
    }

    callback() {
        DATA  = this.props.personal.form.searchedMember.members;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(DATA)
        });
    }

    onTyping(text) {
        if (text.nativeEvent.text !== 'undefined') {
            this.setState({
                inputText: text.nativeEvent.text
            });
        }
        this.finishedSearchingMember('', text.nativeEvent.text, 10, setTimeout(() => {
            this.callback();
        }, 300));
    }

    onBackPress() {
        Actions.pop()
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <View style={styles.navBar}>
                    <Icon
                        onPress={() => this.onBackPress()}
                        name="angle-left"
                          size={40}
                          style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Staff Management</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <View style={[{height: 50}, styles.navBarContainer]}>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: Platform.OS == 'android' ? 7 : 0}}>
                        <View style={styles.searchIcon}>
                            <Icon name="search" style={{ color: '#ffccda'
                                , alignSelf: 'center', fontSize: 20}} />
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput
                                onChange={(text) => this.onTyping(text)}
                                underlineColorAndroid='#FF90AD'
                                placeholderTextColor='#ffccda'
                                placeholder='Searching...'
                                style={{flex: 1, padding: 0,}}
                                onFocus={this.onFocus} />
                        </View>
                    </View>
                </View>
                <SwipeListView
                    renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                 style={{ flex: 1
                                                                     , height: 10
                                                                     , borderBottomWidth: 0.6}} />}
                    style={{marginTop: 5}}
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
    navBarContainer: {
        backgroundColor: '#f66f88'
    },
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
    },
    rowBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    backRightBtn: {
        flex: 1/2,
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 0,
        marginTop: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffManagement)
