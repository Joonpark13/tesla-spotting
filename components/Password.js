import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import { passwordValidation, helperStyles } from './helpers';

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordValid: true,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(pass) {
    this.props.handlePassword(pass);

    this.setState({ passwordValid: pass === '' || passwordValidation(pass) });
  }


  render() {
    return (
      <View>
        {!this.state.passwordValid &&
          <Text style={helperStyles.errorText}>
            Passwords must be longer than 4 characters
          </Text>
        }
        <TextInput
          style={Platform.OS === 'ios' ? helperStyles.iOSInput : undefined}
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={this.handlePasswordChange}
          value={this.password}
        />
      </View>
    );
  }
}

export default Password;
