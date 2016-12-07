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
    TextInput,
    Alert
} from 'react-native';

import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modalbox'
import ViewMoreText from 'react-native-view-more-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as API from '../../PersonalPage/libs/backend'
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux'

const window = Dimensions.get('window');

var DATA = [];

function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

class CommentModal extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            inputText: ''
        }
    }


    componentWillReceiveProps(props) {
        //console.log(props)
        if (props.isProduct == true && props.post_id != "") {
            //console.log(props.post_id)
            API.getCommentProduct(props.post_id)
                .then((json) => {
                    //console.log(json)
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(json)
                    })

                })
        } else if (props.isProduct == false && props.post_id != "") {
            API.getCommentPost(props.post_id)
                .then((json) => {
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(json)
                    })

                })
        }

    }

    componentWillMount() {
        //console.log(this.props.post_id)
    }

    onTyping(text){
        if (text.nativeEvent.text !== 'undefined') {
            this.setState({
                inputText: text.nativeEvent.text
            });
        }
    }

    createComment(text) {
        //console.log(text)
        if (this.props.isProduct == true) {
            API.addCommentProduct(this.props.post_id, this.props.user_id, text)
                .then((json) => {
                    //console.log(json)
                    API.getCommentProduct(this.props.post_id)
                        .then((json) => {
                            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                            this.setState({
                                dataSource: ds.cloneWithRows(json)
                            })

                        })
                })
        } else if (this.props.isProduct == false) {
            API.addCommentPost(this.props.post_id, this.props.user_id, text)
                .then((json) => {
                    //console.log(json)
                    API.getCommentPost(this.props.post_id)
                        .then((json) => {
                            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                            this.setState({
                                dataSource: ds.cloneWithRows(json)
                            })

                        })
                })
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

    renderHiddenRow(data, secId, rowId, rowMap) {
        return (
            <View style={styles.rowBack}>
                <View style={{flex: 1/2}}/>
                <View style={{flex: 1/4}}/>
                <ButtonAPSL style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={ () => this.onReport(data, secId, rowId, rowMap) }>
                    <Text style={styles.backTextWhite}>Report</Text>
                </ButtonAPSL>
            </View>
        )
    }
    onReport(data, secId, rowId, rowMap) {
        //console.log(data)
        API.checkReport(data.comment_id, this.props.global.user.token.userId)
            .then((json) => {
                //console.log(json)
                if (json.result == 0) {
                    API.report(data.comment_id, this.props.global.user.token.userId)
                        .then((json) => {
                            Alert.alert(
                                'Notification',
                                'You reported this comment',
                                [
                                    {text: 'OK', onPress: () => {}},
                                ]
                            )
                        })
                } else {
                    Alert.alert(
                        'Notification',
                        'You have already reported this comment',
                        [
                            {text: 'OK', onPress: () => {}},
                        ]
                    )
                }
            })
    }

    renderRow(property) {
        return (
            <View style={{flexDirection: 'row', marginTop: 5, borderRightWidth: 2, borderColor: '#f66f88'}}>
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
                    <View style={{ width: 260}}>
                        <ViewMoreText
                            renderViewMore={this.renderViewMore}
                            renderViewLess={this.renderViewLess}
                            numberOfLines={4}>
                            <Text style={{textAlign: 'left', flexWrap: 'wrap'}}>{property.content}</Text>
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
                    extraHeight={105}
                    style={{ flexDirection: 'column', flex: 1}}>
                    <View style={{height: 450}}>
                        <SwipeListView
                            rightOpenValue={-100}
                            renderHiddenRow={(data, secId, rowId, rowMap) => this.renderHiddenRow(data, secId, rowId, rowMap)}
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
                            onChange={(text) => this.onTyping(text)}
                            style={styles.textInput}
                            underlineColorAndroid="white"
                            placeholderTextColor='gray'
                            placeholder='Comment about ...'
                            returnKeyType='done'
                            multiline={true}
                            keyboardType="default" />
                        <Icon
                            onPress={() => this.createComment(this.state.inputText)}
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
        position: 'absolute',
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
        height: window.height,
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
        padding: 0
    },
    sendIcon: {
        flex: 1/7,
        marginLeft: 20
    },
    rowBack: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 0,
        borderWidth: 0,
        flex: 1,
        marginRight: 20
    },
    backRightBtn: {
        flex: 1/4,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0,
        height: 30
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

export default connect(mapStateToProps)(CommentModal)