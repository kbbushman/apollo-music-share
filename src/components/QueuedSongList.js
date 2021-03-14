import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

function QueuedSongList({ queue }) {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return greaterThanMd && (
    <div style={{ margin: '10px 0' }}>
      <Typography color='textSecondary' variant='button'>
        QUEUE ({queue.length})
      </Typography>
      {queue.map((song, i) => (
        <QueuedSong key={i} song={song} />
      ))}
    </div>
  );
}

function QueuedSong({ song }) {
  const classes = useStyles();
  const { title, artist, thumbnail } = song;

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} alt='Song Thumbnail' />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant='subtitle2'>
          {title}
        </Typography>
        <Typography className={classes.text} variant='body2' color='textSecondary' >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color='error' />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;
