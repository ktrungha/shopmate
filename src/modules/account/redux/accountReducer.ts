import { ActionType, createAction, getType } from 'typesafe-actions';
import { some } from '../../../constants';

export interface AccountState {
  readonly userData?: Readonly<some>;
}

export const setUserData = createAction('account/setUserData', resolve => (data?: some) =>
  resolve({ data }),
);

const actions = { setUserData };

type ActionT = ActionType<typeof actions>;

export default function reducer(state: AccountState = {}, action: ActionT): AccountState {
  switch (action.type) {
    case getType(setUserData):
      return { ...state, userData: action.payload.data };
    default:
      return state;
  }
}
