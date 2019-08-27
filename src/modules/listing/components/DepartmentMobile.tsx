import * as React from 'react';
import { PageWrapper } from '../../common/components/elements';
import MobileHeader from '../../common/components/MobileHeader';
import { Container, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import ProductCardGrid from './ProductCardGrid';
import { ProductsList } from '../../common/model';
import MobileFooter from '../../common/components/MobileFooter';
import { some, ROUTES } from '../../../constants';
import { LIGHT_GREY } from '../../../colors';
import LoadingIcon from '../../common/components/LoadingIcon';
import Link from '../../common/components/Link';

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

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up('sm'));
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
              <ul style={{ columnCount: small ? 2 : 1, listStyle: 'none' }}>
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
