import { Button, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { BLACK_TEXT, RED } from '../../../colors';
import { ROUTES } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { AuthDialog, logout, setAuthDialog } from '../../auth/redux/authReducer';
import { Line } from './elements';
import Link from './Link';

const ActionSpan = styled.span`
  color: ${RED};
  cursor: pointer;
`;

interface IHeaderProps extends ReturnType<typeof mapStateToProps> {
  light?: boolean;
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const Header: React.FunctionComponent<IHeaderProps> = props => {
  const { light, departments, auth, userData, dispatch } = props;
  return (
    <div>
      <div style={{ background: light ? '#EFEFEF' : undefined }}>
        <Container>
          <Line style={{ height: '49px', padding: '0 10px' }}>
            {auth && userData ? (
              <>
                <Typography variant="subtitle1">
                  <FormattedMessage id="header.hiAuth" values={{ name: userData.name }} />
                </Typography>
                &nbsp;
                <Button
                  style={{ borderRadius: '23px' }}
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => dispatch(logout())}
                >
                  <Typography variant="body2" color="inherit">
                    <FormattedMessage id="signOut" />
                  </Typography>
                </Button>
              </>
            ) : (
              <Typography variant="subtitle1">
                <FormattedMessage
                  id="header.hi"
                  values={{
                    signIn: (
                      <ActionSpan onClick={() => dispatch(setAuthDialog(AuthDialog.login))}>
                        <FormattedMessage id="signIn" />
                      </ActionSpan>
                    ),
                    register: (
                      <ActionSpan onClick={() => dispatch(setAuthDialog(AuthDialog.signUp))}>
                        <FormattedMessage id="register" />
                      </ActionSpan>
                    ),
                  }}
                />
              </Typography>
            )}
            <Line
              style={{
                flex: 1,
                marginLeft: '100px',
                maxWidth: '300px',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle1">
                <FormattedMessage id="dailyDeals" />
              </Typography>

              <Typography variant="subtitle1">
                <FormattedMessage id="sell" />
              </Typography>

              <Typography variant="subtitle1">
                <FormattedMessage id="helpContact" />
              </Typography>
            </Line>
          </Line>
        </Container>
      </div>
      <div style={{ background: light ? 'white' : BLACK_TEXT, color: 'white' }}>
        <Container>
          <Line style={{ height: '72px', padding: '0 10px' }}>
            <Link to="/">
              <Typography variant="h2" color="primary">
                SHOPMATE
              </Typography>
            </Link>
            {!light && (
              <Line
                style={{
                  flex: 1,
                  marginLeft: '100px',
                  maxWidth: '300px',
                  justifyContent: 'space-between',
                }}
              >
                {departments.map(one => (
                  <Link
                    style={{ color: 'white' }}
                    key={one.department_id}
                    to={ROUTES.department.gen(one.department_id)}
                  >
                    <Typography variant="subtitle1" color="inherit">
                      {one.name}
                    </Typography>
                  </Link>
                ))}
              </Line>
            )}
          </Line>
        </Container>
      </div>
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return {
    departments: state.common.departments,
    auth: state.auth.auth,
    userData: state.account.userData,
  };
}

export default connect(mapStateToProps)(Header);
