import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ProductEntity} from '../../domain/entities/ProductEntity';
import { useEffect, useState } from "react";
import { getProductById } from "../../application/usecases/getProductById";

export default function ProductDetailScreen() {
  const route = useRoute<any>();
  const productId = route.params.productId;

  const [product, setProduct] = useState<ProductEntity | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // console.log("Product ID being requested:", productId);

        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (product === null) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.image}
      />

{/* retrieve necessary details from API */}
      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <Text style={styles.rating}>⭐ {product.rating}</Text>

      <Text style={styles.sectionTitle}>Description</Text>

      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.discount}>
        Discount: {product.discountPercentage}%
      </Text>

      <Text>Stock: {product.stock}</Text>

      <Text>Weight: {product.weight} kg</Text>
      
      <Text>Availability: {product.availabilityStatus}</Text>
      
      <Text style={styles.sectionTitle}>Reviews</Text>

      {product.reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <Text>{review.reviewerName}</Text>
          <Text>⭐ {review.rating}/5</Text>
          <Text>{review.comment}</Text>
          <Text>{review.reviewerEmail}</Text>
          <Text>{new Date(review.date).toLocaleDateString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#172033",
    marginBottom: 8,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: 8,
  },

  rating: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
  },

  discount: {
    fontSize: 16,
    color: "#502ebf",
    fontWeight: "bold",
    marginBottom: 20,
  },

  reviewCard: {
  padding: 15,
  marginBottom: 10,
  marginTop: 10,
  backgroundColor: "#f8fafc",
  borderRadius: 10,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,




},
});
