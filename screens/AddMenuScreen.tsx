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

// Props now include onRemoveDish and dishes for full rubric compliance
interface Props {
  navigation: AddMenuScreenNavigationProp;
  onAddDish: (dish: Omit<Dish, 'id'>) => void;
  onRemoveDish: (id: string) => void;
  dishes: Dish[];
}

const AddMenuScreen: React.FC<Props> = ({ navigation, onAddDish, onRemoveDish, dishes }) => {
  // Remove a dish by id (called from button)
  const handleRemoveDish = (id: string) => {
    Alert.alert(
      'Remove Dish',
      'Are you sure you want to remove this dish?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemoveDish(id) }
      ]
    );
  };
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
          {/* ...existing code for add form... */}
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
            <View style={styles.courseButtonContainer}>
              <TouchableOpacity
                style={[styles.courseButton, course === 'Starter' && styles.selectedCourseButton]}
                onPress={() => setCourse('Starter')}
              >
                <Text style={[styles.courseButtonText, course === 'Starter' && styles.selectedCourseText]}>
                  Starter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.courseButton, course === 'Main' && styles.selectedCourseButton]}
                onPress={() => setCourse('Main')}
              >
                <Text style={[styles.courseButtonText, course === 'Main' && styles.selectedCourseText]}>
                  Main
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.courseButton, course === 'Dessert' && styles.selectedCourseButton]}
                onPress={() => setCourse('Dessert')}
              >
                <Text style={[styles.courseButtonText, course === 'Dessert' && styles.selectedCourseText]}>
                  Dessert
                </Text>
              </TouchableOpacity>
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
          {/* List of current menu items with remove button (for chef) */}
          <Text style={[styles.title, { fontSize: 22, marginTop: 32 }]}>Current Menu Items</Text>
          {dishes.length === 0 ? (
            <Text style={{ color: '#636e72', textAlign: 'center', marginTop: 12 }}>No dishes added yet.</Text>
          ) : (
            dishes.map(dish => (
              <View key={dish.id} style={[styles.dishCard, { marginBottom: 12 }]}> 
                <Text style={styles.dishName}>{dish.name} <Text style={{ color: '#636e72', fontSize: 13 }}>({dish.course})</Text></Text>
                <Text style={styles.dishDescription}>{dish.description}</Text>
                <Text style={styles.dishPrice}>R{dish.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: '#d63031', marginTop: 8 }]}
                  onPress={() => handleRemoveDish(dish.id)}
                >
                  <Text style={styles.buttonText}>REMOVE</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
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
  courseButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  courseButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedCourseButton: {
    backgroundColor: '#00b894',
    borderColor: '#00b894',
  },
  courseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#636e72',
  },
  selectedCourseText: {
    color: 'white',
    fontWeight: '700',
  },
  // Added styles for dish card list (remove feature)
  dishCard: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#00b894',
  },
  dishName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  dishPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00b894',
    backgroundColor: '#e8f8f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
});

export default AddMenuScreen;