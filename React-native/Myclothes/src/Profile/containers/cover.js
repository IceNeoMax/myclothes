/**
 * Created by vjtc0n on 9/28/16.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as coverActions from '../actions/cover';
import * as profileActions from '../actions/profile'

import React, {Component} from 'react'
import
{
    StyleSheet,
    View,
    Image,
    Platform
} from 'react-native'

import Dimensions from 'Dimensions';

import Button from 'apsl-react-native-button'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
var ImagePicker = require('react-native-image-picker');
var RNUploader = require('react-native-uploader');

var avatarRectangle = Dimensions.get('window').width;

const baseURL = 'http://192.168.1.73:3000/api/containers/container1/';


function mapStateToProps (state) {
    return {
        profile: state.profile,
        global: state.global
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...coverActions, ...profileActions }, dispatch)
    }
}

class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar_picture: '',
            cover_picture: ''
        }
    }

    componentWillReceiveProps (props) {
        this.setState({
            avatar_picture: props.profile.form.fields.avatar_picture,
            cover_picture: props.profile.form.fields.cover_picture
        })
    }

    componentWillMount () {
        this.props.actions.getProfile(this.props.global.token, this.props.global.user.token.userId);
    }

    _onPress(kindOfPicture) {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response)  => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                var source = {
                    name: '',
                    filename: '',
                    filepath: '',
                    isStatic: ''
                };
                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    source = {
                        name: 'image[]',
                        filename: `image_${(new Date()).getTime()}`,
                        filepath: response.uri.replace('file://', ''),
                        isStatic: true
                    };
                } else {
                    source = {
                        name: 'image[]',
                        filename: `image_${(new Date()).getTime()}`,
                        filepath: response.uri.replace('file://', ''),
                        isStatic: true
                    };
                }

                this.setState({
                    coverPhoto: source
                });

                var imageFiles = [source];

                let opts = {
                    url: baseURL + 'upload', // not use localhost here for android. It must be a ip address.
                    files: imageFiles,
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    params: { coder: 'vjtc0n' }
                };

                RNUploader.upload(opts, (err, res) => {
                    if (err) {
                        console.log(err);
                        throw (err)
                    }

                    if (res.status == 200 || res.status == 201) {
                        let responseString = res.data;
                        let json = JSON.parse(responseString);
                        console.log('Ket qua tra ve la ');
                        console.log('Duong link su dung de luu la ');
                        console.log(json.result.files["image[]"][0].name);
                        var returnImage = baseURL + 'download/' + json.result.files["image[]"][0].name;
                        if (kindOfPicture == 'avatar') {
                            this.props.actions.updateProfile(this.props.global.token, this.props.global.user.token.userId, {
                                avatar_picture: returnImage
                            });
                        } else {
                            this.props.actions.updateProfile(this.props.global.token, this.props.global.user.token.userId, {
                                cover_picture: returnImage
                            });
                        }
                    }
                });


            }
        });
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={{height: 300}}>
                    <View style={styles.coverPicture}>
                        <Button
                            style={{flex: 1}}
                            onPress={() => this._onPress('cover')}>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: this.state.cover_picture}}
                                style={styles.cover}/>
                        </Button>
                    </View>
                    <View style={styles.empty} />

                    <View style={styles.avartarContainer}>
                        <Button
                            onPress={() => this._onPress('avatar')}
                            style={styles.avatarPicture}>
                            <ImageP
                                indicator={Progress.CircleSnail}
                                resizeMode='stretch'
                                source={{uri: this.state.avatar_picture}}
                                style={styles.logo}/>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 300
    },
    coverPicture: {
        flex: 4,
        borderRadius: 0,
        borderWidth: 0,
        //borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    avartarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: (avatarRectangle - 150)/2,
        left: (avatarRectangle - 150)/2,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: 'gray'
    },
    avatarPicture: {
        height: 150,
        borderRadius: 0,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        borderWidth: 0
    },
    logo: {
        height: 147,
        width: 147,
        borderRadius: 5
    },
    cover: {
        width: avatarRectangle,
        height: 300*4/5
    },
    empty: {
        flex: 1
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cover);