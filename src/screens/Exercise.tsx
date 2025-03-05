import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Heading, HStack, Icon, Image, Text, useToast, VStack } from "@gluestack-ui/themed"
import { ArrowLeft } from "lucide-react-native"
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { AppError } from "@utils/AppError";
import { api } from "../service/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"

import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";
import { Loading } from "@components/Loading";

type RoutesParamsProps = {
    exerciseId: string;
}

export function Exercise() {
    const [sendingRegister, setSendingRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const route = useRoute();
    const toast = useToast();

    const { exerciseId } = route.params as RoutesParamsProps;

    function handleGoBack() {
        navigation.goBack();
    }

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true);
            const { data } = await api.get(`/exercises/${exerciseId}`);
            setExercise(data);
            
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage id={id} title={title} action="error" onClose={() => toast.close(id)} />
                )
            })
        } finally {
            setIsLoading(false);
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true);

            await api.post('/history', { exercise_id: exerciseId})

            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage id={id} title="Parabéns" description="Exercício registrado no seu histórico" onClose={() => toast.close(id)} />
                )
            });

            navigation.navigate('history');
            
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível registrar o exercício';

            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage id={id} title={title} action="error" onClose={() => toast.close(id)} />
                )
            })
        } finally {
            setSendingRegister(false);
        }
    }

    useEffect(()=> {
        fetchExerciseDetails();
    }, [exerciseId])

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
                        {exercise.name}
                    </Heading>

                    <HStack alignItems="center">
                        <BodySvg/>
                        <Text color="$gray200" ml="$1" textTransform="capitalize">{exercise.group}</Text>
                    </HStack>
                </HStack>

            </VStack>

            {isLoading ? <Loading/> : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 32}}>
                    <VStack p="$8">
                        <Box rounded="$lg" mb="$3" overflow="hidden">
                            <Image 
                                source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}} 
                                alt="Imagem do exercício" 
                                w="$full"
                                h="$80"
                                resizeMode="cover"
                            />
                        </Box>

                        <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                                <HStack>
                                    <SeriesSvg />
                                    <Text color="$gray200" ml="$2">{exercise.series} séries</Text>
                                </HStack>
                                <HStack>
                                    <RepetitionsSvg />
                                    <Text color="$gray200" ml="$2">{exercise.repetitions} repetições</Text>
                                </HStack>
                            </HStack>

                            <Button title="Marcar como realizado" isLoading={sendingRegister} onPress={handleExerciseHistoryRegister}/>
                        </Box>

                    </VStack>
                </ScrollView>
            )}


        </VStack>
    )
}