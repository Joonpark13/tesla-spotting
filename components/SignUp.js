import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import firebase from './firebase';
import { helperStyles } from './helpers';
import Email from './Email';
import Password from './Password';

import tesla from '../images/tesla_t_grey.png';

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
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValid: true,
      password: '',
      passwordValid: true,
      confirm: '',
      confirmValid: true,
      emptySubmit: false,
      errorMessage: null,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handleEmail(email) {
    this.setState({ email });
  }

  handlePassword(pass) {
    this.setState({ password: pass });
  }

  validateEmail(valid) {
    this.setState({ emailValid: valid });
  }

  validatePassword(valid) {
    this.setState({ passwordValid: valid });
  }

  handleConfirmChange(pass) {
    this.setState({ confirm: pass });

    // Passwords must match
    this.setState({ confirmValid: pass === this.state.password });
  }

  createUser() {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({ emptySubmit: true });
    } else if (this.state.emailValid && this.state.passwordValid) {
      this.setState({ emptySubmit: false });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          // Reset the navigational stack and replace it with MainNav
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'MainNav' }),
            ],
          });
          this.props.navigation.dispatch(resetAction);
        }).catch((error) => {
          this.setState({ errorMessage: error.message });
        });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView contentContainerStyle={styles.loginPageContainer}>
        <Image source={tesla} style={styles.logo} />

        <View style={styles.loginOptionsContainer}>
          <View style={styles.suboptionContainer}>
            <Text style={styles.sectionTitle}>Sign up</Text>

            <View style={styles.inputContainer}>
              <Email
                email={this.state.email}
                valid={this.state.emailValid}
                handleEmail={this.handleEmail}
                handleValidation={this.validateEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <Password
                password={this.state.password}
                valid={this.state.passwordValid}
                handlePassword={this.handlePassword}
                handleValidation={this.validatePassword}
              />
            </View>
            <View style={styles.inputContainer}>
              {!this.state.confirmValid &&
                <Text style={helperStyles.errorText}>Passwords must match</Text>
              }
              <TextInput
                style={Platform.OS === 'ios' ? helperStyles.iOSInput : undefined}
                placeholder="Confirm Password"
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                onChangeText={this.handleConfirmChange}
                value={this.confirm}
                underlineColorAndroid="black"
              />
            </View>

            {this.state.emptySubmit &&
              <Text style={helperStyles.errorText}>Email and Password must not be empty</Text>
            }
            {this.state.errorMessage &&
              <Text style={helperStyles.errorText}>{this.state.errorMessage}</Text>
            }
            <Button
              title="Create Account"
              onPress={this.createUser}
            />
          </View>

          <View style={styles.suboptionContainer}>
            <Text style={styles.sectionTitle}>Already have an account?</Text>

            <Button title="Login" onPress={() => navigate('Login')} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

SignUp.navigationOptions = {
  header: null,
};

export default SignUp;
