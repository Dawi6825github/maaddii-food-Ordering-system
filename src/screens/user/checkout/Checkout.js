// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
// import {useIsFocused} from '@react-navigation/native';
// import RazorpayCheckout from 'react-native-razorpay';
// let userId = '';
// const Checkout = ({navigation}) => {
//   const [cartList, setCartList] = useState([]);
//   const isFocused = useIsFocused();

//   const [selectedAddress, setSelectedAddress] = useState('No Selected Address');
//   useEffect(() => {
//     getCartItems();
//     getAddressList();
//   }, [isFocused]);
//   const getCartItems = async () => {
//     userId = await AsyncStorage.getItem('USERID');
//     const user = await firestore().collection('users').doc(userId).get();
//     setCartList(user._data.cart);
//   };
//   const getAddressList = async () => {
//     const userId = await AsyncStorage.getItem('USERID');
//     const addressId = await AsyncStorage.getItem('ADDRESS');
//     const user = await firestore().collection('users').doc(userId).get();
//     let tempDart = [];
//     tempDart = user._data.address;
//     tempDart.map(item => {
//       if (item.addressId == addressId) {
//         setSelectedAddress(
//           item.street +
//             ',' +
//             item.city +
//             ',' +
//             item.pincode +
//             ',' +
//             item.mobile,
//         );
//       }
//     });
//   };

//   const getTotal = () => {
//     let total = 0;
//     cartList.map(item => {
//       total = total + item.data.qty * item.data.discountPrice;
//     });
//     return total;
//   };
//   const payNow = async () => {
//     const email = await AsyncStorage.getItem('EMAIL');
//     const name = await AsyncStorage.getItem('NAME');
//     const mobile = await AsyncStorage.getItem('MOBILE');
//     var options = {
//       description: 'Credits towards consultation',
//       image: require('../../../images/logo.png'),
//        currency: 'INR',
//       key: 'rzp_test_2VYHup8J177yIx',
//       amount: getTotal() * 100,
//       name: 'Food App',
//       order_id: '', //Replace this with an order_id created using Orders API.
//       prefill: {
//         email: email,
//         contact: mobile,
//         name: name,
//       },
//       theme: {color: '#EC9912'},
//     };
//     RazorpayCheckout.open(options)
//       .then(data => {
//         // handle success
       
//         navigation.navigate('OrderStatus', {
//           status: 'success',
//           paymentId: data.razorpay_payment_id,
//           cartList: cartList,
//           total: getTotal(),
//           address: selectedAddress,
//           userId: userId,
//           userName: name,
//           userEmail: email,
//           userMobile: mobile,
//         });
//       })
//       .catch(error => {
//         // handle failure
       
//         navigation.navigate('OrderStatus', {
//           status: '',
//         });
//       });
  

