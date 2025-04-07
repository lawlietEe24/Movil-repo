import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from '../config/Config';
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";

export default function Pantalla2Screens({ navigation }: any) {
  const [uid, setuid] = useState("");
  const [datos, setdatos] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const UID = user.uid;
        setuid(UID);
      }
    });
  }, []);

  useEffect(() => {
    leer();
  }, [uid]);

  function cerrarSesion() {
    signOut(auth).then(() => {
      setuid("");
      setdatos([]);
      navigation.navigate("Welcome");
    }).catch((error) => {
      console.error(error);
    });
  }

  function leer() {
    const starCountRef = ref(db, 'users/' + uid + '/score/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let compras = [];
      for (let key in data) {
        compras.push({ id: key, ...data[key] });
      }
      setdatos(compras as any);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registros de Puntajes - Juegos</Text>
      <FlatList
        data={datos}
        renderItem={({ item }: any) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.game}</Text>
            <Text style={styles.txt}>Puntaje:  {item.score}</Text>
            <Text style={styles.txt}>Fecha:  {item.date}</Text>
          </View>
        )}/>

      <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#27548A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: 'white',
    fontWeight:'bold',
    textAlign:'center'
  },
  txt:{
    fontSize: 15,
    color: 'white',
    textAlign:'center'

  },
  button: {
    backgroundColor: '#7D0A0A',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
