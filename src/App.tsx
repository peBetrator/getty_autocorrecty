import { Grid, Input } from './components';
import { GifsProvider } from './context';

export default function App(): React.ReactElement {
  return (
    <GifsProvider>
      <Input />
      <Grid />
    </GifsProvider>
  );
}
