import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { onValue, ref } from 'firebase/database';

export default function Pantalla4Screens() {
  const [uid, setuid] = useState("");
  const [datos, setdatos] = useState<any[]>([]);
  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const [puntajeMasAlto, setpuntajeMasAlto] = useState(0);
  const [puntajePromedio, setpuntajePromedio] = useState(0);

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

  function leer() {
    const starCountRef = ref(db, 'users/' + uid + '/score/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const compras: any[] = [];
      for (let key in data) {
        compras.push(data[key]);
      }
      setdatos(compras);
    });
  }

  useEffect(() => {
    const total = datos.reduce((total, item) => total + Number(item.score), 0);
    setPuntajeTotal(total);
  }, [datos]);

  useEffect(() => {
    const maxScore = datos.reduce((max, item) => Math.max(max, Number(item.score)), 0);
    setpuntajeMasAlto(maxScore);
  }, [datos]);

  useEffect(() => {
    const total = datos.reduce((total, item) => total + Number(item.score), 0);
    const promedio = datos.length > 0 ? total / datos.length : 0;
    setpuntajePromedio(promedio);
  }, [datos]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cálculos de juegos</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.title}>Puntaje Total</Text>
        <Text style={styles.puntajes}>{puntajeTotal}</Text>

        <Text style={styles.title}>Puntaje Más Alto</Text>
        <Text style={styles.puntajes}>{puntajeMasAlto}</Text>

        <Text style={styles.title}>Puntaje Promedio</Text>
        <Text style={styles.puntajes}>{puntajePromedio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27548A', 
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white', 
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreContainer: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 10,
    shadowRadius: 4,
    elevation: 5,
  },
  puntajes: {
    color: '#A0C878', 
    fontWeight:'bold',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black', 
  },
});
