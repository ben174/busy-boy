import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import BlurCircularTwoToneIcon from '@material-ui/icons/BlurCircularTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import ReorderTwoTone from '@material-ui/icons/ReorderTwoTone';

import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import './App.css';
import CalendarGraph from './CalendarGraph';


export function RandomControls(props) {
    return (
      <div>
        <Typography id="discrete-slider" variant="h6" component="h6" gutterBottom>
          Daily Contribution Frequency
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            Lower
        </Grid>
          <Grid item xs>
            <Slider value={props.dailyContribPercent} onChange={props.onDailySliderChange} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            Higher
          </Grid>
        </Grid>
        <Typography id="discrete-slider" variant="h6" component="h6" gutterBottom>
          Weekend Contribution Frequency
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            Lower
        </Grid>
          <Grid item xs>
            <Slider value={props.weekendContribPercent} onChange={props.onWeekendSliderChange} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            Higher
        </Grid>
        </Grid>
      </div>
    )
  }
  
  export function DrawControls(props) {
    const levelColors = [
      '#ebedf0',
      '#c6e48b',
      '#7bc96f',
      '#239a3b',
      '#196127',
    ]
  
    const levelButtonStyle = {
      height: '60px',
    }
  
    const levelButtons = levelColors.map((e, i) => (
      <Button key={`drawColor-${i}`} data-level={i} onClick={props.onLevelChange} variant="contained" style={{ backgroundColor: e, ...levelButtonStyle }} />
    ))
  
    return (
      <Container>
        <Typography variant="h6" component="h6" gutterBottom>
          Color Palette
        </Typography>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {levelButtons}
        </ButtonGroup>
        <Typography variant="h6" component="h6" gutterBottom>
          Selected Color
        </Typography>
        <Button disabled variant="contained" style={{ backgroundColor: levelColors[props.drawLevel], ...levelButtonStyle }} />
      </Container>
    )
  }