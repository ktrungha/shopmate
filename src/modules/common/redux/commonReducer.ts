import { ActionType, createAction, getType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../redux/reducers';
import { AnyAction } from 'redux';
import { fetchThunk } from './thunks';
import { API_PATHS, some } from '../../../constants';

export interface CommonState {
  readonly networkErrorMsg?: string;
  readonly departments: some[];
  readonly categories: some[];
}

export const setNetworkError = createAction(
  'common/setNetworkError',
  resolve => (errorMsg?: string) => resolve({ errorMsg }),
);

export const setDepartments = createAction('common/setDepartments', resolve => (data: any) =>
  resolve({ data }),
);

export const setCategories = createAction('common/setCategories', resolve => (data: any) =>
  resolve({ data }),
);

export function initData(): ThunkAction<void, AppState, null, AnyAction> {
  return async (dispatch, getState) => {
    const [departments, json] = await Promise.all([
      dispatch(fetchThunk(`${API_PATHS.getDepartments}`)),
      dispatch(fetchThunk(`${API_PATHS.getCategories}`)),
    ]);

    dispatch(setDepartments(departments));
    dispatch(setCategories(json.rows));
  };
}

const actions = {
  setNetworkError,
  setDepartments,
  setCategories,
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: CommonState = { departments: [], categories: [] },
  action: Action,
): CommonState {
  switch (action.type) {
    case getType(setNetworkError):
      return { ...state, networkErrorMsg: action.payload.errorMsg };
    case getType(setDepartments):
      return { ...state, departments: action.payload.data };
    case getType(setCategories):
      return { ...state, categories: action.payload.data };
    default:
      return state;
  }
}