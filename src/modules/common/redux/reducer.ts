import { ActionType, createAction, getType } from 'typesafe-actions';

export interface CommonState {
  readonly networkErrorMsg?: string;
}

export const setNetworkError = createAction(
  'common/setNetworkError',
  resolve => (errorMsg?: string) => resolve({ errorMsg }),
);

const actions = {
  setNetworkError,
};

type Action = ActionType<typeof actions>;

export default function reducer(state: CommonState = {}, action: Action): CommonState {
  switch (action.type) {
    case getType(setNetworkError):
      return { ...state, networkErrorMsg: action.payload.errorMsg };
    default:
      return state;
  }
}
