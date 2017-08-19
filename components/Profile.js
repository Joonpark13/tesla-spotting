import React, { Component } from 'react';
import { Platform, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import firebase from './firebase';
import AndroidToolbar from './AndroidToolbar';
import IOSStatusSpacer from './IOSStatusSpacer';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
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
          <Button title="Log Out" onPress={this.handleLogOut} />
        }
      </View>
    );
  }
}

Profile.navigationOptions = {
  header: null,
};

export default Profile;
