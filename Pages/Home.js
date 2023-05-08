import { Text, View } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

export { HomeScreen };
