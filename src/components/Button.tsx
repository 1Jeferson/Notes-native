import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "@/styles/colors";

interface ButtonProps {
  onPress: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  backgroundColor: string;
  width: number;
  height: number;
}

export function Button({
  onPress,
  icon,
  backgroundColor,
  width,
  height,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width, height }]}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        style={{ color: COLORS.white }}
        size={30}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
