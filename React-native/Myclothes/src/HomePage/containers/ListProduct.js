/**
 * Created by vjtc0n on 10/31/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ListView,
    Dimensions,
    Image
} from 'react-native';

import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

const window = Dimensions.get('window');
const productSize = (window.width - 30)/2;

const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
DATA = [
    { img: 'http://i.imgur.com/cxsKyMB.png'},
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
    { img: 'http://a4vn.com/media/catalog/product/cache/all/thumbnail/255x298/7b8fef0172c2eb72dd8fd366c999954c/1/6/16_19_1.jpg' },
];

class ListProduct extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        };
    }

    onPressProduct(){
        console.log('OK')
    }

    renderRow(property) {
        return (
            <ButtonAPSL
                onPress={() => {this.onPressProduct()}}
                style={styles.item}>
                <ImageP
                    indicator={Progress.CircleSnail}
                    style={{ flex: 2/3, borderRadius: 10 }}
                    source={{uri: property.img}}/>
                <View style={{flex: 1/3, flexDirection: 'row'}}>
                    <View style={{flex: 0.5/5}}></View>
                    <View style={{flex: 4/5, flexDirection: 'column'}}>
                        <View style={{flex: 2/3, borderBottomWidth: 0.5, flexDirection: 'column'}}>
                            <Text style={{flex: 1/2, marginTop: 3, fontSize: 18, fontWeight: 'bold'}}>Áo thun</Text>
                            <View style={{flex: 1/2, flexDirection: 'row', opacity: 0.5}}>
                                <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='heart' />
                                    <Text style={{fontSize: 8, marginLeft: 2}}>23</Text>
                                </View>
                                <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='share-alt' />
                                    <Text style={{fontSize: 8, marginLeft: 2}}>5</Text>
                                </View>
                                <View style={{flex: 1/3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='credit-card' />
                                    <Text style={{fontSize: 8, marginLeft: 2}}>11</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1/3, flexDirection: 'row'}}>
                            <View style={{
                                flex: 1/6,
                                marginTop: 2, marginBottom: 5
                            }}>
                                <Image
                                    source={{uri: uri}}
                                    style={{ flex: 1 }}/>
                            </View>
                            <Text style={{
                                flex: 5/6,
                                fontSize: 12, fontWeight: 'bold',
                                marginTop: 5, marginLeft: 2 }}>Khánh</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.5/5}}></View>
                </View>
            </ButtonAPSL>
        )
    }

    render() {
        return (
            <ListView
                scrollEnabled={true}
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}/>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'white',
        width: productSize + 1,
        borderWidth: 0.0,
        height: productSize * 1.5 + 1,
        margin: 1,
        borderRadius: 5,
        flexDirection: 'column'
    }
});

module.exports = ListProduct;