import { useMediaQuery, useTheme } from '@material-ui/core';
import { stringify } from 'querystring';
import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS, PAGE_SIZE, SEARCH_INPUT } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import { ProductsList } from '../../common/model';
import { fetchThunk } from '../../common/redux/thunks';
import SearchDesktop from '../components/SearchDesktop';
import SearchMobile from '../components/SearchMobile';

interface ISearchProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const Search: React.FunctionComponent<ISearchProps> = props => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const { dispatch, search } = props;
  const params = new URLSearchParams(search);
  const input = params.get(SEARCH_INPUT) || '';

  const [data, setData] = React.useState<ProductsList | null>(null);
  const [page, setPage] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      setFetching(true);
      setData(null);
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.search}?${stringify({ query_string: input, page: 1, limit: PAGE_SIZE })}`,
        ),
      );
      setData({ products: json.rows, total: json.count });
      setPage(page => page + 1);
      setFetching(false);
    };
    fetch();
  }, [dispatch, input]);

  const fetchMore = async () => {
    if (data) {
      setFetching(true);
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.search}?${stringify({
            query_string: input,
            page: page + 1,
            limit: PAGE_SIZE,
          })}`,
        ),
      );
      setData({ products: data.products.concat(json.rows), total: json.count });
      setPage(page => page + 1);
      setFetching(false);
    }
  };

  if (desktop) {
    return (
      <SearchDesktop
        input={input}
        data={data}
        fetching={fetching}
        fetchMore={fetchMore}
        page={page}
      />
    );
  }
  return <SearchMobile />;
};

function mapStateToProps(state: AppState) {
  return { search: state.router.location.search };
}

export default connect(mapStateToProps)(Search);
