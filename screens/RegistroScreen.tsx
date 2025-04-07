import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
    const [email, setemail] = useState("");
    const [contrasenia, setcontrasenia] = useState("");
    const [EmailError, setEmailError] = useState("");
    const [PasswordError, setPasswordError] = useState("")
    
    


    useEffect(() => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !re.test(email)) {
                setEmailError("Por favor, ingresa un email válido.");
            } else {
                setEmailError("");
            }
        }, [email]);


        useEffect(() => {
                if (contrasenia && contrasenia.length < 6) {
                    setPasswordError("La contraseña debe tener al menos 6 caracteres.");
                } else {
                    setPasswordError("");
                }
            }, [contrasenia]);



    function registrar() {
        if (EmailError || PasswordError) {
            Alert.alert("Error", EmailError || PasswordError);
            return;
        }
        createUserWithEmailAndPassword(auth, email, contrasenia)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigation.navigate("Welcome");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.encabezado}>
                <Text style={styles.encabezadoText}>REGISTRO DE USUARIO</Text>
            </View>

            <Text style={styles.txt}>Ingrese su email</Text>
            <TextInput
                style={styles.input}
                placeholder='email@gmail.com'
                onChangeText={(texto) => setemail(texto)}
                value={email}
            />
            {EmailError ? <Text style={styles.errorText}>{EmailError}</Text> : null}

            <Text style={styles.txt}>Ingrese su contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder='*****************'
                onChangeText={(texto) => setcontrasenia(texto)}
                value={contrasenia}
                secureTextEntry
            />
            {PasswordError ? <Text style={styles.errorText}>{PasswordError}</Text> : null}

            <TouchableOpacity style={styles.btn} onPress={() => registrar()}>
                <Text style={styles.btnText}>Registrarse</Text>
            </TouchableOpacity>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF', 
        padding: 20,
    },
    input: {
        borderWidth: 1.5,
        margin: 10,
        padding: 20,
        backgroundColor: '#E0FFFF',
        borderRadius: 10,
    },
    txt: {
        fontSize: 18,
        fontWeight: '600',
        margin: 5,
        padding: 10,
        color: '#005f73', 
        textAlign: 'center',
    },
    encabezado: {
        height: 100,
        backgroundColor: '#005f73',
        borderRadius: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 30,
        margin: 10,
    },
    encabezadoText: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#008CBA', 
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        margin: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        margin: 5,
    },
   
});
