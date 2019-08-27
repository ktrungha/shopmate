import * as React from 'react';
import { ProductsList } from '../../common/model';
import { Grid, Typography } from '@material-ui/core';
import ProductCard from './ProductCard';
import Link from '../../common/components/Link';
import { FormattedMessage } from 'react-intl';
import { BLUE } from '../../../colors';
import { PAGE_SIZE, ROUTES } from '../../../constants';

interface IProductCardGridProps {
  data: ProductsList | null;
  page: number;
  fetching: boolean;
  fetchMore(): void;
}

const ProductCardGrid: React.FunctionComponent<IProductCardGridProps> = props => {
  const { data, fetchMore, fetching, page } = props;

  const fetchingGroup = (
    <>
      <Grid item xs={12} sm={4} lg={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <ProductCard />
      </Grid>
    </>
  );

  if (data) {
    return (
      <>
        <Grid container spacing={5} alignContent="center">
          {data.products.map(one => (
            <Grid key={one.product_id} item xs={12} sm={4} lg={3}>
              <Link to={`${ROUTES.product.gen(one.product_id)}`}>
                <ProductCard data={one} />
              </Link>
            </Grid>
          ))}
          {fetching && fetchingGroup}
        </Grid>
        {data.total - PAGE_SIZE * page > 0 && !fetching && (
          <div style={{ margin: '10px auto', maxWidth: '300px', textAlign: 'center' }}>
            <Typography
              variant="subtitle1"
              style={{ color: BLUE, cursor: 'pointer' }}
              onClick={fetchMore}
            >
              <FormattedMessage id="loadMore" values={{ num: data.total - PAGE_SIZE * page }} />
            </Typography>
          </div>
        )}
      </>
    );
  }
  return (
    <Grid container spacing={5}>
      {fetchingGroup}
    </Grid>
  );
};

export default ProductCardGrid;
