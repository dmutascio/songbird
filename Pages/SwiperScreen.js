import React, { useEffect, useRef, useState } from 'react';
import { Text, View, PanResponder, Animated } from 'react-native';
import { Card } from 'react-native-paper';

const SwiperScreen = ({ navigation, route, selectedSong }) => {
  const [pan] = useState(new Animated.ValueXY());
  const [opacity] = useState(new Animated.Value(1));
  let song = JSON.parse(selectedSong)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          // Swiped right
          console.log('Swiped right');
        } else if (gesture.dx < -120) {
          // Swiped left
          console.log('Swiped left');
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
    pan.addListener((value) => {
      // Update opacity based on horizontal swipe distance
      const opacityValue = Math.abs(value.x) / 200;
      Animated.timing(opacity, {
        toValue: 1 - opacityValue,
        duration: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      pan.removeAllListeners();
    };
  }, [pan, opacity]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        <Card style={{ width: 300, height: 300, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <Card.Content>
            <Text>{song.name}</Text>
            {/* Display any other relevant information */}
          </Card.Content>
        </Card>
      </Animated.View>
    </View>
  );
}

export { SwiperScreen };
