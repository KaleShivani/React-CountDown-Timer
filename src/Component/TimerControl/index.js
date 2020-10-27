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
  grid: {
    float: "left",
  },
});
const TimerControl = () => {
  const classes = useStyles();
  const [hourValue, setHourValue] = useState(["00"]);
  const [minValues, setMinValues] = useState(["00"]);
  const [secValues, setSecValues] = useState(["00"]);
  const [stoptime, setStopTime] = useState(["00:00:00"]);
  const [starttime, setStartTime] = useState(["00:00:00"]);
  const [flag, setFlag] = useState(false);
  const [laps, setLaps] = useState(false);
  const [lapsArr, setLapsArr] = useState([]);
  const [arr, setArr] = useState([]);

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
  const handleStart = (e) => {
    formatTime(false);
    var duration =
      parseInt(hourValue) * 60 * 60 +
      parseInt(minValues) * 60 +
      parseInt(secValues);
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

  const formatTime = (stopFlag, totalCouunterDuration) => {
    var duration =
      parseInt(hourValue) * 60 * 60 +
      parseInt(minValues) * 60 +
      parseInt(secValues);
    let minutes;
    let seconds;
    let hours = Math.floor(duration / 3600);
    minutes = Math.floor((duration / 60) % 60);
    seconds = parseInt(duration % 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    arr.push(hours + ":" + minutes + ":" + seconds);
    setArr(arr);
  };

  //Stops the timer captures the start time, stopped time and duration
  const handleStop = () => {
    let time = flag
      ? "-" + hourValue + ":" + minValues + ":" + secValues
      : hourValue + ":" + minValues + ":" + secValues;
    setStartTime(arr);
    setStopTime(time);
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
    setArr([]);
    setStopTime("00:00:00");
    setStartTime("00:00:00");
    clearInterval(DURATION);
  };
  useState(() => {
    //Captures the value on the which the user has reloaded the browser and starts the countdown from the last checkpoint.
    let hours = localStorage.getItem("hours");
    let minutes = localStorage.getItem("minutes");
    let seconds = localStorage.getItem("seconds");
    setHourValue(hours !== null ? hours : "00");
    setMinValues(minutes !== null ? minutes : "00");
    setSecValues(seconds !== null ? seconds : "00");
    if (hours !== null && minutes !== null && seconds !== null) {
      arr.push(hours + ":" + minutes + ":" + seconds);
      setArr(arr);
      var duration =
        parseInt(localStorage.getItem("hours")) * 60 * 60 +
        parseInt(localStorage.getItem("minutes")) * 60 +
        parseInt(localStorage.getItem("seconds"));
      Clock(duration);
    }
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
              className={classes.btn}
              color="primary"
              id="primary"
            >
              Start
            </Button>
            <Button
              variant="contained"
              onClick={handleStop}
              color="secondary"
              id="secondary"
              className={classes.btn}
            >
              Stop
            </Button>
            <Button
              variant="contained"
              onClick={handleClear}
              id="reset"
              className={classes.btn}
            >
              Reset
            </Button>
          </Grid>
          <Grid className={classes.grid}>
            <div className={classes.start}>Start Time: {starttime} </div>
            <div className={classes.start}>Stop Time: {stoptime}</div>
          </Grid>
          <div>{laps.length > 0 && <LapsTable rows={laps} flag={flag} />}</div>
        </div>
      </header>
    </div>
  );
};

export default TimerControl;
