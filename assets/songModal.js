import { Text, View, Image, StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SongModal = ({ song }) => {
  const artworkUrl = song['album']['images'][1]['url']
  //console.log(artworkUrl)
  //console.log(song)

  return (
    //<Modal.Content
    <View>
      <View>
        <Image source={{ uri: artworkUrl }} style={styles.image} />
      </View>
      <Text>{song.name}</Text>
    </View>
    //</Modal.Content>
  );
};
export { SongModal };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    marginRight: 10,
    shadowColor: "#273043",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 1,
  },
  songInfo: {
    //marginLeft: 10,
    //flex: 1,
    width: 250,
  },
  songInfoParent: {
    flexDirection: 'row',
    //backgroundColor: 'black'
  },

  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    //marginLeft: 'auto',
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
  }
});
//        <Image source={{ uri: artworkUrl }} style={styles.image} />
