import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './redux/reducers';

export const DEV = process.env.NODE_ENV === 'development';

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
