import { Divider, Drawer, IconButton, List, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { goBack } from 'connected-react-router';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ROUTES } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import back from '../../../svg/back.svg';
import burger from '../../../svg/burger.svg';
import { AuthDialog, logout, setAuthDialog } from '../../auth/redux/authReducer';
import { Line } from './elements';
import Link from './Link';

interface IMobileHeaderProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const MobileHeader: React.FunctionComponent<IMobileHeaderProps> = props => {
  const [openMenu, setOpenMenu] = React.useState(false);

  const { departments, auth, dispatch } = props;

  return (
    <Line style={{ height: '72px', background: 'white' }}>
      <IconButton size="small" onClick={() => props.dispatch(goBack())}>
        <img alt="" src={back} />
      </IconButton>
      <Link to="/" style={{ flex: 1, flexShrink: 1, textAlign: 'center' }}>
        <Typography variant="h2" color="primary">
          SHOPMATE
        </Typography>
      </Link>
      <IconButton size="small" onClick={() => setOpenMenu(true)}>
        <img alt="" src={burger} />
      </IconButton>
      <Drawer open={openMenu} anchor="right" onClose={() => setOpenMenu(false)}>
        <div style={{ margin: '10px 0 0 15px' }}>
          <IconButton size="small" onClick={() => setOpenMenu(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        {!auth && (
          <>
            <List style={{ padding: '0 30px' }}>
              <ListItem onClick={() => dispatch(setAuthDialog(AuthDialog.login))}>
                <Typography variant="h3" color="textSecondary">
                  <FormattedMessage id="signIn" />
                </Typography>
              </ListItem>
              <ListItem onClick={() => dispatch(setAuthDialog(AuthDialog.signUp))}>
                <Typography variant="h3" color="textSecondary">
                  <FormattedMessage id="register" />
                </Typography>
              </ListItem>
            </List>
            <Divider></Divider>
          </>
        )}
        <List style={{ padding: '0 30px' }}>
          {departments.map(one => (
            <ListItem>
              <Link
                onClick={() => setOpenMenu(false)}
                key={one.department_id}
                to={ROUTES.department.gen(one.department_id)}
              >
                <Typography variant="h3" color="primary">
                  {one.name}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
        {auth && (
          <>
            <Divider></Divider>
            <List style={{ padding: '0 30px' }}>
              <ListItem onClick={() => dispatch(logout())}>
                <Typography variant="h3" color="textSecondary">
                  <FormattedMessage id="signOut" />
                </Typography>
              </ListItem>
            </List>
          </>
        )}
      </Drawer>
    </Line>
  );
};

function mapStateToProps(state: AppState) {
  return { departments: state.common.departments, auth: state.auth.auth };
}

export default connect(mapStateToProps)(MobileHeader);
