import { Text, StyleSheet } from "react-native";

//Title
type ScreenHeaderProps = {
  title: string;
};

export const ScreenHeader = (props: ScreenHeaderProps) => {
    return <Text style={styles.title}>{props.title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
 },
});
