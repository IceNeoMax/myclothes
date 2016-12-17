/**
 * Created by vjtc0n on 9/22/16.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as searchActions from '../actions/search';

import React, {Component} from 'react'
import
{
    StyleSheet,
    View,
    TextInput,
    Text,
    ListView,
    Platform,
    Image,
    TouchableOpacity
}from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import FormButton from '../components/FormButton';
import Button from 'apsl-react-native-button';
import {Actions} from 'react-native-router-flux'
import ButtonAPSL from 'apsl-react-native-button'

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

var DATA = [
    {
        user_name: '',
        id: ''
    }
];

class SearchMember extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: [
                {
                    user_name: '',
                    id: ''
                }
            ],
            dataSource: ds.cloneWithRows(DATA),
            inputText: '',
            limitPage: 10,
            isAutoComplete: true
        };

    }

    componentWillMount() {
        //this.props.actions.searchMember(this.props.global.token, ' ', 1);
        this.props.actions.searchMemberRequest();
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

    onTyping(text){
        if (text.nativeEvent.text !== 'undefined') {
            this.setState({
                inputText: text.nativeEvent.text
            });
        }
        this.finishedSearchingMember(this.props.global.token, text.nativeEvent.text, 10, setTimeout(() => {
            this.callback();
        }, 300));

        this.setState({
            isAutoComplete: true
        });
    }

    searchAll(text, limit) {
        this.finishedSearchingMember(this.props.global.token, text, limit,setTimeout(() => {
            this.callback();
        }, 200));

        this.setState({
            limitPage: 10,
            isAutoComplete: false
        });
    }

    searchWhileScrolling(text, limit) {
        this.finishedSearchingMember(this.props.global.token, text, limit,setTimeout(() => {
            this.callback();
        }, 200));

        this.setState({
            limitPage: limit + 10,
            isAutoComplete: false
        });
    }

    renderRowAutoComplete(property) {
        return(
            <ButtonAPSL
                onPress={() => this._onPress(property)}
                style={{ backgroundColor: 'white', borderWidth: 0.5, borderColor: 'gray'
                    , marginBottom: 0, flex: 1, height: 70, borderBottomWidth: 2, borderBottomColor: '#f66f88'
                    , borderRadius: 10, justifyContent: 'flex-start'}}>
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
                    </View>
                </View>
            </ButtonAPSL>
        );
    }

    _onPress(property) {
        //console.log(user_name);
        Actions.PersonalWall({
            property: property
        })
    }

    renderRow(property) {
        return (
            <ButtonAPSL
                onPress={() => this._onPress(property)}
                style={{ backgroundColor: 'white', borderWidth: 0.5, borderColor: 'gray', marginBottom: 0
                    , height: 70, borderBottomWidth: 2, borderBottomColor: '#f66f88'
                    , borderRadius: 10, justifyContent: 'flex-start'}}>
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
                    </View>
                </View>
            </ButtonAPSL>

        );
    };

    searchingMethod() {
        if (this.state.isAutoComplete == true) {
            return (
                <ListView
                    renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                 style={{ flex: 1
                                                                     , height: 10
                                                                     , borderBottomWidth: 0}} />}
                    style={{flex: 1, marginLeft: 10, marginRight: 10}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRowAutoComplete.bind(this)}
                    enableEmptySections={true}
                />
            );
        } else {
            return (
                <ListView
                    renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                 style={{ flex: 1
                                                                     , height: 10
                                                                     , borderBottomWidth: 0}} />}
                    style={{ flex:1, marginLeft: 10, marginRight: 10}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    onEndReachedThreshold={50}
                    onEndReached={() => this.searchWhileScrolling(this.state.inputText, this.state.limitPage)}
                    enableEmptySections={true} />
            );
        }
    }


    render() {

        let searchMethod = this.searchingMethod();

        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <View style={[{height: 50}, styles.navBarContainer]}>
                        <View style={{flex: 1, flexDirection: 'row', marginTop: Platform.OS == 'android' ? 7 : 0}}>
                            <View style={styles.searchIcon}>
                                <Icon name="search" style={{ color: '#ffccda'
                                    , alignSelf: 'center', fontSize: 20, marginLeft: 10}} />
                            </View>
                            <View style={styles.searchBar}>
                                <TextInput
                                    underlineColorAndroid='#FF90AD'
                                    placeholderTextColor='#ffccda'
                                    placeholder='Searching...'
                                    style={{flex: 1, padding: 0, marginLeft: 10}}
                                    autoFocus={true}
                                    onChange={(text) => this.onTyping(text)}
                                    onSubmitEditing={() => this.searchAll(this.state.inputText)}
                                    onFocus={this.onFocus} />
                            </View>
                            <View style={styles.button}>
                                <ButtonAPSL
                                    style={{backgroundColor: '#f66f88', borderWidth: 0, marginRight: 10
                                        , marginTop: 7, height: 35, borderRadius: 10}}
                                    onPress={() => this.searchAll(this.state.inputText, 10)} >
                                    <Text style={{color: '#ffccda', fontSize: 15}}>Search</Text>
                                </ButtonAPSL>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.listview}>
                    {searchMethod}
                </View>
            </View>
        );

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
        //paddingBottom: 50
    },
    search: {
        flexDirection: 'row'
    },
    navBar: {
        height: 50,
        backgroundColor: '#f66f88',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navBarContainer: {
        backgroundColor: '#f66f88',
        flex: 1
    },
    searchBar: {
        flex: 9/10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
        backgroundColor: '#FF90AD',
        marginRight: 20,
        marginBottom: 7,
        marginTop: 10
    },
    searchIcon: {
        flex: 1/10,
        borderRightWidth: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#FF90AD',
        marginLeft: 10,
        marginBottom: 7,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    button: {
        flex: 1/4
    },
    listview: {
        flex: 1,
        marginTop: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMember)

