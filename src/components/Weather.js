import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import WelcomeHeader from './WelcomeHeader';

const useStyles = makeStyles({
  root: {
    marginBottom: 60,
  },
  unitSelect: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  unitLabel: {
    marginRight: 10,
  },
  card: {
    marginTop: 20,
  }
});

const Weather = (props) => {
  const classes = useStyles();

  const [city, setCity] = useState("Tel Aviv");
  const [weather, setWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState({});
  const [unit, setUnit] = useState('metric');

  const units = ['metric', 'imperial'];

  const fetchData = async (name) => {
    const key = "0ab91e9196d91e6a41cca4ce35e397f5";
    const getCurrUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=${unit}`;
    const getWeekUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${key}&units=${unit}`;

    const fetchByUrl = async (url, setData) => {
      let response = await axios.get(url);
      if (response && response.data && response.status === 200) {
        setData(response.data);
        console.log(response.data);
      }
    }

    await fetchByUrl(getCurrUrl, setWeather);
    await fetchByUrl(getWeekUrl, setWeekWeather);

  };

  useEffect(() => {
    fetchData(city);
  }, [city, unit]);

  let lastDate = "";
  return (
    <div>
      <WelcomeHeader />
      <TextField value={city} onChange={(event) => setCity(event.target.value)} label="City name" />
      <Box className={classes.unitSelect}>
        <InputLabel id="select-unit" className={classes.unitLabel}>Unit</InputLabel>
        <Select
          labelId="select-unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
        >
          {
            units.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)
          }
        </Select>
      </Box>
      {
        weather.main && <Typography>{`Current weather in ${city}: ${weather.main.temp} ${unit === 'metric' ? '°C' : '°F'}`}</Typography>
      }

      <Typography>Expected tempretures this week: </Typography>
      {
        (weekWeather && weekWeather.list) &&
        weekWeather.list.map(row => {
          const date = (new Date(row.dt_txt)).toLocaleDateString();
          lastDate = date.split(" ")[0];
          return (
            date !== lastDate ? null :
            <Card className={classes.card}>
              <CardContent>
                <Typography>{row.main.temp + (unit === 'metric' ? '°C' : '°F')}</Typography>
                {
                  date
                }
              </CardContent>
            </Card>
          );
        })
      }
    </div>
  );
};

export default Weather;
