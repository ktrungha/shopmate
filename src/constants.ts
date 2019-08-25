import { DEV } from './utils';

export type some = { [key: string]: any };

export const LS_LANG = 'lang';

export const PAGE_SIZE = 20;

export const ROUTES = {
  login: '/login',
  signUp: '/signUp',
  department: { gen: (id: string | number) => `/department/${id}`, value: '/department/:id' },
  category: { gen: (id: string | number) => `/category/${id}`, value: '/category/:id' },
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
  login: '',
  tmp: 'tmp',
};
