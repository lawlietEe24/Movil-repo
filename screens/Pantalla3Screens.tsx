import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';

export default function Pantalla3Screens() {
    const [data, setData] = useState<any[]>([]); 

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
      try {
        const resp = await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');
        const json = await resp.json();
        setData(json.videojuegos);
      } catch (err) {
      }
    }

  return (
    <View style={styles.container}>
      <Text style={{padding:20, fontSize:28,fontWeight:'bold',
         textAlign:'center', backgroundColor:'#27548A', borderRadius:20,
          margin:10, color:'white' }}>Api Videojuegos</Text>
      <FlatList
      
        data={data}
        keyExtractor={(item) => item.id} 
        renderItem={({item}) => 
        <Card videojuego={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
})