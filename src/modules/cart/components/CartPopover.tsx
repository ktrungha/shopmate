import * as React from 'react';
import { Paper, IconButton, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { FormattedMessage } from 'react-intl';
import { some, PRODUCT_IMAGE_BASE } from '../../../constants';
import { Line } from '../../common/components/elements';
import styled from 'styled-components';
import { LIGHT_GREY } from '../../../colors';
import remove from '../../../svg/redClose.svg';
import QuantityBox from '../../common/components/QuantityBox';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setCartContent } from '../redux/cartReducer';

const ItemDiv = styled.div`
  min-width: 250px;
  flex: 10;
  display: flex;
  align-items: center;
`;

const SizeDiv = styled.div`
  min-width: 60px;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityDiv = styled.div`
  min-width: 120px;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceDiv = styled.div`
  min-width: 60px;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ICartPopoverProps {
  close(): void;
  content: some[];
  dispatch: Dispatch;
}

const CartPopover: React.FunctionComponent<ICartPopoverProps> = props => {
  const { close, content, dispatch } = props;
  return (
    <Paper style={{ margin: '0 30px', position: 'relative' }} elevation={4}>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          top: 0,
          zIndex: 2,
        }}
      >
        <IconButton
          style={{
            marginRight: '8px',
            marginTop: '8px',
          }}
          color="default"
          size="medium"
          onClick={close}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <div style={{ padding: '42px 80px 24px 80px' }}>
        <Typography variant="h2" style={{ textTransform: 'capitalize' }}>
          <FormattedMessage id="itemsInCart" values={{ num: content.length }} />
        </Typography>
        <div style={{ color: LIGHT_GREY, marginTop: '29px' }}>
          <Line
            style={{
              paddingBottom: '13px',
              borderBottom: `1px solid ${LIGHT_GREY}`,
              marginBottom: '23px',
            }}
          >
            <ItemDiv>
              <Typography variant="h3" color="inherit">
                <FormattedMessage id="item" />
              </Typography>
            </ItemDiv>
            <SizeDiv>
              <Typography variant="h3" color="inherit">
                <FormattedMessage id="size" />
              </Typography>
            </SizeDiv>
            <QuantityDiv>
              <Typography variant="h3" color="inherit">
                <FormattedMessage id="quantity" />
              </Typography>
            </QuantityDiv>
            <PriceDiv>
              <Typography variant="h3" color="inherit">
                <FormattedMessage id="price" />
              </Typography>
            </PriceDiv>
          </Line>
          {content.map((one, index) => {
            let attributes: some = {};
            try {
              attributes = JSON.parse(one.attributes);
            } catch (_) {}

            return (
              <Line key={one.item_id} style={{ marginBottom: '24px' }}>
                <ItemDiv>
                  <img
                    alt=""
                    src={`${PRODUCT_IMAGE_BASE}/${one.image}`}
                    style={{
                      width: '96px',
                      height: '96px',
                      objectFit: 'cover',
                      border: `1px solid ${LIGHT_GREY}`,
                    }}
                  />
                  <Line style={{ position: 'relative', marginLeft: '24px', alignSelf: 'stretch' }}>
                    <Typography variant="body1">{one.name}</Typography>
                    <Line style={{ position: 'absolute', bottom: 0, height: '26px' }}>
                      <IconButton size="small">
                        <img alt="" src={remove} />
                      </IconButton>
                      &nbsp;
                      <Typography variant="body2">
                        <FormattedMessage id="remove" />
                      </Typography>
                    </Line>
                  </Line>
                </ItemDiv>
                <SizeDiv>
                  <Typography variant="h3" color="inherit">
                    {attributes.size}
                  </Typography>
                </SizeDiv>
                <QuantityDiv>
                  <QuantityBox
                    quantity={one.quantity}
                    setQuantity={q => {
                      const newContent = [...content];
                      newContent[index] = { ...one, quantity: q };
                      dispatch(setCartContent(newContent));
                    }}
                  />
                </QuantityDiv>
                <PriceDiv>
                  <Typography variant="h2">${one.price}</Typography>
                </PriceDiv>
              </Line>
            );
          })}
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
          style={{ height: '48px', borderRadius: '24px', minWidth: '163px', background: 'white' }}
          onClick={close}
        >
          <Typography variant="h3" color="inherit">
            <FormattedMessage id="backToShop" />
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ height: '48px', borderRadius: '24px', minWidth: '163px' }}
        >
          <Typography variant="h3" color="inherit">
            <FormattedMessage id="checkout" />
          </Typography>
        </Button>
      </Line>
    </Paper>
  );
};

export default connect()(CartPopover);
