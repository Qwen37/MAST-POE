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
      'Success!', 
      'Dish added successfully',
      [
        {
          text: 'Add Another',
          style: 'default',
        },
        {
          text: 'View Menu',
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
    backgroundColor: '#f5f7fa',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: '#2d3436',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    fontWeight: '500',
  },
  descriptionInput: {
    height: 80,
    paddingTop: 16,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  picker: {
    height: 56,
    color: '#2d3436',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#00b894',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#00b894',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cancelButtonText: {
    color: '#636e72',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default AddMenuScreen;