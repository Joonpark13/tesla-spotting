import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TextInput, Button } from 'react-native';

import tesla from '../images/tesla_t_grey.png'

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.loginPageContainer}>
        <Image source={tesla} style={styles.logo} />

        <View style={styles.loginOptionsContainer}>
          <Text>Sign up</Text>

          <Text>Email</Text>
          <TextInput />
          <Text>Password</Text>
          <TextInput />
          <Text>Confirm Password</Text>
          <TextInput />
          <Button title="Create Account" />

          <Text>Already have an account?</Text>
          <Button title="Login" onPress={() => navigate('Login')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    maxWidth: 100,
    maxHeight: 150,
  },
  loginPageContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginOptionsContainer: {
    width: '100%',
  },
});