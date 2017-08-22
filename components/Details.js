import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';
import { Container, Content } from 'native-base';

import firebase from './firebase';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teslaData: null,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.getTeslaData = this.getTeslaData.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getTeslaData(user.uid);
      }
    });
  }

  getTeslaData(uid) {
    const navProps = this.props.navigation.state.params;

    const ref = firebase.database().ref(`users/${uid}/teslas`);
    ref.on('value', (snapshot) => {
      snapshot.forEach((tesla) => {
        if (tesla.key === navProps.key) {
          this.setState({ teslaData: tesla.val() });
        }
      });
    });
  }

  handleEdit() {
    this.props.navigation.navigate('Spotting', { ...this.state.teslaData });
  }

  render() {
    return (
      <Container>
        <Content>
          {this.state.teslaData &&
            <View>
              <Button title="Edit" onPress={this.handleEdit} />
              <Text>{this.state.teslaData.model}</Text>
            </View>
          }
        </Content>
      </Container>
    );
  }
}

export default Details;