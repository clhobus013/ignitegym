import { StatusBar, View } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? (
        <Center flex={1} bg='$gray700'>
          <Text>Home</Text>

        </Center>
      ) : <View></View>}
    </GluestackUIProvider>
  );
}
