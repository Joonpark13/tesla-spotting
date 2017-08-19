import React, { Component } from 'react';
import { Platform, View } from 'react-native';

import AndroidToolbar from './AndroidToolbar';

class Teslas extends Component {
  render() {
    return (
      <View>
        {Platform.OS === 'android' && <AndroidToolbar navOpen={() => this.props.navigation.navigate('DrawerOpen')} />}
      </View>
    );
  }
}

export default Teslas;
