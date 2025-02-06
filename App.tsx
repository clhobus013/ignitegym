import { Text, View } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    // return <Loading/>
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home</Text>
    </View>
  );
}
