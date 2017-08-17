import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

class Login extends Component {
  render() {
    return (
      <View>
        <Text>Email</Text>
        <TextInput />
        <Text>Password</Text>
        <TextInput />
      </View>
    );
  }
}

export default Login;