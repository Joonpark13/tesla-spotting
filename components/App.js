import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';

const App = StackNavigator({
  Home: { screen: SignUp },
  Login: { screen: Login },
});

export default App;
