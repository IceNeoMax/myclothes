/**
 * Created by vjtc0n on 11/1/16.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'
import { ImageViewer } from 'react-native-image-fit'
import PhotoView from 'react-native-photo-view';
import CommentModal from '../../Comment/commentmodal'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
var _ = require('underscore');

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    ListView,
    Alert
} from 'react-native';

import { bindActionCreators } from 'redux'
import * as personalActions from '../../PersonalPage/actions/personalPage';
import { connect } from 'react-redux'
import * as API1 from '../../HomePage/libs/backend';
import * as API2 from '../../PersonalPage/libs/backend'

const window = Dimensions.get('window');
const productSize = (window.width - 30)/2;
var DATA = [];

function mapStateToProps (state) {
    return {
        auth: state.auth,
        personal: state.personal,
        global: state.global
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({ ...personalActions }, dispatch)
    }
}

class ProductPage extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            opacityImg: new Animated.Value(0),
            sizeList: {
                selectedXS: false,
                selectedS: false,
                selectedM: true,
                selectedL: false,
                selectedXL: false
            },
            size: 'M',
            colorList: {
                selected1: false,
                selected2: false,
                selected3: true,
                selected4: false,
                selected5: false
            },
            color: 'green',
            isLiked: false,
            isModalOpened: false,
            isProduct: false,
            productInfo: {
                member: {
                    avatar_picture: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png'
                },
                imgList: [
                    "http://gecko.vn/////media/assets/product-design/tayngan-100/den/mat-truoc.png"
                ],
                likes: [],
                orders: [],
                comments: []
            },
            dataSource: ds.cloneWithRows(DATA),
            dataSourceFactory: ds.cloneWithRows(DATA),
            numberOfLike: 0,
            numberOfComment: 0,
            factory_id: ''
        };
    }

    componentWillReceiveProps(props) {
        //console.log(props.product_id)
    }

    componentWillMount() {
        /*console.log(this.props.isProduct)
        console.log(this.props.product_id)*/
        this.setState({
            isProduct: this.props.isProduct
        })

        API1.getProductInfo(this.props.product_id)
            .then((json) => {
                //console.log(json)
                this.setState({
                    productInfo: json
                }, () => {
                    this.setState({
                        numberOfLike: this.state.productInfo.likes.length,
                        numberOfComment: this.state.productInfo.comments.length
                    })
                })
            })

        API1.getSticker(this.props.product_id)
            .then((json) => {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource: ds.cloneWithRows(json)
                })
            })

        API2.checkLikeProduct(this.props.product_id, this.props.global.user.token.userId)
            .then((json) => {
                //console.log(json)
                if (json.result != 0) {
                    this.setState({
                        isLiked: true
                    })
                }
            })
        API1.getFactories()
            .then((json) => {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSourceFactory: ds.cloneWithRows(json),
                    factory_id: json[0].factory_id
                })
            })

    }

    onLoadingImg() {
        Animated.timing(this.state.opacityImg, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    onCirclePress(id) {
        switch (id) {
            case 1:
                return this.setState({
                    sizeList: {
                        selectedXS: true,
                        selectedS: false,
                        selectedM: false,
                        selectedL: false,
                        selectedXL: false
                    },
                    size: 'XS'
                });
            case 2:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: true,
                        selectedM: false,
                        selectedL: false,
                        selectedXL: false
                    },
                    size: 'S'
                })
            case 3:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: false,
                        selectedM: true,
                        selectedL: false,
                        selectedXL: false
                    },
                    size: 'M'
                })
            case 4:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: false,
                        selectedM: false,
                        selectedL: true,
                        selectedXL: false
                    },
                    size: 'L'
                })
            case 5:
                return this.setState({
                    sizeList: {
                        selectedXS: false,
                        selectedS: false,
                        selectedM: false,
                        selectedL: false,
                        selectedXL: true
                    },
                    size: 'XL'
                })

            case 6:
                return this.setState({
                    colorList: {
                        selected1: true,
                        selected2: false,
                        selected3: false,
                        selected4: false,
                        selected5: false
                    },
                    color: 'red'
                });
            case 7:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: true,
                        selected3: false,
                        selected4: false,
                        selected5: false
                    },
                    color: 'black'
                })
            case 8:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: false,
                        selected3: true,
                        selected4: false,
                        selected5: false
                    },
                    color: 'green'
                })
            case 9:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: false,
                        selected3: false,
                        selected4: true,
                        selected5: false
                    },
                    color: 'blue'
                })
            case 10:
                return this.setState({
                    colorList: {
                        selected1: false,
                        selected2: false,
                        selected3: false,
                        selected4: false,
                        selected5: true
                    },
                    color: 'purple'
                })
        }
    }

    onHeartPress() {
        if (this.state.isLiked == false) {
            API2.likeProduct(this.state.productInfo.product_id, this.props.global.user.token.userId)
                .then((json) => {
                    this.setState({
                        isLiked: true
                    });
                    API2.getLikesProduct(this.state.productInfo.product_id)
                        .then((json) => {
                            this.setState({
                                numberOfLike: json.count
                            })
                        })
                })
        } else {
            API2.unlikeProduct(this.state.productInfo.product_id, this.props.global.user.token.userId)
                .then((json) => {
                    API2.getLikesProduct(this.state.productInfo.product_id)
                        .then((json) => {
                            this.setState({
                                numberOfLike: json.count
                            })
                        })
                    this.setState({
                        isLiked: false
                    })
                })
        }
    }

    onCommentPress() {
        this.setState({
            isModalOpened: true
        })
    }

    onModalClosed() {
        this.setState({
            isModalOpened: false
        })
        API2.countCommentProduct(this.state.productInfo.product_id)
            .then((json) => {
                this.setState({
                    numberOfComment: json.count
                })
            })
    }

    onBackPress() {
        Actions.pop();
    }

    onStickerPress(product_id) {
        Actions.Product({
            isProduct: false,
            product_id: product_id
        });
    }

    onNamePress(property) {
        Actions.PersonalWall({
            property: property
        })
    }

    onAddShoppingCartPress(productInfo) {
        var tempArray = [];
        tempArray = _.where(this.props.personal.form.shopping_cart, {product_id: productInfo.product_id})
        if (tempArray.length > 0) {
            Alert.alert(
                'Notification',
                'This product has already been placed',
                [
                    {text: 'OK', onPress: () => {}},
                ]
            )
        } else {
            productInfo.quantity = 1;
            if (productInfo.imgList.length > 1) {
                productInfo.size = this.state.size;
                productInfo.color = this.state.color;
                productInfo.factory_id = this.state.factory_id
            }
            this.props.actions.sendProductToShoppingCartSuccess(productInfo);
            Alert.alert(
                'Notification',
                'The product is placed',
                [
                    {text: 'OK', onPress: () => {}},
                ]
            )
        }

    }

    onFactoryPress(factory_id) {
        this.setState({
            factory_id: factory_id
        }, () => {
            //console.log(this.state.factory_id)
        })
    }

    renderFactoryRow(property) {
        //console.log(property)
        var icon = null;
        if (property.product_id == this.state.product_id) {
            icon = <View>
                    <Icon name="check" color='#f66f88' size={20}/>
                </View>
        } else {
            icon = <View/>
        }

        return (
            <ButtonAPSL
                onPress={() => this.onFactoryPress(property.factory_id)}
                style={{flexDirection: 'row', justifyContent: 'space-between'
                , borderLeftWidth: 2, borderRadius: 0, marginBottom: 0, borderColor: '#f66f88'
                , borderWidth: 0, flex: 1}}>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', color: '#193441'}}>Name: </Text>
                        <Text style={{color: '#365FB7', fontWeight: 'bold'}}>{property.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', color: '#193441'}}>Phone: </Text>
                        <Text>{property.phone}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold', color: '#193441'}}>Address: </Text>
                        <Text>{property.address}</Text>
                    </View>
                </View>
                {icon}
            </ButtonAPSL>
        )
    }

    renderRow(property) {
        //console.log(property)
        return (
            <ButtonAPSL
                onPress={() => this.onStickerPress(property.sticker.product_id)}
                style={styles.item}>
                <View style={{flex: 2/3}}>
                    <ImageP
                        indicator={Progress.CircleSnail}
                        style={{ flex: 1, borderRadius: 10, width: productSize }}
                        source={{uri: property.sticker.imgList[0]}}/>
                </View>
                <View style={{flex: 1/3, flexDirection: 'column'
                    , backgroundColor: '#d5f6f6'
                    , alignItems: 'center', justifyContent: 'center'}}>
                    <View>
                        <Text style={{fontWeight: 'bold', color: '#193441'}}>{property.sticker.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Price:</Text>
                        <Text style={{color: '#365FB7', fontWeight: 'bold'}}> ${property.sticker.price}</Text>
                    </View>
                </View>
            </ButtonAPSL>
        )
    }

    render() {
        var options = null;
        var listview = null;

        if (this.state.isProduct == false) {
            options = <View style={{height: 110}}/>
            listview = <View/>
        } else {
            options = <View>
                            <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                <Text style={{color: 'gray'}}>Size</Text>
                                <View style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(1)}
                                        style={this.state.sizeList.selectedXS ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>XS</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(2)}
                                        style={this.state.sizeList.selectedS ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>S</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(3)}
                                        style={this.state.sizeList.selectedM ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>M</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(4)}
                                        style={this.state.sizeList.selectedL ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>L</Text>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(5)}
                                        style={this.state.sizeList.selectedXL ? styles.selectedCirclePress : styles.selectedCircle}>
                                        <Text style={{fontSize: 18}}>XL</Text>
                                    </ButtonAPSL>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                <Text style={{color: 'gray'}}>Color</Text>
                                <View style={{marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(6)}
                                        style={[this.state.colorList.selected1 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'red'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(7)}
                                        style={[this.state.colorList.selected2 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'black'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(8)}
                                        style={[this.state.colorList.selected3 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'green'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(9)}
                                        style={[this.state.colorList.selected4 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'blue'}]}>
                                    </ButtonAPSL>
                                    <ButtonAPSL
                                        onPress={() => this.onCirclePress(10)}
                                        style={[this.state.colorList.selected5 ? styles.selectedCircleColorPress : styles.selectedCircle, {backgroundColor: 'purple'}]}>
                                    </ButtonAPSL>
                                </View>
                            </View>
                      </View>
            listview = <View style={{marginTop: 20, alignSelf: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>List stickers</Text>
                        </View>
        }

        var listFactory = null;
        if (this.state.isProduct == false) {
            listFactory = <View />
        } else {
            listFactory = <View style={{marginTop: 20, }}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>List factories</Text>
                            <ListView
                                renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                             style={{ flex: 1
                                                                                 , height: 10
                                                                                 , borderBottomWidth: 0.6}} />}
                                style={{flex: 1, marginTop: 20, marginBottom: 20, marginRight: 50, marginLeft: 50}}
                                scrollEnabled={true}
                                //contentContainerStyle={styles.list}
                                dataSource={this.state.dataSourceFactory}
                                renderRow={this.renderFactoryRow.bind(this)}
                                enableEmptySections={true}/>
                        </View>
        }


        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <Icon
                        onPress={() => this.onBackPress()}
                        name="angle-left"
                        size={40}
                        style={{color: 'white', marginLeft: 20}}/>
                    <Text style={{fontSize: 20, color: 'white'}}>{this.state.productInfo.name}</Text>
                    <View style={{marginRight: 20}} />
                </View>
                <View style={{flex: 1}}>
                    <ScrollView style={{flex: 1, backgroundColor: '#f5fcfe'}}>
                        <View style={{height: 300, overflow: 'hidden', marginBottom: 0
                            , borderRadius: 10, alignItems: 'center', borderColor: 'gray'
                            , alignSelf: 'center', margin: 10, borderWidth: 0.5,}}>
                            <Swiper showsButtons={true}
                                    style={{backgroundColor: 'white', borderWidth: 0, borderColor: 'gray'}}
                                    autoplay={true}
                                    height={300}
                                    width={window.width - 12} >
                                {
                                    this.state.productInfo.imgList.map((img, i) => {
                                        return(
                                            <View key={i}>
                                                <Animated.Image source={{uri: img}}
                                                                resizeMode='stretch'
                                                                style={{height:300, width: window.width - 12, opacity: this.state.opacityImg}}
                                                                onLoad={() => {this.onLoadingImg()}} />
                                            </View>
                                        )
                                    })
                                }
                            </Swiper>
                        </View>

                        <View>
                            {options}

                            <View style={{flexDirection: 'column',}}>
                                <View style={{height: 50, flexDirection: 'column', marginLeft: 100, marginRight: 100}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        borderRadius: 5, backgroundColor: '#365FB7'}}>
                                        <Text style={{fontSize: 30, color: 'white'}}>Price : $ </Text>
                                        <Text style={{fontSize: 30, color: 'white'}}>{this.state.productInfo.price}</Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{color: 'gray'}}>Author</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Image
                                                source={{uri: this.state.productInfo.member.avatar_picture}}
                                                style={{height: 50, width: 50, borderWidth: 0.5, borderRadius: 25, borderColor: 'gray'}}
                                            />
                                            <TouchableOpacity onLongPress={() => this.onNamePress(this.state.productInfo.member)}>
                                                <Text style={{marginLeft: 10, fontWeight: 'bold', color: '#173D41'}}>{this.state.productInfo.member.user_name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{height: 60, width: 150, marginLeft: 70, flexDirection: 'column'}}>
                                        <Text style={{color: 'gray'}}>Social</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'
                                            , marginTop: 15, justifyContent: 'space-between'}}>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon
                                                    onPress={() => this.onHeartPress()}
                                                    name='heart' style={{color: this.state.isLiked ? '#F2385A' : 'gray'}} size={20} />
                                                <Text style={{fontSize: 12, marginLeft: 2}}>{this.state.numberOfLike}</Text>
                                            </View>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon
                                                    onPress={() => this.onCommentPress()}
                                                    name='comment' style={{color: '#735DD3'}} size={20} />
                                                <Text style={{fontSize: 12, marginLeft: 2}}>{this.state.numberOfComment}</Text>
                                            </View>
                                            <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon
                                                    name='credit-card' style={{color: '#FF7F66'}} size={20} />
                                                <Text style={{fontSize: 12, marginLeft: 2}}>{this.state.productInfo.orders.length}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {listview}
                                <ListView
                                    scrollEnabled={true}
                                    contentContainerStyle={styles.list}
                                    dataSource={this.state.dataSource}
                                    renderRow={this.renderRow.bind(this)}
                                    enableEmptySections={true}/>

                                {listFactory}

                                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                                    <ButtonAPSL
                                        onPress={() => this.onAddShoppingCartPress(this.state.productInfo)}
                                        style={{backgroundColor: '#365FB7', flex: 2/3, justifyContent: 'center'
                                        , marginLeft: 20, marginRight: 20, borderWidth: 0}}>
                                        <Text style={{color: 'white', alignSelf: 'center', fontSize: 20}}>Add to cart</Text>
                                    </ButtonAPSL>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <CommentModal
                    isProduct={true}
                    post_id={this.state.productInfo.product_id}
                    user_id={this.props.global.user.token.userId}
                    onClosed={() => this.onModalClosed()}
                    isOpen={this.state.isModalOpened}/>
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
        alignItems: 'center'
    },
    selectedCircle: {
        flexDirection: 'row',
        borderWidth: 0.5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20
    },
    selectedCirclePress: {
        flexDirection: 'row',
        borderWidth: 0.5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        backgroundColor: 'gray'
    },
    selectedCircleColorPress: {
        flexDirection: 'row',
        borderWidth: 4,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        borderColor: '#F2385A'
    },
    list: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#d5f6f6',
        width: productSize + 1,
        borderWidth: 0.0,
        height: productSize * 1.5,
        margin: 3,
        borderRadius: 5,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#365FB7',
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)