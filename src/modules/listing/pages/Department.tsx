import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';

interface IDepartmentProps {}

const Department: React.FunctionComponent<IDepartmentProps> = props => {
  return <></>;
};

function mapStateToProps(state: AppState) {
  return {};
}

export default connect(mapStateToProps)(Department);
