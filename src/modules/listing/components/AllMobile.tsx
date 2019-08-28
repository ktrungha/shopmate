import { Container } from '@material-ui/core';
import * as React from 'react';
import { LIGHT_GREY } from '../../../colors';
import { some } from '../../../constants';
import { PageWrapper } from '../../common/components/elements';
import MobileFooter from '../../common/components/MobileFooter';
import MobileHeader from '../../common/components/MobileHeader';
import { ProductsList } from '../../common/model';
import CategoryList from './CategoryList';
import ProductCardGrid from './ProductCardGrid';

interface IAllMobileProps {
  categories: some[];
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
}

const AllMobile: React.FunctionComponent<IAllMobileProps> = props => {
  const { categories, fetchMore, page, fetching, data } = props;
  return (
    <PageWrapper>
      <MobileHeader />
      <Container style={{ flex: 1 }}>
        <div style={{ padding: '10px 20px', marginTop: '10px', background: LIGHT_GREY }}>
          <CategoryList categories={categories} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <ProductCardGrid fetchMore={fetchMore} page={page} fetching={fetching} data={data} />
        </div>
      </Container>
      <MobileFooter />
    </PageWrapper>
  );
};

export default AllMobile;
