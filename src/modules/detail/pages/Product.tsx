import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';

export interface IProductProps {}

class Product extends React.Component<IProductProps> {
  public render() {
    return <div></div>;
  }
}

const mapState2Props = (state: AppState) => {
  return {};
};

export default connect(mapState2Props)(Product);
