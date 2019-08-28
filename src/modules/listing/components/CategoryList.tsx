import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { ROUTES, some } from '../../../constants';
import Link from '../../common/components/Link';

const styles = (theme: Theme) =>
  createStyles({
    list: {
      columnCount: 1,
      listStyle: 'none',
      [theme.breakpoints.between('sm', 'md')]: { columnCount: 2 },
      [theme.breakpoints.up('md')]: { columnCount: 3 },
    },
  });

interface ICategoryListProps extends WithStyles<typeof styles> {
  categories: some[];
}

const CategoryList: React.FunctionComponent<ICategoryListProps> = props => {
  const { categories, classes } = props;

  return (
    <ul className={classes.list}>
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

export default withStyles(styles)(CategoryList);
