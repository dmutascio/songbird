import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { devCall } from '../apiCalls/devCall';

const DiaryScreen = ({ navigation, route, spotifyToken }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await devCall(spotifyToken, "6YUTL4dYpB9xZO5qExPf05");
        console.log(response);
      } catch (error) {
        console.log("Error on DevCall:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>David</Text>
    </View>
  );
}

export { DiaryScreen };
