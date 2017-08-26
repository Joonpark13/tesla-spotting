import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  ScrollView,
} from 'react-native';

import firebase from './firebase';
import ModelCard from './ModelCard';
import IOSStatusSpacer from './IOSStatusSpacer';
import AndroidToolbar from './AndroidToolbar';

import modelS from '../images/s.jpg';
import modelSHero from '../images/s_spotting.jpg';
import modelX from '../images/x.jpg';
import modelXHero from '../images/x_spotting.jpg';
import roadster from '../images/roadster.jpg';
import roadsterHero from '../images/roadster_spotting.jpg';
import model3 from '../images/3.jpg';
import model3Hero from '../images/3_spotting.jpg';

const styles = StyleSheet.create({
  modelSelect: {
    height: '100%',
  },
  spacer: {
    height: 50,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      temp: '',
    };

    this.handleSpot = this.handleSpot.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  handleSpot(name, heroImage) {
    // Return true if location component is any of the types specified in
    // the array componentsWanted
    const isAddressType = (component, wantedTypes) =>
      wantedTypes.some(wantedType => component.types.indexOf(wantedType) !== -1);

    navigator.geolocation.getCurrentPosition((location) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyD1_qN7OsGhZFDuKjCEM0Aowdugpz38zIY`)
        .then(response => response.json())
        .then((json) => {
          // See https://developers.google.com/maps/documentation/geocoding/start?csw=1 for data shape
          const locationComponents = json.results[0].address_components;
          // Format location as "Street, City, State"
          const wantedTypes = ['route', 'sublocality', 'administrative_area_level_1'];
          const formattedLocation = locationComponents
            .filter(component => isAddressType(component, wantedTypes))
            .map(component => component.short_name)
            .join(', ');

          this.props.navigation.navigate('Spotting', {
            model: name,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            location: formattedLocation,
            time: Date.now(),
            firstSpotting: true,
            heroImage,
          });
        });
    }, (error) => {
      console.error(error); // TODO: Replace with error modal
    }, {
      enableHighAccuracy: false,
    });
  }

  render() {
    return (
      <View>
        <IOSStatusSpacer />
        {Platform.OS === 'android' &&
          <AndroidToolbar
            title="Tesla Spotting"
            navOpen={() => this.props.navigation.navigate('DrawerOpen')}
          />
        }

        <ScrollView style={styles.modelSelect}>
          <ModelCard image={modelS} name="Model S" handleSpot={() => this.handleSpot('Model S', modelSHero)} />
          <ModelCard image={modelX} name="Model X" handleSpot={() => this.handleSpot('Model X', modelXHero)} />
          <ModelCard image={roadster} name="Roadster" handleSpot={() => this.handleSpot('Roadster', roadsterHero)} />
          <ModelCard image={model3} name="Model 3" handleSpot={() => this.handleSpot('Model 3', model3Hero)} />
          {Platform.OS === 'android' && <View style={styles.spacer} />}
        </ScrollView>
      </View>
    );
  }
}

Home.navigationOptions = {
  header: null,
};

export default Home;
