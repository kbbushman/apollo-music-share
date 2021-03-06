import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { PlayArrow, Save } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  }
}));

function SongList() {
  let loading = false;

  const song = {
    title: 'Santaria',
    artist: 'Submlime',
    thumbnail: 'https://www.udiscovermusic.com/wp-content/uploads/2019/07/Sublime-self-titled-third-album-cover-820.jpg'
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
      }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {Array.from({length: 10}, () => song).map((song, i) => (
        <Song key={i} song={song} />
      ))}
    </div>
  );
}

function Song({ song }) {
  const { title, artist, thumbnail } = song;
  return (
    <Card>
      <div>
        <CardMedia image={thumbnail} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body1' component='p' color='textSecondary'>
            {artist}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size='small' color='primary'>
            <PlayArrow />
          </IconButton>
          <IconButton size='small' color='secondary'>
            <Save />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
}

export default SongList;
