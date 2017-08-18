import { Platform } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';

import Home from './Home';
import Profile from './Profile';

const MainNav = Platform.OS === 'ios'
  ? (
    TabNavigator({
      Home: {
        screen: Home,
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
      Profile: {
        screen: Profile,
      },
    })
  );

export default MainNav;
