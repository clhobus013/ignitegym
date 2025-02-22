import { ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Box, Heading, HStack, Icon, Image, Text, VStack } from "@gluestack-ui/themed"
import { ArrowLeft } from "lucide-react-native"
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"

import { Button } from "@components/Button";

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <VStack flex={1}>
            <VStack px="$8" bg="$gray600" pt="$12">
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} color="$green500" size="xl" />
                </TouchableOpacity>

                <HStack 
                    justifyContent="space-between" 
                    alignItems="center" 
                    mt="$4" 
                    pb="$8"
                >
                    <Heading 
                        color="$gray100" 
                        fontFamily="$heading" 
                        fontSize="$lg" 
                        flexShrink={1}
                    >
                        Puxada Frontal
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg/>
                        <Text color="$gray200" ml="$1" textTransform="capitalize">Costas</Text>
                    </HStack>
                </HStack>

            </VStack>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 32}}>
                <VStack p="$8">
                    <Image 
                        source={{uri: "https://static.wixstatic.com/media/2edbed_84849dd0743f4b67810b5c71d08ea05b~mv2.jpg/v1/fill/w_620,h_620,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2edbed_84849dd0743f4b67810b5c71d08ea05b~mv2.jpg"}} 
                        alt="Imagem do exercício" 
                        w="$full"
                        h="$80"
                        mb="$3"
                        resizeMode="cover"
                        rounded="$lg"
                    />

                    <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                        <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                            <HStack>
                                <SeriesSvg />
                                <Text color="$gray200" ml="$2">3 séries</Text>
                            </HStack>
                            <HStack>
                                <RepetitionsSvg />
                                <Text color="$gray200" ml="$2">12 repetições</Text>
                            </HStack>
                        </HStack>

                        <Button title="Marcar como realizado"/>
                    </Box>

                </VStack>
            </ScrollView>

        </VStack>
    )
}