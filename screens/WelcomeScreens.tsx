import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function WelcomeScreens({navigation}:any) {


    const [email, setemail] = useState("");
    const [contrasenia, setcontrasenia] = useState("");
    const [EmailError, setEmailError] = useState("");
    const [PasswordError, setPasswordError] = useState("")


    function login(){
        if (EmailError || PasswordError) {
            Alert.alert("Error", EmailError || PasswordError);
            return;
        }

        signInWithEmailAndPassword(auth, email, contrasenia)
          .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         navigation.navigate("Tabs")
          // ...
       })
          .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorCode, errorMessage);
        });

    }
    
    useEffect(() => {
        // Validar el formato del email
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
    


  return (
    <View style={styles.container}>

        <View style={styles.encabezado}>
        <Text style={{textAlign:'center', fontSize:20, color:'white', fontWeight:'bold'}}>INICIAR SESION</Text>
        </View>
      
      <Text style={styles.txt}>Ingrese su email</Text>
      <TextInput 
      style={styles.input}
      placeholder='email@gmail.com'
      onChangeText={(texto)=>setemail(texto)}
      value={email}/>
      {EmailError ? <Text style={styles.errorText}>{EmailError}</Text> : null}
      

      <Text style={styles.txt}>Ingrese su contraseña</Text>
      <TextInput 
      style={styles.input}
      placeholder='*****************'
      onChangeText={(texto)=>setcontrasenia(texto)}
      value={contrasenia}
      secureTextEntry/>
      {PasswordError ? <Text style={styles.errorText}>{PasswordError}</Text> : null}
      
      
      <TouchableOpacity style={styles.btn} onPress={()=>login()}>
                <Text style={styles.btnText}>Ingresar</Text>
    </TouchableOpacity>

            <Text style={styles.registrate} onPress={() => navigation.navigate("Registro")}>
            👉 No tienes una cuenta? Registrate aqui !!! 👈
            </Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF', 
        padding: 20,
    },
    input:{
        borderWidth:1.5,
        margin:10,
        padding:20,
        backgroundColor:'#E0FFFF',
        borderRadius:7,

    },
    txt:{
        fontSize:17,
        fontWeight:'semibold',
        margin:5,
        padding:10,
        color:'#005f73',
        textAlign:'center'

    },
    encabezado:{
        height:100,
        backgroundColor:'black',
        borderRadius:20, 
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 0, 
        borderTopLeftRadius: 0,
        padding:30,
        margin:10
    },
    btn:{
        backgroundColor: 'black',
        borderRadius: 80,
        padding: 15,
        alignItems: 'center', 
        margin: 10 ,

    },
    btnText:{
        color: 'white', 
        fontSize: 20,
        fontWeight: 'bold'
    },
    registrate:{
        textDecorationLine:'underline',
        textAlign:'center',
        color:'blue'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        margin: 5,
    },
})