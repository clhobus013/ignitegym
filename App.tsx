import { StatusBar, View } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    // return <Loading/>
  }

  return (
    <GluestackUIProvider>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#202024'}}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <Text>Home</Text>
      </View>
    </GluestackUIProvider>
  );
}
