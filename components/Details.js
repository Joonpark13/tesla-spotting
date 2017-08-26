import React, { Component } from 'react';
import { Text, Button, View, Modal } from 'react-native';
import { Container, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { NavigationActions } from 'react-navigation';

import firebase from './firebase';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.navigation.state.params.key,
      uid: null,
      teslaData: null,
      modalOpen: false,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.getTeslaData = this.getTeslaData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

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

  render() {
    return (
      <Container>
        <Content>
          {this.state.teslaData &&
            <View>
              <Button title="Edit" onPress={this.handleEdit} />
              <Button title="Delete" onPress={() => this.setState({ modalOpen: true })} />
              <Text>{this.state.teslaData.model}</Text>
              <Text>{this.state.teslaData.location}</Text>
              <MapView
                style={{ width: '100%', height: 500 }}
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
          }

          <Modal
            visible={this.state.modalOpen}
            onRequestClose={() => {}}
          >
            <View>
              <Text>Are you sure you want to delete this Tesla?</Text>
              <Button title="Delete" onPress={this.handleDelete} />
              <Button title="Cancel" onPress={() => this.setState({ modalOpen: false })} />
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}

export default Details;
