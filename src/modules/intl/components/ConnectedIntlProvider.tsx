import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import enMessages from '../en.json';

function getMessages(locale: string) {
  if (locale === 'en') {
    return enMessages;
  }
  return enMessages;
}

function mapStateToProps(state: AppState) {
  return { locale: state.intl.locale, messages: getMessages(state.intl.locale) };
}

export default connect(mapStateToProps)(IntlProvider);
