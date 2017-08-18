import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';
import MainNav from './MainNav';

const App = StackNavigator({
  Home: { screen: SignUp },
  Login: { screen: Login },
  MainNav: {
    screen: MainNav,
    navigationOptions: {
      header: null,
    },
  },
});

export default App;
