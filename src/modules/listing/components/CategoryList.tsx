import * as React from 'react';
import Link from '../../common/components/Link';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { ROUTES, some } from '../../../constants';

interface ICategoryListProps {
  categories: some[];
}

const CategoryList: React.FunctionComponent<ICategoryListProps> = props => {
  const { categories } = props;
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ul style={{ columnCount: desktop ? 3 : tablet ? 2 : 1, listStyle: 'none' }}>
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
  );
};

export default CategoryList;
