import { View, Text,Button ,Image, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native'
import styles from './styles'
// import mainLogo from '../assets/mainLogo.png'
import mainLogo from '../assets/signUp.png'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const LoginScreen = (props) => {
  const navigation=useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit()
  {
     console.log(email,password);
     const userData={
      email,password
     }
     axios.post("http://172.18.13.213:5001/login",userData)
     .then(res=>{
      console.log(res.data);
      if(res.data.status=="ok")
      {
        Alert.alert("Logged in Succesfull!!");
        AsyncStorage.setItem("token",res.data.data);
        AsyncStorage.setItem("isLoggedIn",JSON.stringify(true));
        setEmail("");
        setPassword("");
        navigation.navigate("User");
      }
      else{
        Alert.alert("User doesn't Exist");
      }
    });
  }
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}>
    <View>
      <View style={styles.loginContainer}>
      <Image style={styles.logo}  source={mainLogo} />
    </View>
    <View  style={styles.loginContainer}>
      <Text style={styles.text_header}>Login!!</Text>
      </View>
      <View style={styles.action}>
        <TextInput value={email} placeholder='Email' style={styles.textInput}  onChange={e => setEmail(e.nativeEvent.text)}/>
      </View>
      <View style={styles.action}>
        <TextInput value={password}   placeholder='Password' style={styles.textInput} onChange={e => setPassword(e.nativeEvent.text)} />
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.inBut} onPress={()=>handleSubmit()}>
          <View><Text style={styles.textSign}>Log in</Text></View>

        </TouchableOpacity>

        <View style={{padding:15}}>
          <Text style={{fontSize:14,fontWeight:'bold',color:'#919191'}}>----or Continue as----</Text>
        </View>
        <TouchableOpacity style={styles.inBut} onPress={()=>{navigation.navigate("Register")}}>
          <View><Text style={styles.textSign}>Sign Up</Text></View>

        </TouchableOpacity>

      </View>
    </View>
    </ScrollView>
    
  )
}

export default LoginScreen