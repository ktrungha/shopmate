import { Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LIGHT_GREY } from '../../../colors';
import { PageWrapper } from '../../common/components/elements';
import MobileFooter from '../../common/components/MobileFooter';
import MobileHeader from '../../common/components/MobileHeader';
import { ProductsList } from '../../common/model';
import ProductCardGrid from './ProductCardGrid';

interface ISearchMobileProps {
  input: string;
  data: ProductsList | null;
  fetching: boolean;
  fetchMore(): void;
  page: number;
}

const SearchMobile: React.FunctionComponent<ISearchMobileProps> = props => {
  const { input, data, fetching, fetchMore, page } = props;

  return (
    <PageWrapper>
      <MobileHeader />
      <Container style={{ flex: 1 }}>
        <div style={{ padding: '20px 30px', marginTop: '10px', background: LIGHT_GREY }}>
          <Typography variant="h3">
            <FormattedMessage id="searchInput" values={{ input }} />
          </Typography>
        </div>
        <div style={{ margin: '23px 0' }}>
          <ProductCardGrid fetchMore={fetchMore} page={page} fetching={fetching} data={data} />
        </div>
      </Container>
      <MobileFooter />
    </PageWrapper>
  );
};

export default SearchMobile;
