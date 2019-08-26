import { IconButton } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { PRIMARY } from '../../../colors';
import { AppState } from '../../../redux/reducers';
import bag from '../../../svg/bag.svg';
import { Line } from '../../common/components/elements';
import CartPopover from './CartPopover';

interface ICartBadgeProps extends ReturnType<typeof mapStateToProps> {}

const CartBadge: React.FunctionComponent<ICartBadgeProps> = props => {
  const { content } = props;

  const [showPopover, setShowPopover] = React.useState(true);

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
        <IconButton onClick={() => setShowPopover(true)}>
          <img alt="" src={bag} />
        </IconButton>
      </div>
      {showPopover && content && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50px', zIndex: 100 }}>
          <CartPopover close={() => setShowPopover(false)} content={content} />
        </div>
      )}
    </>
  );
};

function mapStateToProps(state: AppState) {
  return { content: state.cart.content };
}

export default connect(mapStateToProps)(CartBadge);
