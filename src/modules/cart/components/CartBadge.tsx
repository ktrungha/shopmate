import { IconButton, Typography } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { PRIMARY } from '../../../colors';
import { AppState } from '../../../redux/reducers';
import bag from '../../../svg/bag.svg';
import { Line } from '../../common/components/elements';
import CartPopover from './CartPopover';
import CheckoutPopover from '../../checkout/components/CheckoutPopover';

interface ICartBadgeProps extends ReturnType<typeof mapStateToProps> {}

const CartBadge: React.FunctionComponent<ICartBadgeProps> = props => {
  const { content, tax, shippingRegions } = props;

  const [showCartPopover, setShowCartPopover] = React.useState(false);
  const [showCheckoutPopover, setShowCheckoutPopover] = React.useState(false);

  return (
    <>
      <div style={{ alignSelf: 'center', margin: '0 10px', position: 'relative' }}>
        <IconButton onClick={() => setShowCartPopover(true)}>
          {content && content.length > 0 && (
            <Line
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: PRIMARY,
                color: 'white',
                position: 'absolute',
                top: 0,
                right: 0,
                justifyContent: 'center',
                zIndex: 100,
              }}
            >
              <Typography variant="body2" color="inherit">
                {content.length > 9 ? '9+' : content.length}
              </Typography>
            </Line>
          )}
          <img alt="" src={bag} />
        </IconButton>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: '50px', zIndex: 100 }}>
        {showCartPopover && content && (
          <CartPopover
            close={() => setShowCartPopover(false)}
            content={content}
            checkout={() => {
              setShowCartPopover(false);
              setShowCheckoutPopover(true);
            }}
          />
        )}
        {showCheckoutPopover && content && content.length && tax && shippingRegions && (
          <CheckoutPopover
            close={() => setShowCheckoutPopover(false)}
            tax={tax}
            shippingRegions={shippingRegions}
          />
        )}
      </div>
    </>
  );
};

function mapStateToProps(state: AppState) {
  return {
    content: state.cart.content,
    tax: state.common.tax,
    shippingRegions: state.common.shippingRegions,
  };
}

export default connect(mapStateToProps)(CartBadge);
