import * as React from 'react';
import { PageWrapper } from '../../common/components/elements';
import MobileHeader from '../../common/components/MobileHeader';
import { Container } from '@material-ui/core';
import ProductCardGrid from './ProductCardGrid';
import { ProductsList } from '../../common/model';

interface IAllMobileProps {
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
}

const AllMobile: React.FunctionComponent<IAllMobileProps> = props => {
  const { fetchMore, page, fetching, data } = props;
  return (
    <PageWrapper>
      <MobileHeader />
      <Container style={{ flex: 1 }}>
        <div style={{ margin: '23px 0' }}>
          <ProductCardGrid fetchMore={fetchMore} page={page} fetching={fetching} data={data} />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default AllMobile;
