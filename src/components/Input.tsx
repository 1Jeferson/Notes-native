import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { COLORS } from "@/styles/colors";

interface InputProps extends TextInputProps {
  isTextArea?: boolean;
}

export function Input({ isTextArea = false, ...res }: InputProps) {
  return (
    <TextInput
      style={[styles.input, isTextArea && styles.textArea]}
      multiline={isTextArea}
      numberOfLines={isTextArea ? 5 : 1}
      {...res}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 54,
    color: COLORS.textColor,
    borderWidth: 1,
    fontSize: 32,
    marginBottom: 24,
    borderColor: COLORS.background,
    paddingHorizontal: 16,
  },
  textArea: {
    height: 120,
    fontSize: 20,
    textAlignVertical: "top",
    paddingVertical: 8,
  },
});
