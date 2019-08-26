import * as React from 'react';
import { PageWrapper } from '../../common/components/elements';
import Header from '../../common/components/Header';
import { Container, Typography } from '@material-ui/core';
import { LIGHT_GREY } from '../../../colors';
import { FormattedMessage } from 'react-intl';
import ProductCardGrid from './ProductCardGrid';
import { ProductsList } from '../../common/model';
import Footer from '../../common/components/Footer';

interface ISearchDesktopProps {
  input: string;
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
}

const SearchDesktop: React.FunctionComponent<ISearchDesktopProps> = props => {
  const { input, data, fetching, fetchMore, page } = props;

  return (
    <PageWrapper>
      <Header />
      <Container style={{ flex: 1 }}>
        <div style={{ padding: '67px 80px', marginTop: '23px', background: LIGHT_GREY }}>
          <Typography variant="h3">
            <FormattedMessage id="searchInput" values={{ input }} />
          </Typography>
        </div>
        <div style={{ margin: '23px 0' }}>
          <ProductCardGrid fetchMore={fetchMore} page={page} fetching={fetching} data={data} />
        </div>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default SearchDesktop;
