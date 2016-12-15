/**
 * Created by vjtc0n on 12/15/16.
 */
/**
 * Created by vjtc0n on 11/10/16.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
    WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ButtonAPSL from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux'
import WebViewBridge from 'react-native-webview-bridge';

class DesignProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {
        console.log(this.props.product_id)
        this.setState({
            object: {
                user_id: this.props.user_id,
                product_id: this.props.product_id
            }
        })

    }

    onBackPress() {
        Actions.pop();
    }


    onBridgeMessage(message) {
        const { webviewbridge } = this.refs;

        switch (message) {
            case "hello from webview":
                webviewbridge.sendToBridge(JSON.stringify(this.state.object));
                break;
            case "got the message inside webview":
                console.log("we have got a message from webview! yeah");
                break;
        }
    }

    render() {
        var height = (Platform.OS == 'ios') ? 20 : 0;
        return (
            <View style={{flex: 1}}>
                <View style={{height: height, backgroundColor: '#f66f88'}}/>
                <View style={styles.navBar}>
                    <Icon
                        onPress={() => this.onBackPress()}
                        name="angle-left"
                        size={40}
                        style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>Product Design</Text>
                    <View style={{marginRight: 30}} />
                </View>
                <WebViewBridge
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    ref="webviewbridge"
                    source={{uri: 'http://localhost:3000/create_product.html'}}
                    style={{}}
                />
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
});

module.exports = DesignProduct;