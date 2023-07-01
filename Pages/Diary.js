import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { devCall } from '../apiCalls/devCall';

const DiaryScreen = ({ navigation, route }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await devCall();
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
