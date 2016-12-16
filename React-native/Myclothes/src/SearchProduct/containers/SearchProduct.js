/**
 * Created by vjtc0n on 11/30/16.
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
import {Actions} from 'react-native-router-flux'
import ButtonAPSL from 'apsl-react-native-button'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import * as API from '../libs/backend'

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

var DATA = [];

class SearchProduct extends Component {
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
    }

    searchAll(text) {
        console.log(text)
    }


    renderRow(property) {
        return (
            <ButtonAPSL
                //onPress={() => this._onPress("Khanh")}
                style={{ backgroundColor: 'white', borderWidth: 0
                    , height: 130
                    , borderRadius: 0, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 20}}>
                    <View>
                        <ImageP
                            indicator={Progress.CircleSnail}
                            style={{height: 100, width: 70, borderRadius: 10, borderWidth: 0.5, borderColor: 'gray'}}
                            source={{uri: property.imgAvatar}}
                            resizeMode='cover'/>
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 15, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Text style={{fontWeight: 'bold', color: '#365FB7', fontSize: 20}}>Ao</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginRight: 30}}>
                    <Text style={{fontWeight: 'bold', color: '#365FB7', fontSize: 20}}>$20</Text>
                </View>
            </ButtonAPSL>

        );
    };


    render() {

        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <View style={[{height: 50}, styles.navBarContainer]}>
                        <View style={{flex: 1, flexDirection: 'row', marginTop: Platform.OS == 'android' ? 7 : 0}}>
                            <View style={styles.searchIcon}>
                                <Icon name="search" style={{ color: '#ffccda'
                                    , alignSelf: 'center', fontSize: 20}} />
                            </View>
                            <View style={styles.searchBar}>
                                <TextInput
                                    underlineColorAndroid='#FF90AD'
                                    placeholderTextColor='#ffccda'
                                    placeholder='Searching...'
                                    style={{flex: 1, padding: 0, }}
                                    autoFocus={true}
                                    onSubmitEditing={() => this.searchAll(this.state.inputText)}
                                    onFocus={this.onFocus} />
                            </View>
                            <View style={styles.button}>
                                <ButtonAPSL
                                    style={{backgroundColor: '#f66f88', borderWidth: 0, marginRight: 10
                                        , marginTop: 10, height: 35, borderRadius: 10}}
                                    onPress={() => this.searchAll(this.state.inputText)} >
                                    <Text style={{color: '#ffccda', fontSize: 15}}>Search</Text>
                                </ButtonAPSL>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.listview}>
                    <ListView
                        renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                     style={{ flex: 1
                                                                         , height: 10
                                                                         , borderBottomWidth: 0.6}} />}
                        style={{ flex:1 }}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections={true} />
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
        paddingBottom: 50
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct)