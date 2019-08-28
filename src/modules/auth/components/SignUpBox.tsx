import { Typography, WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { RED } from '../../../colors';
import { AppState } from '../../../redux/reducers';
import { BootstrapInput, Line } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import {
  AuthDialog,
  closeAuthDialog,
  setAuthDialog,
  setLoginErrorMsg,
  signUp,
} from '../redux/authReducer';

const RobotoSpan = styled.span`
  font-family: 'Roboto';
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.primary};
  cursor: pointer;
`;

const mapState2Props = (state: AppState) => {
  return {
    authenticating: state.auth.authenticating,
    loginErrorMsg: state.auth.loginErrorMsg,
  };
};

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      padding: '43px 40px 35px 40px',
      textAlign: 'center',
      height: '480px',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: { padding: '11px 10px' },
    },
  });
export interface ISignUpBoxProps
  extends InjectedIntlProps,
    ReturnType<typeof mapState2Props>,
    WithStyles<typeof styles> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

export interface ISignUpBoxState {
  loginId: string;
  password: string;
  repassword: string;
  creating: boolean;
}

export default connect(mapState2Props)(
  withStyles(styles)(
    injectIntl(
      class SignUpBox extends React.Component<ISignUpBoxProps, ISignUpBoxState> {
        constructor(props: ISignUpBoxProps) {
          super(props);
          this.state = { loginId: '', password: '', repassword: '', creating: false };
        }

        componentDidMount() {
          this.props.dispatch(setLoginErrorMsg());
        }

        signUp = async (e: any) => {
          e.preventDefault();
          const { loginId, password } = this.state;
          const { dispatch, intl } = this.props;
          this.setState({ creating: true });
          try {
            await dispatch(signUp(loginId, password));
            dispatch(closeAuthDialog());
          } catch (err) {
            dispatch(setLoginErrorMsg(intl.formatMessage({ id: 'auth.cannotCreateAccount' })));
          }
          this.setState({ creating: false });
        };

        public render() {
          const { loginId, password, repassword, creating } = this.state;
          const { loginErrorMsg, classes, intl, dispatch } = this.props;
          return (
            <div className={classes.wrapper}>
              <Typography variant="h2" style={{ fontWeight: 'normal', marginBottom: '41px' }}>
                <FormattedMessage id="auth.signUp" />
              </Typography>
              <div style={{ width: '300px' }}>
                <form onSubmit={this.signUp}>
                  <div>
                    <BootstrapInput
                      style={{ height: '60px' }}
                      inputProps={{ style: { textAlign: 'center' } }}
                      fullWidth
                      value={loginId}
                      onChange={e => this.setState({ loginId: e.target.value })}
                      placeholder={intl.formatMessage({ id: 'auth.email' })}
                    />
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <BootstrapInput
                      style={{ height: '60px' }}
                      inputProps={{ style: { textAlign: 'center' } }}
                      fullWidth
                      type={'password'}
                      value={password}
                      onChange={e => this.setState({ password: e.target.value })}
                      placeholder={intl.formatMessage({ id: 'auth.password' })}
                    />
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <BootstrapInput
                      style={{ height: '60px' }}
                      inputProps={{ style: { textAlign: 'center' } }}
                      fullWidth
                      type={'password'}
                      value={repassword}
                      onChange={e => this.setState({ repassword: e.target.value })}
                      placeholder={intl.formatMessage({ id: 'auth.repassword' })}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ padding: '5px', color: RED, margin: '8px 0' }}>
                      <Typography variant="h3" color="inherit">
                        {loginErrorMsg ? <span>{loginErrorMsg}</span> : <>&nbsp;</>}
                      </Typography>
                    </div>
                    <LoadingButton
                      size="large"
                      type={'submit'}
                      style={{
                        width: '221px',
                        height: '60px',
                        borderRadius: '30px',
                        textTransform: 'none',
                      }}
                      variant="contained"
                      color="primary"
                      loading={creating}
                      onClick={this.signUp}
                    >
                      <FormattedMessage id="auth.signUp" />
                    </LoadingButton>
                  </div>
                </form>
              </div>
              <Line
                style={{
                  marginTop: '13.5px',
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'flex-end',
                }}
              >
                <Typography variant="body1">
                  <FormattedMessage id="auth.alreadyMember" />
                  &nbsp;
                </Typography>
                <RobotoSpan onClick={() => dispatch(setAuthDialog(AuthDialog.login))}>
                  <FormattedMessage id="auth.signIn" />
                </RobotoSpan>
              </Line>
            </div>
          );
        }
      },
    ),
  ),
);
