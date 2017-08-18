import { DrawerNavigator } from 'react-navigation';

import Spot from './Spot';

const MainNav = DrawerNavigator({
  Home: {
    screen: Spot,
  },
});

export default MainNav;
