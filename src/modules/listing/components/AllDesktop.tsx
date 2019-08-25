import * as React from 'react';
import { PageWrapper } from '../../common/components/elements';
import Header from '../../common/components/Header';
import { Container, Typography, Grid } from '@material-ui/core';
import Footer from '../../common/components/Footer';
import { some, ROUTES, PAGE_SIZE } from '../../../constants';
import Link from '../../common/components/Link';
import { LIGHT_GREY, BLUE } from '../../../colors';
import { ProductData } from '../pages/All';
import ProductCard from './ProductCard';
import { FormattedMessage } from 'react-intl';

interface IAllDesktopProps {
  categories: some[];
  data: ProductData | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
}

const AllDesktop: React.FunctionComponent<IAllDesktopProps> = props => {
  const { categories, data, fetching, fetchMore, page } = props;

  const fetchingGroup = (
    <>
      <Grid item sm={4} lg={3}>
        <ProductCard />
      </Grid>
      <Grid item sm={4} lg={3}>
        <ProductCard />
      </Grid>
      <Grid item sm={4} lg={3}>
        <ProductCard />
      </Grid>
      <Grid item sm={4} lg={3}>
        <ProductCard />
      </Grid>
    </>
  );

  return (
    <PageWrapper>
      <Header />
      <Container style={{ flex: 1 }}>
        <div style={{ padding: '67px 80px', marginTop: '23px', background: LIGHT_GREY }}>
          <ul style={{ columnCount: 3, listStyle: 'none' }}>
            {categories.map(one => (
              <li key={one.category_id}>
                <Link to={ROUTES.category.gen(one.category_id)}>
                  <Typography variant="h3" style={{ color: 'white' }}>
                    {one.name}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ margin: '23px 0' }}>
          {data ? (
            <>
              <Grid container spacing={5}>
                {data.products.map(one => (
                  <Grid key={one.product_id} item sm={4} lg={3}>
                    <Link to="/">
                      <ProductCard data={one} />
                    </Link>
                  </Grid>
                ))}
                {fetching && fetchingGroup}
              </Grid>
              <div style={{ margin: '10px', textAlign: 'center' }}>
                <Typography
                  variant="subtitle1"
                  style={{ color: BLUE, cursor: 'pointer' }}
                  onClick={fetchMore}
                >
                  <FormattedMessage id="loadMore" values={{ num: data.total - PAGE_SIZE * page }} />
                </Typography>
              </div>
            </>
          ) : (
            <Grid container spacing={5}>
              {fetchingGroup}
            </Grid>
          )}
        </div>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default AllDesktop;
