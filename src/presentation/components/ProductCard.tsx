import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { ProductEntity } from "../../domain/entities/ProductEntity";

//Define the props which the ProductCard components accepts
type ProductCardProps = {
  product: ProductEntity;
  onPress?: () => void;
};

//Display info about single product
export const ProductCard = (props: ProductCardProps) => {
  return (
    //Clickable product card
    <Pressable
      style={styles.card}
      onPress={props.onPress}
    >
      <Image source={{ uri: props.product.thumbnail }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {props.product.title}
        </Text>

        <Text style={styles.category} numberOfLines={1}>
          {props.product.category}
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>⭐</Text>
          <Text style={styles.rating}>{props.product.rating}</Text>
        </View>

        <Text style={styles.price}>${props.product.price}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    borderRadius: 15,
    gap: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 16,
  },

  image: {
    width: 80,
    height: 76,
    borderRadius: 8,
    backgroundColor: "#eef2ff",
    resizeMode: "cover",
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },

  category: {
    fontSize: 13,
    color: "#3b5281",
    marginBottom: 2,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  stars: {
    fontSize: 12,
    color: "#fbbf24",
    marginRight: 5,
    letterSpacing: 5,
  },

  rating: {
    fontSize: 14,
    color: "#050505",
    marginLeft: 5,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
});
