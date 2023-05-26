import { SafeAreaView, FlatList } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import querySpotify from '../assets/querySpotify'
import { SongComponent } from '../assets/songComponent'
import TrackPlayer from 'react-native-track-player'; // Import the TrackPlayer module

const HomeScreen = ({ navigation, route, spotifyToken }) => {
  const [songQuery, setSongQuery] = React.useState("");
  const [songs, setSongs] = React.useState([]);
  const [selectedSong, setSelectedSong] = React.useState(null);
  const theme = useTheme();

  const handleSongQueryChange = async (text) => {
    console.log("handleSongQueryChange called")
    setSongQuery(text);
    if (text.length > 2) {
      const newSongs = await querySpotify(text, spotifyToken);
      setSongs(newSongs);
    }
    else {
      setSongs([]);
    }
  };

  const handleSongPress = async (song, isPlaying) => {
    console.log("handleSongPress called on " + song.name)
    if (isPlaying) {
      //if song is playing
      await TrackPlayer.pause();
      setSelectedSong(null);
    } else {
      //if song is not playing
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: song.id,
        url: song.preview_url,
        title: song.name
        //artist: artistNamesString,
      });
      await TrackPlayer.play();
      setSelectedSong(song);
    }
  };

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
          <SongComponent
            song={item}
            isPlaying={selectedSong?.id === item.id ?? false}
            onPress={handleSongPress}
          />
        )}
      />
    </SafeAreaView>
  );
}

export { HomeScreen };
