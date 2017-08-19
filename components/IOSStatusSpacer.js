import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

const styles = StyleSheet.create({
  iOSStatusSpacer: {
    height: 20,
  },
});

const IOSStatusSpacer = () => (
  <View>
    {Platform.OS === 'ios' && <View style={styles.iOSStatusSpacer} />}
  </View>
);

export default IOSStatusSpacer;
