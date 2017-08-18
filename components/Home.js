import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, ToolbarAndroid } from 'react-native';

import firebase from './firebase';

import menuIcon from '../images/ic_menu_black_24dp_2x.png';

const styles = StyleSheet.create({
  toolbar: {
    height: 50,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <View>
        {Platform.OS === 'android' && (
          <ToolbarAndroid
            title="Tesla Spotting"
            navIcon={menuIcon}
            style={styles.toolbar}
            onIconClicked={() => this.props.navigation.navigate('DrawerOpen')}
          />
        )}
        {this.state.loggedIn && <Text>success</Text>}
      </View>
    );
  }
}

Home.navigationOptions = {
  header: null,
};

export default Home;
