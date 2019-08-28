import { createAction, ActionType, getType } from 'typesafe-actions';
import { LS_LANG } from '../../../constants';

export interface IntlState {
  readonly locale: string;
}

export const setLocale = (locale: string) => {
  localStorage.setItem(LS_LANG, locale);
  return setLocaleAction(locale);
};

const setLocaleAction = createAction('setLocale', resolve => (locale: string) =>
  resolve({ locale }),
);

const actions = { setLocale };

type Action = ActionType<typeof actions>;

export default function reducer(state: IntlState = { locale: 'en' }, action: Action) {
  switch (action.type) {
    case getType(setLocaleAction):
      return { ...state, locale: action.payload.locale };
    default:
      return state;
  }
}
