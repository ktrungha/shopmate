import { Dialog, IconButton, Typography, Button } from '@material-ui/core';
import IconClose from '@material-ui/icons/Clear';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export interface IMessageDialogProps {
  show: boolean;
  message: React.ReactNode;
  onClose(): void;
  header?: React.ReactNode;
  buttonMessageId?: string;
}

export default class MessageDialog extends React.PureComponent<IMessageDialogProps> {
  public render() {
    const { show, message, onClose, header, buttonMessageId } = this.props;

    return (
      <Dialog open={show} fullWidth maxWidth="sm">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {!!header && (
              <div style={{ display: 'flex', flex: 1, paddingLeft: '16px' }}>
                <Typography variant="h6">{header}</Typography>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
              <IconButton style={{ padding: '8px' }} size="small" onClick={onClose}>
                <IconClose />
              </IconButton>
            </div>
          </div>
          {message}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '24px',
              paddingBottom: '16px',
            }}
          >
            <Button
              style={{ width: '170px' }}
              variant="contained"
              color="secondary"
              size="large"
              onClick={onClose}
            >
              <Typography variant="button">
                <FormattedMessage id={buttonMessageId || 'back'} />
              </Typography>
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
