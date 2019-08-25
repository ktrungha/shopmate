import { InputBase, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import styled from 'styled-components';
import { DARK_GREY } from '../../../colors';

export const CheckBox = styled.input``;

export const subtitle3Sstyles: React.CSSProperties = { fontWeight: 'bold', fontSize: '14px' };
export const subHeader2: React.CSSProperties = {
  fontWeight: 500,
  letterSpacing: '0.1px',
  fontSize: '14px',
  lineHeight: '24px',
};

export const BootstrapInput = withStyles(theme => ({
  root: {
    borderRadius: 4,
    border: `1px solid ${DARK_GREY}`,
  },
  input: {
    borderRadius: 4,
    backgroundColor: 'transparent',
    padding: '5px 12px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '40px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
  error: {
    boxShadow: `${fade(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.error.main,
  },
  focused: {
    boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
}))(InputBase);

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;
`;

// cannot use inline, do this to have vendor prefix for sticky
export const StickyDiv = styled.div`
  position: sticky;
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
`;
