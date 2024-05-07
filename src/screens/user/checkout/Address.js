// import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// const Address = ({navigation}) => {
//   const [addressList, setAddressList] = useState([]);
//   const isFocused = useIsFocused();
//   const [selectedAddress, setSelectedAddress] = useState('');
//   useEffect(() => {
//     getAddressList();
//   }, [isFocused]);
//   const getAddressList = async () => {
//     const userId = await AsyncStorage.getItem('USERID');
//     const addressId = await AsyncStorage.getItem('ADDRESS');
//     const user = await firestore().collection('users').doc(userId).get();
//     let tempDart = [];
//     tempDart = user._data.address;
//     tempDart.map(item => {
//       if (item.addressId == addressId) {
//         item.selected = true;
//       } else {
//         item.selected = false;
//       }
//     });
//     setAddressList(tempDart);
//   };
//   const saveDeafultAddress = async item => {
//     await AsyncStorage.setItem('ADDRESS', item.addressId);
//     let tempDart = [];
//     tempDart = addressList;
//     tempDart.map(itm => {
//       if (itm.addressId == item.addressId) {
//         itm.selected = true;
//       } else {
//         itm.selected = false;
//       }
//     });

//     let temp = [];

//     tempDart.map(item => {
//       temp.push(item);
//     });
//     setAddressList(temp);
//   };
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={addressList}
//         renderItem={({item, index}) => {
//           return (
//             <View
//               style={[
//                 styles.addressItem,
//                 {marginBottom: index == addressList.length - 1 ? 100 : 10},
//               ]}>
//               <View>
//                 <Text   style={styles.bt} >{'Street: ' + item.street}</Text>
//                 <Text  style={styles.bt}>{'City: ' + item.city}</Text>
//                 <Text  style={styles.bt}>{'Pincode: ' + item.pincode}</Text>
//                 <Text style={styles.bt}>{'Mobile: ' + item.mobile}</Text>
//               </View>
//               {item.selected == true ? (
//                 <Text>default</Text>
//               ) : (
//                 <TouchableOpacity
//                   style={styles.btn}
//                   onPress={() => {
//                     saveDeafultAddress(item);
//                   }}>
//                   <Text style={{color: 'black'}}>Set Default</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           );
//         }}
//       />
//       <TouchableOpacity
//         style={styles.addNewBtn}
//         onPress={() => {
//           navigation.navigate('AddNewAddress');
//         }}>
//         <Text style={styles.btnText}>Add New Address</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Address;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   addNewBtn: {
//     width: '70%',
//     height: 50,
//     backgroundColor: '#bc6fde',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     borderRadius: 14,
//   },
//   btnText: {
   
//     color: '#374751',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   addressItem: {
//     width: '90%',
//     height:120,  
//     backgroundColor: '#b9d1e2',
//     elevation: 50,
//     alignSelf: 'center',
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 20,
//     borderTopEndRadius:70,
//     borderBottomRightRadius:0,
//     alignItems:'center'
//   },
//   btn: {
//     backgroundColor: '#9a4cc8',
//     height: 40,
//     borderRadius:56,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 110,
//   },
//   bt:{
//     color:"black",
//     marginLeft:-5,
//   }
// });



import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const Address = ({navigation}) => {
  const [addressList, setAddressList] = useState([]);
  const isFocused = useIsFocused();
  const [selectedAddress, setSelectedAddress] = useState('');
  useEffect(() => {
    getAddressList();
  }, [isFocused]);
  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS');
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    tempDart.map(item => {
      if (item.addressId == addressId) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setAddressList(tempDart);
  };
  const saveDeafultAddress = async item => {
    await AsyncStorage.setItem('ADDRESS', item.addressId);
    let tempDart = [];
    tempDart = addressList;
    tempDart.map(itm => {
      if (itm.addressId == item.addressId) {
        itm.selected = true;
      } else {
        itm.selected = false;
      }
    });

    let temp = [];

    tempDart.map(item => {
      temp.push(item);
    });
    setAddressList(temp);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.addressItem,
                {marginBottom: index == addressList.length - 1 ? 100 : 10},
              ]}>
              <View>
                <Text>{'Street: ' + item.street}</Text>
                <Text>{'City: ' + item.city}</Text>
                <Text>{'Pincode: ' + item.pincode}</Text>
                <Text>{'Mobile: ' + item.mobile}</Text>
              </View>
              {item.selected == true ? (
                <Text>default</Text>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    saveDeafultAddress(item);
                  }}>
                  <Text style={{color: '#fff'}}>Set Default</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddNewAddress');
        }}>
        <Text style={styles.btnText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNewBtn: {
    width: '90%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  addressItem: {
    width: '90%',

    backgroundColor: '#fff',
    elevation: 4,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems:'center'
  },
  btn: {
    backgroundColor: 'green',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});
