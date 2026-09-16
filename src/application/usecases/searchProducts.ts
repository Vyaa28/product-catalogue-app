import { createAxiosHttpClient } from "../../infrastructure/api/axiosClient";
import { ProductEntity } from "../../domain/entities/ProductEntity";

//structure of the search API response
type SearchProductResponse = {
  products: ProductEntity[];
};

const axiosClient = createAxiosHttpClient();
export const searchProducts = async (
  query: string,
  //this used to cancel the API request when needed
  abortController: AbortController,
): Promise<SearchProductResponse> => {

//GET request to the product search endpoint
  const response = await axiosClient.get("/products/search", {
    params: { q: query },
    signal: abortController.signal,//signal to allow request cancel
  });

  return response.data;
};
