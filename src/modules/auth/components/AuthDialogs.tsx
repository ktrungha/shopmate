import { Dialog, IconButton, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { AuthDialog } from '../redux/authReducer';
import LoginBox from './LoginBox';
import SignUpBox from './SignUpBox';

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      top: '0px',
      zIndex: 2,
      [theme.breakpoints.down('sm')]: {
        position: 'static',
        justifyContent: 'center',
      },
    },
  });

interface IAuthDialogsProps extends WithStyles<typeof styles> {
  authDialog?: AuthDialog;
  close(): void;
}

class AuthDialogs extends React.PureComponent<IAuthDialogsProps> {
  render() {
    const { classes, authDialog, close } = this.props;

    return (
      <Dialog open={authDialog !== undefined} maxWidth="md" PaperProps={{ style: { margin: 0 } }}>
        <div className={classes.closeButton}>
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

export default withStyles(styles)(AuthDialogs);
