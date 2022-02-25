import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

const CustomCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Sample Card</Text>
      <Image
        style={[
          styles.logo,
          {
            resizeMode: "cover",
          },
        ]}
        source={{
          uri: "https://i.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA",
        }}
      />
    </View>
  );
};

const CardList = () => {
  const loop = [...Array(8).keys()];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={loop}
        renderItem={() => <CustomCard />}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer} />
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 20,
    paddingHorizontal: 20,
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  logo: {
    width: "100%",
    height: 150,
  },
  footer: {
    marginBottom: 72,
  },
});
