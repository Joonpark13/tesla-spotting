import React, { Component } from 'react';
import { View, Text } from 'react-native';

import firebase from './firebase';

class Spot extends Component {
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
        {this.state.loggedIn && <Text>success</Text>}
      </View>
    );
  }
}

export default Spot;
