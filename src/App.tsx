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
import { setNetworkError, initData } from './modules/common/redux/commonReducer';
import { AppState } from './redux/reducers';
import { getMUITheme, getTheme } from './setupTheme';
import All from './modules/listing/pages/All';
import Product from './modules/detail/pages/Product';
import Department from './modules/listing/pages/Department';
import Category from './modules/listing/pages/Category';
import { ROUTES } from './constants';
import Search from './modules/listing/pages/Search';

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
    dispatch(initData());
  }

  render() {
    const { authDialog, common, dispatch } = this.props;
    const { networkErrorMsg } = common;
    return (
      <ThemeProvider theme={getTheme()}>
        <MUIThemeProvider theme={getMUITheme()}>
          <NetworkProblemDialog
            msgId={networkErrorMsg}
            onClose={() => dispatch(setNetworkError())}
          />
          <AuthDialogs authDialog={authDialog} close={() => dispatch(closeAuthDialog())} />
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={All} />
              <Route exact path={ROUTES.department.value} component={Department} />
              <Route exact path={ROUTES.category.value} component={Category} />
              <Route exact path={ROUTES.product.value} component={Product} />
              <Route exact path={ROUTES.search} component={Search} />
            </Switch>
          </ScrollToTop>
        </MUIThemeProvider>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(App);
