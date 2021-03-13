import React from 'react';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import songReducer from './reducer';

export const SongContext = React.createContext({
  song: {
    title: 'Seven Nation Army',
    artist: 'The White Stripes',
    thumbnail: 'http://img.youtube.com/vi/0J2QdDbelmY/0.jpg',
    url: 'https://www.youtube.com/watch?v=0J2QdDbelmY',
    duration: 239,
  }, 
  isPlaying: false,
});

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {/* {greaterThanSm && <Header />} */}
      <Hidden only='xs'>
        <Header />
      </Hidden>
      <Grid spacing={3} container>
        <Grid xs={12} md={7} style={{
          paddingTop: greaterThanSm ? 80 : 10
        }} item>
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
    </SongContext.Provider>
  );
}

export default App;
