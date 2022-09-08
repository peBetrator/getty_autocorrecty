import { MutableRefObject, ReactElement, useRef } from 'react';
import styled from 'styled-components';

import { useGifs } from '../../context';
import { useIntercectionObserver } from '../../hooks';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Gif = styled.img`
  display: inline-block;
  position: relative;
  margin: 1px;
  min-width: 0;
  object-fit: contain;
`;

const LastRow = styled.div`
  width: 100%;
  height: 1px;
  background: red;
`;

export default function Grid(): ReactElement {
  const { gifs } = useGifs();

  const lastRowRef = useRef<HTMLDivElement>();
  const isLastSoon = useIntercectionObserver(lastRowRef);

  console.log(isLastSoon);

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
          <Gif key={id} alt={title} src={url} />
        )
      )}
      <LastRow
        id="last-item"
        ref={lastRowRef as MutableRefObject<HTMLDivElement>}
      />
    </Wrapper>
  );
}
