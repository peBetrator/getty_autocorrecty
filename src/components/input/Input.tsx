import {
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import { useGifs } from '../../context';
import { useSearch } from '../../hooks';

const InputWrapper = styled.form`
  display: grid;
  width: 100%;
  min-height: 50vh;
  place-items: center;
  background-color: #000;
  background-size: cover;
`;

const InputBox = styled.input`
  width: 50vw;
  max-width: 16em;
  height: 1.5em;

  margin: 1em auto;
  padding: 0.25em 1em;
  text-align: center;

  font-size: 32px;

  outline: none;
  border: 1px solid black;
  border-radius: 1em;

  box-shadow: 0px 0px 2px;

  &:focus {
    border-color: #03623d;
  }
`;

export default function Input(): ReactElement {
  const [searchValue, setSeachValue] = useState('');

  const { setGifs } = useGifs();
  const { fetch, isSuccess, data } = useSearch();

  useEffect(() => {
    if (isSuccess && data) setGifs(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      setSeachValue('');
      fetch({ search: searchValue });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue]
  );

  return (
    <InputWrapper onSubmit={onSubmit}>
      <InputBox
        value={searchValue}
        onChange={(e: FormEvent<HTMLInputElement>) =>
          setSeachValue(e.currentTarget.value)
        }
        placeholder="Search an image..."
      />
    </InputWrapper>
  );
}
