import React from 'react';
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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  dishes: Dish[];
}

const HomeScreen: React.FC<Props> = ({ navigation, dishes }) => {
  // Calculate average prices per course using filter() and reduce() as required
  const calculateAveragePrice = (course: 'Starter' | 'Main' | 'Dessert') => {
    const courseDishes = dishes.filter(dish => dish.course === course);
    if (courseDishes.length === 0) return 0;
    
    const total = courseDishes.reduce((sum, dish) => sum + dish.price, 0);
    return (total / courseDishes.length).toFixed(2);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Total Menu Items Count */}
      <View style={styles.statsContainer}>
        <Text style={styles.totalItemsText}>
          Total Menu Items: {dishes.length}
        </Text>
      </View>

      {/* Average Prices per Course */}
      <View style={styles.averagePricesContainer}>
        <Text style={styles.sectionTitle}>Average Prices per Course</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>Starters: R{calculateAveragePrice('Starter')}</Text>
          <Text style={styles.priceText}>Mains: R{calculateAveragePrice('Main')}</Text>
          <Text style={styles.priceText}>Desserts: R{calculateAveragePrice('Dessert')}</Text>
        </View>
      </View>

      {/* Menu Items List */}
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Menu Items</Text>
        {dishes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No menu items added yet</Text>
            <Text style={styles.emptySubtext}>Tap "Add Menu Item" to get started</Text>
          </View>
        ) : (
          <FlatList
            data={dishes}
            renderItem={renderDishItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddMenu')}
        >
          <Text style={styles.buttonText}>Add Menu Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.buttonText}>Filter Menu</Text>
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
  statsContainer: {
    backgroundColor: '#4CAF50',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  totalItemsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  averagePricesContainer: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  menuContainer: {
    flex: 1,
    margin: 16,
    marginTop: 0,
  },
  flatList: {
    flex: 1,
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
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;