import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useState, useEffect, useRef } from "react";
import { ScreenHeader } from "../components/ScreenHeader";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { searchProducts } from "../../application/usecases/searchProducts";
import { ProductEntity } from "../../domain/entities/ProductEntity";
import { getProducts } from "../../application/usecases/getProducts";
import { useNavigation } from "@react-navigation/native";

export default function ProductListScreen() {
  const navigation = useNavigation<any>();
  const pageSize = 20;

  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true); //initial loading state
  const [error, setError] = useState("");
  const [page, setPage] = useState(0); // Track the current page for pagination
  const [onEndReachLoader, setOnEndReachLoader] = useState(false); // Track loading state for onEndReached

  const isLoadingMore = useRef(false);

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

 
  const renderItems = (
    { item }: { item: ProductEntity }, 
  ) => (
    // Navigate to ProductDetail screen with productId
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          
          productId: item.id,
        })
      }
    />
  );

  const onSearch = (query: string) => {
    setSearchQuery(query);
    const abortController = new AbortController(); // Create an AbortController instance
    const timeout = setTimeout(async () => {
      const filteredProducts = await searchProducts(query, abortController);
      setProducts(filteredProducts.products);
    }, 500);

    return () => {
      abortController.abort();
      clearTimeout(timeout);
    };
  };

  const loadMoreProducts = async () => {
    if (isLoadingMore.current) return;

    isLoadingMore.current = true;
    const nextPage = page + 1;
    try {
      setOnEndReachLoader(true); // Set loading state for onEndReached
      const productData = await getProducts(nextPage * pageSize, pageSize); // Fetch products for the next page
      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((product) => product.id));
        const newProducts = productData.products.filter(
          (product) => !existingIds.has(product.id),
        );
        return [...prevProducts, ...newProducts];
      });
      setPage(nextPage); // Increment the page number after a successful request
    } catch (error) {
      setError("Failed to load more products. Please try again later.");
    } finally {
      setOnEndReachLoader(false); // Reset loading state for onEndReached
      isLoadingMore.current = false; 
    }
  };
  return (
    <View style={styles.container}>
      <ScreenHeader title="Product Catalogue" />

      <SearchBar value={searchQuery} onChangeText={onSearch} />

      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : error ? (
        <View>
          <Text>{error}</Text>
          <Button title="Retry" onPress={fetchProducts} />
        </View>
      ) : products.length === 0 ? ( // Check if products array is empty
        <Text>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItems}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreProducts} // Load more products when scrolled to the end
          onEndReachedThreshold={0.8} // Trigger onEndReached when 80% of the list is visible
          
            refreshing={loading} //pull to refresh
            onRefresh={fetchProducts}

          ListFooterComponent={
            onEndReachLoader ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : null
          }
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
