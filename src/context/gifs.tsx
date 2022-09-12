import { GIFObject } from 'giphy-api';
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IGifsContext {
  gifs: GIFObject[];
  fetchMore: boolean;
  setFetchMore: Dispatch<SetStateAction<boolean>>;
  setGifs: Dispatch<SetStateAction<GIFObject[]>>;
}

const GifsContext = createContext({} as IGifsContext);

export const useGifs = () => useContext(GifsContext);

export const GifsProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [gifs, setGifs] = useState<GIFObject[]>([]);
  const [fetchMore, setFetchMore] = useState(false);

  return (
    <GifsContext.Provider value={{ gifs, fetchMore, setGifs, setFetchMore }}>
      {children}
    </GifsContext.Provider>
  );
};
