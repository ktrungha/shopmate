import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { AuthDialog } from '../redux/authReducer';
import LoginBox from './LoginBox';

interface IAuthDialogsProps {
  authDialog?: AuthDialog;
  close(): void;
}

interface State {}

class AuthDialogs extends React.PureComponent<IAuthDialogsProps, State> {
  state: State = {};

  render() {
    const { authDialog, close } = this.props;

    return (
      <Dialog open={authDialog !== undefined} maxWidth="md">
        <div
          style={{
            position: 'sticky',
            display: 'flex',
            justifyContent: 'flex-end',

            top: '0px',
            zIndex: 2,
          }}
        >
          <IconButton
            style={{
              marginRight: '8px',
              marginTop: '8px',
            }}
            color="default"
            size="small"
            onClick={close}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {authDialog === AuthDialog.login && <LoginBox />}
      </Dialog>
    );
  }
}

export default AuthDialogs;
