import { get, remove } from 'js-cookie';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { some } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { ACCESS_TOKEN } from '../../auth/constants';
import { out } from '../../auth/redux/authReducer';
import { setNetworkError } from './commonReducer';

export function fetchThunk(
  url: string,
  method: 'get' | 'post' = 'get',
  auth = true,
  body?: string | FormData,
  contentType?: string,
): ThunkAction<Promise<some>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    while (true) {
      let res;
      try {
        const headers = {
          'user-key': get(ACCESS_TOKEN) || '',
          'Content-Type': contentType || 'application/json',
        };
        if (!auth) {
          delete headers['user-key'];
        }

        if (body instanceof FormData) {
          delete headers['Content-Type'];
        }

        res = await fetch(url, {
          method,
          body,
          headers,
        });
      } catch (_) {}

      if (res) {
        if (res.ok) {
          const json = await res.json();
          return json;
        }

        if (res.status === 400) {
          const json = await res.json();
          throw new Error(json.message);
        }
        if (res.status === 401 || res.status === 403) {
          dispatch(out());
          remove(ACCESS_TOKEN);
          throw new Error('Invalid token');
        }
      }

      let hasInternet = true;
      try {
        await fetch('https://google.com', { mode: 'no-cors' });
      } catch (_) {
        hasInternet = false;
      }

      dispatch(setNetworkError(hasInternet ? 'serverProblem' : 'unstableNetwork'));

      do {
        await new Promise(resolve => setTimeout(resolve, 250));
      } while (!!getState().common.networkErrorMsg);
      continue;
    }
  };
}
