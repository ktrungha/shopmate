import * as React from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import ProductCard from './ProductCard';
import { PageWrapper } from '../../common/components/elements';
import Header from '../../common/components/Header';
import { LIGHT_GREY, BLUE } from '../../../colors';
import { ProductsList } from '../../common/model';
import { some, PAGE_SIZE } from '../../../constants';
import LoadingIcon from '../../common/components/LoadingIcon';
import Link from '../../common/components/Link';
import { FormattedMessage } from 'react-intl';
import Footer from '../../common/components/Footer';

interface ICategoryDesktopProps {
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
  categoryInfo: some | null;
}

const CategoryDesktop: React.FunctionComponent<ICategoryDesktopProps> = props => {
  const { categoryInfo, data, fetching, fetchMore, page } = props;

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
          {categoryInfo ? (
            <Typography variant="h3" style={{ color: 'white' }}>
              {categoryInfo.name}
            </Typography>
          ) : (
            <LoadingIcon style={{ height: '100px' }} />
          )}
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
              {data.total - PAGE_SIZE * page > 0 && (
                <div style={{ margin: '10px', textAlign: 'center' }}>
                  <Typography
                    variant="subtitle1"
                    style={{ color: BLUE, cursor: 'pointer' }}
                    onClick={fetchMore}
                  >
                    <FormattedMessage
                      id="loadMore"
                      values={{ num: data.total - PAGE_SIZE * page }}
                    />
                  </Typography>
                </div>
              )}
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

export default CategoryDesktop;
