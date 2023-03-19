import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ViewAreaScreen from '../screens/ViewArea';
import ResolveScreen from '../screens/ResolveScreen';
import JoinScreen from '../screens/JoinScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
      </Stack.Navigator>
    );
}

export default AuthStack;