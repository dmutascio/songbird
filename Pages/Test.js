import { Text, View, SafeAreaView } from 'react-native';
import { SearchBar } from '../Components/SearchBar';

const TestScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <View>
        <SearchBar style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      </View>
    </SafeAreaView>
  );
}

export { TestScreen };
