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

function AddSong() {
  const classes = useStyles();
  const [dialog, setDialog] = React.useState(false);

  function handleCloseDialog() {
    setDialog(false);
  }

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
            src='https://robohash.org/somepic.png'
            alt='Song Thumbnail'
            className={classes.thumbnail}
          />
          <TextField
            margin='dense'
            name='title'
            label='Title'
            fullWidth
          />
          <TextField
            margin='dense'
            name='artist'
            label='Artist'
            fullWidth
          />
          <TextField
            margin='dense'
            name='thumbnail'
            label='Thumbnail'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>Cancel</Button>
          <Button variant='outline' color='primary'>Add Song</Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
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
        className={classes.addSongButton}
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
    </div>
  );
}

export default AddSong;
