import { Container, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import * as React from 'react';
import { LIGHT_GREY } from '../../../colors';
import { some } from '../../../constants';
import { PageWrapper } from '../../common/components/elements';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import { ProductsList } from '../../common/model';
import ProductCardGrid from './ProductCardGrid';

interface ICategoryDesktopProps {
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
  categoryInfo: some | null;
}

const CategoryDesktop: React.FunctionComponent<ICategoryDesktopProps> = props => {
  const { categoryInfo, data, fetching, fetchMore, page } = props;

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
            <Skeleton width="200px" />
          )}
        </div>
        <div style={{ margin: '23px 0' }}>
          <ProductCardGrid fetchMore={fetchMore} page={page} fetching={fetching} data={data} />
        </div>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default CategoryDesktop;
