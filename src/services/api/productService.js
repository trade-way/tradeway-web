import { api, API_ENDPOINTS } from './axios';

const productService = {
  getProducts: async (queryParams = {}) => {
    return api.get(API_ENDPOINTS.product.list, queryParams);
  },
  
  getProductById: async (id) => {
    return api.get(API_ENDPOINTS.product.details, { id });
  },
  
  createProduct: async (productData) => {
    return api.post(API_ENDPOINTS.product.create, productData);
  },
  
  updateProduct: async (id, productData) => {
    return api.put(API_ENDPOINTS.product.update, productData, { id });
  },
  
  deleteProduct: async (id) => {
    return api.delete(API_ENDPOINTS.product.delete, { id });
  }
};

export default productService;
