import * as React from 'react';
import { AppState } from '../../../redux/reducers';
import { BLACK_TEXT } from '../../../colors';
import { Line } from './elements';
import Link from './Link';
import { ROUTES } from '../../../constants';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import gInstagram from '../../../svg/greyInstagram.svg';
import wInstagram from '../../../svg/whiteInstagram.svg';
import gPinterest from '../../../svg/greyPinterest.svg';
import wPinterest from '../../../svg/whitePinterest.svg';
import gTwitter from '../../../svg/greyTwitter.svg';
import wTwitter from '../../../svg/whiteTwitter.svg';
import gFb from '../../../svg/greyFb.svg';
import wFb from '../../../svg/whiteFb.svg';
import { FormattedMessage } from 'react-intl';

interface IFooterProps extends ReturnType<typeof mapStateToProps> {
  light?: boolean;
}

const Footer: React.FunctionComponent<IFooterProps> = props => {
  const { departments, light } = props;
  return (
    <div
      style={{
        height: '241px',
        background: light ? 'white' : BLACK_TEXT,
        color: light ? BLACK_TEXT : 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Line style={{ height: '36px', width: '779px', justifyContent: 'space-between' }}>
        {departments.map(one => (
          <Link
            key={one.department_id}
            style={{ color: light ? BLACK_TEXT : 'white' }}
            to={ROUTES.department.gen(one.department_id)}
          >
            <Typography variant="h2" color="inherit">
              {one.name}
            </Typography>
          </Link>
        ))}
      </Line>
      <Line
        style={{
          height: '40px',
          width: '220px',
          justifyContent: 'space-between',
          marginTop: '26px',
          marginBottom: '21px',
        }}
      >
        <img src={light ? wInstagram : gInstagram} alt="" />
        <img src={light ? wPinterest : gPinterest} alt="" />
        <img src={light ? wTwitter : gTwitter} alt="" />
        <img src={light ? wFb : gFb} alt="" />
      </Line>

      <Line style={{ height: '24px', width: '343px', justifyContent: 'space-between' }}>
        <Typography variant="body1">2019 Shopmate Ltd</Typography>
        <Typography variant="body1">
          <FormattedMessage id="contact" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="privacyPolicy" />
        </Typography>
      </Line>
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return {
    departments: state.common.departments,
  };
}

export default connect(mapStateToProps)(Footer);
