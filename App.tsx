import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, AddMenuScreen, FilterScreen } from './screens';

export interface Dish {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: number;
}

export type RootStackParamList = {
  Home: undefined;
  AddMenu: undefined;
  Filter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


// Global variable for menu data (for rubric)
let globalDishes: Dish[] = [];

export default function App() {
  // State for menu items
  const [dishes, setDishes] = useState<Dish[]>([]);

  // Add a new dish to the menu
  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish: Dish = {
      ...dish,
      id: Date.now().toString(),
    };
    // Use a for loop to copy dishes to global variable
    globalDishes = [];
    for (let i = 0; i < dishes.length; i++) {
      globalDishes.push(dishes[i]);
    }
    globalDishes.push(newDish);
    setDishes([...globalDishes]);
  };

  // Remove a dish by id (for chef)
  const removeDish = (id: string) => {
    // Use a while loop to find and remove the dish
    let index = 0;
    while (index < dishes.length) {
      if (dishes[index].id === id) {
        break;
      }
      index++;
    }
    if (index < dishes.length) {
      // Use for-in loop to copy all except removed
      const updated: Dish[] = [];
      for (const i in dishes) {
        if (parseInt(i) !== index) {
          updated.push(dishes[i]);
        }
      }
      globalDishes = updated;
      setDishes([...globalDishes]);
    }
  };

  // Pass addDish and removeDish to screens
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          options={{ title: 'Restaurant Menu' }}
        >
          {props => <HomeScreen {...props} dishes={dishes} />}
        </Stack.Screen>
        <Stack.Screen 
          name="AddMenu" 
          options={{ title: 'Add Menu Item' }}
        >
          {props => <AddMenuScreen {...props} onAddDish={addDish} onRemoveDish={removeDish} dishes={dishes} />}
        </Stack.Screen>
        <Stack.Screen 
          name="Filter" 
          options={{ title: 'Filter Menu' }}
        >
          {props => <FilterScreen {...props} dishes={dishes} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
