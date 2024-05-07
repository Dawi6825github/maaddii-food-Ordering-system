import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import {translation}from '../utils'
import 'firebase/auth';


const firebaseConfig = {

  apiKey:  "AIzaSyAWA3MS75gS63Jjz52uYTy_J5v30fzs6zs",
  authDomain: "foodapp-513c0.firebaseapp.com",
  projectId: "foodapp-513c0",
  storageBucket: "foodapp-513c0.appspot.com",
  messagingSenderId: "159552705979",
  appId: "1:159552705979:android:a058061d29b3a6923da09e"
  
};
//firebase.initializeApp(firebaseConfig);

  const Login = ({navigation}) => {         
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLang, setSelectedLang] = useState(0);


    // const Bethel = 'Bethel';
    //  useEffect(()=>{
    //  firestore()
    // .collection("admin")
    //  .add({
    //  email:"bethel@gmail.com",
    //  password: Bethel,
    // })
    // .then(()=>{
    //  console.log("admin added!");
    // });
    // });


  const adminLogin = async () => {
    const users = await firestore().collection('admin').get();
    console.log(users.password + '  ' + password);
    if (
     email == users.docs[0]._data.email &&
      password == users.docs[0]._data.password
    ) {
     await AsyncStorage.setItem('EMAIL', email);
    navigation.navigate('Dashboard');
     } else {
      alert('wrong email/pass');
    }
 };




 const getLang = async () => {
  console.log(await AsyncStorage.getItem('LANG'));
  setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        
      {selectedLang == 0
          ? translation[2].English
          : selectedLang == 1
          ? translation[2].Amharic
          : selectedLang == 2
          ? translation[2].Oromic
          : selectedLang == 3
      }

             
       </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Email Id'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password '}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Please Enter Data');
          }
        }}>
        <Text style={styles.btnText}>
          
        {selectedLang == 0
          ? translation[1].English
          : selectedLang == 1
          ? translation[1].Amharic
          : selectedLang == 2
          ? translation[1].Oromic
          : selectedLang == 3
          ? translation[3].Punjabi
          : selectedLang == 4
          ? translation[3].Urdu
          : null}
    
          
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#480b51',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 12,
    width: '90%',
    color:'#480b51'
  },

  loginBtn: {
    backgroundColor: '#a642b5',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
