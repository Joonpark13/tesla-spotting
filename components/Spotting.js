import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob';

import firebase from './firebase';

class Spotting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '',
      details: '',
      uid: null,
      image: null,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleImage = this.handleImage.bind(this);
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

    // Firebase Storage upload using react-native-fetch-blob
    if (this.state.image) {
      // Store original window variables to put back later
      const tempXMLHttpRequest = window.XMLHttpRequest;
      const tempBlob = window.Blob;


      // https://github.com/wkh237/react-native-fetch-blob/issues/83
      const polyfill = RNFetchBlob.polyfill;

      // use react-native-fetch-blob's polyfill for firebase upload
      window.XMLHttpRequest = polyfill.XMLHttpRequest;
      window.Blob = polyfill.Blob;

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${this.state.uid}/${navProps.time}.jpg`);

      Blob.build(RNFetchBlob.wrap(this.state.image.path), { type: 'image/jpeg' })
        .then(blob => imageRef.put(blob)).then((snapshot) => {
          // Put back the original window variables
          window.XMLHttpRequest = tempXMLHttpRequest;
          window.Blob = tempBlob;

          const backAction = NavigationActions.back();
          this.props.navigation.dispatch(backAction);
        });

    }
    // Firebase database write
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
      // TODO: Wait for both firebase actions to complete before going back
      // TODO: implement loading circle while actions take place
    });
  }

  handleImage(image) {
    this.setState({ image });
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

        {this.state.image &&
          <Image source={{ uri: this.state.image.mediaUri }} style={{ width: '100%', height: 100 }} />
        }
        <Button
          title="Add a Photo"
          onPress={() => {
            this.props.navigation.navigate('Camera', {
              handleImage: this.handleImage,
            });
          }}
        />
        <Button title="Save" onPress={this.handleSave} />
      </View>
    );
  }
}

export default Spotting;
