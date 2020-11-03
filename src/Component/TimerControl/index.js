import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LapsTable from "../LapControl/index";

var DURATION;
const useStyles = makeStyles({
  error: {
    border: "1px solid red",
    borderRadius: "2px",
  },
  btn: {
    height: "34px",
    width: "77px",
    marginTop: "16px",
    marginRight: "18px",
    boxShadow: "none",
  },
  start: {
    fontSize: "22px",
  },
  stop:{
    fontSize: "22px",
    paddingLeft: "15px",
  },
  duration:{
    fontSize: "22px",
    paddingLeft: "15px",
  },
  grid: {
    float: "left",
    display: "flex",
    paddingTop: '2%',
  },
});
const TimerControl = () => {
  const classes = useStyles();
  const [hourValue, setHourValue] = useState(["00"]);
  const [minValues, setMinValues] = useState(["00"]);
  const [secValues, setSecValues] = useState(["00"]);
  const [stoptime, setStopTime] = useState(["00:00:00"]);
  const [starttime, setStartTime] = useState(["00:00:00"]);
  const [totalStartTime, setTotalStartTime] = useState();
  const [totalDuration, setTotalDuration] = useState(["00:00:00"]);
  const [flag, setFlag] = useState(false);
  const [disableStart, setDisabledStart] = useState(false);
  const [disableStop, setDisabledStop] = useState(false);
  const [disableReset, setDisabledReset] = useState(false);
  const [laps, setLaps] = useState(false);
  const [lapsArr, setLapsArr] = useState([]);
  const [arr, setArr] = useState([]);

  const duration =
    parseInt(hourValue) * 60 * 60 +
    parseInt(minValues) * 60 +
    parseInt(secValues);
 
 
 //Look for the keypress functionality for user to capture laps.
 //set laps on the basis of keypress and set it in an array, the array will further be set in laps component.
  document.body.onkeyup = function (e) {
    if (e.code === "Space") {
      lapsArr.push(hourValue + ":" + minValues + ":" + secValues);
      setLaps(lapsArr);
      //empty the event once done.
      e.preventDefault();
    }
  };

  document.body.onclick = function (e) {
    setTotalStartTime(duration);
    if (e.target.innerText === "START") {
      formatTime();
    }
    e.preventDefault();
  };

  const handleDisabled = () => {
    let hours = localStorage.getItem("hours");
    let minutes = localStorage.getItem("minutes");
    let seconds = localStorage.getItem("seconds");
    if (hours !== null || minutes !== null || seconds !== null) {
      setDisabledStart(true);
    } else {
      setDisabledStart(false);
      setDisabledStop(true);
      setDisabledReset(true);
    }
  };
  //Set the hour typed by the user
  const handleHourChange = (e) => {
    setHourValue(e.target.value);
  };

  //Set the minutes typed by the user
  const handleMinChange = (e) => {
    setMinValues(e.target.value);
  };

  //Set the seconds typed by the user
  const handleSecChange = (e) => {
    setSecValues(e.target.value);
  };

  //Handles start time of the countdown timer.
  //Converts the total time added by the user in seconds and converts it into hours, minutes and seconds
  const handleStart = () => {
    setDisabledStart(true);
    setDisabledStop(false);
    setDisabledReset(false);
    Clock(duration);
  };
  const Clock = (duration) => {
    var timer = duration;
    DURATION = setInterval(function () {
      let minutes;
      let seconds;
      let hours = Math.floor(timer / 3600);
      minutes = Math.floor((timer / 60) % 60);
      seconds = timer % 60;
      minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
      seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
      if (--timer < 0 && seconds < 0) {
        setFlag(true);
        seconds = seconds * -1;
        setSecValues(seconds);
      } else if (minutes < 0) {
        minutes = minutes * -1;
        setMinValues(minutes);
      } else {
        setFlag(false);
        setSecValues(seconds);
        setMinValues(minutes);
        setHourValue(hours);
        //Stores every changed value in local storage so that the user can reload and the counter and start from last checkpoint.
        localStorage.setItem("hours", hours);
        localStorage.setItem("minutes", minutes);
        localStorage.setItem("seconds", seconds);
      }
    }, 1000);
  };

  const formatTime = (totalD) => {
    let time = totalD !== undefined ? totalD : duration;
    let minutes;
    let seconds;
    let hours = Math.floor(time / 3600);
    minutes = Math.floor((time / 60) % 60);
    seconds = parseInt(time % 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    if (totalD !== undefined) {
      setTotalDuration(hours + ":" + minutes + ":" + seconds);
    } else {
      arr.push(hours + ":" + minutes + ":" + seconds);
      setArr(arr);
    }
  };

  //Stops the timer captures the start time, stopped time and duration
  const handleStop = () => {
    let time = flag
      ? "-" + hourValue + ":" + minValues + ":" + secValues
      : hourValue + ":" + minValues + ":" + secValues;
    let totalDuration = totalStartTime <= 0 ? (totalStartTime - duration) * -1 :totalStartTime - duration;
    formatTime(totalDuration);
    setStartTime(arr);
    setStopTime(time);
    setDisabledStart(false);
    clearInterval(DURATION);
  };

  //Resets the entire timer to 00,
  const handleClear = () => {
    setLaps([]);
    setLapsArr([]);
    setHourValue("00");
    setMinValues("00");
    setSecValues("00");
    setFlag(false);
    setDisabledStart(false);
    setDisabledStop(false);
    setArr([]);
    setStopTime("00:00:00");
    setStartTime("00:00:00");
    setTotalDuration("00:00:00");
    clearInterval(DURATION);
  };

  const LastCheckpoint = ()=>{
    let hours = localStorage.getItem("hours");
    let minutes = localStorage.getItem("minutes");
    let seconds = localStorage.getItem("seconds");
    setHourValue(hours !== null ? hours : "00");
    setMinValues(minutes !== null ? minutes : "00");
    setSecValues(seconds !== null ? seconds : "00");
    if (hours !== null && minutes !== null && seconds !== null) {
      arr.push(hours + ":" + minutes + ":" + seconds);
      setArr(arr);
      let durationLastCheckPnt =
        parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds);
        setTotalStartTime(durationLastCheckPnt);
      Clock(durationLastCheckPnt);
    }
  };
  useState(() => {
    //Captures the value on the which the user has reloaded the browser and starts the countdown from the last checkpoint.
    LastCheckpoint();
    handleDisabled();
  });
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {flag ? "-" : ""}
          <TextField
            type="number"
            size="small"
            value={hourValue}
            className={flag ? classes.error : ""}
            onChange={handleHourChange}
            variant="outlined"
          />{" "}
          :
          <TextField
            type="number"
            size="small"
            value={minValues}
            className={flag ? classes.error : ""}
            onChange={handleMinChange}
            variant="outlined"
          />
          :
          <TextField
            type="number"
            size="small"
            value={secValues}
            className={flag ? classes.error : ""}
            onChange={handleSecChange}
            variant="outlined"
          />
          <Grid>
            <Button
              variant="contained"
              onClick={(e) => handleStart(e)}
              disabled = {disableStart}
              className={classes.btn}
              color="primary"
              id="primary"
            >
              Start
            </Button>
            <Button
              variant="contained"
              onClick={handleStop}
              disabled = {disableStop}
              color="secondary"
              id="secondary"
              className={classes.btn}
            >
              Stop
            </Button>
            <Button
              variant="contained"
              onClick={handleClear}
              disabled = {disableReset}
              id="reset"
              className={classes.btn}
            >
              Reset
            </Button>
          </Grid>
          <Grid className={classes.grid}>
            <div className={classes.start}>Start Time: {starttime}</div>
            <div className={classes.stop}>Stop Time: {stoptime}</div>
            <div className={classes.duration}>Duration: {totalDuration} </div>
          </Grid>
          <div>{laps.length > 0 && <LapsTable rows={laps} flag={flag} />}</div>
        </div>
      </header>
    </div>
  );
};

export default TimerControl;
