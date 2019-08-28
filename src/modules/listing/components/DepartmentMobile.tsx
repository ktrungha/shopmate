import { Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { LIGHT_GREY } from '../../../colors';
import { some } from '../../../constants';
import { PageWrapper } from '../../common/components/elements';
import LoadingIcon from '../../common/components/LoadingIcon';
import MobileFooter from '../../common/components/MobileFooter';
import MobileHeader from '../../common/components/MobileHeader';
import { ProductsList } from '../../common/model';
import CategoryList from './CategoryList';
import ProductCardGrid from './ProductCardGrid';

interface IDepartmentMobileProps {
  categories: some[] | null;
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
  departmentInfo: some | null;
}

const DepartmentMobile: React.FunctionComponent<IDepartmentMobileProps> = props => {
  const { fetchMore, page, fetching, data, categories, departmentInfo } = props;
  return (
    <PageWrapper>
      <MobileHeader />
      <Container style={{ flex: 1 }}>
        <div style={{ padding: '10px 20px', marginTop: '10px', background: LIGHT_GREY }}>
          {categories && departmentInfo ? (
            <>
              <div>
                <Typography variant="h2">{departmentInfo.name}</Typography>
              </div>
              <CategoryList categories={categories} />
            </>
          ) : (
            <LoadingIcon />
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

export default DepartmentMobile;
