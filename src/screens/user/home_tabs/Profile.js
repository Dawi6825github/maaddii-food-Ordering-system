import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    contact: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = await AsyncStorage.getItem('USERID');
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setProfileData(userData);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };

  const handleSave = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      const userRef = firestore().collection('users').doc(userId);

      const userDoc = await userRef.get();

      if (userDoc.exists) {
        
        await userRef.update({
          name: profileData.name,
          email: profileData.email,
          contact: profileData.contact,
        });
        console.log('Profile updated successfully!');
      } else {
        
        await userRef.set({
          name: profileData.name,
          email: profileData.email,
          contact: profileData.contact,
        });
        console.log('Profile created successfully!');
      }
    } catch (error) {
      console.error('Error updating/creating profile:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => handleChange('email', text)}
          />

          <Text style={styles.label}>Contact</Text>
          <TextInput
            style={styles.input}
            value={profileData.contact}
            onChangeText={(text) => handleChange('contact', text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 45,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'#521a7d'
  },
  form: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
    color:'#8d8b8e'
  },
  input: {
    borderWidth: 2,
    borderColor: '#7a83e2',
    elevation:5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color:'#610994'
  },
  button: {
    backgroundColor: '#7b24bf',
    paddingVertical: 10,
    marginTop:15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#d3ade9',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile;
