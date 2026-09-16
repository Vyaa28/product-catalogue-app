import { createAxiosHttpClient } from "../../infrastructure/api/axiosClient";
import { ProductEntity } from "../../domain/entities/ProductEntity";

const axiosClient = createAxiosHttpClient()
export const getProductById = async (id: number): Promise<ProductEntity> => {

//GET product based on the id
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
}