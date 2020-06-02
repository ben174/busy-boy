import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { Tab, Tabs } from '@material-ui/core';
import TabPanel from '@material-ui/lab/TabPanel';


import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import './App.css';
import CalendarGraph from './CalendarGraph';


class App extends React.Component {
  constructor(props) {
    super(props);

    var dates = Array();
    var downDays = Array();
    var downWeekends = Array();
    for (var d = 0; d < 365; d++) {
      const currDate = moment().startOf('isoWeek').subtract(3, 'days').subtract(d, 'days');
      var level = Math.floor((Math.random() * 4) + 1);

      const dateObject = {
        date: currDate,
        level: level,
        off: true,
      }
      console.log('day');
      console.log(dateObject.date.day);
      if (currDate.day() >= 5) {
        downWeekends.push(d);
      } else {
        downDays.push(d);
      }
      console.log('pushing date', d, dateObject)
      dates.push(dateObject);
    }
    this.state = {
      dates: dates,
      dailyContribPercent: 75,
      weekendContribPercent: 10,
      downDays: downDays.sort(() => Math.random() - 0.5),
      downWeekends: downWeekends.sort(() => Math.random() - 0.5),
      oldArray: [...Array(365).keys()].sort(() => Math.random() - 0.5),
    };
    this.setOffDays();
  }

  setOffDays = () => {
    const dates = [...this.state.dates];
    for (var i = 0; i < this.state.downDays.length; i++) {
      dates[this.state.downDays[i]].off = !(i < this.state.dailyContribPercent * this.state.downDays.length / 100)
    }
    for (var i = 0; i < this.state.downWeekends.length; i++) {
      dates[this.state.downWeekends[i]].off = !(i < this.state.weekendContribPercent * this.state.downWeekends.length / 100)
    }
    this.setState({ dates });
  }

  handleDailySliderChange = (e, val) => {
    const drawDebouncedEvent = _.debounce(this.setOffDays, 100, { leading: true, trailing: false });
    drawDebouncedEvent();
    this.setState({ dailyContribPercent: val })
  }

  handleWeekendSliderChange = (e, val) => {
    const drawDebouncedEvent = _.debounce(this.setOffDays, 100, { leading: true, trailing: false });
    drawDebouncedEvent();
    this.setState({ weekendContribPercent: val })
  }

  render() {
    return <AppContainer
      weekendContribPercent={this.state.weekendContribPercent}
      dailyContribPercent={this.state.dailyContribPercent}
      dates={this.state.dates}
      onWeekendSliderChange={this.handleWeekendSliderChange}
      onDailySliderChange={this.handleDailySliderChange} />
  }
}

function AppContainer(props) {
  const marks = [
    {
      value: 0,
      label: 'No Contributions',
    },
    {
      value: 5,
      label: 'Weight',
    },
    {
      value: 10,
      label: 'Max Contributions',
    },
  ];

  const wrapperStyle = {
    margin: "0% 10%",
    padding: "0% 10%",
  }

  const paperStyle = {
    margin: "1% 10%",
    padding: "0% 10%",

  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: '#f5f5f5',
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div align="center">
        <Typography variant="h3" component="h3">
          Busy Boy
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          GitHub Contribution Graph Modifier
        </Typography>
      </div>
      <Paper elevation={3} style={paperStyle}>
        <div style={{ padding: '10px' }}>
          <p>
            The GitHub contribution graph is a handy quick glance at the activity of a user on GitHub. But you can easily game it by altering your
            commit dates. When I learned about this, I created GitDraw to have some fun and allow people to draw pictures in their contribution
            graph.
          </p>
          <p>
            But as someone who has been a decision maker in the hiring process for quite some time now, I still sometimes find myself biasing at
            least part of my decision on my first glance at their GitHub contribution graph. If *I* am doing that, I'm quite sure others are too.
            I consider this a vulnerability in the hiring process. And with vulnerabilities, often times bringing attention to them is what it takes
            to teach people to not rely on them.
          </p>
          <p>
            So here is a tool which will allow anyone to fudge contribution activity.
          </p>
        </div>
      </Paper>
      <Paper elevation={3} style={paperStyle}>
        <CalendarGraph dates={props.dates} />
        <Divider style={{ margin: '20px 0' }} />




        <AppBar position="static">
          <Tabs aria-label="simple tabs example">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <TabPanel index={0}>
          Item One
        </TabPanel>
        <TabPanel index={1}>
          Item Two
        </TabPanel>
        <TabPanel index={2}>
          Item Three
        </TabPanel>












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
        <div align="right">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<Icon>get_app</Icon>}
            style={{ margin: '20px 0' }}
          >
            Download Script
        </Button>
        </div>
      </Paper>
    </Container>
  )
}

export default App;