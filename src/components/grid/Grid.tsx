import { ReactElement } from 'react';
import styled from 'styled-components';
import { useGifs } from '../../context';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Grid(): ReactElement {
  const { gifs } = useGifs();

  return (
    <Wrapper>
      {gifs.map(
        ({
          id,
          title,
          images: {
            original: { url },
          },
        }) => (
          <img key={id} alt={title} src={url} />
        )
      )}
    </Wrapper>
  );
}
