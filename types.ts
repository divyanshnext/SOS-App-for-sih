import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define your stack param list
export type RootStackParamList = {
  Login: undefined; // No parameters expected for Login
  Form: undefined; // No parameters expected for Form
};

// Define the type for the navigation prop for LoginScreen
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

// Combine the navigation and route props
export type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};
