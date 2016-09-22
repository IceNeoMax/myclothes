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
    AlertIOS,
    Text
}from 'react-native'

var AutoComplete = require('react-native-autocomplete');

function mapStateToProps (state) {
    return {
        auth: state.auth,
        profile: state.profile,
        personal: state.personal,
        global: state.global
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...searchActions }, dispatch)
    }
}

class SearchMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    user_name: ''
                }
            ]
        }
    }

    componentDidMount() {
        this.props.actions.searchMember(this.props.global.token, this.props.auth.form.fields.username);
    }


    onTyping(text){

        this.props.actions.searchMember(this.props.global.token, text);

        let members = this.props.personal.form.searchedMember.members;
        console.log(members);

        var foundMembers = members.map(function (member) {
            return member.user_name;
        });

        this.setState({
            data: foundMembers
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Search for members
                </Text>
                <AutoComplete
                    onTyping={(text) => this.onTyping(text)}
                    onSelect={(e) => AlertIOS.alert('You choosed', e)}
                    /*onBlur={() => AlertIOS.alert('Blur')}
                    onFocus={() => AlertIOS.alert('Focus')}
                    onSubmitEditing={(e) => AlertIOS.alert('onSubmitEditing')}
                    onEndEditing={(e) => AlertIOS.alert('onEndEditing')}*/

                    suggestions={this.state.data}

                    placeholder='Finding people'
                    style={styles.autocomplete}
                    clearButtonMode='always'
                    returnKeyType='go'
                    textAlign='center'
                    clearTextOnFocus={false}

                    maximumNumberOfAutoCompleteRows={10}
                    applyBoldEffectToAutoCompleteSuggestions={true}
                    reverseAutoCompleteSuggestionsBoldEffect={true}
                    showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
                    autoCompleteTableViewHidden={false}

                    autoCompleteTableBorderColor='lightblue'
                    autoCompleteTableBackgroundColor='azure'
                    autoCompleteTableCornerRadius={10}
                    autoCompleteTableBorderWidth={1}

                    autoCompleteRowHeight={35}

                    autoCompleteFontSize={15}
                    autoCompleteRegularFontName='Helvetica Neue'
                    autoCompleteBoldFontName='Helvetica Bold'
                    autoCompleteTableCellTextColor={'red'}
                />
            </View>
        );

    }
}

var styles = StyleSheet.create({
    autocomplete: {
        alignSelf: 'stretch',
        height: 50,
        backgroundColor: '#FFF',
        borderColor: 'lightblue',
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 20,
        marginRight: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 50

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMember)