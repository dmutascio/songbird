import { Text, View, Pressable, Image, Animated, Modal, StyleSheet } from 'react-native';
//import { Modal } from 'react-native-paper';
import MarqueeText from 'react-native-marquee';
import React, { useRef, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SongComponent = React.memo(({ song, isPlaying, handlePlayPreview, handlePopup }) => {
  const artistNames = song['artists'].map(artist => artist.name);
  const artistNamesString = artistNames.join(" · ");
  const artworkUrl = song['album']['images'][1]['url']
  //const [showPopup, setShowPopup] = useState(false);
  const shadowOpacityValue = useRef(new Animated.Value(0)).current;
  const buttonScaleValue = useRef(new Animated.Value(1)).current;
  const pauseOpacityValue = useRef(new Animated.Value(0)).current;
  const playOpacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isPlaying]);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(shadowOpacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(buttonScaleValue, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(pauseOpacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(playOpacityValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const stopAnimation = () => {
    Animated.parallel([
      Animated.timing(shadowOpacityValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonScaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(pauseOpacityValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(playOpacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePlayPress = async () => {
    handlePlayPreview(song, isPlaying);
  };

  const handleSongPress = () => {
    handlePopup(song, isPlaying);
  };

  const shadowOpacity = shadowOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, .7],
  });

  const buttonScale = buttonScaleValue.interpolate({
    inputRange: [0.8, 1],
    outputRange: [1, 0.8],
  });

  const pauseOpacity = pauseOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const playOpacity = playOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.container]}>
      <Pressable style={styles.songInfoParent} onPress={handleSongPress}>
        <Animated.View style={[styles.imageContainer, { shadowOpacity: shadowOpacity }]}>
          <Image source={{ uri: artworkUrl }} style={styles.image} />
        </Animated.View>
        <View style={styles.songInfo}>
          <MarqueeText
            style={styles.songTitle}
            speed={.5}
            marqueeOnStart={true}
            loop={true}
            delay={2000}
          >
            {song['name']}
          </MarqueeText>
          <Text style={styles.artistName}>{artistNamesString}</Text>
        </View>
      </Pressable>
      <Pressable onPress={handlePlayPress}>
        <Animated.View
          style={[styles.playButton, { transform: [{ scale: buttonScale }] }]}
        >
          <Animated.View style={[styles.iconWrapper, { opacity: playOpacity }]}>
            <Ionicons
              name='play'
              size={24}
              color="#9197AE"
            />
          </Animated.View>
          <Animated.View style={[styles.iconWrapper, { opacity: pauseOpacity }]}>
            <Ionicons
              name='pause'
              size={24}
              color="#9197AE"
            />
          </Animated.View>
        </Animated.View>
      </Pressable>
    </View>
  );
});

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
    width: 50,
    height: 50,
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

export { SongComponent };
