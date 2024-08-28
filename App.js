import react from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";



import MusicPlayer from "./Screens/musicplayer";
import OnboardingScreen from "./Screens/OnBoardingScreen";
import Playlist from "./Screens/Playlist";
 


// const App = () => {
  const Stack = createNativeStackNavigator();
export default function App() {
return(
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="botton"
     component={OnboardingScreen} 
     options={{headerShown: false}} />
    <Stack.Screen name="playlist" component={Playlist} options={{headerShown: false}} />
    
    <Stack.Screen name="musicplayer" component ={MusicPlayer} options={{ headerShown: false }}/>
    
    



    </Stack.Navigator>
  </NavigationContainer>
);

}




