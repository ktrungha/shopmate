import { useMediaQuery, useTheme } from '@material-ui/core';
import { stringify } from 'querystring';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS, PAGE_SIZE } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { ProductsList } from '../../common/model';
import { fetchThunk } from '../../common/redux/thunks';
import AllDesktop from '../components/AllDesktop';
import AllMobile from '../components/AllMobile';

interface IAllProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const All: React.FunctionComponent<IAllProps> = props => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const { categories, dispatch } = props;

  const [data, setData] = React.useState<ProductsList | null>(null);
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
  return <AllMobile data={data} fetching={fetching} fetchMore={fetchMore} page={page} />;
};

function mapStateToProps(state: AppState) {
  return { categories: state.common.categories };
}

export default connect(mapStateToProps)(All);
