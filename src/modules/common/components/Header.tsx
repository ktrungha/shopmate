import * as React from 'react';
import { Line } from './elements';
import { Typography, Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { RED, BLACK_TEXT } from '../../../colors';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import Link from './Link';
import { ROUTES } from '../../../constants';

const ActionSpan = styled.span`
  color: ${RED};
  cursor: pointer;
`;

interface IHeaderProps extends ReturnType<typeof mapStateToProps> {
  light?: boolean;
}

const Header: React.FunctionComponent<IHeaderProps> = props => {
  const { light, departments } = props;
  return (
    <div>
      <div>
        <Container>
          <Line style={{ height: '49px', padding: '0 10px' }}>
            <Typography variant="subtitle1">
              <FormattedMessage
                id="header.hi"
                values={{
                  signIn: (
                    <ActionSpan>
                      <FormattedMessage id="signIn" />
                    </ActionSpan>
                  ),
                  register: (
                    <ActionSpan>
                      <FormattedMessage id="register" />
                    </ActionSpan>
                  ),
                }}
              />
            </Typography>
            <Line
              style={{
                flex: 1,
                marginLeft: '100px',
                maxWidth: '300px',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle1">
                <FormattedMessage id="dailyDeals" />
              </Typography>

              <Typography variant="subtitle1">
                <FormattedMessage id="sell" />
              </Typography>

              <Typography variant="subtitle1">
                <FormattedMessage id="helpContact" />
              </Typography>
            </Line>
          </Line>
        </Container>
      </div>
      <div style={{ background: BLACK_TEXT }}>
        <Container>
          <Line style={{ height: '72px', padding: '0 10px' }}>
            <Typography variant="h2" color="primary">
              SHOPMATE
            </Typography>
            <Line
              style={{
                flex: 1,
                marginLeft: '100px',
                maxWidth: '300px',
                justifyContent: 'space-between',
              }}
            >
              {departments.map(one => (
                <Typography variant="subtitle1" key={one.department_id}>
                  <Link to={ROUTES.department.gen(one.department_id)} style={{ color: 'white' }}>
                    {one.name}
                  </Link>
                </Typography>
              ))}
            </Line>
          </Line>
        </Container>
      </div>
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return { departments: state.common.departments };
}

export default connect(mapStateToProps)(Header);
