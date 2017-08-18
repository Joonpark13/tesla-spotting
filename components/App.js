import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';
import MainNav from './MainNav';
import Splash from './Splash';

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
});

export default App;
