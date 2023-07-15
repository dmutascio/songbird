import { SafeAreaView, FlatList, View, StyleSheet } from 'react-native';
import { TextInput, Modal, Portal, Provider, useTheme } from 'react-native-paper';
import React from 'react';
import querySpotify from '../assets/querySpotify';
import { SongComponent } from '../assets/songComponent';
import TrackPlayer from 'react-native-track-player';
import { SongModal } from '../assets/songModal';


const HomeScreen = ({ navigation, route, spotifyToken, setSwiperScreen, setSelectedSongData }) => {
  const [songQuery, setSongQuery] = React.useState("");
  const [songs, setSongs] = React.useState([]);
  const [selectedSong, setSelectedSong] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const theme = useTheme();

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      shadowColor: "#273043",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0,
      shadowRadius: 4,
    },
    modalView: {
      //flex: 1,
      backgroundColor: theme.colors.secondaryContainer,
      backgroundColor: 'white',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      //margin: 10,
    },
    flatListContainer: {
      flex: 0.8,
    },
  });

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

  const handlePlayPreview = async (song, isPlaying) => {
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

  const handlePopup = (song, isPlaying) => {
    if (!isPlaying) {
      //handlePlayPreview(song, isPlaying);
      setSelectedSong(song)
    }
    togglePopup()
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        style={{ marginHorizontal: 10 }}
        label="Song"
        outlineColor={theme.colors.secondary}
        value={songQuery}
        mode='outlined'
        onChangeText={handleSongQueryChange}
      />
      <View style={styles.flatListContainer}>
        <FlatList
          data={songs}
          renderItem={({ item, index }) => (
            <SongComponent
              song={item}
              isPlaying={selectedSong?.id === item.id ?? false}
              handlePlayPreview={handlePlayPreview}
              handlePopup={handlePopup}
            />
          )}
        />
      </View>
      {selectedSong && showPopup && (
        <Portal.Host>
          <Portal>
            <Modal visible={showPopup} onDismiss={togglePopup} contentContainerStyle={styles.modalContainer}>
              <View style={styles.modalView}>
                <SongModal
                  song={selectedSong}
                  token={spotifyToken}
                  setSwiperScreen={setSwiperScreen}
                  setSelectedSongData={setSelectedSongData}
                />
              </View>
            </Modal>
          </Portal>
        </Portal.Host>
      )}
    </SafeAreaView>
  );
}

export { HomeScreen };
