import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { BLUE } from '../../../colors';

const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${BLUE};
`;

export default Link;
