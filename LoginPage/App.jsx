import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserScreen from "./screens/UserScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
 function App() {
  
  const [isLoggedIn,setIsLoggedIn]=useState(false);



 async function getData()
 {
   const data=await AsyncStorage.getItem("isLoggedIn");
   console.log(data,"at APP.jsx");
   setIsLoggedIn(data);
 }

 const LoginNav=()=>{
  const Stack=createNativeStackNavigator();
return (
  <Stack.Navigator initialRouteName="Login" screenOptions={{
    headerShown: false,
  }}>
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Register" component={RegisterScreen}  />
  <Stack.Screen name="User" component={UserScreen}  />
 </Stack.Navigator>
)

 }
  
 useEffect(()=>{
  getData();
 },[])
  const Stack=createNativeStackNavigator();
  return (

    <NavigationContainer>
  {isLoggedIn ? (
    <Stack.Navigator  screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  ) : 
    <LoginNav />
  }
</NavigationContainer>

  );
}
export default App;