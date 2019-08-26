import { DEV } from './utils';

export type some = { [key: string]: any };

export const LS_LANG = 'lang';
export const SEARCH_INPUT = 'input';
export const CART_ID_KEY = 'cartId';

export const PAGE_SIZE = 20;

export const ROUTES = {
  login: '/login',
  signUp: '/signUp',
  department: { gen: (id: string | number) => `/department/${id}`, value: '/department/:id' },
  category: { gen: (id: string | number) => `/category/${id}`, value: '/category/:id' },
  product: { gen: (id: string | number) => `/product/${id}`, value: '/product/:id' },
  search: '/search',
};

const API_BASE = DEV ? '/api' : 'https://backendapi.turing.com';
export const PRODUCT_IMAGE_BASE = 'https://backendapi.turing.com/images/products/';

export const API_PATHS = {
  getDepartments: `${API_BASE}/departments`,
  getCategories: `${API_BASE}/categories`,
  allProducts: `${API_BASE}/products`,
  productsInDepartment: (id: string) => `${API_BASE}/products/inDepartment/${id}`,
  getCategoriesInDepartment: (id: string) => `${API_BASE}/categories/inDepartment/${id}`,
  getDepartment: (id: string) => `${API_BASE}/departments/${id}`,
  productsOfCategory: (id: string) => `${API_BASE}/products/inCategory/${id}`,
  getCategory: (id: string) => `${API_BASE}/categories/${id}`,
  product: (id: string) => `${API_BASE}/products/${id}`,
  productAttributes: (id: string) => `${API_BASE}/attributes/inProduct/${id}`,
  search: `${API_BASE}/products/search`,
  customers: `${API_BASE}/customers`,
  customer: `${API_BASE}/customer`,
  login: `${API_BASE}/customers/login`,
  getCart: (id: string) => `${API_BASE}/shoppingcart/${id}`,
  createCart: `${API_BASE}/shoppingcart/generateUniqueId`,
  addToCart: `${API_BASE}/shoppingcart/add`,
  updateCart: (id: string) => `${API_BASE}/shoppingcart/update/${id}`,
  cartRemove: (id: string) => `${API_BASE}/shoppingcart/removeProduct/${id}`,
  getTaxes: `${API_BASE}/tax`,
};
