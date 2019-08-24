import { ThemeProvider as MUIThemeProvider } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import AuthDialogs from './modules/auth/components/AuthDialogs';
import { closeAuthDialog, validateAccessToken } from './modules/auth/redux/authReducer';
import NetworkProblemDialog from './modules/common/components/NetworkProblemDialog';
import ScrollToTop from './modules/common/components/ScrollToTop';
import { setNetworkError } from './modules/common/redux/reducer';
import { AppState } from './redux/reducers';
import { getMUITheme, getTheme } from './setupTheme';

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  authDialog: state.auth.authDialog,
  common: state.common,
  account: state.account,
});

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

class App extends Component<Props, {}> {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(validateAccessToken());
  }

  render() {
    const { authDialog, common, dispatch } = this.props;
    const { networkErrorMsg } = common;
    return (
      <ThemeProvider theme={getTheme()}>
        <MUIThemeProvider theme={getMUITheme()}>
          <NetworkProblemDialog
            msgId={networkErrorMsg}
            onClose={() => dispatch(setNetworkError(undefined))}
          />
          <AuthDialogs authDialog={authDialog} close={() => dispatch(closeAuthDialog())} />
          <ScrollToTop>
            <Switch>
              <Route exact path="/" render={() => <div />} />
            </Switch>
          </ScrollToTop>
        </MUIThemeProvider>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(App);
