import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import NumberInput from "./Components/NumberInput";
import CardList from "./Components/CardList";

export default function App() {
  const Title = ({ pressed }: { pressed: boolean }) => {
    return (
      <Text style={styles.titleStyle}>{pressed ? "Search" : "Hotels"}</Text>
    );
  };
  const Input = ({ label, value }: { label: string; value: string }) => {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput style={styles.input} value={value} editable={false} />
      </View>
    );
  };

  //animation funciton begin here
  const [pressed, setPressed] = useState(false);
  const findButtonY = useRef(new Animated.Value(0)).current;
  const findButtonX = useRef(new Animated.Value(1)).current;

  //phase 2 animation
  const [searchdone, setSearchdone] = useState(false);
  const buttonX = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(findButtonY, {
        useNativeDriver: true,
        toValue: pressed ? 130 : 0,
        duration: 200,
      }),
      Animated.timing(findButtonX, {
        useNativeDriver: true,
        toValue: pressed ? 0.25 : 1,
        duration: 200,
      }),
    ]).start(() => setSearchdone(pressed)); //
  }, [pressed]);

  useEffect(() => {
    Animated.spring(buttonX, {
      toValue: searchdone ? 0 : 80,
      useNativeDriver: true,
      bounciness: 20,
      velocity: 40,
    }).start();
  }, [searchdone]);

  return (
    <View style={styles.container}>
      <Title pressed={searchdone} />
      {!searchdone ? (
        <>
          <Input label="Where" value="Anywhere" />
          <Input label="Check In" value="15 Oktober" />
          <Input label="Check Out" value="24 Oktober" />
          <NumberInput label="Adults" desc="over 12 year" value={0} />
          <NumberInput label="Kids" desc="under 12 year" value={0} />
          <NumberInput label="Rooms" desc="" value={0} />

          <Animated.View
            style={{
              marginTop: 30,
              transform: [{ translateY: findButtonY }, { scaleX: findButtonX }],
            }}
          >
            <Button
              color={pressed ? "grey" : "blue"}
              title={pressed ? "" : "Find Hotel"}
              onPress={() => setPressed(() => !pressed)}
            />
          </Animated.View>
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <CardList />
          <View style={styles.floatingContainer}>
            <Animated.View
              style={{
                width: 100,
                marginRight: 10,
                transform: [{ translateX: buttonX }],
                backgroundColor: "grey",
              }}
            >
              <Button
                color={"grey"}
                title={"Filter"}
                onPress={() => setPressed(() => !pressed)}
              />
            </Animated.View>

            <Animated.View
              style={{
                width: 100,
                marginLeft: 10,
                transform: [{ translateX: Animated.multiply(buttonX, -1) }],
                backgroundColor: "grey",
              }}
            >
              <Button
                color={"grey"}
                title={"reset"}
                onPress={() => setPressed(() => !pressed)}
              />
            </Animated.View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 40,
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  inputLabel: {
    fontWeight: "bold",
    color: "#999",
    fontSize: 13,
  },
  input: {
    width: "100%",
    padding: 5,
    borderBottomWidth: 2,
    borderColor: "#eaeaeaaa",
    color: "#000",
  },
  floatingContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    bottom: 20,
    width: "100%",
  },
});
