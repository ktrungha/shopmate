import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BLUE, RED } from '../../../colors';
import { ROUTES } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { BootstrapInput } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import { login, setLoginErrorMsg } from '../redux/authReducer';

const mapState2Props = (state: AppState) => {
  return {
    authenticating: state.auth.authenticating,
    loginErrorMsg: state.auth.loginErrorMsg,
  };
};
export interface ILoginBoxProps extends InjectedIntlProps, ReturnType<typeof mapState2Props> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
  onPage?: boolean;
}

export interface ILoginBoxState {
  loginId: string;
  password: string;
}

export default connect(mapState2Props)(
  injectIntl(
    class LoginBox extends React.Component<ILoginBoxProps, ILoginBoxState> {
      constructor(props: ILoginBoxProps) {
        super(props);
        this.state = { loginId: '', password: '' };
      }

      componentDidMount() {
        this.props.dispatch(setLoginErrorMsg());
      }

      logIn = (e: any) => {
        e.preventDefault();
        const { loginId, password } = this.state;
        const { dispatch } = this.props;
        dispatch(login(loginId, password));
      };

      public render() {
        const { loginId, password } = this.state;
        const { authenticating, loginErrorMsg, intl } = this.props;
        return (
          <div style={{ padding: '12px 108px' }}>
            <Typography variant="h5" style={{ fontWeight: 'normal' }}>
              <FormattedMessage id="auth.loginTripiVia" />
            </Typography>
            <div style={{ width: '425px' }}>
              <form onSubmit={this.logIn}>
                <div style={{ marginTop: '25px' }}>
                  <Typography style={{ marginLeft: '10px' }} variant="body2">
                    <FormattedMessage id="auth.telOrEmail" />
                  </Typography>
                  <BootstrapInput
                    fullWidth
                    value={loginId}
                    onChange={e => this.setState({ loginId: e.target.value })}
                    placeholder={intl.formatMessage({ id: 'auth.telOrEmailPlaceholder' })}
                  />
                </div>
                <div style={{ marginTop: '25px' }}>
                  <Typography style={{ marginLeft: '10px' }} variant="body2">
                    <FormattedMessage id="auth.password" />
                  </Typography>
                  <BootstrapInput
                    fullWidth
                    type={'password'}
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder={'******'}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ padding: '5px', color: RED, marginBottom: '-8px' }}>
                    <Typography variant="body2">
                      {loginErrorMsg ? <span>{loginErrorMsg}</span> : <>&nbsp;</>}
                    </Typography>
                  </div>
                  <div
                    style={{
                      color: BLUE,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography variant="body2">
                      <FormattedMessage id="auth.forgotPassword" />
                    </Typography>
                  </div>
                  <LoadingButton
                    size="large"
                    type={'submit'}
                    style={{ width: '260px', marginTop: '15px' }}
                    variant="contained"
                    color="secondary"
                    loading={authenticating}
                    onClick={this.logIn}
                  >
                    <FormattedMessage id="signIn" />
                  </LoadingButton>
                  <div style={{ marginTop: '15px' }}>
                    <Typography variant="body2">
                      <FormattedMessage id="auth.dontHaveAccount" />
                      &nbsp;
                      <Link to={ROUTES.signUp} style={{ color: BLUE }}>
                        <FormattedMessage id="signUp" />
                      </Link>
                    </Typography>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      }
    },
  ),
);
