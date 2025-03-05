import { useState } from "react";
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "@gluestack-ui/themed";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { api } from "../service/api";
import { useAuth } from "@hooks/useAuth";

import { AppError } from "@utils/AppError";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

type FormDataProps = {
    name: string
    email: string
    password: string
    passwordConfirm: string
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome do usuário'),
    email: yup.string().required('Informe o email do usuário').email('Email inválido'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter no mín. 6 dígitos'),
    passwordConfirm: yup.string().required('Confirme a senha informada').oneOf([
        yup.ref('password'), 
        ""
    ], "As senhas devem ser iguais"),
});

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = useAuth();

    const toast = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSignUp({name, email, password}: FormDataProps) {
        try {
            setIsLoading(true);
            await api.post("/users", {name, email, password});
            await signIn(email, password);

        } catch (error) {
            setIsLoading(false);
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a conta, tente novamente mais tarde";

            toast.show({
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

                    <Center gap="$2" flex={1}>
                        <Heading color="$gray100">Crie sua conta</Heading>

                        <Controller
                            control={control}
                            name="name"
                            render={({field: { onChange, value }}) => (
                                <Input 
                                    placeholder="Nome" 
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({field: { onChange, value }}) => (
                                <Input 
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({field: { onChange, value }}) => (
                                <Input 
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="passwordConfirm"
                            render={({field: { onChange, value }}) => (
                                <Input 
                                    placeholder="Confirme a senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType="send"
                                    errorMessage={errors.passwordConfirm?.message}
                                />
                            )}
                        />

                        <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} isLoading={isLoading}/>
                    </Center>

                    <Button 
                        title="Voltar para o login" 
                        variant="outline" 
                        mt="$12"
                        onPress={handleGoBack}
                    />
                </VStack>
            </VStack>
        </ScrollView>
    )
}