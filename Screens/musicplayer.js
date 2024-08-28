
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button,TouchableOpacity, StyleSheet, SafeAreaView, Alert, Image,} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import musicData from '../assets/music.json';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import NavigationContainer from '@react-navigation/native';





// Helper function to map file names to assets
const getAudioFile = (fileName) => {
  switch (fileName) {
    case 'Abundant Resources(Part23).mp3':
      return require('../assets/Abundant Resources(Part23).mp3');
    case 'Exposing The Delivering Like The.mp3':
      return require('../assets/Exposing The Delivering Like The.mp3');
      case 'Divine GPS.mp3':
        return require('../assets/Divine GPS.mp3');
        case 'Stepping Into Gods Best.mp3':
          return require('../assets/Stepping Into Gods Best.mp3');
          case 'Cycles Of Thanksgiving.mp3':
            return require('../assets/Cycles Of Thanksgiving.mp3');
            
            
    default:
      
      return null;
  }
};
// Helper function to map image names to assets
const getAudioImage = (imageName) => {
  switch (imageName) {
    case 'PAS1.jpg':
      return require('../assets/PAS1.jpg');
    case 'PAS2.jpg':
      return require('../assets/PAS2.jpg');
      case 'PAS3.jpg':
        return require('../assets/PAS3.jpg');
        case 'PAS4.jpg':
      return require('../assets/PAS4.jpg');
      case 'PAS5.jpg':
      return require('../assets/PAS5.jpg');
      // case 'prinx.png.jpg':
      // return require('../../assets/prinx.png.jpg');
      // case 'chandler.png.jpg':
      // return require('../../assets/chandler.png.jpg');
    default:
      return null;
  }
};
const MusicPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRepeatAll, setIsRepeatAll] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [originalPlaylist, setOriginalPlaylist] = useState(0);
  const [artistName, setArtistName] =useState(null)
  const [songTitle,setSongTitle] = useState(null)
  const [position, setPosition] = useState(0);
  const soundRef = useRef(null);
  const route = useRoute();

  const [playlist, setPlaylist] = useState([
    { id: '1', uri: require('../assets/Abundant Resources(Part23).mp3'), title: 'Abundant resources', artist: 'Pastor Nkechi Ene' },
    { id: '2', uri: require('../assets/Exposing The Delivering Like The.mp3'), title: 'Exposing The Delivering Like', artist: 'Pastor Nkechi Ene' },
    { id: '3', uri: require('../assets/Divine GPS.mp3'), title: 'Divine GPS', artist: 'Pastor Nkechi Ene' },
    { id: '4', uri: require('../assets/Stepping Into Gods Best.mp3'), title: 'Stepping Into Gods Best', artist: 'Pastor Nkechi Ene' },
    { id: '5', uri: require('../assets/Cycles Of Thanksgiving.mp3'), title: 'Cycles Of Thanksgiving', artist: 'Pastor Nkechi Ene' },
    
  ])




  // useEffect(() => {
  //   if (route.params?.index !== undefined) {
  //     setCurrentIndex(route.params.index);
  //     playSound(musicData[route.params.index].file, route.params.index);
  //   }
  // }, [route.params?.index]);
  // useEffect(() => {
  //   // Manage playback status updates
  //   const loadSound = async () => {
  //     if (sound) {
  //       soundRef.current = sound;
  //       sound.setOnPlaybackStatusUpdate((status) => {
  //         if (status.isLoaded) {
  //           setCurrentTime(status.positionMillis / 1000);
  //           setDuration(status.durationMillis / 1000);
  //           if (status.didJustFinish) {
  //             if (isRepeatAll) {
  //               nextTrack();
  //             } else {
  //               playSound(musicData[currentIndex].file, currentIndex);
  //             }
  //           }
  //         }
  //       });
  //     }
  //   };
    
   
   
  
  //   loadSound();
  // }, [sound]);
  // const playSound = async (fileName, index) => {
  //   // Stop any currently playing sound
  //   if (sound) {
  //     await sound.stopAsync();
  //     await sound.unloadAsync();
  //     setSound(null);
  //     setIsPlaying(false);
  //   }


    
  //   // Load and play new sound
  //   const file = getAudioFile(fileName);
  //   if (file) {
  //     const { sound  } = await Audio.Sound.createAsync(file);
  //     setSound(sound);
  //     setCurrentIndex(index);
  //     await sound.playAsync();
  //     setIsPlaying(true);
  //   } else {
  //     Alert.alert('Error', 'Unable to find the audio file.');
  //   }
  
   
  useEffect(() => {
    if (route.params?.index !== undefined) {
      setCurrentIndex(route.params.index);
      playSound(musicData[route.params.index].file, route.params.index);
    }
  }, [route.params?.index]);

  useEffect(() => {
    // Manage playback status updates
    const loadSound = async () => {
      if (sound) {
        soundRef.current = sound;
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
            if (status.didJustFinish) {
              if (isRepeatAll) {
                nextTrack();
              } else {
                playSound(musicData[currentIndex].file, currentIndex);
              }
            }
          }
        });
      }
    };

    loadSound();

    // Cleanup on component unmount or sound change
    return () => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate(null); // Clear playback status listener
        sound.unloadAsync(); // Unload the sound
      }
    };
  }, [sound]);

  const playSound = async (fileName, index) => {
    // Stop any currently playing sound
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }

    // Load and play new sound
    const file = getAudioFile(fileName);
    if (file) {
      const { sound: newSound } = await Audio.Sound.createAsync(file);
      setSound(newSound);
      setCurrentIndex(index);
      await newSound.playAsync();
      setIsPlaying(true);
    } else {
      Alert.alert('Error', 'Unable to find the audio file.');
    }


  


     // Update the artist and song title here
     setArtistName('Your Artist Name');
     setSongTitle('Your Song Title');
  };
   // Function to stop the currently playing sound
  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };
 // Function to pause or resume the currently playing sound
  const pauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };
 // Update originalPlaylist when playlist changes
 useEffect(() => {
  setOriginalPlaylist([...playlist]);
}, [playlist]);

