import { View, Text,Button ,Image, TextInput, TouchableOpacity,ScrollView, Alert} from 'react-native'
import styles from './styles'
// import mainLogo from '../assets/mainLogo.png'
import mainLogo from '../assets/signUp.png'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import axios from "axios"
const RegisterScreen = (props) => {
  const navigation=useNavigation();
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  function handleSubmit()
  {
    const userData={
      name,email,mobile,password
    }
    if(nameVerify && emailVerify && passwordVerify && mobileVerify )
    {

    
    axios.post("http://172.18.13.213:5001/register",userData)
    .then(res=>{
      console.log(res.data);
      if(res.data.status=="ok")
      {
        Alert.alert("Registered Succesfull!!");
        navigation.navigate("Login");
      }
      else
      {
        Alert.alert(JSON.stringify(res.data));
      }
    
    })
    .catch(e=>console.log(e));
    }
    else
    {
      Alert.alert("Fill Mandatory Details");
    }
  }



  function handleName(e)
  {
    const nameVar=e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);
    if(nameVar.length>1)
    {
      setNameVerify(true);
    }
  }
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }
  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(false);
    if (/[6-9]{1}[0-9]{9}/.test(mobileVar)) {
      setMobile(mobileVar);
      setMobileVerify(true);
    }
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  }



  return (
   <ScrollView  contentContainerStyle={{flexGrow: 1}}
   keyboardShouldPersistTaps={'always'} >
     <View>
      <View style={styles.logoContainer}>
      <Image style={styles.register_logo}  source={mainLogo} />
    </View>
    <View  style={styles.registerContainer}>
      <Text style={styles.text_header}>Register!!</Text>
      </View>
      <View style={styles.action}>
        <TextInput placeholder='Name' style={styles.textInput} onChange={e=>handleName(e)}/>
      </View>
      {name.length<1?null:nameVerify?null:(
        <Text style={{marginLeft:20,color:'red'}}>Name Should be more than 1 characters.</Text>
      )}
      <View style={styles.action}>
        <TextInput placeholder='Email' style={styles.textInput}  onChange={e => handleEmail(e)}/>
      </View>
      {email.length < 1 ? null : emailVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Enter Proper Email Address
            </Text>
          )}
      <View style={styles.action}>
        <TextInput placeholder='Mobile' style={styles.textInput}     onChange={e => handleMobile(e)}
              maxLength={10}/>
      </View>
      {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Phone number with 6-9 and remaing 9 digit with 0-9
            </Text>
          )}
      <View style={styles.action}>
        <TextInput placeholder='Password' style={styles.textInput}  onChange={e => handlePassword(e)}/>
      </View>
      {password.length < 1 ? null : passwordVerify ? null : (
            <Text
              style={{
                marginLeft: 20,
                color: 'red',
              }}>
              Uppercase, Lowercase, Number and 6 or more characters.
            </Text>
          )}
      <View style={styles.button}>
        <TouchableOpacity style={styles.inBut} onPress={()=>handleSubmit()}>
          <View><Text style={styles.textSign}>Register</Text></View>

        </TouchableOpacity>

        <View style={{padding:15}}>
          <Text style={{fontSize:15,fontWeight:'bold',color:'#919191'}}>----or----</Text>
        </View>
        <TouchableOpacity style={styles.inBut} onPress={()=>{navigation.navigate("Login")}}>
          <View><Text style={styles.textSign}>Go to Login Page</Text></View>

        </TouchableOpacity>

      </View>
    </View>
   </ScrollView>
    
  )
}

export default RegisterScreen