import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

import firebase from './firebase';

class Spotting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '',
      details: '',
      uid: null,
    };

    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        uid: user.uid,
      });
    });
  }

  handleSave() {
    const navProps = this.props.navigation.state.params;

    const db = firebase.database();
    const ref = db.ref(`users/${this.state.uid}/teslas`);
    ref.push().set({
      model: navProps.model,
      latitude: navProps.latitude,
      longitude: navProps.longitude,
      time: navProps.time,
      color: this.state.color,
      details: this.state.details,
    }).then(() => {
      const backAction = NavigationActions.back();
      this.props.navigation.dispatch(backAction);
    });
  }

  render() {
    const navProps = this.props.navigation.state.params;
    return (
      <View>
        <Text>{navProps.model}</Text>
        <Text>Latitude</Text>
        <Text>{navProps.latitude}</Text>
        <Text>Longitude</Text>
        <Text>{navProps.longitude}</Text>
        <Text>Time</Text>
        <Text>{navProps.time}</Text>

        <Text>Color</Text>
        <TextInput
          onChangeText={text => this.setState({ color: text })}
          value={this.state.color}
        />
        <Text>Details</Text>
        <TextInput
          onChangeText={text => this.setState({ details: text })}
          value={this.state.details}
          multiline
          numberOfLines={4}
        />

        <Button title="Save" onPress={this.handleSave} />
      </View>
    );
  }
}

export default Spotting;
