import React, { Component } from 'react';
import { Platform, Text, TouchableHighlight } from 'react-native';
import { Container, Header, Left, Body, Title, Button, Content, Card, CardItem, Icon } from 'native-base';

import firebase from './firebase';

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
        {Platform.OS === 'android' &&
          <Header>
            <Left style={{ flex: 0.15 }}>
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Teslas</Title>
            </Body>
          </Header>
        }

        <Content>
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
                    <Text>{tesla.location}</Text>
                    <Text>{datetime.toDateString()}</Text>
                  </CardItem>
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
