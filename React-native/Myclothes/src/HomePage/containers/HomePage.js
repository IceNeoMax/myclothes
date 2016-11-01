import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Icon from 'react-native-vector-icons/FontAwesome'
import ListProduct from './ListProduct'
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import ButtonAPSL from 'apsl-react-native-button'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style} >
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedItem: 'About',
      imgList: [
        'http://static.zerochan.net/Yuuki.Asuna.full.1974527.jpg',
        'http://static.zerochan.net/Yuuki.Asuna.full.2001827.jpg'
      ],
      opacityImg: new Animated.Value(0),
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item
    });
  };

  onLoadingImg() {
    Animated.timing(this.state.opacityImg, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  onPress() {
    console.log('OK')
  }


  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <ScrollView style={styles.container}>
          <View style={{height: 250, width: window.width}}>
            <Swiper showsButtons={false}
                    autoplay={true}
                    height={250}
                    width={window.width} >
              {
                this.state.imgList.map((img, i) => {
                  return(
                      <View key={i}>
                        <Animated.Image source={{uri: img}}
                                        resizeMode='stretch'
                                        style={{height:250, width: window.width, opacity: this.state.opacityImg}}
                                        onLoad={() => {this.onLoadingImg()}} />
                      </View>
                  )
                })
              }
            </Swiper>
          </View>

          <View style={{ backgroundColor: '#cccccc'}}>
            <View style={{ flexDirection: 'row', height: 40, marginTop: 5,
              borderWidth: 0, backgroundColor: 'white'
            }}>
              <ButtonAPSL
                  onPress={()=> {this.onPress()}}
                  style={styles.typeOfClothesButton}>
                <Text>Newest</Text>
              </ButtonAPSL>
              <ButtonAPSL
                  onPress={()=> {this.onPress()}}
                  style={styles.typeOfClothesButton}>
                <Text>Top Of Week</Text>
              </ButtonAPSL>
              <ButtonAPSL
                  onPress={()=> {this.onPress()}}
                  style={styles.typeOfClothesButton}>
                <Text>Top Of Month</Text>
              </ButtonAPSL>
              <ButtonAPSL
                  onPress={()=> {this.onPress()}}
                  style={styles.typeOfClothesButton}>
                <Text>Top 10</Text>
              </ButtonAPSL>
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: '#cccccc' }}>
            <ListProduct/>
          </View>
        </ScrollView>
        <Button style={styles.button} onPress={() => this.toggle()}>
          <Icon name="bars" size={32} />
        </Button>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 50
  },
  instructions: {
    marginTop: 50,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  typeOfClothesButton: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 0 ,
    justifyContent: 'center',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderWidth: 0
  }
});

module.exports = HomePage;