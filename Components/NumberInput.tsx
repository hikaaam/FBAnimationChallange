import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const NumberInput = ({
  label,
  desc,
  value,
}: {
  label: string;
  desc: string;
  value: number;
}) => {
  const [number, setNumber] = useState(value);
  const activeColor = "blue";
  const inactiveColor = "gray";
  return (
    <View style={styles.numberInputContainer}>
      <View>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{label}</Text>
        <Text style={styles.inputLabel}>{desc}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          disabled={number == 0}
          onPress={() => setNumber((a) => a - 1)}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 40,
              marginRight: 20,
              color: number == 0 ? inactiveColor : "black",
            }}
          >
            -
          </Text>
        </TouchableOpacity>
        <Text>{number}</Text>
        <TouchableOpacity onPress={() => setNumber((a) => a + 1)}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              marginLeft: 20,
              color: activeColor,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  inputLabel: {
    fontWeight: "bold",
    color: "#999",
    fontSize: 13,
  },
  numberInputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#eaeaeaaa",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
});
