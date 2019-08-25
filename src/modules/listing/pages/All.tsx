import * as React from 'react';
import { AppState } from '../../../redux/reducers';
import { connect } from 'react-redux';
import { useTheme, useMediaQuery } from '@material-ui/core';
import AllDesktop from '../components/AllDesktop';
import AllMobile from '../components/AllMobile';

interface IAllProps {}

const All: React.FunctionComponent<IAllProps> = props => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  if (desktop) {
    return <AllDesktop />;
  }
  return <AllMobile />;
};

function mapStateToProps(state: AppState) {
  return {};
}

export default connect(mapStateToProps)(All);
