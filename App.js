import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { HomeScreen } from './Pages/Home'
import { SettingsScreen } from './Pages/Settings'
import { DiaryScreen } from './Pages/Diary'
import getSpotifyToken from './assets/getSpotifyToken';
//import TrackPlayer from 'react-native-track-player'; // Import the TrackPlayer module
import React, { useEffect, useState } from 'react';

//Create Tab Navigator
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const theme = {
    ...DefaultTheme,
    colors: {
      secondaryContainer: "#dee0e7",
      primary: "#273043",
      secondary: "#9197AE"
    },
  };

  const fetchToken = async () => {
    const token = await getSpotifyToken();
    setSpotifyToken(token);
  };

  useEffect(() => {
    fetchToken();
    //TrackPlayer.setupPlayer().then(() => {
    //  console.log('TrackPlayer is ready');
    //});
    //return () => {
    // Clean up resources when the component unmounts
    //TrackPlayer.destroy();
    //};
  }, []);

  return (
    <PaperProvider theme={theme}>
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
          <Tab.Screen name="Home">
            {(props) => <HomeScreen {...props} spotifyToken={spotifyToken} />}
          </Tab.Screen>
          <Tab.Screen name="Diary" initialParams={{ spotifyToken: spotifyToken }} component={DiaryScreen} />
          <Tab.Screen name="Settings" initialParams={{ spotifyToken: spotifyToken }} component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
