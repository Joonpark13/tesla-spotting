import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Spotting extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.navigation.state.params.model}</Text>
      </View>
    );
  }
}

export default Spotting;
