import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
    const [groupSelected, setGroupSelected] = useState<string>("costas");
    const [groups, setGroups] = useState<string[]>(["costas", "ombro", "perna", "abdomem", "peito"]);

    const [exercises, setExercises] = useState<string[]>(["Puxada Frontal", "Desenvolvimento", "Agachamento", "Prancha"]);

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails() {
        navigation.navigate("exercise");
    }

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

            <VStack px="$8" flex={1}>
                <HStack justifyContent="space-between" mb="$5" alignItems="center">
                    <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
                    <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises.length}</Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <ExerciseCard onPress={handleOpenExerciseDetails}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20}}    
                />
            </VStack>
        </VStack>
    )
}