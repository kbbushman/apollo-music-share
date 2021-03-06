import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <>
      <Header />
      <Grid spacing={3} container>
        <Grid xs={12} md={7} style={{ paddingTop: 80 }} item>
          <AddSong />
          <SongList />
        </Grid>
        <Grid style={{
          position: 'fixed',
          width: '100%',
          right: 0,
          top: 70,
        }} xs={12} md={5} item>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
