import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BasicTable from "../LapControl/index";

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
  const [time, setTime] = useState();
  const [totatStartTime, setTotalStartTime] = useState();
  const [durationTime, setDurationTime] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [flag, setFlag] = useState(false);
  const [laps, setLaps] = useState(false);
  const [lapsArr, setLapsArr] = useState([]);
  const [arr, setArr] = useState([]);

  document.body.onkeyup = function (e) {
    if (e.code === "Space") {
      lapsArr.push(hourValue + ":" + minValues + ":" + secValues);
      setLaps(lapsArr);
      e.preventDefault();
    }
  };
  const handleHourChange = (e) => {
    setHourValue(e.target.value);
    setDisabled(false);
  };
  const handleMinChange = (e) => {
    setMinValues(e.target.value);
  };

  const handleSecChange = (e) => {
    setSecValues(e.target.value);
  };

  const handleStart = (e) => {
    formatTime(false);
    var duration =
      parseInt(hourValue) * 60 * 60 +
      parseInt(minValues) * 60 +
      parseInt(secValues);
    setTotalStartTime(duration);
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
        localStorage.setItem("hours", hours);
        localStorage.setItem("minutes", minutes);
        localStorage.setItem("seconds", seconds);
      }
    }, 1000);
  };

  const formatTime = (stopFlag) => {
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
    if (stopFlag) {
      durationTime.push(hours + ":" + minutes + ":" + seconds);
      setDurationTime(durationTime);
    }
    arr.push(hours + ":" + minutes + ":" + seconds);
    setArr(arr);
  };

  const handleStop = () => {
    let time = flag
      ? "-" + hourValue + ":" + minValues + ":" + secValues
      : hourValue + ":" + minValues + ":" + secValues;
    setStartTime(arr);
    setStopTime(time);
    clearInterval(DURATION);
  };
  const handleClear = () => {
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
            >
              Start
            </Button>
            <Button
              variant="contained"
              onClick={handleStop}
              color="secondary"
              className={classes.btn}
            >
              Stop
            </Button>
            <Button
              variant="contained"
              onClick={handleClear}
              className={classes.btn}
            >
              Reset
            </Button>
          </Grid>
          <Grid className={classes.grid}>
            <div className={classes.start}>Start Time: {starttime} </div>
            <div className={classes.start}>Stop Time: {stoptime}</div>
            <div className={classes.start}>Total Duration :{time}</div>
          </Grid>
          <div>{laps.length > 0 && <BasicTable rows={laps} flag={flag} />}</div>
        </div>
      </header>
    </div>
  );
};

export default TimerControl;
