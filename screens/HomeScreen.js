import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Clipboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

const HomeScreen = () => {
  const [expoToken, setExpoToken] = useState("");
  const [friendToken, setFriendToken] = useState("");
  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      setExpoToken(token.split("[")[1].split("]")[0]);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const handleCopy = () => {
    Clipboard.setString(expoToken);
    alert("Copied to clipboard!");
  };

  const handleSaveToken = () => {
    console.log(friendToken);
    AsyncStorage.setItem("friendToken", friendToken);
    alert("SAVED");
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          paddingHorizontal: 5,
        }}
      >
        <Text>Your Profile Code is</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
          {expoToken === "" ? "Loading..." : expoToken}
        </Text>
      </View>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={handleCopy}>
        <View style={{ backgroundColor: "black", borderRadius: 5 }}>
          <Text
            style={{
              color: "white",
              paddingHorizontal: 20,
              paddingVertical: 5,
              fontSize: 20,
              textAlignVertical: "center",
              textAlign: "center",
            }}
          >
            COPY TO CLIPBOARD
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 40 }}>
        <Text>Insert your partner's code</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderBottomWidth: 2 }}
          onChangeText={(text) => setFriendToken(text)}
        />
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => handleSaveToken()}
        >
          <View style={{ backgroundColor: "black", borderRadius: 5 }}>
            <Text
              style={{
                color: "white",
                paddingHorizontal: 20,
                paddingVertical: 5,
                fontSize: 20,
                textAlignVertical: "center",
                textAlign: "center",
              }}
            >
              INSERT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

export default HomeScreen;
