import React from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native';

const LoginOption = (props) => (
  <TouchableHighlight>
    <View style={[styles.container, { backgroundColor: props.bgColor }]}>
      <Image source={props.img} style={styles.icon} />
      <Text style={[styles.text, { color: props.textColor }]}>Log in with {props.optionName}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 220,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    shadowOpacity: 1, // iOS
    shadowColor: 'rgba(0,0,0,0.2)', // iOS
    shadowOffset: { width: 0, height: 1 }, // iOS
    shadowRadius: 2, // iOS
    elevation: 2, // Android
  },
  text: {
    paddingLeft: 16
  },
});

export default LoginOption;
