/**
 * Created by vjtc0n on 11/3/16.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    ListView,
    TextInput
} from 'react-native';

import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modalbox'
import ViewMoreText from 'react-native-view-more-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const window = Dimensions.get('window');

DATA = [];

for (var i=0; i<=10; i++) {
    DATA.push({
        img: 'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg',
        name: 'Khanh',
        comment: 'Thường trực Tỉnh ủy đang xem xét, giao cơ' +
        ' quan liên quan làm rõ trách nhiệm các cá nhân, địa phương đối với quá trình giải quyết vụ ' +
        'việc liên quan đến Công ty Long Sơn, dẫn đến vụ án đau lòng. Các cán bộ liên quan cũng phải ' +
        'kiểm điểm trách nhiệm của mình để có hướng xử lý. Vụ việc cũng được Tỉnh ủy báo cáo cho ' +
        'Ban Bí thư Trung ương Đảng.'
    })
}

class CommentModal extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        }
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
            <View style={{flexDirection: 'row', marginTop: 5}}>
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
                    <View style={{ width: 260}}>
                        <ViewMoreText
                            renderViewMore={this.renderViewMore}
                            renderViewLess={this.renderViewLess}
                            numberOfLines={4}>
                            <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{property.comment}</Text>
                        </ViewMoreText>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        var closeButton = <View style={styles.backdropModal}>
            <ButtonAPSL
                textStyle={{color: 'white'}}
                onPress={() => this.props.onClosed()}
                style={styles.closeButton}>X</ButtonAPSL>
        </View>;

        return (
            <Modal
                animationDuration={200}
                backdropOpacity={0}
                position="center"
                isDisable={false}
                swipeToClose={false}
                backButtonClose={true}
                backdropContent={closeButton}
                onClosed={() => this.props.onClosed()}
                style={styles.modal}
                isOpen={this.props.isOpen}>
                <KeyboardAwareScrollView
                    extraHeight={100}
                    style={{ flexDirection: 'column', height: 470}}>
                    <View style={{height: 450}}>
                        <ListView
                            renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                         style={{ flex: 1
                                                                             , height: 10
                                                                             , borderBottomWidth: 0.5}} />}
                            style={styles.listview}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            scrollEnabled={true}/>
                    </View>
                    <View style={styles.textInputConatiner}>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid="white"
                            placeholderTextColor='gray'
                            placeholder='Comment about ...'
                            returnKeyType='done'
                            multiline={true}
                            keyboardType="default" />
                        <Icon
                            size={25}
                            color="white"
                            style={styles.sendIcon}
                            name="play"/>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        height: 500,
        borderRadius: 10,
        width: 350
    },
    closeButton: {
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        backgroundColor: "transparent",
        margin: 5,
        padding: 0,
        borderWidth: 0,
        alignSelf: 'flex-end'
    },
    listview: {
        margin: 20,

    },
    backdropModal: {
        width: window.width,
        height: 650,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    textInputConatiner: {
        height: 50,
        backgroundColor: '#f66f88',
        borderWidth: 0.5,
        width: 350,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'gray',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    textInput: {
        flex: 6/7,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 10,
    },
    sendIcon: {
        flex: 1/7,
        marginLeft: 20
    }
});

module.exports = CommentModal;