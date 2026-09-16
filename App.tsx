import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductListScreen from "./src/presentation/screens/ProductListScreen";
import ProductDetailScreen from "./src/presentation/screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

 function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}