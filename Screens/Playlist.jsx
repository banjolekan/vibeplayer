

import { View, Text, Button, FlatList, StyleSheet,SafeAreaView,TextInput, Image, TouchableOpacity } from 'react-native';

import musicData from '../assets/music.json';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';




const Playlist = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [musicData, setMusicData] = useState([
    {
      "id": "1",
      "title": "Abundance Resources",
      "artist": "Pastor Nkechi Ene",
      "file": "Abundant Resources(Part23).mp3",
      "image": "PAS1.jpg"
    },
    {
      "id": "2",
    "title": "Exposing The Delivering Like ",
    "artist": "Pastor Nkechi Ene",
    "file": "Exposing The Delivering Like The.mp3",
    "image": "PAS2.jpg"
    },
    {
      "id": "3",
    "title": "Divine GPS",
    "artist": "Pastor Nkechi Ene",
    "file": "Divine GPS.mp3",
    "image": "PAS3.jpg"
    },
    {      "id": "4",
    "title": "Stepping Into Gods Best",
    "artist": "Pastor Nkechi Ene",
    "file": "Stepping Into Gods Best.mp3",
    "image": "PAS4.jpg"
      
    },
    {
     "id": "5",
    "title": "Cycles Of Thanksgiving",
    "artist": "Pastor Nkechi Ene",
    "file": "Cycles Of Thanksgiving.mp3",
    "image": "PAS5.jpg"
    },

    // Add more songs as needed
  ]);

  // Filter the music data based on the search query
  const filteredData = musicData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30, margin: 16 }}>
      <Text style={{ fontSize: 40, marginTop: 20, fontWeight: 'bold', color: '#830000' }}>
        My Audio
      </Text>

      <TextInput
        placeholder="Search Audio"
        clearButtonMode="always"
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: '#ccc',
          borderWidth: 2,
          borderRadius: 15,
          marginTop: 20,
        }}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      <View style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('musicplayer', { index })}
            >
              <Text>{item.title} - {item.artist}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
    
   
  },
  item: {
    // margin: 10,
    // padding: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 20,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 10,
    padding: 14,
    color:'blue',
    borderColor: '#ccc',
    borderWidth: 2,
    borderColor: '#830000'
  },
});
export default Playlist;
