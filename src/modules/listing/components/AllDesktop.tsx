import * as React from 'react';
import { PageWrapper } from '../../common/components/elements';
import Header from '../../common/components/Header';
import { Container } from '@material-ui/core';

interface IAllDesktopProps {}

const AllDesktop: React.FunctionComponent<IAllDesktopProps> = props => {
  return (
    <PageWrapper>
      <Header />
      <Container style={{ flex: 1 }}>a</Container>
    </PageWrapper>
  );
};

export default AllDesktop;
