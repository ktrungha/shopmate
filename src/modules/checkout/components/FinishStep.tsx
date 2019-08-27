import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { DARK_GREY } from '../../../colors';
import rocket from '../../../svg/rocket.svg';

interface IFinishProps {
  close(): void;
}

const FinishStep: React.FunctionComponent<IFinishProps> = props => {
  return (
    <div style={{ marginTop: '15px', textAlign: 'center' }}>
      <img src={rocket} alt="" />
      <div>
        <Typography variant="h1">
          <FormattedMessage id="success" />
        </Typography>
      </div>
      <div style={{ marginTop: '16px', marginBottom: '44px' }}>
        <span
          style={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            lineHeight: '24px',
            color: DARK_GREY,
          }}
        >
          <FormattedMessage id="successNote" />
        </span>
      </div>
      <Button
        variant="contained"
        style={{ height: '60px', borderRadius: '30px', marginBottom: '82px', width: '221px' }}
        color="primary"
        onClick={props.close}
      >
        <Typography variant="h3" color="inherit">
          <FormattedMessage id="backToShop" />
        </Typography>
      </Button>
    </div>
  );
};

export default FinishStep;
