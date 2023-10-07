import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { Text } from 'react-native';
import { HomeScreen } from './Pages/Home'
import { SwiperScreen } from './Pages/SwiperScreen'
import { SettingsScreen } from './Pages/Settings'
import { DiaryScreen } from './Pages/Diary'
import { Login } from './Pages/Login'
import getSpotifyToken from './assets/getSpotifyToken';
import React, { useEffect, useState } from 'react';
//Create Tab Navigator
const Tab = createMaterialBottomTabNavigator();


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const [spotifyToken, setSpotifyToken] = useState('');
  const [swiperScreen, setSwiperScreen] = useState(false);
  const [selectedSongData, setSelectedSongData] = useState('');
  const theme = {
    ...DefaultTheme,
    colors: {
      secondaryContainer: '#dee0e7',
      primary: "#273043",
      secondary: "#9197AE"
    },
  };
  const linking = {
    prefixes: ['songbird:/'],
    config: {
      screens: {
        Home: 'home',
        Settings: 'oauth'
      },
    },
  };
  const fetchToken = async () => {
    const token = await getSpotifyToken();
    setSpotifyToken(token);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <PaperProvider theme={theme}>
      {loggedIn ? (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
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
            {swiperScreen ? (
              <Tab.Screen name="Home">
                {(props) => (
                  <SwiperScreen
                    {...props}
                    spotifyToken={spotifyToken}
                    //onClose={setSwiperScreen}
                    selectedSong={selectedSongData}
                  />
                )}
              </Tab.Screen>
            ) : (
              <Tab.Screen name="Home">
                {(props) => (
                  <HomeScreen
                    {...props}
                    spotifyToken={spotifyToken}
                    setSwiperScreen={setSwiperScreen}
                    setSelectedSongData={setSelectedSongData}
                  />
                )}
              </Tab.Screen>
            )}
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <Login setLogin={setLoggedIn} />
      )}
    </PaperProvider>
  );
}
