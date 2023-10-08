import React, { useEffect, useRef, useState } from 'react';
import { Text, View, PanResponder, Animated } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { trainModel } from '../apiCalls/trainModel'
import TrackPlayer from 'react-native-track-player';
import { newModel } from '../apiCalls/newModel';
import LinearGradient from 'react-native-linear-gradient';


const SwiperScreen = ({ navigation, route, spotifyToken }) => {
  console.log("SWIPERSCREEN")
  const [song, setSong] = useState(null);
  const songRef = useRef(null);
  const modelId = useRef(null);
  const [pan] = useState(new Animated.ValueXY());
  const [opacity] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState(true);
  //const [backgroundGlowColor] = useState(new Animated.Value(0));


  const handlePlayPreview = async () => {
    if (songRef.current && songRef.current.preview_url) { // Check if song is not null
      // Rest of your code
      await TrackPlayer.add({
        id: songRef.current.id,
        url: songRef.current.preview_url,
        title: songRef.current.name
        //artist: artistNamesString,
      });
      await TrackPlayer.play();
    }
  };

  const handleSwipe = async (decision) => {
    setIsLoading(true); // Set loading state to true when fetching new data
    await TrackPlayer.pause();
    await TrackPlayer.reset();
    const newSong = await trainModel(spotifyToken, songRef.current, decision, modelId.current);
    //setSong(newSong["singleRecommendation"]);
    songRef.current = newSong["singleRecommendation"]

    await handlePlayPreview(newSong["singleRecommendation"])

    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    // Animated.spring(backgroundGlowColor, {
    //   toValue: decision === 1 ? 1 : -1,
    //   useNativeDriver: false,
    // }).start();
    setIsLoading(false); // Set loading state to true when fetching new data

  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
        damping: 10, // Adjust this value as needed
        stiffness: 1000, // Adjust this value as needed
      }),
      onPanResponderRelease: async (_, gesture) => {
        if (gesture.dx > 120) {
          // Swiped right
          //pan.x = 0
          await handleSwipe(1);
        } else if (gesture.dx < -120) {
          // Swiped left
          //pan.x = 0
          await handleSwipe(0);
        } else {
          // Reset card position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    async function fetchData() {
      //setSong(route.params.song)
      const newSong = await newModel(spotifyToken, route.params.song)
      songRef.current = newSong["singleRecommendation"];
      modelId.current = newSong["modelId"]
      setIsLoading(false)
    }
    fetchData();
  }, [])

  useEffect(() => {
    pan.addListener((value) => {
      // Update opacity based on horizontal swipe distance
      const opacityValue = Math.abs(value.x) / 200;
      Animated.timing(opacity, {
        toValue: 1 - opacityValue,
        duration: 0,
        useNativeDriver: false,
      }).start();
      // Animated.timing(backgroundGlowColor, {
      //   toValue: pan.x.interpolate({
      //     inputRange: [-200, 0, 200],
      //     outputRange: [0, 0, 1],
      //   }),
      //   duration: 0,
      //   useNativeDriver: false,
      // }).start();
    });
    try {
      handlePlayPreview(songRef.current)
    }
    catch (error) {
    }
    return () => {
      pan.removeAllListeners();
    };
  }, [pan, opacity, songRef.current]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? ( // If loading, show the loading placeholder
        <Text>LOADING</Text>
      ) : (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            pan.getLayout(),
            {
              opacity,
              transform: [
                { scale: pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: [0.8, 1, 0.8] }) },
                { rotate: pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: ['-10deg', '0deg', '10deg'] }) },
              ],
            },
          ]}
        >
          <Card style={{ width: 300, height: 300, backgroundColor: 'rgba(0, 0, 0, 0.2)', elevation: 4 }}>
            <Card.Content>
              <Text>{songRef.current && songRef.current.name}</Text>
              {/* Display any other relevant information */}

            </Card.Content>
          </Card>
        </Animated.View>
      )}
    </View>
  );
}

export { SwiperScreen };
