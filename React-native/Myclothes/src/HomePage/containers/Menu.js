import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import ButtonAPSL from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as API from '../libs/backend'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';


function mapStateToProps (state) {
  return {
    auth: state.auth,
    personal: state.personal,
    global: state.global
  }
}

class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedAllItem: true,
      selectedMenItem: false,
      selectedWomenItem: false,
      selectedKidItem: false,
      selectedAboutItem: false,
      selectedContactsItem: false,
      selectedLogoutItem: false,
      user_name: '',
      avatar_picture: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png'
    };
  }

  componentWillMount() {
    API.getUserInfo(this.props.global.user.token.userId)
        .then((json) => {
          this.setState({
            user_name: json.user_name,
            avatar_picture: json.avatar_picture
          })
        })
  }

  onLogout() {
    Actions.LoginMain()
  }

  onItemPress(id) {
    if (id == 1) {
      this.setState({
        selectedAllItem: true,
        selectedMenItem: false,
        selectedWomenItem: false,
        selectedKidItem: false,
        selectedAboutItem: false,
        selectedContactsItem: false,
        selectedLogoutItem: false
      })
    } else if (id == 2) {
      this.setState({
        selectedAllItem: false,
        selectedMenItem: true,
        selectedWomenItem: false,
        selectedKidItem: false,
        selectedAboutItem: false,
        selectedContactsItem: false,
        selectedLogoutItem: false
      })
    } else if (id == 3) {
      this.setState({
        selectedAllItem: false,
        selectedMenItem: false,
        selectedWomenItem: true,
        selectedKidItem: false,
        selectedAboutItem: false,
        selectedContactsItem: false,
        selectedLogoutItem: false
      })
    } else if (id == 4) {
      this.setState({
        selectedAllItem: false,
        selectedMenItem: false,
        selectedWomenItem: false,
        selectedKidItem: true,
        selectedAboutItem: false,
        selectedContactsItem: false,
        selectedLogoutItem: false
      })
    } else if (id == 5) {
      this.setState({
        selectedAllItem: false,
        selectedMenItem: false,
        selectedWomenItem: false,
        selectedKidItem: false,
        selectedAboutItem: true,
        selectedContactsItem: false,
        selectedLogoutItem: false
      })
    } else if (id == 6) {
      this.setState({
        selectedAllItem: false,
        selectedMenItem: false,
        selectedWomenItem: false,
        selectedKidItem: false,
        selectedAboutItem: false,
        selectedContactsItem: true,
        selectedLogoutItem: false
      })
    } else if (id == 7) {
      this.setState({
        selectedAllItem: false,
        selectedMenItem: false,
        selectedWomenItem: false,
        selectedKidItem: false,
        selectedAboutItem: false,
        selectedContactsItem: false,
        selectedLogoutItem: true
      })
    }
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer} refreshing>
          <ImageP
              indicator={Progress.CircleSnail}
              style={styles.avatar}
              source={{ uri: this.state.avatar_picture }}/>
          <Text style={styles.name}>{this.state.user_name}</Text>
        </View>

        <View style={{borderTopWidth: 0.5, borderTopColor: '#8D8D8D',
          height: 10 , width: window.width/2}}></View>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('All');
              this.onItemPress(1)
            }}
            style={this.state.selectedAllItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedAllItem ? styles.itemTextPress : styles.itemText}>All</Text>
        </ButtonAPSL>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('Men');
              this.onItemPress(2)
            }}
            style={this.state.selectedMenItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedMenItem ? styles.itemTextPress : styles.itemText}>Men</Text>
        </ButtonAPSL>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('Women');
              this.onItemPress(3)
            }}
            style={this.state.selectedWomenItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedWomenItem ? styles.itemTextPress : styles.itemText}>Women</Text>
        </ButtonAPSL>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('Kids');
              this.onItemPress(4)
            }}
            style={this.state.selectedKidItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedKidItem ? styles.itemTextPress : styles.itemText}>Kids</Text>
        </ButtonAPSL>

        <View style={{borderTopWidth: 0.5, borderTopColor: '#8D8D8D',
          height: 10 , width: window.width/2}}></View>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('About');
              this.onItemPress(5)
            }}
            style={this.state.selectedAboutItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedAboutItem ? styles.itemTextPress : styles.itemText}>About</Text>
        </ButtonAPSL>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('Contacts');
              this.onItemPress(6)
            }}
            style={this.state.selectedContactsItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedContactsItem ? styles.itemTextPress : styles.itemText}>Contacts</Text>
        </ButtonAPSL>

        <View style={{borderTopWidth: 0.5, borderTopColor: '#8D8D8D',
          height: 10 , width: window.width/2}}/>

        <ButtonAPSL
            onPress={(e) => {
              this.props.onItemSelected('Logout');
              this.onItemPress(7);
              this.onLogout()
            }}
            style={this.state.selectedLogoutItem ? styles.itemPress : styles.item}>
          <Text style={this.state.selectedLogoutItem ? styles.itemTextPress : styles.itemText}>Logout</Text>
        </ButtonAPSL>

        <View style={{ height: 50, width: window.width/2 }}>
          <Text style={{ alignSelf: 'center', color: 'white'}}>Follow Us</Text>
        </View>

        <View style={{ width: window.width/2, flexDirection: 'row'
          , borderWidth: 0
          , height: 80, justifyContent: 'space-between'}}>
          <View style={[styles.shareButton, {backgroundColor: '#365FB7'}]}>
            <Icon name="facebook-f" style={{  color: 'white'}} size={30}/>
          </View>
          <View style={[styles.shareButton, {backgroundColor: '#1dcaff'}]}>
            <Icon name="twitter" style={{  color: 'white'}} size={30}/>
          </View>
          <View style={[styles.shareButton, {backgroundColor: '#F2385A'}]}>
            <Icon name="pinterest-p" style={{  color: 'white'}} size={30}/>
          </View>
        </View>

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
    backgroundColor: 'white'
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
    color: 'white'
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
  },
  shareButton: {
    flex: 1/3,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    height: 50,
    width: 50
  }
});

export default connect(mapStateToProps)(Menu)