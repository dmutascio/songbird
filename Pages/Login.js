import { SafeAreaView, FlatList, View, StyleSheet, Text, Image } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login } from '../apiCalls/login'
import { authorize } from 'react-native-app-auth';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '@env';


const Login = ({ navigation, route, setLogin }) => {
  // const CLIENT_ID = process.env.CLIENT_ID;
  // const CLIENT_SECRET = process.env.CLIENT_SECRET;
  // const REDIRECT_URL = process.env.REDIRECT_URL;
  const theme = useTheme();

  const handlePress = async () => {
    // await login()
    const config = {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUrl: 'songbird:/home',
      scopes: ['user-read-email', 'playlist-modify-public'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      }
    };
    const authState = await authorize(config);
    setLogin(true)
    console.log(authState)
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ marginBottom: 200 }}>
        <Image source={require('../assets/SoulFood.png')} style={{ width: 200, height: undefined, aspectRatio: 2, marginBottom: 100 }} />
        <Button mode="contained" onPress={handlePress} buttonColor='#1db954'>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: -5 }}>
            <Icon name='spotify' size={45} style={{ flex: 0 }} />
            <Text style={{ marginLeft: 30, fontSize: 18, fontFamily: 'Avenir Next', fontStyle: 'italic', fontWeight: 600 }}>LOGIN</Text>
          </View>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export { Login };
