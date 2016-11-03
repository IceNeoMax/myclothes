/**
 * Created by vjtc0n on 11/3/16.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    ListView
} from 'react-native';

import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modalbox'

const window = Dimensions.get('window');

DATA = [
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'},
    {text: 'ABC'}
];

class CommentModal extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        }
    }

    renderRow(property) {
        return (
            <View>
                <Text>{property.text}</Text>
            </View>
        )
    }

    render() {
        var closeButton = <ButtonAPSL
                            textStyle={{color: 'white'}}
                            onPress={() => this.props.onClosed()}
                            style={styles.closeButton}>X</ButtonAPSL>;

        return (
            <Modal
                isDisable={false}
                swipeToClose={false}
                backButtonClose={true}
                backdropContent={closeButton}
                onClosed={() => this.props.onClosed()}
                style={styles.modal}
                isOpen={this.props.isOpen}>
                <View style={{flex: 1}}>
                    <ListView
                        style={styles.listview}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        scrollEnabled={true}/>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        height: 600,
        borderRadius: 10,
        width: 300
    },
    closeButton: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        backgroundColor: "transparent",
        margin: 5,
        padding: 0,
        borderWidth: 0
    },
    listview: {
        borderWidth: 2,
        margin: 20
    }
});

module.exports = CommentModal;