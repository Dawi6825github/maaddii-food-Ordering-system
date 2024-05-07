import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity ,ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item details

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const foodCollection = await firestore().collection('items').get();
        const foods = foodCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSearchResults(foods);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const foodCollection = await firestore().collection('items')
        .where('name', '>=', query)
        .where('name', '<=', query + '\uf8ff')
        .get();
      const foods = foodCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSearchResults(foods);
    } catch (error) {
      console.error('Error searching food items:', error);
    }
  };

  const handleItemClick = (item) => {
    // Set selected item to display its details
    setSelectedItem(item);
  };


  const renderFoodItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View style={styles.foodItem}>
        <Text style={styles.foodItemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search food items..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchResults}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
      />
      {selectedItem && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsLabel}>Selected Item Details:</Text>
          <Text style={styles.detailsText}>Name: {selectedItem.name}</Text>
          <Text style={styles.detailsText}>Price: {selectedItem.price}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 4,
    elevation:4,
    marginBottom: 8,
    padding: 14,
    color: '#333',
    borderRadius: 4,
  },
  foodItem: {
    backgroundColor: '#9dd5c2',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 27,
    borderRadius: 10,
  },
  foodItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 10,
    padding: 100,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 5,
    
  },
  detailsLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 25,
    paddingTop:-30,
    marginLeft:-55,
    color:'black'
  },
  detailsText:{
    color:'black',
    marginLeft:-55,
  }
});

export default Search;  