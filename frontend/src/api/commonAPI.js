import axios from 'axios';

// get numTombs from MongoDB set by props
// returns res.data
export const getNumTombsByValue = async (year, value) => {
  const headers = {
    year: year,
    value: value,
  };
  const response = await axios.get('http://localhost:4000/searchmorgan/numtombs', { headers });
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