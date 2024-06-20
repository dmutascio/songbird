import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { Text } from 'react-native';
import { HomeTabs } from './Tabs/HomeTabs'
import { SwiperScreen } from './Pages/SwiperScreen'
import { Login } from './Pages/Login'
import getSpotifyToken from './assets/getSpotifyToken';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [userId, setUserId] = useState('')
  const [spotifyToken, setSpotifyToken] = useState('');
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
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="HomeTabs"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <HomeTabs
                    {...props}
                    spotifyToken={spotifyToken}
                  />
                )}
              </Stack.Screen>
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen
                name="Swipe"
                options={{ headerShown: false }}>
                {(props) => (
                  <SwiperScreen
                    {...props}
                    spotifyToken={spotifyToken}
                  />
                )}
              </Stack.Screen>
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Login setLogin={setLoggedIn} />
      )}
    </PaperProvider>
  );
}
