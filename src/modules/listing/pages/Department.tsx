import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import DepartmentDesktop from '../components/DepartmentDesktop';
import DepartmentMobile from '../components/DepartmentMobile';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ProductsList } from '../../common/model';
import { some, API_PATHS, PAGE_SIZE } from '../../../constants';
import { withRouter, RouteComponentProps } from 'react-router';
import { fetchThunk } from '../../common/redux/thunks';
import { stringify } from 'querystring';

interface IDepartmentProps
  extends ReturnType<typeof mapStateToProps>,
    RouteComponentProps<{ id: string }> {
  dispatch: ThunkDispatch<AppState, null, AnyAction>;
}

const Department: React.FunctionComponent<IDepartmentProps> = props => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const { dispatch } = props;

  const [data, setData] = React.useState<ProductsList | null>(null);
  const [categories, setCategories] = React.useState<some[] | null>(null);
  const [page, setPage] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const [departmentInfo, setDepartmentInfo] = React.useState<some | null>(null);

  const id = props.match.params.id;

  // get the list of products in this department
  React.useEffect(() => {
    const fetch = async () => {
      setFetching(true);
      setData(null);
      setPage(0);
      const json = await dispatch(fetchThunk(`${API_PATHS.productsInDepartment(id)}`));
      setData({ products: json.rows, total: json.count });
      setPage(page => page + 1);
      setFetching(false);
    };
    fetch();
  }, [dispatch, id]);

  // get the categories in this department
  React.useEffect(() => {
    const fetch = async () => {
      setCategories(null);
      const json = await dispatch(fetchThunk(`${API_PATHS.getCategoriesInDepartment(id)}`));
      setCategories(json as some[]);
    };
    fetch();
  }, [dispatch, id]);

  // get the department info
  React.useEffect(() => {
    const fetch = async () => {
      setDepartmentInfo(null);
      const json = await dispatch(fetchThunk(`${API_PATHS.getDepartment(id)}`));
      setDepartmentInfo(json);
    };
    fetch();
  }, [dispatch, id]);

  const fetchMore = async () => {
    if (data) {
      setFetching(true);
      const json = await dispatch(
        fetchThunk(
          `${API_PATHS.productsInDepartment(id)}?${stringify({
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
      <DepartmentDesktop
        departmentInfo={departmentInfo}
        categories={categories}
        data={data}
        fetching={fetching}
        fetchMore={fetchMore}
        page={page}
      />
    );
  }
  return (
    <DepartmentMobile
      departmentInfo={departmentInfo}
      categories={categories}
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

export default connect(mapStateToProps)(withRouter(Department));
