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
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValid: true,
      password: '',
      passwordValid: true,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  handleEmailChange(email) {
    this.setState({ email });

    // If there is already a timeout in process, clear it
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.timeout = null;

      if (email) {
        // Handle email validation by regex: http://emailregex.com/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({ emailValid: re.test(email) });
      } else {
        // If field is empty, don't display error message
        this.setState({ emailValid: true });
      }
    }, 500); // half second wait after typing to validate
  }

  handlePasswordChange(pass) {
    this.setState({ pass });

    // Passwords must be longer than 4 letters
    this.setState({ passwordValid: pass === '' || pass.length > 4 });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.loginPageContainer}>
        <Image source={tesla} style={styles.logo} />

        <View style={styles.loginOptionsContainer}>
          <View style={styles.suboptionContainer}>
            <Text style={styles.sectionTitle}>Sign up</Text>

            <View style={styles.inputContainer}>
              {!this.state.emailValid && <Text style={styles.errorText}>Invalid Email</Text>}
              <TextInput
                style={Platform.OS === 'ios' ? styles.iOSInput : undefined}
                placeholder="Email"
                autoCorrect={false}
                keyboardType='email-address'
                onChangeText={this.handleEmailChange}
                value={this.email}
              />
            </View>
            <View style={styles.inputContainer}>
              {!this.state.passwordValid && <Text style={styles.errorText}>Passwords must be longer than 4 characters</Text>}
              <TextInput
                style={Platform.OS === 'ios' ? styles.iOSInput : undefined}
                placeholder="Password"
                autoCorrect={false}
                onChangeText={this.handlePasswordChange}
                value={this.password}
              />
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
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});