import { IconButton } from '@material-ui/core';
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
  const { content, tax } = props;

  const [showCartPopover, setShowCartPopover] = React.useState(false);
  const [showCheckoutPopover, setShowCheckoutPopover] = React.useState(true);

  return (
    <>
      <div style={{ alignSelf: 'center', margin: '0 10px', position: 'relative' }}>
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
            {content.length > 9 ? '9+' : content.length}
          </Line>
        )}
        <IconButton onClick={() => setShowCartPopover(true)}>
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
        {showCheckoutPopover && content && content.length && tax && (
          <CheckoutPopover close={() => setShowCheckoutPopover(false)} tax={tax} />
        )}
      </div>
    </>
  );
};

function mapStateToProps(state: AppState) {
  return { content: state.cart.content, tax: state.common.tax };
}

export default connect(mapStateToProps)(CartBadge);
