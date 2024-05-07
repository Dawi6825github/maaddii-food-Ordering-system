import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');
const Header = ({title, icon, count, onClickIcon}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {icon && (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              onClickIcon();
            }}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.count}>
            <Text style={{color: '#383439'}}>{count ? count : '0'}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    height: 60,
    width: width,
    elevation: 5,
    backgroundColor: '#296321',

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#b9d6c1',
  },
  icon: {
    width:30,
    height: 30,
  },
  count: {
    backgroundColor: '#f18401',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 3,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
