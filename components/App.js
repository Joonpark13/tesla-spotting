import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Root } from 'native-base';

import SignUp from './SignUp';
import Login from './Login';
import MainNav from './MainNav';
import Splash from './Splash';
import Spotting from './Spotting';
import Details from './Details';

const App = StackNavigator({
  Home: { screen: Splash },
  SignUp: { screen: SignUp },
  Login: { screen: Login },
  MainNav: {
    screen: MainNav,
    navigationOptions: {
      header: null,
    },
  },
  Spotting: { screen: Spotting },
  Details: { screen: Details },
});

export default () => (
  <Root>
    <App />
  </Root>
);
