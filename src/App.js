import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery } from '@material-ui/core';

function App() {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <>
      <Header />
      <Grid spacing={3} container>
        <Grid xs={12} md={7} style={{ paddingTop: 80 }} item>
          <AddSong />
          <SongList />
        </Grid>
        <Grid style={
          greaterThanMd ? {
          position: 'fixed',
          width: '100%',
          right: 0,
          top: 70,
        } : {
          position: 'fixed',
          width: '100%',
          left: 0,
          bottom: 0.
        }} xs={12} md={5} item>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
