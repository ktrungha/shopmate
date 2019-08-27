import * as React from 'react';
import { AppState } from '../../../redux/reducers';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { ProductsList } from '../../common/model';
import { some, API_PATHS, PAGE_SIZE } from '../../../constants';
import { fetchThunk } from '../../common/redux/thunks';
import { stringify } from 'querystring';
import CategoryDesktop from '../components/CategoryDesktop';
import CategoryMobile from '../components/CategoryMobile';

interface ICategoryProps
  extends ReturnType<typeof mapStateToProps>,
    RouteComponentProps<{ id: string }> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const Category: React.FunctionComponent<ICategoryProps> = props => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const { dispatch } = props;

  const [data, setData] = React.useState<ProductsList | null>(null);
  const [page, setPage] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState<some | null>(null);

  const id = props.match.params.id;

  // get the list of products in this category
  React.useEffect(() => {
    const fetch = async () => {
      setFetching(true);
      setData(null);
      setPage(0);
      const json = await dispatch(fetchThunk(`${API_PATHS.productsOfCategory(id)}`));
      setData({ products: json.rows, total: json.count });
      setPage(page => page + 1);
      setFetching(false);
    };
    fetch();
  }, [dispatch, id]);

  // get the category info
  React.useEffect(() => {
    const fetch = async () => {
      setCategoryInfo(null);
      const json = await dispatch(fetchThunk(`${API_PATHS.getCategory(id)}`));
      setCategoryInfo(json);
    };
    fetch();
  }, [dispatch, id]);

  const fetchMore = async () => {
    if (data) {
      setFetching(true);
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.productsOfCategory(id)}?${stringify({ page: page + 1, limit: PAGE_SIZE })}`,
        ),
      );
      setData({ products: data.products.concat(json.rows), total: json.count });
      setPage(page => page + 1);
      setFetching(false);
    }
  };

  if (desktop) {
    return (
      <CategoryDesktop
        categoryInfo={categoryInfo}
        data={data}
        fetching={fetching}
        fetchMore={fetchMore}
        page={page}
      />
    );
  }
  return (
    <CategoryMobile
      categoryInfo={categoryInfo}
      data={data}
      fetching={fetching}
      fetchMore={fetchMore}
      page={page}
    />
  );
};

function mapStateToProps(state: AppState) {
  return {};
}

export default connect(mapStateToProps)(withRouter(Category));
