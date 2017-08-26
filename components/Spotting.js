import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob';

import firebase from './firebase';

class Spotting extends Component {
  constructor(props) {
    super(props);

    const navProps = props.navigation.state.params;

    this.state = {
      color: navProps.firstSpotting ? '' : navProps.color,
      details: navProps.firstSpotting ? '' : navProps.details,
      uid: null,
      image: null,
      saving: false,
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
    // Show loading indicator
    this.setState({ saving: true });

    const navProps = this.props.navigation.state.params;

    const db = firebase.database();
    const ref = db.ref(`users/${this.state.uid}/teslas`);

    const backAction = NavigationActions.back();

    if (navProps.firstSpotting) {
      let storagePromise;

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

        storagePromise = Blob.build(RNFetchBlob.wrap(this.state.image.path), { type: 'image/jpeg' })
          .then(blob => imageRef.put(blob)).then(() => {
            // Put back the original window variables
            window.XMLHttpRequest = tempXMLHttpRequest;
            window.Blob = tempBlob;
          });
      }

      // Firebase database write
      const dbPromise = ref.push().set({
        model: navProps.model,
        latitude: navProps.latitude,
        longitude: navProps.longitude,
        location: navProps.location,
        time: navProps.time,
        color: this.state.color,
        details: this.state.details,
        image: this.state.image,
      });

      // Navgiate back once both the Firebase storage and database operations finish
      Promise.all([storagePromise, dbPromise]).then(() => {
        this.props.navigation.dispatch(backAction);
        this.setState({ saving: false });
      });
    } else {
      // Find corresponding data object in Firebase database
      // (time is unique for each data object)
      ref.once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().time === navProps.time) {
            const key = childSnapshot.key;
            const updateRef = db.ref(`users/${this.state.uid}/teslas/${key}`);
            updateRef.update({
              color: this.state.color,
              details: this.state.details,
            }).then(() => {
              this.props.navigation.dispatch(backAction);
              this.setState({ saving: false });
            });
          }
        });
      });
    }
  }

  handleImage(image) {
    this.setState({ image });
  }

  render() {
    const navProps = this.props.navigation.state.params;
    return (
      <View>
        <Text>{navProps.model}</Text>
        <Text>Location</Text>
        <Text>{navProps.location}</Text>
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
        {navProps.firstSpotting &&
          <Button
            title="Add a Photo"
            onPress={() => {
              this.props.navigation.navigate('Camera', {
                handleImage: this.handleImage,
              });
            }}
          />
        }
        {this.state.saving ?
          <ActivityIndicator />
          :
          <Button title="Save" onPress={this.handleSave} />
        }
      </View>
    );
  }
}

export default Spotting;
