import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed"

import { AppError } from "@utils/AppError";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "../service/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { ExerciseCard } from "@components/ExerciseCard";
import { ToastMessage } from "@components/ToastMessage";
import { Loading } from "@components/Loading";

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [groupSelected, setGroupSelected] = useState<string>("antebraço");
    const [groups, setGroups] = useState<string[]>([]);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const toast = useToast();

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate("exercise", { exerciseId });
    }

    async function fetchGroups() {
        try {
            setIsLoading(true);
            const { data } = await api.get('/groups');
            setGroups(data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

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

    async function fetchExercicesByGroup() {
        try {
            setIsLoading(true);
            const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';

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

    useEffect(()=> {
        fetchGroups()
    }, [])

    useFocusEffect(useCallback(()=> {
        fetchExercicesByGroup();
    }, [groupSelected]))

    return (
        <VStack flex={1}>
            <HomeHeader/>

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <Group 
                        name={item} 
                        isActive={groupSelected.toUpperCase() === item.toUpperCase()} 
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 32}}
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44}}
            />

            {isLoading ? 
                <Loading/> : (
                    <VStack px="$8" flex={1}>
                        <HStack justifyContent="space-between" mb="$5" alignItems="center">
                            <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
                            <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises.length}</Text>
                        </HStack>

                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <ExerciseCard data={item} onPress={() => handleOpenExerciseDetails(item.id)}/>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20}}    
                        />
                    </VStack>
                )
            }
        </VStack>
    )
}