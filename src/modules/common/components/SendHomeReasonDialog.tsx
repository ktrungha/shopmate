import { Button, Dialog, DialogContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { SEND_HOME_REASONS } from '../constants';

export const REASON = 'reason';

interface Props extends RouteComponentProps {
  dispatch: Dispatch;
}

interface State {}

class SendHomeReasonDialog extends PureComponent<Props, State> {
  close = () => {
    this.setState({ reason: undefined });
    this.props.history.replace({ search: '' });
  };
  render() {
    const params = new URLSearchParams(this.props.location.search);
    const reason = params.get(REASON);

    const msgId =
      reason === SEND_HOME_REASONS.invalidInput
        ? 'home.invalidInputSendHome'
        : reason === SEND_HOME_REASONS.invalidLink
        ? 'home.invalidLink'
        : reason === SEND_HOME_REASONS.invalidAccessToken
        ? 'home.invalidAccessToken'
        : undefined;

    return (
      <Dialog open={!!reason} maxWidth="sm">
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              textAlign: 'end',
              paddingRight: '3px',
              paddingTop: '3px',
              position: 'absolute',
            }}
          >
            <IconButton size="small" onClick={this.close}>
              <CloseIcon style={{ fontSize: '24px' }} />
            </IconButton>
          </div>
        </div>
        <DialogContent
          style={{
            padding: '0 34px',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ backgroundColor: 'white', padding: '15px', textAlign: 'center' }}>
            <div>{msgId && <FormattedMessage id={msgId} />}</div>
            <Button
              style={{
                padding: '1px 0',
                width: '90px',
                height: '30px',
                boxShadow: 'none',
                marginTop: '20px',
              }}
              color="secondary"
              variant="contained"
              size="small"
              onClick={this.close}
            >
              <FormattedMessage id="ok" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withRouter(SendHomeReasonDialog);
