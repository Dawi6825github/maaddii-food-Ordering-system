// import {View, Text} from 'react-native';
// import React from 'react';

// const Wishlist = () => {
//   return (
//     <View>
//       <Text>Wishlist</Text>
//     </View>
//   );
// };

// export default Wishlist;



import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FeedbackScreen = ({ orderId, orderItems }) => {
  const [feedbackList, setFeedbackList] = useState([]);

  const submitFeedback = async () => {
    try {
      if (!orderId) {
        throw new Error('Order ID is missing');
      }
      // Check if any feedback is missing
      const missingFeedback = feedbackList.find(item => !item.feedbackText);
      if (missingFeedback) {
        throw new Error(`Feedback for item ${missingFeedback.itemId} is missing`);
      }
  
      // Submit feedback for each item
      await Promise.all(feedbackList.map(async feedback => {
        await firestore().collection('feedback').add({
          orderId: orderId,
          itemId: feedback.itemId,
          feedbackText: feedback.feedbackText,
          rating: feedback.rating,
          createdAt: firestore.FieldValue.serverTimestamp()
        });
      }));
      console.log('Feedback submitted successfully');
      // Optionally, you can navigate to a success screen or perform other actions here
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };

  const renderItemFeedback = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        <TouchableOpacity onPress={() => updateRating(item.itemId, 'star')}>
          <Text style={item.rating === 'star' ? styles.selectedRating : styles.unselectedRating}>⭐️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateRating(item.itemId, 'heart')}>
          <Text style={item.rating === 'heart' ? styles.selectedRating : styles.unselectedRating}>❤️</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your feedback here..."
        value={item.feedbackText}
        onChangeText={text => updateFeedback(item.itemId, text)}
      />
    </View>
  );

  const updateFeedback = (itemId, text) => {
    setFeedbackList(prevFeedbackList => {
      const updatedFeedbackList = prevFeedbackList.map(feedback => {
        if (feedback.itemId === itemId) {
          return { ...feedback, feedbackText: text };
        }
        return feedback;
      });
      return updatedFeedbackList;
    });
  };

  const updateRating = (itemId, rating) => {
    setFeedbackList(prevFeedbackList => {
      const updatedFeedbackList = prevFeedbackList.map(feedback => {
        if (feedback.itemId === itemId) {
          return { ...feedback, rating: rating };
        }
        return feedback;
      });
      return updatedFeedbackList;
    });
  };

  // Initialize feedbackList with orderItems
  useState(() => {
    if (orderItems) {
      const initialFeedbackList = orderItems.map(item => ({
        itemId: item.id,
        name: item.name,
        feedbackText: '',
        rating: null,
      }));
      setFeedbackList(initialFeedbackList);
    }
  }, [orderItems]);

  return (
    <View style={styles.container}>
      <FlatList
        data={feedbackList}
        renderItem={renderItemFeedback}
        keyExtractor={(item) => item.itemId}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit Feedback" onPress={submitFeedback} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
  },
  itemContainer: { 
    marginBottom: 40,
    color:'black'

  },
  itemLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'

  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    color:'black'
  },
  selectedRating: {
    fontSize: 24,
    marginRight: 10,
    color:'black'

  },
  unselectedRating: {
    fontSize: 24,
    marginRight: 10,
    opacity: 0.5,
    color:'black'

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color:'black'
    
  },
  buttonContainer: {
    marginTop: 20,
    color:'black'

  },
});

export default FeedbackScreen;



