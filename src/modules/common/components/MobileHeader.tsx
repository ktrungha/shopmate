import { Drawer, IconButton, List, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { goBack } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ROUTES } from '../../../constants';
import { AppState } from '../../../redux/reducers';
import back from '../../../svg/back.svg';
import burger from '../../../svg/burger.svg';
import { Line } from './elements';
import Link from './Link';

interface IMobileHeaderProps extends ReturnType<typeof mapStateToProps> {
  dispatch: Dispatch;
}

const MobileHeader: React.FunctionComponent<IMobileHeaderProps> = props => {
  const [openMenu, setOpenMenu] = React.useState(false);

  const { departments } = props;

  return (
    <Line style={{ height: '72px', background: 'white' }}>
      <IconButton size="small" onClick={() => props.dispatch(goBack())}>
        <img alt="" src={back} />
      </IconButton>
      <Link to="/" style={{ flex: 1, flexShrink: 1, textAlign: 'center' }}>
        <Typography variant="h2" color="primary">
          SHOPMATE
        </Typography>
      </Link>
      <IconButton size="small" onClick={() => setOpenMenu(true)}>
        <img alt="" src={burger} />
      </IconButton>
      <Drawer open={openMenu} anchor="right" onClose={() => setOpenMenu(false)}>
        <div style={{ margin: '15px' }}>
          <IconButton size="small" onClick={() => setOpenMenu(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <List style={{ padding: '0 30px' }}>
          {departments.map(one => (
            <ListItem>
              <Link
                onClick={() => setOpenMenu(false)}
                key={one.department_id}
                to={ROUTES.department.gen(one.department_id)}
              >
                <Typography variant="h3" color="primary">
                  {one.name}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Line>
  );
};

function mapStateToProps(state: AppState) {
  return { departments: state.common.departments };
}

export default connect(mapStateToProps)(MobileHeader);
