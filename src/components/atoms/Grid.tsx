import { MutableRefObject, ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useGifs } from '../../context';
import { useIntercectionObserver } from '../../hooks';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 50vh;
  background-color: ${props => props.theme.secondaryBg};
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
  align-self: flex-end;
`;

export default function Grid(): ReactElement {
  const { gifs, setFetchMore } = useGifs();

  const lastRowRef = useRef<HTMLDivElement>();
  const isLastSoon = useIntercectionObserver(lastRowRef);

  useEffect(() => {
    setFetchMore(!!gifs.length && isLastSoon);
  }, [isLastSoon]);

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
