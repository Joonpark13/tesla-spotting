import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';
import MainNav from './MainNav';
import Splash from './Splash';
import Spotting from './Spotting';
import CameraView from './CameraView';

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
  Camera: { screen: CameraView },
});

export default App;