//   };
//   return (
//     <View style={styles.container}>
//       <View>
//         <FlatList
//           data={cartList}
//           renderItem={({item, index}) => {
//             return (
//               <View style={styles.itemView}>
//                 <Image
//                   source={{uri: item.data.imageUrl}}
//                   style={styles.itemImage}
//                 />
//                 <View style={styles.nameView}>
//                   <Text style={styles.nameText}>{item.data.name}</Text>
//                   <Text style={styles.descText}>{item.data.description}</Text>
//                   <View style={styles.priceView}>
//                     <Text style={styles.priceText}>
//                       {'$' + item.data.discountPrice}
//                     </Text>
//                     <Text style={styles.discountText}>
//                       {'$' + item.data.price}
//                     </Text>
//                   </View>
//                 </View>
//                 <Text style={styles.nameText}>{'Qty : ' + item.data.qty}</Text>
//               </View>
//             );
//           }}
//         />
//       </View>
//       <View style={styles.totalView}>
//         <Text style={styles.nameText}>Total</Text>
//         <Text style={styles.nameText}>{'$' + getTotal()}</Text>
//       </View>
//       <View style={styles.totalView}>
//         <Text style={styles.nameText}>Selected Address</Text>
//         <Text
//           style={styles.editAddress}
//           onPress={() => {
//             navigation.navigate('Address');
//           }}>
//           Change Address
//         </Text>
//       </View>
//       <Text
//         style={{
//           margin: 15,
//           width: '100%',
//           fontSize: 16,
//           color: '#000',
//           fontWeight: '600',
//         }}>
//         {selectedAddress}
//       </Text>
//       <TouchableOpacity
//         disabled={selectedAddress == 'No Selected Address' ? true : false}
//         style={[
//           styles.checkoutBtn,
//           {
//             backgroundColor:
//               selectedAddress == 'No Selected Address' ? '#e5c8e8' : '#d421e8',
//           },
//         ]}
//         onPress={() => {
//           if (selectedAddress !== 'No Selected Address') {
//             payNow()
//             navigation.navigate('OrderStatus', {
//               status: 'failed', // Or any other status you want to pass
//             });
//           }
//         }}>
//           <TouchableOpacity style={styles.chk}>
//               <Text style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
//                   Pay Now   {'$' + getTotal()}
//               </Text>
//           </TouchableOpacity>   
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Checkout;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   itemView: {
//     flexDirection: 'row',
//     width: '95%',
//     alignSelf: 'center',
//     backgroundColor: '#baa5c4',
//     elevation: 5,
//     marginTop: 10,
//     borderRadius: 10,
//     height: 110,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   itemImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 10,
//     margin: 5,
//   },
//   nameView: {
//     width: '30%',
//     margin: 10,
//   },
//   priceView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   nameText: {
//     fontSize: 15,
//     fontWeight: '500',
//     color:'black',
//     paddingRight:30,
//   },
//   descText: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   priceText: {
//     fontSize: 18,
//     color: '#660bae',
//     fontWeight: '700',
//   },
//   discountText: {
//     fontSize: 17,
//     fontWeight: '600',
//     textDecorationLine: 'line-through',
//     marginLeft: 5,
//   },
//   totalView: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//     paddingLeft: 20,
//     height: 50,
//     borderTopWidth: 0.8,
//     paddingRight: 20,
//     marginTop: 25,
//     alignItems: 'center',
//     borderTopColor: '#514954',
//   },
//   editAddress: {
//     color: '#8e05c9',
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop:-6,
//     marginLeft:-4,
//     marginRight:5,
//     textDecorationLine: 'underline',
//   },
//   checkoutBtn: {
//     width: '80%',
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: '#d421e8',
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
// // "react-native-razorpay": "^2.3.0",


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

const Checkout = ({ navigation }) => {
  const [cartList, setCartList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('No Selected Address');
  const isFocused = useIsFocused();

  useEffect(() => {
    getCartItems();
    getAddressList();
  }, [isFocused]);

  const getCartItems = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartList(user._data.cart);
  };

  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS');
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = user._data.address;
    tempDart.forEach(item => {
      if (item.addressId === addressId) {
        setSelectedAddress(`${item.street}, ${item.city}, ${item.pincode}, ${item.mobile}`);
      }
    });
  };

  const getTotal = () => {
    let total = 0;
    cartList.forEach(item => {
      total += item.data.qty * item.data.discountPrice;
    });
    return total;
  };

  const placeOrder = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const email = await AsyncStorage.getItem('EMAIL');
    const name = await AsyncStorage.getItem('NAME');
    const mobile = await AsyncStorage.getItem('MOBILE');
    const orderData = {
      userId: userId,
      userEmail: email,
      userName: name,
      userMobile: mobile,
      address: selectedAddress,
      total: getTotal(),
      cart: cartList,
      status: 'success',
      timestamp: firestore.FieldValue.serverTimestamp(),
    };
    await firestore().collection('orders').add(orderData);
    // Clear cart after placing order
   // await firestore().collection('users').doc(userId).update({ cart: [] });
    navigation.navigate('OrderStatus', {
      status: 'success',
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={cartList}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView}>
                <Image source={{ uri: item.data.imageUrl }} style={styles.itemImage} />
                <View style={styles.nameView}>
                  <Text style={styles.nameText}>{item.data.name}</Text>
                  <Text style={styles.descText}>{item.data.description}</Text>
                  <View style={styles.priceView}>
                    <Text style={styles.priceText}>{'$' + item.data.discountPrice}</Text>
                    <Text style={styles.discountText}>{'$' + item.data.price}</Text>
                  </View>
                </View>
                <Text style={styles.nameText}>{'Qty : ' + item.data.qty}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.nameText}>Total</Text>
        <Text style={styles.nameText}>{'$' + getTotal()}</Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.nameText}>Selected Address</Text>
        <Text
          style={styles.editAddress}
          onPress={() => {
            navigation.navigate('Address');
          }}>
          Change Address
        </Text>
      </View>
      <Text style={{ margin: 15, width: '100%', fontSize: 16, color: '#000', fontWeight: '600' }}>
        {selectedAddress}
      </Text>
      <TouchableOpacity
        disabled={selectedAddress === 'No Selected Address'}
        style={[
          styles.checkoutBtn,
          { backgroundColor: selectedAddress === 'No Selected Address' ? '#e5c8e8' : '#d421e8' },
        ]}
        onPress={() => {
          if (selectedAddress !== 'No Selected Address') {
            placeOrder();
          }
        }}>
        <Text style={{ color: '#000', fontSize: 18, fontWeight: '600' }}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#baa5c4',
    elevation: 5,
    marginTop: 10,
    borderRadius: 10,
    height: 110,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '30%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    paddingRight: 30,
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: '#660bae',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  totalView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    height: 50,
    borderTopWidth: 0.8,
    paddingRight: 20,
    marginTop: 25,
    alignItems: 'center',
    borderTopColor: '#514954',
  },
  editAddress: {
    color: '#8e05c9',
    fontSize: 16,
    fontWeight: '600',
    marginTop: -6,
    marginLeft: -4,
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  checkoutBtn: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#d421e8',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

