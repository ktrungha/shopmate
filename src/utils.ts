import { replace } from 'connected-react-router';
import { AnyAction, Dispatch } from 'redux';
import { ROUTES } from './constants';
import { REASON } from './modules/common/components/SendHomeReasonDialog';
import { SEND_HOME_REASONS } from './modules/common/constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './redux/reducers';

export const DEV = process.env.NODE_ENV === 'development';

export function loadParamsToStore(dispatch: Dispatch<AnyAction>) {
  try {
    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;
    if (pathname === ROUTES.login) {
    }
  } catch (err) {
    console.log(err);
    dispatch(
      replace({
        pathname: '/',
        search: `?${REASON}=${encodeURIComponent(SEND_HOME_REASONS.invalidLink)}`,
      }),
    );
  }
}

export type ThunkController = {
  cancelled: boolean;
};

/*
  Create a thunk that works similar to redux saga's takeLatest.
  Old thunks will be cancelled when new thunk is dispatched
 */
export function makeCancelOldThunk<A extends any[], R>(
  creator: (controller: ThunkController, ...args: A) => ThunkAction<R, AppState, null, AnyAction>,
) {
  let controller: ThunkController = { cancelled: false };
  return (...args: A): ThunkAction<R, AppState, null, AnyAction> => {
    controller.cancelled = true;
    controller = { cancelled: false };
    return creator(controller, ...args);
  };
}
