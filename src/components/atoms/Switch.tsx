import { ReactElement } from 'react';
import styled from 'styled-components';
import { useToggleTheme } from '../../context';

const Knob = styled.button`
  width: 20px;
  height: 20px;
  margin: 1rem;
  padding: 0;
  justify-self: flex-end;

  border-radius: 100px;
`;

export default function Switch(): ReactElement {
  const { toggleTheme } = useToggleTheme();

  return <Knob onClick={toggleTheme}>X</Knob>;
}
