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
      selectedNewestButton: true,
      selectedTopWeekButton: false,
      selectedTopMonthButton: false,
      selectedTopButton: false
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

  onPress(event, id) {
    if (id == 1){
      this.setState({
        selectedNewestButton: true,
        selectedTopWeekButton: false,
        selectedTopMonthButton: false,
        selectedTopButton: false
      })
    } else if (id == 2) {
      this.setState({
        selectedNewestButton: false,
        selectedTopWeekButton: true,
        selectedTopMonthButton: false,
        selectedTopButton: false
      })
    } else if (id == 3) {
      this.setState({
        selectedNewestButton: false,
        selectedTopWeekButton: false,
        selectedTopMonthButton: true,
        selectedTopButton: false
      })
    } else if (id == 4) {
      this.setState({
        selectedNewestButton: false,
        selectedTopWeekButton: false,
        selectedTopMonthButton: false,
        selectedTopButton: true
      })
    }
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
            <View style={{ flexDirection: 'row', height: 35, marginTop: 5,
              borderWidth: 0, backgroundColor: '#39B996'
            }}>
              <ButtonAPSL
                  onPress={(e)=> {this.onPress(e, 1)}}
                  style={this.state.selectedNewestButton ? styles.typeOfClothesButtonPress : styles.typeOfClothesButton}>
                <Text style={{color: 'white'}}>Newest</Text>
              </ButtonAPSL>
              <ButtonAPSL
                  onPress={(e)=> {this.onPress(e, 2)}}
                  style={this.state.selectedTopWeekButton ? styles.typeOfClothesButtonPress : styles.typeOfClothesButton}>
                <Text style={{color: 'white'}}>Top Of Week</Text>
              </ButtonAPSL>
              <ButtonAPSL
                  onPress={(e)=> {this.onPress(e, 3)}}
                  style={this.state.selectedTopMonthButton ? styles.typeOfClothesButtonPress : styles.typeOfClothesButton}>
                <Text style={{color: 'white'}}>Top Of Month</Text>
              </ButtonAPSL>
              <ButtonAPSL
                  onPress={(e)=> {this.onPress(e, 4)}}
                  style={this.state.selectedTopButton ? styles.typeOfClothesButtonPress : styles.typeOfClothesButton}>
                <Text style={{color: 'white'}}>Top 10</Text>
              </ButtonAPSL>
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: '#cccccc' }}>
            <ListProduct
              selectedItem={this.state.selectedItem}/>
          </View>
        </ScrollView>
        <Button style={styles.button} onPress={() => this.toggle()}>
          <Icon name="bars" size={32} style={{color: '#FF3366'}} />
        </Button>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 30,
    left: 10,
    borderRadius: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
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
    borderWidth: 0,
    backgroundColor: '#39B996',
    height: 30
  },
  typeOfClothesButtonPress: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 0 ,
    justifyContent: 'center',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#39B996',
    borderBottomWidth: 6,
    borderBottomColor: '#FF3366',
    height: 35
  }
});

module.exports = HomePage;