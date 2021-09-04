import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

import yelp from "../api/yelp";

const ResultShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);

  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.imageStyle} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

export default ResultShowScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontSize: 24,
    marginVertical: 10,
    alignSelf: "center",
  },
  imageStyle: {
    height: 120,
    width: 250,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
});