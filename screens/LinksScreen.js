import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

const LinkScreen = () => {
  const [friendToken, setFriendToken] = useState("");
  const [name, setName] = useState("");
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("friendToken").then(
      (res) => res && setFriendToken(res)
    );
    AsyncStorage.getItem("myName").then((res) => res && setName(res));
  }, []);

  const handleChangeName = (name) => {
    AsyncStorage.setItem("myName", name).then(() => {
      setName(name);
    });
  };

  const message = {
    missing: `${name} is missing you...`,
    call: `${name} mau call NOWW`,
    pr: `${name} MAU DIAJARIN PR WOII SUSAHH 😭 `,
    laper: `${name} IS HUNGRYYY, gojekin dong hehhe`,
    sendirian: `${name} mau dijemputtt`,
    jalan: `${name} mau jalan sama u ni`,
    line: `BUKA LINE BEGOOOOOOOO`,
  };

  const getMessageByType = (type) => {
    const messageTypes = [
      "missing",
      "call",
      "pr",
      "laper",
      "sendirian",
      "jalan",
      "line",
    ];
    if (type !== "random") {
      return message[type];
    } else {
      let randomType =
        messageTypes[Math.floor(Math.random() * messageTypes.length)];
      return message[randomType];
    }
  };

  const handleSendNotification = (messagetype) => {
    console.log(friendToken);
    let response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `ExponentPushToken[${friendToken}]`,
        sound: "default",
        title: `${name}`,
        body: getMessageByType(messagetype).toString(),
        _displayInForeground: true,
      }),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{ fontSize: 20 }}>Your name</Text>
        <TextInput
          value={name}
          style={{
            height: 40,
            borderColor: "gray",
            borderBottomWidth: 2,
            fontSize: 20,
          }}
          onChangeText={(text) => setName(text)}
          onEndEditing={(e) => handleChangeName(e.nativeEvent.text)}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => handleSendNotification("missing")}
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
              MISSING YOU 😍
            </Text>
          </View>
        </TouchableOpacity>
        {isOptionsVisible && (
          <View>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => handleSendNotification("call")}
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
                  WANNA CALL 📞
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => handleSendNotification("pr")}
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
                  NEED HELP PR 📚
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => handleSendNotification("laper")}
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
                  HANGRY 🍔
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => handleSendNotification("random")}
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
                  SURPRISE HIM/HER 😏
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => setIsOptionsVisible((prev) => !prev)}
        >
          <View style={{ backgroundColor: "salmon", borderRadius: 100 }}>
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
              {isOptionsVisible ? "HIDE" : "SHOW"} PRESETS ✨
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
});

export default LinkScreen;
