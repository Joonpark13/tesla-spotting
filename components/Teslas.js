import React, { Component } from 'react';
import { Platform, Text, Image } from 'react-native';
import { Container, Content, Card, CardItem } from 'native-base';

import firebase from './firebase';
import AndroidToolbar from './AndroidToolbar';

class Teslas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teslas: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.teslaListener(user.uid);
      }
    });
  }

  teslaListener(uid) {
    const ref = firebase.database().ref(`users/${uid}/teslas`);
    ref.on('value', (snapshot) => {
      const teslas = [];

      snapshot.forEach((tesla) => {
        teslas.push({ key: tesla.key, ...tesla.val() });
      });

      this.setState({ teslas });
    });
  }

  render() {
    return (
      <Container>
        <Content>
          {Platform.OS === 'android' &&
            <AndroidToolbar
              title="Teslas"
              navOpen={() => this.props.navigation.navigate('DrawerOpen')}
            />
          }

          {this.state.teslas.map((tesla) => {
            const datetime = new Date(tesla.time);
            return (
              <Card key={tesla.key}>
                <CardItem>
                  <Text>{tesla.model}</Text>
                  <Text>{datetime.toDateString()}</Text>
                  <Text>{tesla.color}</Text>
                  <Text>{tesla.details}</Text>
                </CardItem>
                {tesla.image &&
                  <CardItem cardBody>
                    <Image source={{ uri: tesla.image.mediaUri }} style={{ width: '100%', height: 100 }} />
                  </CardItem>
                }
              </Card>
            );
          })}
        </Content>
      </Container>
    );
  }
}

export default Teslas;
