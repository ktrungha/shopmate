import { DEV } from './utils';

export type some = { [key: string]: any };

export const LS_LANG = 'lang';

export const DESKTOP_WIDTH = '960px';

export const ROUTES = {
  login: '/login',
  signUp: '/signUp',
  department: { gen: (id: some) => `/department/${id}`, value: '/department/:id' },
};

const API_BASE = DEV ? '/api' : 'https://backendapi.turing.com';

export const API_PATHS = {
  getDepartments: `${API_BASE}/departments`,
  login: '',
  tmp: 'tmp',
};
