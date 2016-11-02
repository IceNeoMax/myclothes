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

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';


class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedAboutItem: true,
      selectedContactsItem: false,
    };
  }

  onItemPress(id) {
    if (id == 1) {
      this.setState({
        selectedAboutItem: true,
        selectedContactsItem: false
      })
    } else if (id == 2) {
      this.setState({
        selectedAboutItem: false,
        selectedContactsItem: true
      })
    }
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer} refreshing>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Your name</Text>
        </View>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('About');
              this.onItemPress(1)
            }}
            style={this.state.selectedAboutItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedAboutItem ? styles.itemTextPress : styles.itemText}>About</Text>
        </ButtonAPSL>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('Contacts');
              this.onItemPress(2)
            }}
            style={this.state.selectedContactsItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedContactsItem ? styles.itemTextPress : styles.itemText}>Contacts</Text>
        </ButtonAPSL>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height - 50 ,
    backgroundColor: '#28373E',
    padding: 20,
    marginBottom: 50,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
    color: '#8D8D8D'
  },
  item: {
    width: window.width/2,
    borderRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    height: 30
  },
  itemPress: {
    borderLeftWidth: 5,
    width: window.width/2,
    borderRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    borderLeftColor: '#39B996',
    height: 30
  },
  itemText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#8D8D8D',
    marginLeft: 5
  },
  itemTextPress: {
    fontSize: 14,
    fontWeight: '300',
    color: 'white',
    marginLeft: 5
  }
});

module.exports = Menu;