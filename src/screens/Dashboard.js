import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Items from '../tabs/Items';
import Transactions from '../tabs/Transactions';
import Add from '../tabs/Add';
import Orders from '../tabs/Orders';
import Notifications from '../tabs/Notifications';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Transactions />
      ) : selectedTab == 2 ? (
        <Add />
      ) : selectedTab == 3 ? (
        <Orders />
      ) : (
        <Notifications />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../images/items.png')}
            style={[
              styles.bottomTabImg,
              {
                width: 30,
                height: 30,
                tintColor: selectedTab == 0 ? '#860f98' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../images/transaction.png')}
            style={[
              styles.bottomTabImg,
              {
                width: 30,
                height: 30,
                tintColor: selectedTab == 1 ? '#0d9b18' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../images/add.png')}
            style={[
              styles.bottomTabImg,
              {
                width: 35,
                height: 35,
                tintColor: selectedTab == 2 ? '#a20d6f' : 'black',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../images/orders.png')}
            style={[
              styles.bottomTabImg,
              {
                width: 30,
                height: 30,
                tintColor: selectedTab == 3 ? 'red' : 'black'},
            ]}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={require('../images/notification.png')}
            style={[
              styles.bottomTabImg,
              {
                width: 30,
                height: 30,
                tintColor: selectedTab == 4 ? '#d9e50b' : 'black'},
            ]}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
  bottomTab: {
    height: '100%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  bottomTabImg: {
    width: 24,
    height: 24,
  },
});
