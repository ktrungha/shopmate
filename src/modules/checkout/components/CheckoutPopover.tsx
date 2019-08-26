import {
  Grid,
  InputBase,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LIGHT_GREY, DARK_GREY } from '../../../colors';
import { some } from '../../../constants';
import { BootstrapInput, Line } from '../../common/components/elements';
import rocket from '../../../svg/rocket.svg';

interface ICheckoutPopoverProps {
  close(): void;
  tax: some;
}

const CheckoutPopover: React.FunctionComponent<ICheckoutPopoverProps> = props => {
  const { close } = props;
  const [step, setStep] = React.useState(0);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [country, setCountry] = React.useState('');

  return (
    <Paper style={{ margin: '0 30px' }} elevation={4}>
      <div style={{ padding: '42px 80px 24px 80px' }}>
        <Typography variant="h2" style={{ textTransform: 'capitalize' }}>
          <FormattedMessage id="checkout" />
        </Typography>
        <div style={{ marginTop: '32px' }}>
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
        {step === 0 && (
          <div style={{ marginTop: '80px' }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: '12px' }}>
                  <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                    <FormattedMessage id="address" />
                    &nbsp;*
                  </Typography>
                </div>
                <BootstrapInput
                  fullWidth
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: '12px' }}>
                  <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                    <FormattedMessage id="city" />
                    &nbsp;*
                  </Typography>
                </div>
                <BootstrapInput fullWidth value={city} onChange={e => setCity(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: '12px' }}>
                  <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                    <FormattedMessage id="state" />
                    &nbsp;*
                  </Typography>
                </div>
                <BootstrapInput fullWidth value={state} onChange={e => setState(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <div style={{ marginBottom: '12px' }}>
                  <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                    <FormattedMessage id="zipCode" />
                    &nbsp;*
                  </Typography>
                </div>
                <BootstrapInput fullWidth value={zip} onChange={e => setZip(e.target.value)} />
              </Grid>
            </Grid>
            <div style={{ marginTop: '29px' }}>
              <div style={{ marginBottom: '12px' }}>
                <Typography variant="h3" style={{ color: LIGHT_GREY }}>
                  <FormattedMessage id="country" />
                  &nbsp;*
                </Typography>
              </div>
              <InputBase fullWidth value={country} onChange={e => setCountry(e.target.value)} />
            </div>
          </div>
        )}
        {step === 1 && <div style={{ marginTop: '80px' }}></div>}
        {step === 2 && <div style={{ marginTop: '80px' }}></div>}
        {step === 3 && (
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <img src={rocket} alt="" />
            <div>
              <Typography variant="h1">
                <FormattedMessage id="success" />
              </Typography>
            </div>
            <div style={{ marginTop: '16px', marginBottom: '44px' }}>
              <span
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: DARK_GREY,
                }}
              >
                <FormattedMessage id="successNote" />
              </span>
            </div>
            <Button
              variant="contained"
              style={{ height: '60px', borderRadius: '30px', marginBottom: '82px', width: '221px' }}
              color="primary"
              onClick={close}
            >
              <Typography variant="h3" color="inherit">
                <FormattedMessage id="backToShop" />
              </Typography>
            </Button>
          </div>
        )}
      </div>
      {step < 3 && (
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
            onClick={() => {
              if (step === 0) {
                close();
              } else {
                setStep(step - 1);
              }
            }}
          >
            <Typography variant="h3" color="inherit">
              <FormattedMessage id="back" />
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ height: '48px', borderRadius: '24px', minWidth: '163px' }}
            onClick={() => {
              setStep(step + 1);
            }}
          >
            <Typography variant="h3" color="inherit">
              <FormattedMessage id="nextStep" />
            </Typography>
          </Button>
        </Line>
      )}
    </Paper>
  );
};

export default CheckoutPopover;
