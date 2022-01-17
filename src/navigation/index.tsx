import {createSwitchNavigator} from '@react-navigation/compat';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TabNavigator';



export const AppRouter = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: DrawerNavigator,
  
  },
  {
    initialRouteName: 'Auth',
  },
);
