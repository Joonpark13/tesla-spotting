import React, { Component } from 'react';
import { StyleSheet, Platform, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { H3 } from 'native-base';

import firebase from './firebase';
import AndroidToolbar from './AndroidToolbar';
import IOSStatusSpacer from './IOSStatusSpacer';

const styles = StyleSheet.create({
  profileContent: {
    padding: 8,
    alignItems: 'center',
  },
  userEmail: {
    marginVertical: 16,
    lineHeight: 24,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: null,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          user,
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  handleLogOut() {
    firebase.auth().signOut().then(() => {
      this.setState({ loggedIn: false });

      // Reset the navigational stack and replace it with SignUp
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    });
  }

  render() {
    return (
      <View>
        <IOSStatusSpacer />
        {Platform.OS === 'android' &&
          <AndroidToolbar
            title="Profile"
            navOpen={() => this.props.navigation.navigate('DrawerOpen')}
          />
        }
        {this.state.loggedIn &&
          <View style={styles.profileContent}>
            <H3 style={styles.userEmail}>{this.state.user.email}</H3>
            <Button color="black" title="Log Out" onPress={this.handleLogOut} />
          </View>
        }
      </View>
    );
  }
}

Profile.navigationOptions = {
  header: null,
};

export default Profile;
