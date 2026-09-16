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
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
  },

  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    backgroundColor: "#c8c1c1",
    borderRadius: 20,
    marginTop: 60,
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#172033",
    lineHeight: 34,
    marginBottom: 8,
  },

  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4f46e5",
    marginBottom: 8,
  },

  rating: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#172033",
    marginTop: 10,
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#64748b",
    marginBottom: 14,
  },

  discount: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#dc0303",
    fontWeight: "bold",
    backgroundColor: "#eef2ff",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    marginBottom: 14,
  },

  infoText: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 8,
  },

  reviewCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 30,
    borderRadius: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  reviewerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172033",
    marginBottom: 5,
  },

  reviewRating: {
    fontSize: 14,
    marginBottom: 8,
  },

  reviewComment: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 21,
    marginBottom: 10,
  },

  reviewEmail: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 3,
  },

  reviewDate: {
    fontSize: 12,
    color: "#94a3b8",
  },
});
