import React from 'react';
import { Platform, Text } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import DrawerItems from 'react-navigation/src/views/Drawer/DrawerNavigatorItems';

import Home from './Home';
import Profile from './Profile';
import Teslas from './Teslas';
import { colors } from './helpers';

const MainNav = Platform.OS === 'ios'
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
      contentComponent: props => (
        <DrawerItems {...props} activeTintColor={colors.teslaRed} />
      ),
    })
  );

export default MainNav;
