import React from 'react';
import { StyleSheet, TouchableHighlight, Image, View, Text } from 'react-native';

const styles = StyleSheet.create({
  modelImages: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  modelImageContainer: {
    width: '100%',
    height: 180,
  },
  modelImageCover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
});

const ModelCard = props => (
  <TouchableHighlight style={styles.modelImageContainer}>
    <View>
      <Image source={props.image} blurRadius={2} style={styles.modelImages} />
      <View style={styles.modelImageCover}>
        <Text style={styles.modelName}>{props.name}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

export default ModelCard;
