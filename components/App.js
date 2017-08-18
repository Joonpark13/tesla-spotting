import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';
import Spot from './Spot';

const App = StackNavigator({
  Home: { screen: SignUp },
  Login: { screen: Login },
  Spot: { screen: Spot },
});

export default App;
