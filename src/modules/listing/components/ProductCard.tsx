import * as React from 'react';
import { some, PRODUCT_IMAGE_BASE } from '../../../constants';
import { Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components';

const baseStyle: React.CSSProperties = {
  height: '336px',
  textAlign: 'center',
};

const imageStyle: React.CSSProperties = {
  height: '163px',
  width: '100%',
  maxWidth: '90vw',
  objectFit: 'contain',
};

const ImageDiv = styled.div`
  padding: 32px;
  text-align: center;
`;

interface IProductCardProps {
  data?: some;
}

const ProductCard: React.FunctionComponent<IProductCardProps> = props => {
  const { data } = props;
  const [elevation, setElevation] = React.useState(2);
  if (!data) {
    return (
      <Paper style={baseStyle} elevation={1}>
        <ImageDiv>
          <Skeleton variant="rect" style={imageStyle} />
        </ImageDiv>
        <Skeleton width="120px" style={{ margin: 'auto' }} />
      </Paper>
    );
  }
  return (
    <Paper
      style={baseStyle}
      elevation={elevation}
      onMouseOver={() => setElevation(6)}
      onMouseOut={() => setElevation(2)}
    >
      <ImageDiv>
        <img
          alt=""
          style={{ display: 'block', ...imageStyle }}
          src={`${PRODUCT_IMAGE_BASE}/${data.thumbnail}`}
        />
      </ImageDiv>
      <div style={{ height: '48px' }}>
        <Typography variant="h3">{data.name}</Typography>
      </div>
      <div style={{ height: '24px', marginTop: '10px' }}>
        <Typography variant="h3" color="primary">
          ${data.discounted_price}
        </Typography>
      </div>
    </Paper>
  );
};

export default ProductCard;
