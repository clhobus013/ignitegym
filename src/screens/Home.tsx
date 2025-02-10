import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { useState } from "react";
import { FlatList } from "react-native";

export function Home() {
    const [groupSelected, setGroupSelected] = useState<string>("costas");
    const [groups, setGroups] = useState<string[]>(["costas", "ombro", "perna", "abdomem", "peito"]);

    const [exercises, setExercises] = useState<string[]>(["Puxada Frontal", "Desenvolvimento", "Agachamento", "Prancha", "1", "2", "3"]);

    return (
        <VStack flex={1}>
            <HomeHeader/>

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <Group 
                        name={item} 
                        isActive={groupSelected === item} 
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
                        <ExerciseCard/>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20}}    
                />
            </VStack>
        </VStack>
    )
}