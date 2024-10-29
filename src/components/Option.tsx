import {
  TouchableOpacity,
  TouchableOpacityProps,
  ColorValue,
  StyleSheet,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/styles/colors";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  backgroundColor: ColorValue;
  onPress: () => void;
};

export function Option({ icon, backgroundColor, onPress, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[styles.option, { backgroundColor }]}
      activeOpacity={0.7}
      onPress={onPress}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={COLORS.white}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    height: 90,
    width: 78,
    justifyContent: "center",
    alignItems: "center",
  },
});
