import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
} from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';

function App() {
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [text, setText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fringilla hendrerit elementum.');
  const [voice, setVoice] = useState(null);
  const [volume, setVolume] = useState(0.5);
  
  const {
    pause,
    paused,
    play,
    resume,
    speaking,
    stop,
    voices,
  } = useSpeechSynthesis({
    pitch,
    rate,
    text,
    voice,
    volume,
  });
  
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      gap={2}
      p={4}
    >
      <Grid item>
        <Typography variant="h2">
          Text to speech
        </Typography>
      </Grid>
      <Paper>
        <Grid
          container
          direction="column"
          item
          gap={2}
          p={2}
          sx={{ width: 500, height: 500 }}
        >
          <Grid item>
            <FormControl fullWidth>
              <InputLabel>Select voice</InputLabel>
              <Select
                disabled={speaking}
                label="Select voice"
                onChange={(e) => {
                  setVoice(e.target.value);
                }}
                value={voice ?? voices[0] ?? ''}
              >
                {voices?.map((curr) => (
                  <MenuItem
                    key={`${curr?.name} - ${curr?.lang}`}
                    value={curr}
                  >
                    {`${curr?.name} - ${curr?.lang}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                disabled={speaking}
                label="Set text"
                multiline
                onChange={(e) => {
                  setText(e.target.value);
                }}
                rows={5}
                value={text}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <InputLabel>Set pitch</InputLabel>
            <Slider
              disabled={speaking}
              max={2}
              min={0}
              onChange={(e, newValue) => {
                setPitch(newValue);
              }}
              value={pitch}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <InputLabel>Set rate</InputLabel>
            <Slider
              disabled={speaking}
              max={10}
              min={0.1}
              onChange={(e, newValue) => {
                setRate(newValue);
              }}
              step={0.1}
              value={rate}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <InputLabel>Set volume</InputLabel>
            <Slider
              disabled={speaking}
              max={1}
              min={0}
              onChange={(e, newValue) => {
                setVolume(newValue);
              }}
              step={0.01}
              value={volume}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        item
        gap={2}
        justifyContent="center"
      >
        {!speaking && (
          <Button
            onClick={play}
            startIcon={<PlayArrowIcon />}
            variant="contained"
          >
            Play
          </Button>
        )}
        {speaking && paused && (
          <Button
            onClick={resume}
            startIcon={<PlayArrowIcon />}
            variant="contained"
          >
            Resume
          </Button>
        )}
        {speaking && !paused && (
          <Button
            onClick={pause}
            startIcon={<PauseIcon />}
            variant="contained"
          >
            Pause
          </Button>
        )}
        {speaking && (
          <Button
            onClick={stop}
            startIcon={<StopIcon />}
            variant="contained"
          >
            Cancel
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default App;
