import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS, CART_ID_KEY, some } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { retrieveCart } from '../../cart/redux/cartReducer';
import { Line } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import LoadingIcon from '../../common/components/LoadingIcon';
import { fetchThunk } from '../../common/redux/thunks';

interface IConfirmationStepProps extends ReturnType<typeof mapStateToProps> {
  back(): void;
  next(): void;
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
  address: string;
  shipping: some;
  total: number | undefined;
  setTotal: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ConfirmationStep: React.FunctionComponent<IConfirmationStepProps> = props => {
  const { back, next, content, address, shipping, dispatch, total, setTotal } = props;

  React.useEffect(() => {
    dispatch(retrieveCart());

    const fetch = async () => {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (cartId) {
        const json = await dispatch(fetchThunk(`${API_PATHS.total(cartId)}`));
        setTotal(json.total_amount);
      }
    };
    fetch();
  }, [dispatch, setTotal]);

  if (!content || total === undefined) {
    return <LoadingIcon />;
  }

  return (
    <>
      <div style={{ marginTop: '56px', padding: '0 80px 65px 80px' }}>
        <Line
          style={{
            marginBottom: '65px',
          }}
        >
          <div style={{ flex: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell size="medium">
                    <Typography variant="h3" color="textSecondary">
                      <FormattedMessage id="item" />
                    </Typography>
                  </TableCell>
                  <TableCell size="small">
                    <Typography>
                      <FormattedMessage id="qty" />
                    </Typography>
                  </TableCell>
                  <TableCell size="small">
                    <Typography>
                      <FormattedMessage id="price" />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content.map((one, i) => (
                  <TableRow
                    key={one.item_id}
                    style={{ background: i % 2 === 0 ? '#F7F7F7' : undefined }}
                  >
                    <TableCell size="medium">
                      <Typography variant="body1">{one.name}</Typography>
                    </TableCell>
                    <TableCell size="small">
                      <Typography variant="body1">{one.quantity}</Typography>
                    </TableCell>
                    <TableCell size="small">
                      <Typography variant="h3" color="primary">
                        $<FormattedNumber value={one.price} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div style={{ minWidth: '221px', marginLeft: '79px' }}>
            <div style={{ marginBottom: '35px' }}>
              <Typography variant="h3" color="textSecondary">
                <FormattedMessage id="address" />
              </Typography>
            </div>
            <div>
              <Typography variant="body1" color="textSecondary">
                {address}
              </Typography>
            </div>
            <div style={{ marginTop: '22px', marginBottom: '26px' }}>
              <Typography variant="h3" color="textSecondary">
                <FormattedMessage id="deliveryOptions" />
              </Typography>
            </div>
            <div>
              <Typography variant="body1" color="textSecondary">
                {shipping.shipping_type}
              </Typography>
            </div>
          </div>
        </Line>
        <Divider></Divider>
        <Line
          style={{
            height: '86px',
            justifyContent: 'center',
          }}
        >
          <div style={{ marginRight: '53px' }}>
            <Typography variant="h3" color="textSecondary">
              <FormattedMessage id="subtotal" />
            </Typography>
            <div>
              <Typography variant="h2">&nbsp;</Typography>
            </div>
          </div>
          <div style={{ marginRight: '52px' }}>
            <Typography variant="h3" color="textSecondary">
              <FormattedMessage id="shipping" />
            </Typography>
            <div>
              <Typography variant="h2">&nbsp;</Typography>
            </div>
          </div>
          <div>
            <Typography variant="h3" color="textSecondary">
              <FormattedMessage id="grandtotal" />
            </Typography>
            <div>
              <Typography variant="h2">${total}</Typography>
            </div>
          </div>
        </Line>
      </div>
      <Line
        style={{
          padding: '23px 80px 25px 80px',
          background: '#EFEFEF',
          justifyContent: 'space-between',
        }}
      >
        <Button
          color="primary"
          style={{
            height: '48px',
            borderRadius: '24px',
            minWidth: '163px',
            background: 'white',
          }}
          onClick={back}
        >
          <Typography variant="h3" color="inherit">
            <FormattedMessage id="back" />
          </Typography>
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          style={{ height: '48px', borderRadius: '24px', minWidth: '163px' }}
          onClick={next}
        >
          <Typography variant="h3" color="inherit">
            <FormattedMessage id="nextStep" />
          </Typography>
        </LoadingButton>
      </Line>
    </>
  );
};

function mapStateToProps(state: AppState) {
  return {
    content: state.cart.content,
  };
}

export default connect(mapStateToProps)(ConfirmationStep);
