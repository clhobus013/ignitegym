import { Group } from "@components/Group"
import { HomeHeader } from "@components/HomeHeader"
import { VStack } from "@gluestack-ui/themed"
import { useState } from "react";
import { FlatList } from "react-native";

export function Home() {
    const [groupSelected, setGroupSelected] = useState<string>("costas");
    const [groups, setGroups] = useState<string[]>(["costas", "ombro", "perna", "abdomem", "peito"]);

    return (
        <VStack>
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
        </VStack>
    )
}