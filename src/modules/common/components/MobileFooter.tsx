import * as React from 'react';
import { Line } from './elements';
import { Typography } from '@material-ui/core';

interface IMobileFooterProps {}

const MobileFooter: React.FunctionComponent<IMobileFooterProps> = props => {
  return (
    <Line style={{ height: '72px', background: 'white', justifyContent: 'center' }}>
      <Typography variant="body1">2019 Shopmate Ltd</Typography>
    </Line>
  );
};

export default MobileFooter;
