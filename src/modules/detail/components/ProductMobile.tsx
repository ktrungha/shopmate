import { Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import styled from 'styled-components';
import { DARK_GREY, LIGHT_GREY, PRIMARY } from '../../../colors';
import { PRODUCT_IMAGE_BASE, some } from '../../../constants';
import heart from '../../../svg/redHeart.svg';
import { PageWrapper } from '../../common/components/elements';
import LoadingButton from '../../common/components/LoadingButton';
import LoadingIcon from '../../common/components/LoadingIcon';
import MobileFooter from '../../common/components/MobileFooter';
import MobileHeader from '../../common/components/MobileHeader';

const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

interface IProductMobileProps {
  data: some | null;
  attributes: some[] | null;
  size?: string;
  setSize: React.Dispatch<React.SetStateAction<string | undefined>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  color?: string;
  setColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  addToCart?: () => void;
  fetching: boolean;
}

const ProductMobile: React.FunctionComponent<IProductMobileProps> = props => {
  const { data, attributes, size, setSize, color, setColor, addToCart, fetching } = props;
  return (
    <PageWrapper>
      <MobileHeader />
      <div style={{ flex: 1 }}>
        {data && attributes ? (
          <>
            <Container style={{ textAlign: 'center', background: 'white' }}>
              <Line style={{ paddingTop: '22px' }}>
                <Typography variant="h2">{data.name}</Typography>
              </Line>
              <Line style={{ marginTop: '20px', alignItems: 'baseline' }}>
                <Typography
                  variant="h3"
                  color="textSecondary"
                  style={{ textDecoration: 'line-through' }}
                >
                  $<FormattedNumber value={data.price} />
                </Typography>
                &emsp;
                <Typography variant="h2" color="primary">
                  $<FormattedNumber value={data.discounted_price} />
                </Typography>
              </Line>
              <Line style={{ marginTop: '10px', marginBottom: '45px' }}>
                <img src={`${PRODUCT_IMAGE_BASE}/${data.image}`} alt="" />
              </Line>
              <div>
                <div>
                  <Typography variant="h3" style={{ color: '#B4B4B4' }}>
                    <FormattedMessage id="color" />
                  </Typography>
                </div>
                <Line style={{ marginTop: '10px' }}>
                  {attributes
                    .filter(one => one.attribute_name === 'Color')
                    .map(one => (
                      <div
                        key={one.attribute_value_id}
                        style={{
                          width: '14px',
                          height: '14px',
                          marginRight: '13px',
                          borderRadius: '50%',
                          border: `1px solid ${LIGHT_GREY}`,
                          background: one.attribute_value,
                          boxShadow:
                            one.attribute_value === color ? `0 0 5px 2px ${DARK_GREY}` : 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => setColor(one.attribute_value)}
                      ></div>
                    ))}
                </Line>
              </div>
              <div style={{ paddingBottom: '27px' }}>
                <div style={{ marginTop: '23px', marginBottom: '10px' }}>
                  <Typography variant="h3" style={{ color: '#B4B4B4' }}>
                    <FormattedMessage id="size" />
                  </Typography>
                </div>
                <Line
                  style={{
                    marginTop: '10px',
                  }}
                >
                  {attributes
                    .filter(one => one.attribute_name === 'Size')
                    .map(one => (
                      <Line
                        key={one.attribute_value_id}
                        style={{
                          justifyContent: 'center',
                          cursor: 'pointer',
                          width: '55px',
                          height: '28px',
                          borderRadius: '2px',
                          margin: '10px 5px',
                          background: size === one.attribute_value ? PRIMARY : '#EFEFEF',
                        }}
                        onClick={() => setSize(one.attribute_value)}
                      >
                        <Typography
                          variant="body2"
                          style={{
                            color: size === one.attribute_value ? 'white' : undefined,
                          }}
                        >
                          {one.attribute_value}
                        </Typography>
                      </Line>
                    ))}
                </Line>
              </div>
            </Container>
            <div style={{ paddingTop: '37px', paddingBottom: '43px', textAlign: 'center' }}>
              <div>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  size="large"
                  style={{ height: '60px', borderRadius: '30px' }}
                  disabled={!addToCart}
                  onClick={addToCart}
                  loading={fetching}
                >
                  <Typography variant="h3" style={{ color: 'white' }}>
                    <FormattedMessage id="addToCart" />
                  </Typography>
                </LoadingButton>
              </div>
              <Line style={{ marginTop: '15px' }}>
                <img alt="" src={heart} style={{ marginRight: '7px' }} />
                <Typography variant="body2">
                  <FormattedMessage id="addToWishList" />
                </Typography>
              </Line>
            </div>
          </>
        ) : (
          <LoadingIcon style={{ height: '150px', marginTop: '30vh' }} />
        )}
      </div>
      <MobileFooter />
    </PageWrapper>
  );
};

export default ProductMobile;
