import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Card({ videojuego }: { videojuego: any }) {


    
  return (
    <View style={styles.card}>
      <Image  
      style={styles.img}
      source={{uri: videojuego.imagen}}/>
      <Text style={styles.title}>{videojuego.titulo}</Text>
      <Text style={styles.title}>Precio: ${videojuego.precio}</Text>
      <Text style={styles.title}>{videojuego.plataforma}</Text>
      <Text style={{color:'white',textAlign:'justify' }}>Descripción: {videojuego.descripcion}</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#27548A',
    borderRadius: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'white',
  },
  img:{
    width: 310,
    height: 200,

  }
})