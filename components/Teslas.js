import React, { Component } from 'react';
import { Platform, View } from 'react-native';

import firebase from './firebase';
import AndroidToolbar from './AndroidToolbar';

class Teslas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teslas: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.teslaListener(user.uid);
      }
    });
  }

  teslaListener(uid) {
    const ref = firebase.database().ref(`users/${uid}/teslas`);
    ref.on('value', (snapshot) => {
      const teslas = [];

      snapshot.forEach((tesla) => {
        teslas.push({ key: tesla.key, ...tesla.val() });
      });

      this.setState({ teslas });
    });
  }

  render() {
    return (
      <View>
        {Platform.OS === 'android' && <AndroidToolbar navOpen={() => this.props.navigation.navigate('DrawerOpen')} />}
      </View>
    );
  }
}

export default Teslas;
