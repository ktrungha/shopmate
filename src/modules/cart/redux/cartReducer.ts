import { stringify } from 'querystring';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { API_PATHS, CART_ID_KEY, some } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { makeCancelOldThunk } from '../../../utils';
import { fetchThunk } from '../../common/redux/thunks';
import { merge } from 'lodash';

export interface CartState {
  content?: some[];
  fetching: boolean;
}

export const setCartContent = createAction('cart/setCartContent', resolve => (content?: some[]) =>
  resolve({ content }),
);

export const setFetching = createAction('cart/setFetching', resolve => (val: boolean) =>
  resolve({ val }),
);

export const addToCart = makeCancelOldThunk(
  (controller, product_id: string, attributes: string, quantity: number) => {
    return async (dispatch, getState) => {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (cartId) {
        dispatch(setFetching(true));
        try {
          const json = await dispatch(
            fetchThunk(
              `${API_PATHS.addToCart}`,
              'post',
              true,
              stringify({ product_id, attributes, cart_id: cartId }),
            ),
          );
          if (controller.cancelled) {
            return;
          }
          dispatch(setCartContent(json as some[]));
        } finally {
          dispatch(setFetching(false));
        }
      }
    };
  },
);

export const updateCartItem = makeCancelOldThunk((controller, id: string, quantity: number) => {
  return async (dispatch, getState) => {
    dispatch(setFetching(true));
    try {
      const json = await dispatch(
        fetchThunk(`${API_PATHS.updateCart(id)}`, 'put', true, stringify({ quantity })),
      );
      if (controller.cancelled) {
        return;
      }
      const content = [...(getState().cart.content || [])];
      dispatch(setCartContent(merge(content, json) as some[]));
    } finally {
      dispatch(setFetching(false));
    }
  };
});

export const cartRemove = makeCancelOldThunk((controller, id: string) => {
  return async (dispatch, getState) => {
    dispatch(setFetching(true));
    try {
      await dispatch(fetchThunk(`${API_PATHS.cartRemove(id)}`, 'delete', true));
      if (controller.cancelled) {
        return;
      }
      dispatch(retrieveCart());
    } finally {
      dispatch(setFetching(false));
    }
  };
});

export function retrieveCart(): ThunkAction<void, AppState, null, AnyAction> {
  return async (dispatch, getState) => {
    const id = localStorage.getItem(CART_ID_KEY);
    if (!id) {
      dispatch(createNewCart());
    } else {
      try {
        await dispatch(retrieveCartCore(id));
      } catch (e) {
        dispatch(createNewCart());
      }
    }
  };
}

function createNewCart(): ThunkAction<void, AppState, null, AnyAction> {
  return async (dispatch, getState) => {
    const json = await dispatch(fetchThunk(`${API_PATHS.createCart}`));
    localStorage.setItem(CART_ID_KEY, json.cart_id);
    dispatch(setCartContent([]));
  };
}

const retrieveCartCore = makeCancelOldThunk((controller, id: string) => {
  return async (dispatch, getState) => {
    dispatch(setFetching(true));
    try {
      const json = await dispatch(fetchThunk(`${API_PATHS.getCart(id)}`));
      if (controller.cancelled) {
        return;
      }
      dispatch(setCartContent(json as some[]));
    } finally {
      dispatch(setFetching(false));
    }
  };
});

const actions = { setCartContent, setFetching };

type ActionT = ActionType<typeof actions>;

export default function reducer(
  state: CartState = { fetching: false },
  action: ActionT,
): CartState {
  switch (action.type) {
    case getType(setCartContent):
      return { ...state, content: action.payload.content };
    case getType(setFetching):
      return { ...state, fetching: action.payload.val };
    default:
      return state;
  }
}
