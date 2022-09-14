import { Grid } from './components/atoms';
import { Header } from './components/templates';
import { GifsProvider, ThemeToggleProvider } from './context';

export default function App(): React.ReactElement {
  return (
    <ThemeToggleProvider>
      <GifsProvider>
        <Header />
        <Grid />
      </GifsProvider>
    </ThemeToggleProvider>
  );
}
