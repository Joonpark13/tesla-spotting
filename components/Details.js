import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content } from 'native-base';

class Details extends Component {
  render() {
    const navProps = this.props.navigation.state.params;
    return (
      <Container>
        <Content>
          <Text>{navProps.model}</Text>
        </Content>
      </Container>
    );
  }
}

export default Details;