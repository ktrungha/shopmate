import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS, some } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { retrieveCart } from '../../cart/redux/cartReducer';
import { fetchThunk } from '../../common/redux/thunks';
import ConfirmationStep from './ConfirmationStep';
import DeliveryStep from './DeliveryStep';
import FinishStep from './FinishStep';
import PaymentStep from './PaymentStep';

interface ICheckoutPopoverProps extends ReturnType<typeof mapStateToProps> {
  close(): void;
  tax: some;
  shippingRegions: some[];
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const CheckoutPopover: React.FunctionComponent<ICheckoutPopoverProps> = props => {
  const { close, shippingRegions, tax, userData, dispatch } = props;
  const [step, setStep] = React.useState(0);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState((userData && userData.address_1) || '');
  const [city, setCity] = React.useState((userData && userData.city) || '');
  const [state, setState] = React.useState((userData && userData.region) || '');
  const [zip, setZip] = React.useState((userData && userData.postal_code) || '');
  const [country, setCountry] = React.useState((userData && userData.country) || '');

  const [shippingRegion, setShippingRegion] = React.useState<some | undefined>(
    userData && userData.shipping_region_id
      ? { shipping_region_id: userData.shipping_region_id }
      : undefined,
  );
  const [shipping, setShipping] = React.useState<some | undefined>();
  const [shippings, setShippings] = React.useState<some[] | undefined>([]);
  const [total, setTotal] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    const fetch = async () => {
      if (shippingRegion) {
        setShippings(undefined);
        const json = await dispatch(
          fetchThunk(`${API_PATHS.shippings(shippingRegion.shipping_region_id)}`),
        );
        setShippings(json as some[]);
      }
    };
    fetch();
  }, [dispatch, shippingRegion, setShippings]);

  React.useEffect(() => {
    return () => {
      dispatch(retrieveCart()); // the cart might have been cleared so need to refresh
    };
  }, [dispatch]);

  return (
    <Paper style={{ margin: '0 30px', minHeight: '768px' }} elevation={4}>
      <div style={{ padding: '42px 80px 0 80px' }}>
        <Typography variant="h2" style={{ textTransform: 'capitalize' }}>
          <FormattedMessage id="checkout" />
        </Typography>
        <div>
          <Stepper alternativeLabel activeStep={step}>
            <Step>
              <StepLabel>
                <Typography variant="h3" color="primary">
                  <FormattedMessage id="delivery" />
                </Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography variant="h3" color={step > 0 ? 'primary' : undefined}>
                  <FormattedMessage id="confirmation" />
                </Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography variant="h3" color={step > 1 ? 'primary' : undefined}>
                  <FormattedMessage id="payment" />
                </Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography variant="h3" color={step > 2 ? 'primary' : undefined}>
                  <FormattedMessage id="finish" />
                </Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
      {step === 0 && (
        <DeliveryStep
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          zip={zip}
          setZip={setZip}
          country={country}
          setCountry={(str: string) => {
            setCountry(str);
            // TODO quick fill for incomplete API
            const mod = str.length % 3;
            setShippingRegion(shippingRegions[mod + 1]);
          }}
          shippings={shippings}
          shipping={shipping}
          setShipping={setShipping}
          back={() => close()}
          next={() => setStep(1)}
        />
      )}
      {step === 1 && shipping && (
        <ConfirmationStep
          total={total}
          setTotal={setTotal}
          back={() => setStep(0)}
          next={() => setStep(2)}
          address={[address, city, state, country, zip].join(', ')}
          shipping={shipping}
        />
      )}
      {step === 2 && tax && shipping && total !== undefined && (
        <PaymentStep
          shipping={shipping}
          tax={tax}
          total={total}
          back={() => setStep(1)}
          next={() => setStep(3)}
        />
      )}
      {step === 3 && <FinishStep close={close} />}
    </Paper>
  );
};

function mapStateToProps(state: AppState) {
  return { userData: state.account.userData };
}

export default connect(mapStateToProps)(CheckoutPopover);
