import axios from 'axios';
import { stringMap } from './stingMap';

// get numTombs from MongoDB set by props
// returns res.data
export const getNumTombsByValue = async (year, value) => {

  console.log(year, 'year')
  const yearValue = stringMap[year]
  console.log('yearvalue', yearValue)

  const headers = {
    year: yearValue,
    value: value,
  };
  const response = await axios.get('/searchmorgan/numtombs', { headers });
  return response.data;
};


// UNAVAILABLE REQ RN
export const updateData = async (year, value) => {
  const headers = {
    year: year,
    value: value
  }
  const response = await axios.get('http://localhost:4000/updatesearch/year', { headers });
  return response.data;
};