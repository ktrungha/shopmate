import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { AuthDialog } from '../redux/authReducer';
import LoginBox from './LoginBox';
import SignUpBox from './SignUpBox';

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
      <Dialog open={authDialog !== undefined} maxWidth="md" PaperProps={{ style: { margin: 0 } }}>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
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
            size="medium"
            onClick={close}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        {authDialog === AuthDialog.login && <LoginBox />}
        {authDialog === AuthDialog.signUp && <SignUpBox />}
      </Dialog>
    );
  }
}

export default AuthDialogs;
