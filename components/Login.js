import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

import LoginOption from './LoginOption';

import google from '../images/google.png';
import email from '../images/mail.png';
import tesla from '../images/tesla_t_grey.png'

export default class Login extends Component {
  render() {
    return (
      <View style={styles.loginOptionsContainer}>
        <Image source={tesla} style={styles.logo} />
        <LoginOption optionName="email" img={email} bgColor='#db4437' textColor='white' />
        <LoginOption optionName="Google" img={google} bgColor='white' />
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
  loginOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
});