import { push } from 'connected-react-router';
import { get, remove, set } from 'js-cookie';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType, createAction, getType } from 'typesafe-actions';
import { API_PATHS } from '../../../API';
import { some } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { setUserData } from '../../account/redux/accountReducer';
import { REASON } from '../../common/components/SendHomeReasonDialog';
import { SEND_HOME_REASONS } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunks';
import { ACCESS_TOKEN } from '../constants';

export enum AuthDialog {
  login,
}

export interface AuthState {
  readonly auth: boolean;
  readonly authenticating: boolean;
  readonly loginErrorMsg?: string;
  readonly authDialog?: AuthDialog;
  readonly userData?: Readonly<some>;
}

export const in_ = createAction('auth/in', resolve => (skipSaga: boolean) => resolve({ skipSaga }));
export const out = createAction('auth/out');

export const setAuthenticating = createAction('auth/setAuthenticating', resolve => (val: boolean) =>
  resolve({ val }),
);

export const setAuthDialog = createAction(
  'auth/setAuthDialog',
  resolve => (val: AuthDialog, dest?: string) => resolve({ val, dest }),
);

export const closeAuthDialog = createAction('auth/closeAuthDialog');

export const setLoginErrorMsg = createAction('auth/setLoginErrorMsg', resolve => (val?: string) =>
  resolve({ val }),
);

export function authIn(
  userData: some,
  skipSaga: boolean = false,
): ThunkAction<void, AppState, null, Action<string>> {
  return (dispatch, getState) => {
    dispatch(setUserData(userData));
    dispatch(in_(skipSaga));
  };
}

export function validateAccessToken(): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const accessToken = get(ACCESS_TOKEN);
    if (accessToken) {
      dispatch(setAuthenticating(true));
      try {
        const json = await dispatch(fetchThunk(`${API_PATHS.tmp}`, 'get', true));
        if (json.code === 200) {
          dispatch(authIn(json.data));
        } else if (getState().auth.auth) {
          dispatch(out());
          remove(ACCESS_TOKEN);
          dispatch(setUserData());
          dispatch(
            push({
              pathname: '/',
              search: `?${REASON}=${encodeURIComponent(SEND_HOME_REASONS.invalidAccessToken)}`,
            }),
          );
        }
      } finally {
        dispatch(setAuthenticating(false));
      }
    }
  };
}

export function login(
  loginId: string,
  password: string,
): ThunkAction<Promise<boolean>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    dispatch(setAuthenticating(true));
    try {
      const json = await dispatch(
        fetchThunk(
          API_PATHS.login,
          'post',
          false,
          JSON.stringify({ password, user_name: loginId }),
        ),
      );
      if (json.code === 200) {
        set(ACCESS_TOKEN, json.access_token);
        dispatch(authIn(json.data));
        return true;
      }
      dispatch(setLoginErrorMsg(json.message));
    } finally {
      dispatch(setAuthenticating(false));
    }
    return false;
  };
}

export function logout(): ThunkAction<void, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    remove(ACCESS_TOKEN);
    dispatch(out());
    dispatch(setUserData());
  };
}

const actions = {
  in_,
  out,
  setAuthenticating,
  setAuthDialog,
  setUserData,
  closeAuthDialog,
  setLoginErrorMsg,
};

type ActionT = ActionType<typeof actions>;

export default function reducer(
  state: AuthState = {
    authenticating: false,
    auth: false,
  },
  action: ActionT,
): AuthState {
  switch (action.type) {
    case getType(in_):
      return { ...state, auth: true };
    case getType(out):
      return { ...state, auth: false };
    case getType(setLoginErrorMsg):
      return { ...state, loginErrorMsg: action.payload.val };
    case getType(setAuthenticating):
      return { ...state, authenticating: action.payload.val };
    case getType(setAuthDialog):
      return { ...state, authDialog: action.payload.val };
    case getType(closeAuthDialog):
      return { ...state, authDialog: undefined };
    default:
      return state;
  }
}
