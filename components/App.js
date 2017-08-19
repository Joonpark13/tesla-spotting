import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';
import MainNav from './MainNav';
import Splash from './Splash';
import Spotting from './Spotting';

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
  Spotting: {
    screen: Spotting,
  },
});

export default App;
