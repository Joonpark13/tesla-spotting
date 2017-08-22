import React, { Component } from 'react';
import { Platform, Text, Image, TouchableHighlight } from 'react-native';
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
              <TouchableHighlight
                key={tesla.key}
                onPress={() => {
                  this.props.navigation.navigate('Details', { key: tesla.key });
                }}
              >
                <Card>
                  <CardItem>
                    <Text>{tesla.model}</Text>
                    <Text>{tesla.color}</Text>
                    <Text>{datetime.toDateString()}</Text>
                  </CardItem>
                  {tesla.image &&
                    <CardItem cardBody>
                      <Image source={{ uri: tesla.image.mediaUri }} style={{ width: '100%', height: 100 }} />
                    </CardItem>
                  }
                </Card>
              </TouchableHighlight>
            );
          })}
        </Content>
      </Container>
    );
  }
}

export default Teslas;
