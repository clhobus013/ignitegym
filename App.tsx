import { StatusBar } from "react-native";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";

import { config } from "./config/gluestack-ui.config";

import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";
import { AuthContext, AuthContextProvider } from "@contexts/AuthContext";

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? (
          <Routes/>
        ) : <Loading/>}
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
