import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import { emailValidation, helperStyles } from './helpers';

class Email extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailValid: true,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(email) {
    this.props.handleEmail(email);

    // If there is already a timeout in process, clear it
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.timeout = null;

      if (email) {
        this.setState({ emailValid: emailValidation(email) });
      } else {
        // If field is empty, don't display error message
        this.setState({ emailValid: true });
      }
    }, 500); // half second wait after typing to validate
  }


  render() {
    return (
      <View>
        {!this.state.emailValid && <Text style={helperStyles.errorText}>Invalid Email</Text>}
        <TextInput
          style={Platform.OS === 'ios' ? helperStyles.iOSInput : undefined}
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={this.handleEmailChange}
          value={this.props.email}
        />
      </View>
    );
  }
}

export default Email;
