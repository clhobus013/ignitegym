import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "@gluestack-ui/themed";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormDataProps = {
    email: string
    password: string
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o email").email("Email inválido"),
    password: yup.string().required("Informe a senha")
})

export function SignIn() {
    const { signIn } = useAuth();

    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    });

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate("signUp");
    }

    async function handleLogin({email, password}: FormDataProps){
        try {
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tader";

            return toast.show({
                placement: "top",
                render: ({id}) => (
                    <ToastMessage id={id} title={title} action="error" onClose={() => toast.close(id)} />
                )
            })
        }
    }

    return (
        <ScrollView contentContainerStyle= {{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <VStack flex={1}>
                <Image
                    w="$full" 
                    h={624} 
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    position="absolute"
                />

                <VStack flex={1} px="$10" pb="$16">
                    <Center my="$24">
                        <Logo/>

                        <Text color="$gray100" fontSize="$sm">
                            Treine sua mente e o seu corpo
                        </Text>
                    </Center>

                    <Center gap="$2">
                        <Heading color="$gray100">Acesse a conta</Heading>

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: {onChange, value} }) => (
                                <Input
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="E-mail" 
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Senha" 
                                    secureTextEntry
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Button title="Acessar" onPress={handleSubmit(handleLogin)}/>
                    </Center>

                    <Center flex={1} justifyContent="flex-end" mt="$4">	
                        <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">Ainda não tem acesso ?</Text>
                        <Button 
                            title="Criar conta" 
                            variant="outline" 
                            onPress={handleNewAccount}
                        />
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}