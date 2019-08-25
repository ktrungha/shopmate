import * as React from 'react';
import { AppState } from '../../../redux/reducers';
import { connect } from 'react-redux';

interface ICategoryProps {}

const Category: React.FunctionComponent<ICategoryProps> = props => {
  return <></>;
};

function mapStateToProps(state: AppState) {
  return {};
}

export default connect(mapStateToProps)(Category);
