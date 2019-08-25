import { DEV } from './utils';

export type some = { [key: string]: any };

export const LS_LANG = 'lang';

export const PAGE_SIZE = 20;

export const ROUTES = {
  login: '/login',
  signUp: '/signUp',
  department: { gen: (id: some) => `/department/${id}`, value: '/department/:id' },
  category: { gen: (id: some) => `/category/${id}`, value: '/category/:id' },
};

const API_BASE = DEV ? '/api' : 'https://backendapi.turing.com';
export const PRODUCT_IMAGE_BASE = 'https://backendapi.turing.com/images/products/';

export const API_PATHS = {
  getDepartments: `${API_BASE}/departments`,
  getCategories: `${API_BASE}/categories`,
  allProducts: `${API_BASE}/products`,
  login: '',
  tmp: 'tmp',
};
