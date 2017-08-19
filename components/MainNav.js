import { Platform } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';

import Home from './Home';
import Profile from './Profile';
import Teslas from './Teslas';

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
    })
  );

export default MainNav;