// Function to shuffle the playlist
const shufflePlaylist = () => {
  if (Array.isArray(playlist)) {
      const shuffled = [...playlist].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
  } else {
      console.error('Playlist is not an array');
  }
};

// Toggle shuffle state
const toggleShuffle = () => {
  setIsShuffled(prev => {
      if (!prev) {
          shufflePlaylist(); // Shuffle if not already shuffled
      } else {
          setPlaylist(originalPlaylist); // Restore original order if shuffled
      }
      return !prev; // Toggle the shuffle state
  });
};


 

  

// Function to play the next track
  const nextTrack = () => {
    const nextIndex = (currentIndex + 1) % musicData.length;
    playSound(musicData[nextIndex].file, nextIndex);
  };
  // Function to play the previous track
  const prevTrack = () => {
    const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    playSound(musicData[prevIndex].file, prevIndex);
  };
    // Function to toggle repeat mode
  const toggleRepeat = () => {
    setIsRepeatAll(!isRepeatAll);
  };


  const updateStatus = (status) => {
    if (status.isLoaded) {
        setPosition(status.positionMillis);
        setIsPlaying(status.isPlaying);
        if (status.durationMillis) setDuration(status.durationMillis);
    }
};

  const downloadFile = async (fileName) => {
    try {
      const asset = Asset.fromModule(getAudioFile(fileName));
      await asset.downloadAsync();
  
      const fileUri = FileSystem.documentDirectory + fileName;
  
      // Check if asset.localUri exists
      if (asset.localUri) {
        const { exists } = await FileSystem.getInfoAsync(asset.localUri);
        if (exists) {
          await FileSystem.moveAsync({
            from: asset.localUri,
            to: fileUri,
          });
          Alert.alert('Download completed', 'File saved at: ' + fileUri);
        } else {
          Alert.alert('Download failed', 'Source file does not exist.');
        }
      } else {
        Alert.alert('Download failed', 'Asset localUri is null. The file may not have been downloaded correctly.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Download failed', 'An error occurred while downloading the file.');
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
           < View style={styles.backcontainer}>
    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>    
  </View>
  <View style={styles.coverContainer}>
      <Image source={getAudioImage(musicData[currentIndex].image)} style={styles.image} />
      </View>
      
      <Text style={styles.title}>{musicData[currentIndex].title}</Text>
      <Text style={styles.artist}> {musicData[currentIndex].artist}</Text>
     
      
<View style={styles.slidercontainer}>
     <Text style={styles.timeLabel}>
  {`${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`}
  </Text>
       <Slider
        style={{ width: 300, height: 40 }}
        value={currentTime / duration}
        minimumValue={0}
        maximumValue={1}
        
        thumbTintColor="#830000"
        minimumTrackTintColor="grey"
        maximumTrackTintColor="grey"
      />
      <Text style={styles.timeLabel}>
  
  
  {`${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`}
</Text>
</View>
       {/* <Text>Duration: {Math.floor(duration / 60)}:{Math.floor(duration % 60)}</Text>
       <Text>Current Time: {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}</Text> */}
      
     
     <View style={styles.contain}>
      
      {/* <Button
        title="Stop"
        onPress={stopSound}
      /> */}
      <View style={styles.controls}>
       <TouchableOpacity  onPress={prevTrack}>
          <MaterialIcons name="fast-rewind" size={52} color="#830000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pauseSound}>
        <MaterialIcons
          name={isPlaying ? 'pause' : 'play-arrow'}
          size={52}
          color="#830000" />
      </TouchableOpacity>
      <TouchableOpacity  onPress={stopSound}>
          <MaterialIcons name="stop" size={52} color="#830000" />
        </TouchableOpacity>
    
       <TouchableOpacity  onPress={nextTrack}>
          <MaterialIcons name="fast-forward" size={52} color="#830000" />
        </TouchableOpacity>
        </View>
        </View>
         
        <View style={styles.rept}>
     <TouchableOpacity  onPress={toggleRepeat}>
        <MaterialIcons name={isRepeatAll ? 'repeat-one' : 'repeat-on'} 
           size={30}
            color="#830000" />
            
        </TouchableOpacity>
        <TouchableOpacity  onPress={toggleShuffle}>
        <MaterialIcons name={isShuffled ? 'shuffle' : 'shuffle-on'} 
           size={30}
            color="#830000" />
            
        </TouchableOpacity>
       <TouchableOpacity  onPress={() => downloadFile(musicData[currentIndex].file)}>
          <MaterialIcons name="download" size={30} color="#830000" />
        </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
   
  },


  coverContainer: {
    width: 280,
    height: 280,
    borderRadius:140,
    backgroundColor: '#ddd',
    marginBottom: 50,
    borderColor: 'red',
    borderWidth: ''
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  }, 

  slidercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
},


  image: {
    // width: 200,
    // height: 200,
    // marginBottom: 20,
    width: 280,
        height: 280,
        borderRadius:140,
        borderWidth:5,
        borderColor: '#830000'
  },
  progressBar: {
    width: '80%',
    height: 10,
    marginVertical: 10,
  },
  iconButton: {
    position: 'absolute',
    top: 20,
    right: 120,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    
  },
  slider: {
    width: '80%',
    height: 40,
    marginVertical: 10,
  },
  backcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

 
  rept: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    margin: 40
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  artist: {
    fontSize:24,
    color: 'gray',
    marginBottom: 20,
  },
});

export default MusicPlayer;
