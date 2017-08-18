import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Profile extends Component {
  render() {
    return (
      <View>
        <Text>profile page temp content</Text>
      </View>
    );
  }
}

Profile.navigationOptions = {
  header: null,
};

export default Profile;
