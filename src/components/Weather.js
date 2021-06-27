import React, { useEffect, useState } from "react";
import axios from "axios";

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import WelcomeHeader from './WelcomeHeader';

const Weather = (props) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric');

  const units = ['standard', 'metric', 'imperial'];

  const fetchData = (name) => {
    const key = "0ab91e9196d91e6a41cca4ce35e397f5";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=${unit}`;
    axios.get(url).then((response) => {
      if (response && response.data && response.status === 200) {
        setWeather(response.data);
      }
    });
  };

  useEffect(() => {
    fetchData(city);
    console.log(weather.main);
  }, [city, unit]);

  return (
    <div>
      <WelcomeHeader />
      <TextField onChange={(event) => setCity(event.target.value)} label="City name" />
      <Box>
        <InputLabel id="select-unit">Unit</InputLabel>
        <Select
          labelId="select-unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
        >
          {
            units.map(u => <MenuItem value={u}>{u}</MenuItem>)
          }
        </Select>
      </Box>
      {
        weather.main && <Typography>{weather.main.temp}</Typography>
      }
    </div>
  );
};

export default Weather;
