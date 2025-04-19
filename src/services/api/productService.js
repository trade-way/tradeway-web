import { api, API_ENDPOINTS } from './axios';

// Products service
const productService = {
  getProducts: async (queryParams = {}) => {
    return api.get(API_ENDPOINTS.product.list, queryParams);
  },
 
  getProductList: async (queryParams = {}) => {
    return api.get(API_ENDPOINTS.product.productList, queryParams);
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

  patchProduct: async (id, partialData) => {
    return api.patch(API_ENDPOINTS.product.patch, partialData, { id });
  },
 
  deleteProduct: async (id) => {
    return api.delete(API_ENDPOINTS.product.delete, { id });
  }
};

// Cart service
const cartService = {
  getCart: async (queryParams = {}) => {
    return api.get(API_ENDPOINTS.cart.list, queryParams);
  },

  createCart: async (cartData) => {
    return api.post(API_ENDPOINTS.cart.create, cartData);
  },

  deleteCart: async (id) => {
    return api.delete(API_ENDPOINTS.cart.delete, { id });
  }
};

// Categories service
const categoryService = {
  getCategories: async (queryParams = {}) => {
    return api.get(API_ENDPOINTS.category.list, queryParams);
  },

  getCategoryById: async (id) => {
    return api.get(API_ENDPOINTS.category.details, { id });
  },

  createCategory: async (categoryData) => {
    return api.post(API_ENDPOINTS.category.create, categoryData);
  },

  updateCategory: async (id, categoryData) => {
    return api.put(API_ENDPOINTS.category.update, categoryData, { id });
  },

  patchCategory: async (id, partialData) => {
    return api.patch(API_ENDPOINTS.category.patch, partialData, { id });
  },

  deleteCategory: async (id) => {
    return api.delete(API_ENDPOINTS.category.delete, { id });
  }
};

export { productService, cartService, categoryService };