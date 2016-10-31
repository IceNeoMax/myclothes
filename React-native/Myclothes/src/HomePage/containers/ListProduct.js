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
    Dimensions
} from 'react-native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');
const productSize = (window.width - 30)/2;

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
    renderRow(property) {
        return (
            <View style={styles.item}>
                <Image
                    indicator={Progress.CircleSnail}
                    style={{ height: productSize, width: productSize}}
                    source={{uri: property.img}}/>
            </View>
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
        marginTop: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'white',
        width: productSize + 1,
        borderWidth: 0.5,
        height: productSize + 1,
        margin: 1
    }
});

module.exports = ListProduct;