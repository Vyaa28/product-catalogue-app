import { TextInput, StyleSheet, View, Text } from "react-native";

//Define the props which the SearchBar components accepts
type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

//SearchBar component for product search query
export const SearchBar = (props: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },
});
