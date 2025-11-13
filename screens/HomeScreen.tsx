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
  // Function to calculate average price for a given course using for loop (rubric requirement)
  const calculateAveragePrice = (course: 'Starter' | 'Main' | 'Dessert') => {
    let total = 0;
    let count = 0;
    for (let i = 0; i < dishes.length; i++) {
      if (dishes[i].course === course) {
        total += dishes[i].price;
        count++;
      }
    }
    if (count === 0) return '0.00';
    return (total / count).toFixed(2);
  };

  // Render each dish item card
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

  // Main screen layout
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
            <Text style={styles.emptyText}>No dishes added yet</Text>
            <Text style={styles.emptySubtext}>Add your first menu item to get started!</Text>
          </View>
        ) : (
          <FlatList
            data={dishes}
            renderItem={renderDishItem}
            keyExtractor={(item) => item.id}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
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
    backgroundColor: '#f5f7fa',
  },
  statsContainer: {
    backgroundColor: '#6c5ce7',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  totalItemsText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  averagePricesContainer: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2d3436',
    letterSpacing: 0.3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceText: {
    fontSize: 15,
    color: '#636e72',
    fontWeight: '600',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    margin: 16,
    marginTop: 0,
    marginBottom: 0,
  },
  flatList: {
    flex: 1,
    marginBottom: 16,
  },
  dishCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#00b894',
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    flex: 1,
    letterSpacing: 0.3,
  },
  dishPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00b894',
    backgroundColor: '#e8f8f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dishDescription: {
    fontSize: 15,
    color: '#636e72',
    marginBottom: 12,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  courseContainer: {
    alignSelf: 'flex-start',
  },
  courseText: {
    fontSize: 13,
    color: '#6c5ce7',
    backgroundColor: '#f1f0ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    paddingTop: 8,
    gap: 12,
    backgroundColor: '#f5f7fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#00b894',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#00b894',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default HomeScreen;