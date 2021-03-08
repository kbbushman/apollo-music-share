import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import ReactPlayer from 'react-player';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: 'center',
  },
  thumbnail: {
    width: '90%',
  },
}));

const DEFAULT_SONG = {
  duration: 0,
  title: '',
  artist: '',
  thumbnail: '',
};

function AddSong() {
  const classes = useStyles();
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = React.useState('');
  const [playable, setPlayable] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [song, setSong] = React.useState(DEFAULT_SONG);

  React.useEffect(() => {
    const isPlayable = SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  function handleCloseDialog() {
    setDialog(false);
  }

  function handleChangeSong(event) {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  }

  async function handleAddSong() {
    try {
      const { title, artist, thumbnail, url, duration } = song;
      await addSong({
        variables: {
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          url: url.length > 0 ? url : null,
          duration: duration > 0 ? duration : null,
        }
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl('');
    } catch (err) {
      console.error('Error adding song', err);
    }
  }

  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const {title, video_id, author} = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      thumbnail,
      artist: author,
    }
  }

  function getSoundcloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve ({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
          });
        }
      });
    })
  }

  function handleError(field) {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  }

  const { title, artist, thumbnail } = song;

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt='Song Thumbnail'
            className={classes.thumbnail}
          />
          <TextField
            margin='dense'
            name='title'
            label='Title'
            value={title}
            onChange={handleChangeSong}
            error={handleError('title')}
            helperText={handleError('title') && 'Fill out field'}
            fullWidth
          />
          <TextField
            margin='dense'
            name='artist'
            label='Artist'
            value={artist}
            onChange={handleChangeSong}
            error={handleError('artist')}
            helperText={handleError('artist') && 'Fill out field'}
            fullWidth
          />
          <TextField
            margin='dense'
            name='thumbnail'
            label='Thumbnail'
            value={thumbnail}
            onChange={handleChangeSong}
            error={handleError('thumbnail')}
            helperText={handleError('thumbnail') && 'Fill out field'}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>Cancel</Button>
          <Button variant='outlined' color='primary' onClick={handleAddSong}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        placeholder='Add YouTube or SoundCloud URL'
        margin='normal'
        type='url'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Link />
            </InputAdornment>
          )
        }}
        fullWidth
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
      <ReactPlayer url={url} onReady={handleEditSong} hidden />
    </div>
  );
}

export default AddSong;
