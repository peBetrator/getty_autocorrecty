import { ReactElement } from 'react';
import styled from 'styled-components';
import { Input, Switch } from '../atoms';

const HeaderWrapper = styled.div`
  display: grid;
  width: 100%;
  min-height: 50vh;
  background-color: ${props => props.theme.primaryBg};
  background-size: cover;
`;

export default function Header(): ReactElement {
  return (
    <HeaderWrapper>
      <Switch />
      <Input />
    </HeaderWrapper>
  );
}
