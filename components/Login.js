import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import firebase from './firebase';
import Email from './Email';
import Password from './Password';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(email) {
    this.setState({ email });
  }

  handlePassword(pass) {
    this.setState({ password: pass });
  }

  render() {
    return (
      <View>
        <Email email={this.state.email} handleEmail={this.handleEmail} />
        <Password password={this.state.password} handleEmail={this.handlePassword} />
      </View>
    );
  }
}

export default Login;