import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';

import firebase from './firebase';

import tesla from '../images/tesla_t_grey.png';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  logo: {
    resizeMode: 'contain',
    maxWidth: 150,
    maxHeight: 200,
  },
});

class Splash extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      // If already logged in
      if (user) {
        // Reset the navigational stack and replace it with MainNav
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainNav' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        // Reset the navigational stack and replace it with SignUp
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SignUp' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={tesla} style={styles.logo} />
      </View>
    );
  }
}

Splash.navigationOptions = {
  header: null,
};


export default Splash;
