import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, Text, SafeAreaView, Easing, StyleSheet, FlatList } from 'react-native';
import { TextInput, Modal, Portal, Provider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  //const fadeAnim = useRef(new Animated.Value(0)).current;
  //const [animation] = useState(new Animated.Value(1));
  const theme = useTheme();
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      shadowColor: "#273043",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0,
      shadowRadius: 4
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
      paddingBottom: 100,
      paddingTop: 10
    },
  });

  // const onFocus = () => {
  //   setIsFocused(true);
  //   Animated.timing(animation, {
  //     toValue: 0.2,
  //     duration: 200,
  //     easing: Easing.ease,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const onBlur = () => {
  //   setIsFocused(false);
  //   Animated.timing(animation, {
  //     toValue: 1,
  //     duration: 200,
  //     easing: Easing.ease,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const clearSearch = () => {
  //   setSearchQuery('');
  // };

  // const animatedStyle = {
  //   transform: [{ scaleX: animation }], // Apply scale animation horizontally
  // };

  const handleSongQueryChange = async (text) => {
    setSearchQuery(text);
    if (text.length > 2) {
      const newSongs = await querySpotify(text, spotifyToken);
      setSongs(newSongs);
    }
    else {
      setSongs([]);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={{ marginHorizontal: 10 }}
          label="Search"
          outlineColor={theme.colors.secondary}
          value={searchQuery}
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
      </View>
      {selectedSong && showPopup && (
        <Portal.Host>
          <Portal>
            <Modal visible={showPopup} onDismiss={togglePopup} contentContainerStyle={styles.modalContainer}>
              <View style={styles.modalView}>
                <BlurView
                  blurType="light"
                  blurAmount={10}
                >
                  <SongModal
                    navigation={navigation}
                    song={selectedSong}
                    token={spotifyToken}
                  />
                </BlurView>
              </View>
            </Modal>
          </Portal>
        </Portal.Host>
      )}
    </SafeAreaView>
  );
};

export { SearchBar };
