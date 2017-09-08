import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import firebase from './firebase';
import { helperStyles } from './helpers';
import Email from './Email';
import Password from './Password';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    height: '100%',
  },
  content: {
    width: '100%',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValid: true,
      password: '',
      passwordValid: true,
      emptySubmit: false,
      errorMessage: null,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleEmail(email) {
    this.setState({ email });

    if (this.state.emptySubmit) {
      if (email !== '') {
        this.setState({
          emptySubmit: false,
          errorMessage: null,
        });
      }
    }
  }

  handlePassword(pass) {
    this.setState({ password: pass });

    if (this.state.emptySubmit) {
      if (pass !== '') {
        this.setState({
          emptySubmit: false,
          errorMessage: null,
        });
      }
    }
  }

  validateEmail(valid) {
    this.setState({ emailValid: valid });
  }

  validatePassword(valid) {
    this.setState({ passwordValid: valid });
  }

  handleSignin() {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({ emptySubmit: true });
    } else if (this.state.emailValid && this.state.passwordValid) {
      this.setState({ emptySubmit: false });

      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
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
    return (
      <View style={styles.page}>
        <View style={styles.content}>
          <Email
            email={this.state.email}
            valid={this.state.emailValid}
            handleEmail={this.handleEmail}
            handleValidation={this.validateEmail}
          />
          <Password
            password={this.state.password}
            valid={this.state.passwordValid}
            handlePassword={this.handlePassword}
            handleValidation={this.validatePassword}
          />

          {this.state.emptySubmit &&
            <Text style={helperStyles.errorText}>Email and Password must not be empty</Text>
          }
          {this.state.errorMessage &&
            <Text style={helperStyles.errorText}>{this.state.errorMessage}</Text>
          }
          <Button title="Login" onPress={this.handleSignin} />
        </View>
      </View>
    );
  }
}

export default Login;
