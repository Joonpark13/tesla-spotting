import React, { Component } from 'react';
import { StyleSheet, Platform, Text, TouchableHighlight, View } from 'react-native';
import { StyleProvider, Container, Header, Left, Body, Title, Button, Content, Card, CardItem, Icon, H3 } from 'native-base';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import firebase from './firebase';
import { parseDate } from './helpers';

const styles = StyleSheet.create({
  content: {
    marginVertical: 6,
  },
  cardContainer: {
    marginHorizontal: 6,
  },
  cardItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardTitle: {
    lineHeight: 24,
  },
  cardInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

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
      <StyleProvider style={getTheme(platform)}>
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

          <Content style={styles.content}>
            {this.state.teslas.map((tesla) => {
              return (
                <TouchableHighlight
                  key={tesla.key}
                  onPress={() => {
                    this.props.navigation.navigate('Details', { key: tesla.key });
                  }}
                  style={styles.cardContainer}
                >
                  <Card>
                    <CardItem style={styles.cardItem}>
                      <H3 style={styles.cardTitle}>{tesla.color ? `${tesla.color} ${tesla.model}` : tesla.model}</H3>
                      <View style={styles.cardInfo}>
                        <Text>{tesla.location}</Text>
                        <Text>{parseDate(tesla.time)}</Text>
                      </View>
                    </CardItem>
                  </Card>
                </TouchableHighlight>
              );
            })}
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default Teslas;
