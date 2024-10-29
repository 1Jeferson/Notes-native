import { Button } from "@/components/Button";
import { usePostsDatabase } from "@/database/usePostsDatabase";
import { COLORS } from "@/styles/colors";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Details() {
  const [data, setData] = useState({
    title: "",
    content: "",
    date: "",
  });

  const postDatabase = usePostsDatabase();
  const params = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      postDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            title: response.title,
            content: response.content,

            date: response.date
              ? format(new Date(response.date), "dd/MM/yyyy")
              : "",
          });
        }
      });
    }
  }, [params.id]);

  return (
    <View style={styles.details}>
      <View style={styles.buttonContainer}>
        <Button
          width={25}
          height={25}
          icon="arrow-back"
          backgroundColor={COLORS.background}
          onPress={() => router.navigate("/")}
        />
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.date}>{data.date}</Text>
      <Text style={styles.content}>{data.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
    alignItems: "flex-start",
  },
  buttonContainer: {
    marginTop: 80,
    paddingBottom: 60,
  },
  title: {
    color: COLORS.textColor,
    fontSize: 32,
    fontWeight: "bold",
  },
  content: {
    color: COLORS.textColor,
    fontSize: 16,
    marginBottom: 20,
  },
  date: {
    color: "#656568",
    fontSize: 14,
    marginBottom: 40,
  },
});
