import { useMediaQuery, useTheme } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS, some } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { fetchThunk } from '../../common/redux/thunks';
import ProductDesktop from '../components/ProductDesktop';
import ProductMobile from '../components/ProductMobile';

export interface IProductProps extends RouteComponentProps<{ id: string }> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const Product: React.FC<IProductProps> = props => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const id = props.match.params.id;
  const { dispatch } = props;

  const [productDetails, setProductDetails] = React.useState<some | null>(null);
  const [attributes, setAttributes] = React.useState<some[] | null>(null);
  const [color, setColor] = React.useState<string | undefined>();
  const [size, setSize] = React.useState<string | undefined>();
  const [quantity, setQuantity] = React.useState<number>(0);

  // fetch product info and attributes
  React.useEffect(() => {
    const fetch = async () => {
      const [productDetails, attributes] = await Promise.all([
        dispatch(fetchThunk(`${API_PATHS.product(id)}`)),
        dispatch(fetchThunk(`${API_PATHS.productAttributes(id)}`)),
      ]);
      setProductDetails(productDetails);
      setAttributes(attributes as some[]);
    };
    fetch();
  }, [dispatch, id]);

  if (desktop) {
    return (
      <ProductDesktop
        data={productDetails}
        attributes={attributes}
        size={size}
        setSize={setSize}
        quantity={quantity}
        setQuantity={setQuantity}
        color={color}
        setColor={setColor}
      />
    );
  }
  return <ProductMobile />;
};

export default connect()(withRouter(Product));
