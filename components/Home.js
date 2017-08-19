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
import modelX from '../images/x.jpg';
import roadster from '../images/roadster.jpg';
import model3 from '../images/3.jpg';

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

  handleSpot(name) {
    navigator.geolocation.getCurrentPosition((location) => {
      this.props.navigation.navigate('Spotting', {
        model: name,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        time: Date.now(),
      });
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
          <ModelCard image={modelS} name="Model S" handleSpot={() => this.handleSpot('Model S')} />
          <ModelCard image={modelX} name="Model X" handleSpot={() => this.handleSpot('Model X')} />
          <ModelCard image={roadster} name="Roadster" handleSpot={() => this.handleSpot('Roadster')} />
          <ModelCard image={model3} name="Model 3" handleSpot={() => this.handleSpot('Model 3')} />
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
