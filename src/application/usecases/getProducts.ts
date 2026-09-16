import { createAxiosHttpClient } from "../../infrastructure/api/axiosClient";
import { ProductEntity } from "../../domain/entities/ProductEntity";

//structure of the product API response
type ProductResponse = {
  products: ProductEntity[];
  total: number;
  skip: number;
  limit: number;
};

const axiosClient = createAxiosHttpClient();

//Fetch products from API include the pagination
export const getProducts = async (
  skip: number,
  limit: number,
): Promise<ProductResponse> => {
    
  //GET request to the endpoint
  const response = await axiosClient.get("/products", {
    params: {
      limit,
      skip,
    },
  });

  return response.data;
};
