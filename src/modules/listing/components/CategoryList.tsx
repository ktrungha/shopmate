import {
  createStyles,
  Theme,
  Typography,
  withStyles,
  WithStyles,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import * as React from 'react';
import { ROUTES, some } from '../../../constants';
import Link from '../../common/components/Link';
import Skeleton from '@material-ui/lab/Skeleton';

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
  categories: some[] | null;
}

const CategoryList: React.FunctionComponent<ICategoryListProps> = props => {
  const { categories, classes } = props;

  const theme = useTheme();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <div>
      <List className={classes.list}>
        {categories ? (
          categories.map(one => (
            <ListItem key={one.category_id}>
              <Link to={ROUTES.category.gen(one.category_id)}>
                <Typography variant="h3" style={{ color: 'white' }}>
                  {one.name}
                </Typography>
              </Link>
            </ListItem>
          ))
        ) : desktop ? (
          <>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
          </>
        ) : tablet ? (
          <>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
            <ListItem>
              <Skeleton variant="rect" width="230px" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default withStyles(styles)(CategoryList);
