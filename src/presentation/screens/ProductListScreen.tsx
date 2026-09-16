import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useState, useEffect } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { ProductCard } from "../components/ProductCard";

import { ProductEntity } from "../../domain/entities/ProductEntity";
import { getProducts } from "../../application/usecases/getProducts";

export default function ProductListScreen() {
  const pageSize = 20;

  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true); //initial loading state
  const [error, setError] = useState("");
  const [page, setPage] = useState(0); // Track the current page for pagination

  const fetchProducts = async () => {
    setLoading(true); //retry loading state
    setError(""); //clear previous error

    try {
      const productData = await getProducts(page * pageSize, pageSize); // Fetch products for the current page
      setProducts(productData.products);
    } catch (error) {
      setError("Failed to load products. Please try again later.");
    }
    setLoading(false);
  };

  // Retrieve products when the screen first loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Display each product using the ProductCard component
  const renderItems = ({ item }: { item: ProductEntity }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Product Catalogue" />

      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : error ? (
        <View>
          <Text>{error}</Text>
          <Button title="Retry" onPress={fetchProducts} />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItems}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
