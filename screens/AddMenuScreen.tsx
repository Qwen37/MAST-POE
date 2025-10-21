import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Dish } from '../App';

type AddMenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMenu'>;

interface Props {
  navigation: AddMenuScreenNavigationProp;
  onAddDish: (dish: Omit<Dish, 'id'>) => void;
}

const AddMenuScreen: React.FC<Props> = ({ navigation, onAddDish }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [price, setPrice] = useState('');

  // Input validation function
  const validateInputs = () => {
    // Comprehensive input validation as per requirements
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a dish name');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return false;
    }
    if (!price.trim()) {
      Alert.alert('Validation Error', 'Please enter a price');
      return false;
    }
    
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price (number greater than 0)');
      return false;
    }
    
    return true;
  };

  const handleAddDish = () => {
    if (!validateInputs()) return;

    const newDish = {
      name: name.trim(),
      description: description.trim(),
      course,
      price: parseFloat(price),
    };

    onAddDish(newDish);
    
    // Reset form
    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    
    Alert.alert(
      'Success', 
      'Dish added successfully!',
      [
        {
          text: 'Add Another',
          style: 'default',
        },
        {
          text: 'Go to Menu',
          onPress: () => navigation.navigate('Home'),
          style: 'default',
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add New Menu Item</Text>
          
          {/* Dish Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dish Name *</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter dish name"
              placeholderTextColor="#999"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.textInput, styles.descriptionInput]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter dish description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Course Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(itemValue) => setCourse(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          {/* Price Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (R) *</Text>
            <TextInput
              style={styles.textInput}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddDish}
            >
              <Text style={styles.buttonText}>SAVE DISH</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  descriptionInput: {
    height: 80,
    paddingTop: 16,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddMenuScreen;