import {View, Text, StyleSheet , Image } from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);
  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    console.log(email);
    if (email !== null) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SelectLogin');
    }
  };
  return (
    <View style={styles.container}>


  
       <View  style={{flex:4,justifyContent:'center'}}>
        <Swiper autoplay={true }>
          <View style={styles.slide1}>
            <Image  
              source={require("../images/sp.jpg")}
              style ={{height:"100%", width:"100%"}}
             />

          </View>   
          <View style={styles.slide2}>
           <Image  
             source={require("../images/splash.jpg")}
             style ={{height:"100%", width:"100%"}}
            />

           </View>
           <View style={styles.slide3}>
               <Image  
               source={require("../images/splash2.jpg")}
              style ={{height:"100%", width:"100%"}}
            />

          </View>
          <View style={styles.slide3}>
           <Image  
             source={require("../images/aynet.jpeg")}
             style ={{height:"100%", width:"100%"}}
            />

           </View>
        </Swiper>
    </View> 
   {/* {/*  */}



      <Text style={styles.logo}>MAADDII FOOD</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#6c27b2',
  },
  slide1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#9DD6EB"
  },
  slide2:{
      flex:1,
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:'#97CAE5',
  },

  slide3:{
    fle:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#9288D9',
  },
});
