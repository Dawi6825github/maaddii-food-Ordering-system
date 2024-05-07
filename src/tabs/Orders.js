// import {View, Text, StyleSheet, Image} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import firestore from '@react-native-firebase/firestore';
// import Header from '../screens/common/Header';
// import {FlatList} from 'react-native-gesture-handler';
// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   useEffect(() => {
//     getAllOrders();
//   }, []);
//   const getAllOrders = async () => {
//     firestore()
//       .collection('orders')
//       .get()
//       .then(querySnapshot => {
//         console.log('Total orders: ', querySnapshot.size);
//         let tempData = [];
//         querySnapshot.forEach(documentSnapshot => {
//           console.log(
//             'User ID: ',
//             documentSnapshot.id,
//             documentSnapshot.data(),
//           );
//           tempData.push({
//             orderId: documentSnapshot.id,
//             data: documentSnapshot.data().data,
//           });
//         });
//         console.log(JSON.stringify(tempData));
//         setOrders(tempData);
//       });
//   };
//   return (
//     <View style={styles.container}>
//       <Header title={'All Orders'} />
//       <FlatList
//         data={orders}
//         keyExtractor={({item, index}) => index}
//         renderItem={({item, index}) => {
//           console.log('item' + item);
//           return (
//             <View style={styles.orderItem}>
//               <FlatList
//                 data={item.data.items}
//                 renderItem={({item, index}) => {
//                   return (
//                     <View style={styles.itemView}>
//                       <Image
//                         source={{uri: item.data.imageUrl}}
//                         style={styles.itemImage}
//                       />
//                       <View>
//                         <Text style={styles.nameText}>{item.data.name}</Text>
//                         <Text style={styles.nameText}>
//                           {'Price: ' +
//                             item.data.discountPrice +
//                             ', Qty: ' +
//                             item.data.qty}
//                         </Text>
//                       </View>
//                     </View>
//                   );
//                 }}
//               />
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default Orders;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   orderItem: {
//     width: '90%',
//     borderRadius: 10,
  
//     elevation: 5,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//   },
//   itemView: {
//     margin: 10,
//     width: '100%',
//     flexDirection: 'row',
//   },
//   nameText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginLeft: 20,
//     marginTop: 5,
//   },
// });






import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../screens/common/Header';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore().collection('orders')
      .onSnapshot(querySnapshot => {
        const tempData = [];
        querySnapshot.forEach(doc => {
          tempData.push({
            orderId: doc.id,
            data: doc.data(), // Fetch entire document data
          });
        });
        setOrders(tempData);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="All Orders" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orders.map(order => (
          <View key={order.orderId} style={styles.orderItem}>
            <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
            <Text style={styles.orderDetails}>Address: {order.data.address}</Text>
            <Text style={styles.orderDetails}>Cart:</Text>
            <View style={styles.cartItemsContainer}>
              {order.data.cart && order.data.cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.priceText}>
                      Price: {item.discountPrice}, Qty: {item.qty}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  orderItem: {
    width: '90%',
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: 'black345',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  cartItemsContainer: {
    marginTop: 5,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  itemDetails: {
    marginLeft: 10,
    color:'black'
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  priceText: {
    fontSize: 14,
    color: 'black',
  },
});

export default Orders;




