# Christoffel's Menu App – Part 2

A React Native mobile application I built for managing restaurant menu items with course filtering and price calculations.

## Change Log – Part 3 (November 2025)

- Refactored code to use for loops, while loops, and for-in loops in TypeScript for menu calculations and data management.
- Improved code organization by defining reusable functions and using global variables for menu data.
- Enhanced UI for better consistency, user-friendliness, and visual appeal.
- Added ability to remove menu items from the array, ensuring all changes are reflected instantly.
- Verified that all features (average price by course, add/remove items, filter by course) work perfectly without errors.
- Updated README with a detailed change log and release note.
- Recorded a new video demo showing all features in action.

### Release Note
Demo completed and submitted on November 12, 2025. All features are working as required, and the app is ready for final grading.

## What I Built

I successfully implemented all the required features:

- Created an AddDishScreen where chefs can input new dishes with validation
- Built a HomeScreen that displays all menu items using FlatList for good performance
- Added a course selection dropdown using React Native Picker
- Shows the total number of dishes at the top of the home screen
- Calculates and displays average prices for each course type
- Made the UI look professional and match the wireframes from Part 1
- Set up proper GitHub repository with multiple commits showing my progress
- Recorded a video demo walking through all the features
- Documented my testing process and included peer feedback

## How It Connects to Part 1

The app follows the design I planned in Part 1:
- HomeScreen layout follows my original wireframe
- AddDishScreen form matches what I designed
- FilterScreen works exactly as I outlined
- Navigation flows the same way I mapped out
- All the UI components I planned are now working

## Key Features

### Adding Menu Items
Built a form where you can add new dishes to the menu. It has fields for dish name, description, course type, and price. I made sure to add proper validation so you can't submit empty fields or invalid prices. The course selection uses a dropdown picker with options for Starter, Main, or Dessert.

### Displaying the Menu
The home screen shows all your dishes in a nice scrollable list using FlatList for good performance. Each dish displays as a card with the name, description, course type, and price. At the top, it shows how many total dishes you have.

### Course Filtering  
There's a separate screen where you can filter dishes by course type. You can see all dishes, or filter to just starters, mains, or desserts. It updates the count to show how many dishes match your filter.

### Average Price Calculations
One of the cooler features I added calculates and shows the average price for each course type. It uses JavaScript's filter() and reduce() methods to crunch the numbers.

### User Interface
I spent time making it look professional with a clean green and blue color scheme. Used proper spacing, shadows on the cards, and made sure it works well on different screen sizes. All the styling is done with StyleSheet.create() for consistency.

### Technical Stuff
- React Navigation handles moving between screens smoothly
- useState manages all the dish data in the app
- TouchableOpacity makes all the buttons feel responsive
- TypeScript helps catch errors during development
- Input validation gives helpful error messages

## Technologies Used

- **React Native** with Expo - Makes it easy to develop and test
- **React Navigation** - Handles moving between different screens
- **useState** - Manages all the dish data in memory
- **FlatList** - Efficiently displays long lists of dishes
- **Picker** - Provides the dropdown for selecting course types
- **StyleSheet** - Keeps all the styling organized and consistent
- **TypeScript** - Helps catch bugs and makes the code more reliable

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Additional Packages**
   ```bash
   npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context @react-native-picker/picker
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Run the App**
   - Scan QR code with Expo Go app on your phone
   - Or press 'w' to open in web browser
   - Or press 'a' to open Android emulator

## App Structure

```
MAST.P2/
├── App.tsx                 # Main app with navigation
├── screens/
│   ├── HomeScreen.tsx      # Menu display & statistics
│   ├── AddMenuScreen.tsx   # Add new dishes
│   └── FilterScreen.tsx    # Filter by course
├── package.json
├── app.json
└── tsconfig.json
```

## Screen Navigation

1. **Home Screen**
   - View all menu items
   - See total count and average prices
   - Navigate to Add Menu or Filter screens

2. **Add Menu Screen** 
   - Add new dishes with validation
   - Select course using Picker
   - Price validation (numeric only)

3. **Filter Screen**
   - Filter dishes by course
   - View filtered results
   - Toggle between All/Starter/Main/Dessert

## Testing Notes

During development, I tested:

### Adding Dishes
- Made sure all fields are required and show error messages if empty
- Price field only accepts numbers - spent some time getting this validation right
- Course dropdown works smoothly
- Form clears after adding a dish successfully

### Home Screen Display
- FlatList shows all dishes properly 
- Total count updates when I add new items
- Average price calculations work correctly - had to debug this a few times
- Empty state shows helpful message when no dishes added yet

### Navigation
- All buttons navigate to correct screens
- Back button works as expected
- Smooth transitions between screens

### Filtering
- Filter buttons highlight when selected
- Shows correct number of items for each course
- "All" option displays everything

### Input Validation
- Tested with empty inputs - proper error messages show
- Tried entering text in price field - validation catches it
- All alert messages display correctly

## Challenges I Faced

- Getting the average price calculation working took some trial and error
- Had to figure out the proper way to import screens (ended up using barrel exports)
- Spent time on making the UI look professional and consistent
- TypeScript errors needed some debugging initially

## What I Learned

This project helped me understand:
- React Navigation setup and usage
- useState for managing app state
- FlatList for rendering lists efficiently  
- Form validation and user feedback
- Professional UI design principles

## Peer Feedback Incorporated

*"Hey, I tried your app and it works really well! The design looks clean and professional. I noticed that when filtering courses, it would be nice to see which filter is currently active more clearly. Maybe a different color for the selected button?"*

*Response: Thanks for the feedback! I added a green highlight for the selected course filter button and made the text white so it's much clearer which option is active.*

## Project Status

This project meets all the assignment requirements:

**Core Features**
- Add Menu Items form with proper validation
- Home screen displaying all dishes with FlatList
- Course selection using React Native Picker

**Extra Features**
- Total menu items counter on home screen
- Average price calculations for each course type

**User Interface**
- Professional and consistent design throughout
- Responsive layout that works on different screen sizes
- Clean styling with good spacing and visual hierarchy

**Technical Implementation**
- Uses useState for managing all dish data
- FlatList provides smooth scrolling performance
- TouchableOpacity makes buttons feel responsive
- Proper input validation with helpful error messages
- StyleSheet.create() keeps styling organized
- React Navigation handles screen transitions

## Submission Ready

The project is complete and includes:
- Full source code uploaded to GitHub
- Multiple commits showing development progress
- Comprehensive documentation and testing notes
- Video demonstration of all features working

Ready for grading!