const React = require('react');
const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
import Icon from 'react-native-vector-icons/FontAwesome'

const {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} = require('react-native');
const { Component } = React;



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
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

class HomePage extends Component {
  state = {
    isOpen: false,
    selectedItem: 'About',
  };

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

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <Text style={styles.instructions}>
            Current selected menu item is: {this.state.selectedItem}
          </Text>
          <Text>ABC</Text>
          <View style={{ height: 0, width: 100}}>
            <TextInput style={{height: 0,borderWidth: 0, flex: 1, padding: 0}} />
          </View>
        </View>
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
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = HomePage;