import { Button, Typography } from '@material-ui/core';
import { stringify } from 'querystring';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { API_PATHS, CART_ID_KEY, some, STRIPE_KEY } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import calendar from '../../../svg/calendar.svg';
import card from '../../../svg/card.svg';
import creditCards from '../../../svg/creditCard.svg';
import lock from '../../../svg/lock.svg';
import person from '../../../svg/person.svg';
import { BootstrapInput, Line } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import { fetchThunk } from '../../common/redux/thunks';

const FieldDiv = styled.div`
  flex: 1;
  min-width: 200px;
`;

interface IPaymentStepProps extends InjectedIntlProps {
  back(): void;
  next(): void;
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
  shipping: some;
  tax: some;
  total: number;
}

interface State {
  cardName: string;
  number: string;
  validThru: string;
  cvv: string;
  paying: boolean;
  error?: string;
}

class PaymentStep extends React.PureComponent<IPaymentStepProps, State> {
  state: State = { cardName: '', number: '', validThru: '', cvv: '', paying: false };
  pay = async () => {
    const { shipping, tax, total, dispatch, intl, next } = this.props;
    const { cardName, number, validThru, cvv } = this.state;
    const vals = validThru.split('/');
    const month = parseInt(vals[0], 10);
    const year = parseInt(vals[1], 10);

    try {
      this.setState({ paying: true, error: undefined });

      const createToken = await dispatch(
        fetchThunk(
          `${API_PATHS.stripeToken}`,
          'post',
          false,
          stringify({
            'card[number]': number,
            'card[exp_month]': month,
            'card[exp_year]': year,
            'card[name]': cardName,
            'card[cvc]': cvv,
          }),
          undefined,
          STRIPE_KEY,
        ),
      );

      const createOrder = await dispatch(
        fetchThunk(
          `${API_PATHS.orders}`,
          'post',
          true,
          stringify({
            cart_id: localStorage.getItem(CART_ID_KEY),
            shipping_id: shipping.shipping_id,
            tax_id: tax.tax_id,
          }),
        ),
      );

      await dispatch(
        fetchThunk(
          `${API_PATHS.stripeCharge}`,
          'post',
          true,
          stringify({
            stripeToken: createToken.id,
            order_id: createOrder.orderId,
            description: `Charged at ${new Date().toISOString()}`,
            amount: Math.round(total * 100),
          }),
        ),
      );
      next();
    } catch (err) {
      const json = JSON.parse(err.message);
      this.setState({ error: json.error.message || intl.formatMessage({ id: 'cannotPay' }) });
      this.setState({ paying: false });
    }
  };

  render() {
    const { back, intl } = this.props;
    const { cardName, number, validThru, cvv } = this.state;

    return (
      <>
        <div style={{ marginTop: '56px', padding: '0 80px 0 80px' }}>
          <div style={{ textAlign: 'center', marginTop: '43px', marginBottom: '52px' }}>
            <img src={creditCards} alt="" />
          </div>
          <Line style={{ marginBottom: '12px' }}>
            <FieldDiv style={{ marginRight: '19px' }}>
              <div style={{ marginBottom: '12px' }}>
                <Typography variant="h3" color="textSecondary">
                  <FormattedMessage id="cardName" />
                </Typography>
              </div>
              <BootstrapInput
                placeholder={intl.formatMessage({ id: 'cardNameEx' })}
                fullWidth
                value={cardName}
                onChange={e => this.setState({ cardName: e.target.value })}
                endAdornment={<img alt="" src={person} style={{ margin: '0 13px' }} />}
              />
            </FieldDiv>
            <FieldDiv>
              <div style={{ marginBottom: '12px' }}>
                <Typography variant="h3" color="textSecondary">
                  <FormattedMessage id="cardNumber" />
                </Typography>
              </div>
              <BootstrapInput
                fullWidth
                placeholder="**** **** **** ****"
                value={number}
                onChange={e => this.setState({ number: e.target.value })}
                endAdornment={<img alt="" src={card} style={{ margin: '0 13px' }} />}
              />
            </FieldDiv>
          </Line>
          <Line>
            <Line style={{ marginRight: '19px', flex: 1 }}>
              <FieldDiv style={{ marginRight: '19px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <Typography variant="h3" color="textSecondary">
                    <FormattedMessage id="validThru" />
                  </Typography>
                </div>
                <BootstrapInput
                  fullWidth
                  value={validThru}
                  onChange={e => this.setState({ validThru: e.target.value })}
                  placeholder="MM/YY"
                  endAdornment={<img alt="" src={calendar} style={{ margin: '0 13px' }} />}
                />
              </FieldDiv>
              <FieldDiv>
                <div style={{ marginBottom: '12px' }}>
                  <Typography variant="h3" color="textSecondary">
                    <FormattedMessage id="cvv" />
                  </Typography>
                </div>
                <BootstrapInput
                  fullWidth
                  value={cvv}
                  onChange={e => this.setState({ cvv: e.target.value })}
                  endAdornment={<img alt="" src={lock} style={{ margin: '0 13px' }} />}
                />
              </FieldDiv>
            </Line>
            <FieldDiv>
              <div>
                <Typography variant="body2">
                  <FormattedMessage id="cvvNote" />
                </Typography>
              </div>
            </FieldDiv>
          </Line>
        </div>
        <Line style={{ height: '104px', justifyContent: 'center' }}>
          <Typography variant="h3" color="error">
            {this.state.error}
          </Typography>
        </Line>
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
            onClick={this.pay}
            loading={this.state.paying}
          >
            <Typography variant="h3" color="inherit">
              <FormattedMessage id="pay" />
            </Typography>
          </LoadingButton>
        </Line>
      </>
    );
  }
}

export default connect()(injectIntl(PaymentStep));
