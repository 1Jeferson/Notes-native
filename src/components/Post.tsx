import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { COLORS } from "@/styles/colors";

type Props = PressableProps & {
  data: {
    title: string;
    content: string;
  };
};

export function Post({ data, ...res }: Props) {
  const MAX_CONTENT_LENGTH = 55;

  const renderContent = (content: string) => {
    if (content.length > MAX_CONTENT_LENGTH) {
      return content.slice(0, MAX_CONTENT_LENGTH) + "...";
    }
    return content;
  };

  return (
    <Pressable
      style={styles.post}
      {...res}
    >
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.content}>{renderContent(data.content)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: COLORS.backgroundSecondary,
    height: 90,
    padding: 14,
    borderRadius: 10,
    gap: 12,
    flexDirection: "column",
  },
  title: {
    color: COLORS.textColor,
    fontSize: 18,
  },
  content: {
    color: COLORS.textColor,
    fontSize: 14,
  },
  date: {
    color: "#656568",
  },
});
