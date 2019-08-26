import { IconButton, Typography } from '@material-ui/core';
import * as React from 'react';
import { LIGHT_GREY } from '../../../colors';
import minus from '../../../svg/minus.svg';
import plus from '../../../svg/plus.svg';
import { Line } from './elements';

interface IQuantityBoxProps {
  quantity: number;
  setQuantity(val: number): void;
}

const QuantityBox: React.FunctionComponent<IQuantityBoxProps> = props => {
  const { setQuantity, quantity } = props;
  return (
    <Line
      style={{
        display: 'flex',
        marginTop: '15px',
      }}
    >
      <div style={{ marginRight: '4px' }}>
        <IconButton
          onClick={() => setQuantity(quantity - 1)}
          style={{ background: '#EFEFEF' }}
          disabled={quantity < 2}
        >
          <img src={minus} alt="" />
        </IconButton>
      </div>
      <Line
        style={{
          width: '50px',
          height: '36px',
          borderRadius: '100px',
          border: `1px solid ${LIGHT_GREY}`,
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3">{quantity}</Typography>
      </Line>
      <div style={{ marginLeft: '4px' }}>
        <IconButton onClick={() => setQuantity(quantity + 1)} style={{ background: '#EFEFEF' }}>
          <img src={plus} alt="" />
        </IconButton>
      </div>
    </Line>
  );
};

export default QuantityBox;
