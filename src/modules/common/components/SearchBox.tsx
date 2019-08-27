import { IconButton } from '@material-ui/core';
import { push } from 'connected-react-router';
import { stringify } from 'querystring';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ROUTES, SEARCH_INPUT } from '../../../constants';
import closeSvg from '../../../svg/close.svg';
import searchSvg from '../../../svg/search.svg';
import { BootstrapInput } from './elements';

interface ISearchBoxProps extends InjectedIntlProps {
  dispatch: Dispatch;
}

const SearchBox: React.FunctionComponent<ISearchBoxProps> = props => {
  const { intl, dispatch } = props;

  const [input, setInput] = React.useState('');

  const search = () => {
    dispatch(
      push({
        pathname: `${ROUTES.search}`,
        search: `?${stringify({ [SEARCH_INPUT]: input })}`,
      }),
    );
  };

  return (
    <BootstrapInput
      style={{
        padding: '0 5px',
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '24px',
        width: '260px',
        height: '36px',
        borderRadius: '18px',
      }}
      placeholder={intl.formatMessage({ id: 'searchAnything' })}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          search();
        }
      }}
      startAdornment={
        <IconButton size="small" onClick={search}>
          <img alt="" src={searchSvg} width="20px" height="20px" />
        </IconButton>
      }
      endAdornment={
        <IconButton size="small" onClick={() => setInput('')}>
          <img alt="" src={closeSvg} width="20px" height="20px" />
        </IconButton>
      }
    />
  );
};

export default connect()(injectIntl(SearchBox));
