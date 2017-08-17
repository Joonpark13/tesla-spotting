import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Button,
  Platform,
} from 'react-native';

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
          <View style={styles.suboptionContainer}>
            <Text style={styles.sectionTitle}>Sign up</Text>

            <View style={styles.inputContainer}>
              <TextInput style={Platform.OS === 'ios' ? styles.iOSInput : undefined} placeholder="Email" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={Platform.OS === 'ios' ? styles.iOSInput : undefined} placeholder="Password" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={Platform.OS === 'ios' ? styles.iOSInput : undefined} placeholder="Confirm Password" />
            </View>
            <Button title="Create Account" />
          </View>

          <View style={styles.suboptionContainer}>
            <Text style={styles.sectionTitle}>Already have an account?</Text>

            <Button title="Login" onPress={() => navigate('Login')} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    maxWidth: 100,
    maxHeight: 110,
  },
  loginPageContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  loginOptionsContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  suboptionContainer: {
    marginBottom: 36,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  inputContainer: {
    marginBottom: 6,
  },
  iOSInput: { // iOS
    borderBottomColor: 'gray',
    borderBottomWidth: 1, 
    marginVertical: 8,
  },
});