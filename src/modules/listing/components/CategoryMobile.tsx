import { Container, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import * as React from 'react';
import { LIGHT_GREY } from '../../../colors';
import { some } from '../../../constants';
import { PageWrapper } from '../../common/components/elements';
import MobileFooter from '../../common/components/MobileFooter';
import MobileHeader from '../../common/components/MobileHeader';
import { ProductsList } from '../../common/model';
import ProductCardGrid from './ProductCardGrid';

interface ICategoryMobileProps {
  categoryInfo: some | null;
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
}

const CategoryMobile: React.FunctionComponent<ICategoryMobileProps> = props => {
  const { fetchMore, page, fetching, data, categoryInfo } = props;
  return (
    <PageWrapper>
      <MobileHeader />
      <Container style={{ flex: 1 }}>
        <div style={{ padding: '20px 30px', marginTop: '10px', background: LIGHT_GREY }}>
          {categoryInfo ? (
            <Typography variant="h3" style={{ color: 'white' }}>
              {categoryInfo.name}
            </Typography>
          ) : (
            <Skeleton width="200px" />
          )}
        </div>
        <div style={{ margin: '10px 0' }}>
          <ProductCardGrid fetchMore={fetchMore} page={page} fetching={fetching} data={data} />
        </div>
      </Container>
      <MobileFooter />
    </PageWrapper>
  );
};

export default CategoryMobile;
