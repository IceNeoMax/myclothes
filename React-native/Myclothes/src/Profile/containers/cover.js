/**
 * Created by vjtc0n on 9/28/16.
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as coverActions from '../actions/cover';

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

var ImagePicker = require('react-native-image-picker');
var RNUploader = require('react-native-uploader');

var avatarRectangle = Dimensions.get('window').width;

const uri = 'http://screenrant.com/wp-content/uploads/batman-v-superman-henry-cavill3.jpg';


function mapStateToProps (state) {
    return {
        profile: state.profile,
        global: state.global
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...coverActions }, dispatch)
    }
}

class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coverPhoto: null
        }
    }

    _onPress() {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response)  => {
            console.log('Response = ', response);

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
                    url: 'http://localhost:4000/api/containers/container1/upload', // not use localhost here for android. It must be a ip address.
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
                        console.log(json);
                        console.log('Duong link su dung de luu la ');
                        console.log(json.result.files["image[]"][0].name);
                    }
                });


            }
        });
    }

    _changeAvatarImage() {
        if (this.state.coverPhoto == null) {
            this.setState({
                coverPhoto: uri
            });

        } else if (this.state.coverPhoto === uri) {
            return (
                <Image source={{uri: 'http://localhost:4000/api/containers/container1/download/image_1475156681340'}}
                       style={styles.logo}/>
            )
        } else {
            return (
                <Image source={{uri: this.state.coverPhoto.filepath}}
                       style={styles.logo}/>
            )
        }
    }

    render() {
        var changeAvatarImage = this._changeAvatarImage();

        return (
            <View style={styles.container}>
                <Button style={styles.coverPicture}>
                    <View>
                        <Image source={{uri: 'http://localhost:4000/api/containers/container1/download/Screen%20Shot%202016-08-29%20at%2010.14.05%20AM.png'}}
                               resizeMode={Image.resizeMode.stretch}
                               style={styles.cover}/>
                    </View>
                </Button>
                <View style={styles.empty} />

                <View style={styles.avartarContainer}>
                    <Button style={styles.avatarPicture}
                            onPress={() => this._onPress()}>
                        <View>
                            {changeAvatarImage}
                        </View>
                    </Button>
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
        borderRadius: 0
    },
    avartarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: (avatarRectangle - 150)/2,
        left: (avatarRectangle - 150)/2
    },
    empty: {
        flex: 1
    },
    avatarPicture: {
        flex: 1,
        height: 150,
        borderRadius: 0
    },
    logo: {
        width: 150,
        height: 150
    },
    cover: {
        width: avatarRectangle,
        height: 300*4/5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cover);