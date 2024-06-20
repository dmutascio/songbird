import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../Pages/Home'
import { TestScreen } from '../Pages/Test'
const Tab = createMaterialBottomTabNavigator();

function HomeTabs({ navigation, route, spotifyToken }) {
  return (
    <Tab.Navigator
      activeColor="#9197AE"
      inactiveColor="#273043"
      barStyle={{ backgroundColor: '#F5F5F5' }}
      indicatorStyle={{ backgroundColor: 'blue' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-musical-note'
              : 'ios-musical-note-outline';
          } else if (route.name === 'Test') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarLabel: false,
      })}>
      <Tab.Group>
        <Tab.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              spotifyToken={spotifyToken}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Test" component={TestScreen} />
      </Tab.Group>
    </Tab.Navigator>
  );
}

export { HomeTabs };
