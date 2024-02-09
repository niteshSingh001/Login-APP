import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserScreen from "./screens/UserScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
 function App() {
  const Stack=createNativeStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen}  />
      <Stack.Screen name="User" component={UserScreen}  />
     </Stack.Navigator>
    
    </NavigationContainer>
  );
}
export default App;