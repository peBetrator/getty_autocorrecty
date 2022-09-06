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

  return (
    <GifsContext.Provider value={{ gifs, setGifs }}>
      {children}
    </GifsContext.Provider>
  );
};
