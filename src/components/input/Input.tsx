import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useSearch } from '../../hooks';

const InputWrapper = styled.form`
  display: grid;
  width: 100%;
  min-height: 500px;
  place-items: center;
  background: url('/assets/bg.png');
  background-size: cover;
`;

const InputBox = styled.input`
  width: 16em;
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

export default function Input() {
  const [searchValue, setSeachValue] = useState('');

  const { fetch } = useSearch();

  return (
    <InputWrapper
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        setSeachValue('');
        fetch({ search: searchValue });
      }}
    >
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
