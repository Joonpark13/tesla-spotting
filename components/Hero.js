import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 100,
  },
  heroTitleWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

const Hero = props => (
  <View>
    <Image source={props.heroImage} style={styles.heroImage} />
    <View style={styles.heroTitleWrapper}>
      <Text style={styles.heroTitle}>{props.model}</Text>
    </View>
  </View>
);

export default Hero;
