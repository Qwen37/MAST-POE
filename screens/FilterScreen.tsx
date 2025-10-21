import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Dish } from '../App';

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Filter'>;

interface Props {
  navigation: FilterScreenNavigationProp;
  dishes: Dish[];
}

const FilterScreen: React.FC<Props> = ({ navigation, dishes }) => {
  const [selectedCourse, setSelectedCourse] = useState<'All' | 'Starter' | 'Main' | 'Dessert'>('All');

  // Filter dishes based on selected course using filter() method as required
  const filteredDishes = selectedCourse === 'All' 
    ? dishes 
    : dishes.filter(dish => dish.course === selectedCourse);

  const renderDishItem = ({ item }: { item: Dish }) => (
    <View style={styles.dishCard}>
      <View style={styles.dishHeader}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.dishDescription}>{item.description}</Text>
      <View style={styles.courseContainer}>
        <Text style={styles.courseText}>{item.course}</Text>
      </View>
    </View>
  );

  const CourseButton = ({ course, title }: { course: typeof selectedCourse, title: string }) => (
    <TouchableOpacity
      style={[
        styles.courseButton,
        selectedCourse === course && styles.selectedCourseButton
      ]}
      onPress={() => setSelectedCourse(course)}
    >
      <Text style={[
        styles.courseButtonText,
        selectedCourse === course && styles.selectedCourseButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <Text style={styles.title}>Filter by Course</Text>
        <View style={styles.buttonRow}>
          <CourseButton course="All" title="All" />
          <CourseButton course="Starter" title="Starters" />
          <CourseButton course="Main" title="Mains" />
          <CourseButton course="Dessert" title="Desserts" />
        </View>
      </View>

      {/* Results Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Showing {filteredDishes.length} of {dishes.length} dishes
          {selectedCourse !== 'All' && ` (${selectedCourse})`}
        </Text>
      </View>

      {/* Filtered Dishes List */}
      <View style={styles.listContainer}>
        {filteredDishes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {dishes.length === 0 
                ? 'No menu items added yet' 
                : `No ${selectedCourse.toLowerCase()} dishes found`
              }
            </Text>
            <Text style={styles.emptySubtext}>
              {dishes.length === 0 
                ? 'Add some dishes to see them here'
                : 'Try selecting a different course'
              }
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredDishes}
            renderItem={renderDishItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>

      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  filterContainer: {
    backgroundColor: 'white',
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  courseButton: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCourseButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  courseButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedCourseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '500',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    margin: 16,
    marginTop: 8,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  dishCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  courseContainer: {
    alignSelf: 'flex-start',
  },
  courseText: {
    fontSize: 12,
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  backButtonContainer: {
    padding: 16,
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterScreen;