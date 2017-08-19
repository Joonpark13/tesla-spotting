import React from 'react';
import { StyleSheet, ToolbarAndroid } from 'react-native';

import { colors } from './helpers';
import menuIcon from '../images/ic_menu_white_24dp_1x.png';

const styles = StyleSheet.create({
  toolbar: {
    height: 50,
    backgroundColor: colors.teslaRed,
    elevation: 3,
  },
});

const AndroidToolbar = props => (
  <ToolbarAndroid
    title={props.title}
    titleColor="white"
    navIcon={menuIcon}
    style={styles.toolbar}
    onIconClicked={props.navOpen}
  />
);

export default AndroidToolbar;
