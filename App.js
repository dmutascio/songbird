import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { HomeScreen } from './Pages/Home'
import { SettingsScreen } from './Pages/Settings'
import { DiaryScreen } from './Pages/Diary'

//Create Tab Navigator
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "#dee0e7";
  return (
    <NavigationContainer>
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
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }
            else if (route.name === 'Diary') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarLabel: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Diary" component={DiaryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
