import * as React from 'react';
import { Line } from './elements';
import burger from '../../../svg/burger.svg';
import back from '../../../svg/back.svg';
import logo from '../../../svg/logo.svg';
import Link from './Link';
import { IconButton } from '@material-ui/core';

interface IMobileHeaderProps {}

const MobileHeader: React.FunctionComponent<IMobileHeaderProps> = props => {
  return (
    <Line style={{ height: '72px' }}>
      <IconButton size="small">
        <img alt="" src={back} />
      </IconButton>
      <div style={{ flex: 1, flexShrink: 1 }}>
        <Link to="/">
          <img alt="" src={logo} style={{ objectFit: 'contain' }} />
        </Link>
      </div>
      <IconButton size="small">
        <img alt="" src={burger} />
      </IconButton>
    </Line>
  );
};

export default MobileHeader;
