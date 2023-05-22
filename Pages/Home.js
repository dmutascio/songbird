import { Text, SafeAreaView, FlatList, View, Pressable } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import React, { useContext } from 'react';
import querySpotify from '../assets/querySpotify'

const HomeScreen = ({ navigation, route, spotifyToken }) => {
  const [songQuery, setSongQuery] = React.useState("");
  const [songs, setSongs] = React.useState([]);
  const theme = useTheme();

  const handleSongQueryChange = async (text) => {
    setSongQuery(text);
    if (text.length > 2) {
      const newSongs = await querySpotify(text, spotifyToken);
      setSongs(newSongs);
    }
    else {
      setSongs([]);
    }
  };

  const getSongComponent = (song) => {
    const artistNames = song['artists'].map(artist => artist.name);
    const artistNamesString = artistNames.join(", ");
    console.log(song)
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <View>
          <Text>{song['name']}</Text>
          <Text>{artistNamesString}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        style={{ marginHorizontal: 10 }}
        label="Song"
        //placeholder="song"
        outlineColor={theme.colors.secondary}
        value={songQuery}
        mode='outlined'
        onChangeText={handleSongQueryChange}
      />
      <FlatList
        data={songs}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => alert(JSON.stringify(item))}>
            {getSongComponent(item)}
          </Pressable>

        )}
      />
    </SafeAreaView>
  );
}

export { HomeScreen };
