import React from 'react';
import { Platform } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { StyleProvider } from 'native-base';

import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import Home from './Home';
import Profile from './Profile';
import Teslas from './Teslas';

const Nav = Platform.OS === 'ios'
  ? (
    TabNavigator({
      Home: {
        screen: Home,
      },
      Teslas: {
        screen: Teslas,
      },
      Profile: {
        screen: Profile,
      },
    })
  ) : (
    DrawerNavigator({
      Home: {
        screen: Home,
      },
      Teslas: {
        screen: Teslas,
      },
      Profile: {
        screen: Profile,
      },
    }, {
      drawerWidth: 150,
    })
  );

const MainNav = () => (
  <StyleProvider style={getTheme(platform)}>
    <Nav />
  </StyleProvider>
);

export default MainNav;
