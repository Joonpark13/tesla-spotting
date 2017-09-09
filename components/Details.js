import React, { Component } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Container, Content, Text as DefaultText, ActionSheet } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { NavigationActions } from 'react-navigation';

import firebase from './firebase';
import { helperStyles, parseDate } from './helpers';
import Hero from './Hero';

const styles = StyleSheet.create({
  map: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  detailsText: {
    marginBottom: 8,
  },
});

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.navigation.state.params.key,
      uid: null,
      teslaData: null,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.getTeslaData = this.getTeslaData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.model} Details`,
    headerStyle: helperStyles.header,
    headerTintColor: 'white',
    headerTitleStyle: helperStyles.headerTitle,
  });

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid });
        this.getTeslaData();
      }
    });
  }

  getTeslaData() {
    // Find database object holding tesla data using key
    const ref = firebase.database().ref(`users/${this.state.uid}/teslas`);
    ref.on('value', (snapshot) => {
      snapshot.forEach((tesla) => {
        if (tesla.key === this.state.key) {
          this.setState({ teslaData: tesla.val() });
        }
      });
    });
  }

  handleEdit() {
    this.props.navigation.navigate('Spotting', { ...this.state.teslaData });
  }

  handleDelete() {
    // Remove item from firebase db
    firebase.database().ref(`users/${this.state.uid}/teslas/${this.state.key}`).remove();
    // Navgiate back to Teslas list
    this.props.navigation.dispatch(NavigationActions.back());
  }

  handleDeleteConfirm() {
    ActionSheet.show({
      options: ['Delete', 'Cancel'],
      cancelButtonIndex: 1,
      title: 'Are you sure you want to delete this Tesla?',
    }, clickedIndex => {
      if (clickedIndex === '0') this.handleDelete();
    });
  }

  render() {
    return (
      <Container>
        <Content>
          {this.state.teslaData &&
            <View>
              <Hero heroImage={this.state.teslaData.heroImage} model={this.state.teslaData.model} />
              <View style={styles.contentContainer}>
                <DefaultText style={styles.detailsText}>{this.state.teslaData.location}</DefaultText>
                <DefaultText style={styles.detailsText}>{parseDate(this.state.teslaData.time)}</DefaultText>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: this.state.teslaData.latitude,
                    longitude: this.state.teslaData.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: this.state.teslaData.latitude,
                      longitude: this.state.teslaData.longitude,
                    }}
                  />
                </MapView>
              </View>

              <View style={helperStyles.buttonContainer}>
                <View style={helperStyles.button}>
                  <Button title="Edit" color="black" onPress={this.handleEdit} />
                </View>
                <View style={helperStyles.button}>
                  <Button title="Delete" color="black" onPress={this.handleDeleteConfirm} />
                </View>
              </View>
            </View>
          }
        </Content>
      </Container>
    );
  }
}

export default Details;
