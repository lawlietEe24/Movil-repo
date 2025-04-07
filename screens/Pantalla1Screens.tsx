import { StyleSheet, Text, TextInput, View, Alert, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {ref, set } from "firebase/database";
import { auth, db } from '../config/Config';
import { onAuthStateChanged } from "firebase/auth";



export default function Pantalla1Screens() {
    const [id, setid] = useState("")
    const [game, setgame] = useState(""); 
    const [score, setscore] = useState(""); 
    const [date, setdate] = useState(""); 



    useEffect(() => {

         onAuthStateChanged(auth, (user) => {
         if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    setid(uid)
    // ...
        } else {
    // User is signed out
    // ...
  }
});
    }, [])
    


    const handlePuntuacionChange = (texto:any) => {
      setscore(texto); 
  };
  

    const handleNombreJuegoChange = (texto:any) => {
        if (texto.length <= 100) {
            setgame(texto);
        } else {
            Alert.alert("Error", "El nombre del juego no puede exceder los 100 caracteres.");
        }
    };

    const handleFechaChange = (texto:any) => {
      setdate(texto); 
  };



  function guardar(){

  set(ref(db, 'users/' + id + "/score/" + Date.now()), {
    game: game,
    score: score,
    date: date
  });

  }
  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del juego</Text>
            <Text style={styles.texto}>Nombre del juego</Text>
            <TextInput
                placeholder='ej: "Call of Duty: Modern Warfare"'
                onChangeText={handleNombreJuegoChange}
                value={game}
                style={styles.input}
            />

            <Text style={styles.texto}>Puntuación del juego</Text>
            <TextInput
                placeholder='ej: 12500'
                onChangeText={handlePuntuacionChange}
                value={score} 
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.texto}>Fecha de puntaje (YYYY-MM-DD)</Text>
            <TextInput
                placeholder='ej: "2023-11-20"'
                onChangeText={handleFechaChange}
                value={date}
                style={styles.input}
            />
            <TouchableOpacity style={styles.boton} onPress={()=>guardar()}>
              <Text style={styles.btn}>Guardar</Text>
            </TouchableOpacity>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor:'#27548A',
        flex:1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color:'white'
    },
    input: {
        borderWidth: 1.5,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        borderColor:'white'
    },
    btn:{
      color:'white',
      textAlign:'center',
      fontSize:20,
      fontWeight:'bold',
      padding:10,
    },
    boton:{
      backgroundColor:'black',
      alignItems:'center',
      borderRadius:20,
      marginTop:10
    },
    texto:{
      color:'white'

    }
});
