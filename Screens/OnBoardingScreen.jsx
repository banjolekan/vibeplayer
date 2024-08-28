import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {

    const navigation = useNavigation();

  const onboardingData = [
    {
      image: require("./../assets/mas1.png"),
      title: "Welcome to AudioVibes",
      content:
        "AudioVibes allowing you to listen to your favourite audio anytime, anywhere ",
    },
    {
      image: require("./../assets/mas1.png"),
      title: "Welcome to AudioVibes",
      content:
        "listen by selecting your favourite audio",
    },
  
  ];

  return (
    <View style={styles.container}>
      <Swiper
        paginationStyle={{
          position: "absolute",
          top: 310,
          paddingHorizontal: 24,
          height: "100%",
        }}
        dotStyle={{
          width: 8,
          height: 8,
          backgroundColor: "#EA4747",
          borderRadius: 9,
        }}
        activeDotStyle={{
          width: 42,
          height: 8,
          borderRadius: 9,
          backgroundColor: "#EA4747",
        }}
        autoplay
      >
        {/* Slide 1 */}
        {onboardingData.map((data, index) => (
          <View
            key={index}
            style={{
              padding: 24,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image source={data.image} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
                marginTop: 10,
              }}
            >
              {data.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "light",
                color: "black",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {data.content}
            </Text>
          </View>
        ))}
        {/* Slide 1 ends here */}
      </Swiper>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            width: 220,
            paddingVertical: 16,
            backgroundColor: "#830000",
            borderRadius: 8,
            position: "absolute",
            bottom: 80,
          }}
          onPress={()=>navigation.navigate('playlist')}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "semibold",
              color: "#FFF2F2",
              textAlign: "center",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
