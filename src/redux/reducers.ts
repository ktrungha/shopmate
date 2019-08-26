import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import commonReducer, { CommonState } from '../modules/common/redux/commonReducer';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import accountReducer, { AccountState } from '../modules/account/redux/accountReducer';
import cartReducer, { CartState } from '../modules/cart/redux/cartReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  common: CommonState;
  auth: AuthState;
  account: AccountState;
  cart: CartState;
}

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    common: commonReducer,
    auth: authReducer,
    account: accountReducer,
    cart: cartReducer,
  });
