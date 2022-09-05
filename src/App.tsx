import styled from 'styled-components';
import { Input } from './components';

const Wrapper = styled.div`
  display: flex;
`;

export default function App(): React.ReactElement {
  return (
    <Wrapper>
      <Input />
    </Wrapper>
  );
}
