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
    ListView
}from 'react-native'

import FormButton from '../components/FormButton';

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
            limitPage: 10
        };
    }

    componentWillMount() {
        this.props.actions.searchMember(this.props.global.token, ' ', 1);
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
        this.setState({inputText: text});

        this.finishedSearchingMember(this.props.global.token, text.nativeEvent.text, 10, this.callback());

        console.log(DATA);

    }

    searchAll(text) {
        console.log(text.nativeEvent.text);
    }

    renderRow(property) {
        return(
            <View>
                <Text>{property.user_name}</Text>
                <Text>{property.id}</Text>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <View style={styles.searchLine}>
                        <TextInput
                            returnKeyType='search'
                            placeholder='Search members'
                            placeholderTextColor = 'black'
                            style={styles.searchBar}
                            autoFocus={true}
                            onChange={(text) => this.onTyping(text)}
                            onSubmitEditing={() => this.searchAll(this.state.inputText)} />
                    </View>
                    <View style={styles.button}>
                        <FormButton
                            buttonText='Search'
                            onPress={() => this.searchAll(this.state.inputText)} />
                    </View>
                </View>
                <View style={styles.listview}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        enableEmptySections={true}
                    />
                </View>
            </View>
        );

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },
    search: {
        flex: 1/8,
        flexDirection: 'row'
    },
    searchLine: {
        flex: 3/4
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        marginRight: 20,
        borderRadius: 10,
        marginLeft: 20,
        paddingLeft: 20
    },
    button: {
        flex: 1/4
    },
    listview: {
        flex: 7/8
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMember)