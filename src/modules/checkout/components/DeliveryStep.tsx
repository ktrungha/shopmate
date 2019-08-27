import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { LIGHT_GREY } from '../../../colors';
import { some, API_PATHS } from '../../../constants';
import radioOff from '../../../svg/radioOff.svg';
import radioOn from '../../../svg/radioOn.svg';
import { BootstrapInput, Line } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import LoadingIcon from '../../common/components/LoadingIcon';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducers';
import { AnyAction } from 'redux';
import { fetchThunk } from '../../common/redux/thunks';
import { stringify } from 'querystring';
import { connect } from 'react-redux';
import { validateAccessToken } from '../../auth/redux/authReducer';

const FieldDiv = styled.div`
  flex: 1;
  margin-bottom: 11px;
`;

interface IDeliveryStepProps {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  zip: string;
  setZip: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry(str: string): void;
  shippings?: some[];
  shipping?: some;
  setShipping: React.Dispatch<React.SetStateAction<some | undefined>>;
  back(): void;
  next(): void;
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const DeliveryStep: React.FunctionComponent<IDeliveryStepProps> = props => {
  const [saving, setSaving] = React.useState(false);

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    country,
    setCountry,
    shipping,
    shippings,
    setShipping,
    back,
    next,
  } = props;
  return (
    <>
      <div style={{ marginTop: '70px', padding: '0 80px 65px 80px' }}>
        <Line>
          <FieldDiv>
            <div style={{ marginBottom: '12px' }}>
              <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                <FormattedMessage id="firstName" />
                &nbsp;*
              </Typography>
            </div>
            <BootstrapInput
              fullWidth
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </FieldDiv>
          &emsp;
          <FieldDiv>
            <div style={{ marginBottom: '12px' }}>
              <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                <FormattedMessage id="lastName" />
                &nbsp;*
              </Typography>
            </div>
            <BootstrapInput
              fullWidth
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </FieldDiv>
        </Line>
        <Line>
          <FieldDiv>
            <div style={{ marginBottom: '12px' }}>
              <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                <FormattedMessage id="address" />
                &nbsp;*
              </Typography>
            </div>
            <BootstrapInput fullWidth value={address} onChange={e => setAddress(e.target.value)} />
          </FieldDiv>
          &emsp;
          <FieldDiv>
            <div style={{ marginBottom: '12px' }}>
              <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                <FormattedMessage id="city" />
                &nbsp;*
              </Typography>
            </div>
            <BootstrapInput fullWidth value={city} onChange={e => setCity(e.target.value)} />
          </FieldDiv>
        </Line>
        <Line>
          <FieldDiv>
            <div style={{ marginBottom: '12px' }}>
              <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                <FormattedMessage id="state" />
                &nbsp;*
              </Typography>
            </div>
            <BootstrapInput fullWidth value={state} onChange={e => setState(e.target.value)} />
          </FieldDiv>
          &emsp;
          <FieldDiv>
            <div style={{ marginBottom: '12px' }}>
              <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                <FormattedMessage id="zipCode" />
                &nbsp;*
              </Typography>
            </div>
            <BootstrapInput fullWidth value={zip} onChange={e => setZip(e.target.value)} />
          </FieldDiv>
        </Line>
        <Line>
          <FieldDiv>
            <div style={{ marginBottom: '12px' }}>
              <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                <FormattedMessage id="country" />
                &nbsp;*
              </Typography>
            </div>
            <BootstrapInput fullWidth value={country} onChange={e => setCountry(e.target.value)} />
          </FieldDiv>
        </Line>
        <div style={{ marginTop: '40px' }}>
          <FormControl fullWidth>
            <FormLabel>
              <div style={{ marginBottom: '12px' }}>
                <Typography variant="h2">
                  <FormattedMessage id="deliveryOptions" />
                </Typography>
              </div>
            </FormLabel>
            {shippings ? (
              shippings.length === 0 ? (
                <Typography variant="body1">
                  <FormattedMessage id="pleaseEnterCountry" />
                </Typography>
              ) : (
                <RadioGroup row value={shipping ? `${shipping.shipping_id}` : ''}>
                  {shippings.map(one => (
                    <FormControlLabel
                      control={
                        <Radio
                          checkedIcon={<img alt="" src={radioOn} />}
                          icon={<img alt="" src={radioOff} />}
                        ></Radio>
                      }
                      key={`${one.shipping_id}`}
                      value={`${one.shipping_id}`}
                      label={one.shipping_type}
                      onChange={(_, checked) => {
                        if (checked) {
                          setShipping(one);
                        }
                      }}
                    ></FormControlLabel>
                  ))}
                </RadioGroup>
              )
            ) : (
              <LoadingIcon />
            )}
          </FormControl>
        </div>
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
        {!shipping && (
          <div>
            <Typography variant="h3" color="error">
              <FormattedMessage id="needDeliveryOption" />
            </Typography>
          </div>
        )}
        <LoadingButton
          variant="contained"
          color="primary"
          style={{ height: '48px', borderRadius: '24px', minWidth: '163px' }}
          onClick={async () => {
            if (!shipping) {
              return;
            }

            setSaving(true);
            try {
              await props.dispatch(
                fetchThunk(
                  `${API_PATHS.updateAddress}`,
                  'put',
                  true,
                  stringify({
                    city,
                    country,
                    address_1: address,
                    region: state,
                    postal_code: zip,
                    shipping_region_id: shipping.shipping_region_id,
                  }),
                ),
              );
              props.dispatch(validateAccessToken()); // pull in fresh userData from server
            } catch (err) {
            } finally {
              setSaving(false);
            }
            next();
          }}
          loading={saving}
          disabled={!shipping}
        >
          <Typography variant="h3" color="inherit">
            <FormattedMessage id="nextStep" />
          </Typography>
        </LoadingButton>
      </Line>
    </>
  );
};

export default connect()(DeliveryStep);
