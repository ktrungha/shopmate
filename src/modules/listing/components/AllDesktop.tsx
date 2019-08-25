import { Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { LIGHT_GREY } from '../../../colors';
import { ROUTES, some } from '../../../constants';
import { PageWrapper } from '../../common/components/elements';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import Link from '../../common/components/Link';
import { ProductsList } from '../../common/model';
import ProductCardGrid from './ProductCardGrid';

interface IAllDesktopProps {
  categories: some[];
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
}

const AllDesktop: React.FunctionComponent<IAllDesktopProps> = props => {
  const { categories, data, fetching, fetchMore, page } = props;

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
          <ProductCardGrid fetchMore={fetchMore} page={page} fetching={fetching} data={data} />
        </div>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default AllDesktop;
