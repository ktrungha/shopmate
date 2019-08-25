import * as React from 'react';
import { AppState } from '../../../redux/reducers';
import { connect } from 'react-redux';
import { useTheme, useMediaQuery } from '@material-ui/core';
import AllDesktop from '../components/AllDesktop';
import AllMobile from '../components/AllMobile';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { some, API_PATHS, PAGE_SIZE } from '../../../constants';
import { fetchThunk } from '../../common/redux/thunks';
import { stringify } from 'querystring';

export interface ProductData {
  products: some[];
  total: number;
}

interface IAllProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const All: React.FunctionComponent<IAllProps> = props => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const { categories, dispatch } = props;

  const [data, setData] = React.useState<ProductData | null>(null);
  const [page, setPage] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching(true);
      const json = await dispatch(fetchThunk(`${API_PATHS.allProducts}`));
      setData({ products: json.rows, total: json.count });
      setPage(page => page + 1);
      setFetching(false);
    };
    fetch();
  }, [dispatch]);

  const fetchMore = async () => {
    if (data) {
      setFetching(true);
      const json = await dispatch(
        fetchThunk(`${API_PATHS.allProducts}?${stringify({ page: page + 1, limit: PAGE_SIZE })}`),
      );
      setData({ products: data.products.concat(json.rows), total: json.count });
      setPage(page => page + 1);
      setFetching(false);
    }
  };

  if (desktop) {
    return (
      <AllDesktop
        categories={categories}
        data={data}
        fetching={fetching}
        fetchMore={fetchMore}
        page={page}
      />
    );
  }
  return <AllMobile />;
};

function mapStateToProps(state: AppState) {
  return { categories: state.common.categories };
}

export default connect(mapStateToProps)(All);
