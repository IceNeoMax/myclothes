/**
 * Created by vjtc0n on 11/23/16.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';

import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');

class OrderRow extends Component {
    static propTypes = {
        onRowSelected: React.PropTypes.func,
        clearRowSelected: React.PropTypes.func
    };

    constructor(props) {
        super(props)

        const { rowData ={} } = this.props
        this.state = {
            acceptable: false,
            orderID: 0,
            ...rowData
        }
    }

    componentWillReceiveProps(props) {
        const { rowData ={} } = props
        this.setState({
            ...rowData
        })
    }

    onRowPress() {
        this.setState({ acceptable: !this.state.acceptable})
        this.props.onRowSelected(this.props.rowID, !this.state.acceptable, this.props.rowData.id)
    }

    render() {
        return (
            <ButtonAPSL
                style={[styles.rowButton, {backgroundColor: (this.state.acceptable == true )
                                                            ? '#4AD9D9' : 'white'}]}
                onPress={(e) => {
                    this.onRowPress();
                }}>
                <View style={{flex: 1/2, flexDirection: 'row'}}>
                    <ImageP
                        style={{borderWidth: 0.5, borderColor: 'gray', borderRadius: 10, height: 100, width: 80}}
                        source={{uri: this.props.rowData.imgProduct}}
                        indicator={Progress.CircleSnail}/>
                    <View style={{flexDirection: 'column', flex: 1/2, justifyContent: 'space-between', marginLeft: 10}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.productNameText}>{this.props.rowData.nameProduct}</Text>
                            <Text style={[styles.resultText, {marginLeft: 10}]}>M</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.priceText}>$</Text>
                            <Text style={styles.priceText}>{this.props.rowData.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1/2, alignItems: 'center'
                    , borderWidth: 0, justifyContent: 'flex-start'
                    , flexDirection: 'row'}}>
                    <View style={{flex: 1/3}}>
                        <Image
                            style={{height: 70, width: 70, borderRadius: 35, borderWidth: 0.5, borderColor: 'gray'}}
                            source={{uri: this.props.rowData.imgAvatar}}
                            resizeMethod="auto"
                            resizeMode='cover'/>
                    </View>
                    <View style={{flexDirection: 'column', marginLeft: 30,
                        flex: 2/3 ,justifyContent: 'space-between',}}>
                        <Text style={styles.productNameText}>{this.props.rowData.name}</Text>
                        <Text style={[styles.resultText, {}]}>quantity: {this.props.rowData.quantity}</Text>
                        <Text style={styles.priceText}>total: ${this.props.rowData.total}</Text>
                    </View>
                </View>
            </ButtonAPSL>
        )
    }
}

const styles = StyleSheet.create({
    rowButton: {
        borderWidth: 0,
        borderRadius: 0,
        flexDirection: 'row',
        height: 100,
        margin: 10,
        marginBottom: 0
    },
    resultText: {
        fontWeight: 'bold',
        color: 'gray'
    },
    priceText: {
        fontWeight: 'bold',
        color: '#365FB7'
    },
    productNameText: {
        fontWeight: 'bold',
        color: '#f66f88'
    }
});

module.exports = OrderRow;