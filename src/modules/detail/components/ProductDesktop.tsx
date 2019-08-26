import { Container, IconButton, Typography, Button } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { DARK_GREY, LIGHT_GREY, PRIMARY } from '../../../colors';
import { PRODUCT_IMAGE_BASE, some } from '../../../constants';
import minus from '../../../svg/minus.svg';
import plus from '../../../svg/plus.svg';
import { Line, PageWrapper } from '../../common/components/elements';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import LoadingIcon from '../../common/components/LoadingIcon';
import heart from '../../../svg/redHeart.svg';

interface IProductDesktopProps {
  data: some | null;
  attributes: some[] | null;
  size?: string;
  setSize: React.Dispatch<React.SetStateAction<string | undefined>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  color?: string;
  setColor: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ProductDesktop: React.FunctionComponent<IProductDesktopProps> = props => {
  const { data, attributes, size, setSize, quantity, setQuantity, color, setColor } = props;
  return (
    <PageWrapper>
      <Header light />
      <Container style={{ flex: 1, paddingTop: '24px', paddingBottom: '23px' }}>
        {data && attributes ? (
          <div style={{ background: 'white' }}>
            <div style={{ display: 'flex', paddingTop: '25px', paddingBottom: '48px' }}>
              <Line style={{ minWidth: '436px', flex: 1, justifyContent: 'center' }}>
                <img src={`${PRODUCT_IMAGE_BASE}/${data.image}`} alt="" />
              </Line>
              <div style={{ flex: 1, minWidth: '400px' }}>
                <div>
                  <Typography variant="h2">{data.name}</Typography>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Typography variant="h2" color="primary">
                    ${data.price}
                  </Typography>
                </div>
                <div style={{ marginTop: '14px' }}>
                  <div>
                    <Typography variant="h3" style={{ color: '#B4B4B4' }}>
                      <FormattedMessage id="color" />
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      marginTop: '10px',
                    }}
                  >
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
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div>
                    <Typography variant="h3" style={{ color: '#B4B4B4' }}>
                      <FormattedMessage id="size" />
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
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
                            marginRight: '10px',
                            borderRadius: '2px',
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
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <div>
                    <Typography variant="h3" style={{ color: '#B4B4B4' }}>
                      <FormattedMessage id="quantity" />
                    </Typography>
                  </div>
                  <Line
                    style={{
                      display: 'flex',
                      marginTop: '15px',
                    }}
                  >
                    <div style={{ marginRight: '4px' }}>
                      <IconButton
                        onClick={() => setQuantity(q => q - 1)}
                        style={{ background: '#EFEFEF' }}
                        disabled={quantity < 1}
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
                      <IconButton
                        onClick={() => setQuantity(q => q + 1)}
                        style={{ background: '#EFEFEF' }}
                      >
                        <img src={plus} alt="" />
                      </IconButton>
                    </div>
                  </Line>
                </div>
                <div style={{ marginTop: '30px' }}>
                  <Line>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      style={{ height: '60px', borderRadius: '30px' }}
                    >
                      <Typography variant="h3" style={{ color: 'white' }}>
                        <FormattedMessage id="addToCart" />
                      </Typography>
                    </Button>
                    <Line style={{ marginLeft: '44px', cursor: 'pointer' }}>
                      <img alt="" src={heart} style={{ marginRight: '7px' }} />
                      <Typography variant="body2">
                        <FormattedMessage id="addToWishList" />
                      </Typography>
                    </Line>
                  </Line>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingIcon
            style={{
              height: '250px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        )}
      </Container>
      <Footer light />
    </PageWrapper>
  );
};

export default ProductDesktop;
