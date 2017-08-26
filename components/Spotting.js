import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob';

import firebase from './firebase';
import { helperStyles, parseDate, colors } from './helpers';

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 100,
  },
  heroTitleWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  infoTextContainer: {
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 18,
    marginTop: 16,
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  button: {
    marginTop: 16,
  },
});

class Spotting extends Component {
  constructor(props) {
    super(props);

    this.navProps = props.navigation.state.params;

    // When the user spots a Tesla for the first time, this component
    // will be opened from the Home component, with no color or details
    // populated. When the user edits a Tesla, this component will be
    // opened from the Teslas component, with the previous information
    // populated.
    this.state = {
      color: this.navProps.firstSpotting ? '' : this.navProps.color,
      details: this.navProps.firstSpotting ? '' : this.navProps.details,
      uid: null,
      image: null,
      saving: false,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.model} Spotted`,
    headerStyle: helperStyles.header,
    headerTintColor: 'white',
    headerTitleStyle: helperStyles.headerTitle,
  });

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

    const db = firebase.database();
    const ref = db.ref(`users/${this.state.uid}/teslas`);

    const backAction = NavigationActions.back();

    if (this.navProps.firstSpotting) {
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
        const imageRef = storageRef.child(`images/${this.state.uid}/${this.navProps.time}.jpg`);

        storagePromise = Blob.build(RNFetchBlob.wrap(this.state.image.path), { type: 'image/jpeg' })
          .then(blob => imageRef.put(blob)).then(() => {
            // Put back the original window variables
            window.XMLHttpRequest = tempXMLHttpRequest;
            window.Blob = tempBlob;
          });
      }

      // Firebase database write
      const dbPromise = ref.push().set({
        model: this.navProps.model,
        latitude: this.navProps.latitude,
        longitude: this.navProps.longitude,
        location: this.navProps.location,
        time: this.navProps.time,
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
          if (childSnapshot.val().time === this.navProps.time) {
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
    return (
      <ScrollView>
        <View>
          <Image source={this.navProps.heroImage} style={styles.heroImage} />
          <View style={styles.heroTitleWrapper}>
            <Text style={styles.heroTitle}>{this.navProps.model}</Text>
          </View>
        </View>

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{this.navProps.location}</Text>
          <Text style={styles.infoText}>{parseDate(this.navProps.time)}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Color (optional)"
            onChangeText={text => this.setState({ color: text })}
            value={this.state.color}
            underlineColorAndroid="black"
          />
          <TextInput
            placeholder="Details (optional)"
            onChangeText={text => this.setState({ details: text })}
            value={this.state.details}
            underlineColorAndroid="black"
            // TODO: Make this input multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          {this.state.image &&
            <Image source={{ uri: this.state.image.mediaUri }} style={{ width: '100%', height: 100 }} />
          }
          {this.navProps.firstSpotting &&
            <View style={styles.button}>
              <Button
                color={colors.teslaRed}
                title={this.state.image ? "Change Photo" : "Take a Photo"}
                onPress={() => {
                  this.props.navigation.navigate('Camera', {
                    handleImage: this.handleImage,
                  });
                }}
              />
            </View>
          }
          <View style={styles.button}>
            {this.state.saving ?
              <ActivityIndicator />
              :
              <Button
                color={colors.teslaRed}
                title="Save"
                onPress={this.handleSave}
              />
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Spotting;
