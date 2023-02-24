// ** takes findTombsByDate_obj

// get num of tombs per year
// // returns: {year: "num_tombs"}

// get num of tombs per location
// // returns: {location: "num_tombs"}

// get num of tombs per type
// // returns: {type: "num_tombs"}

/*
const prac = {
    'MS M.225': { type: 'Book of common prayer', location: 'England', date: '1902' },
    'MS M.260e': {
      type: 'Single leaf, Annunciation',
      location: 'Italy',
      date: '19th or 20th century'
    },
    'MS M.658': { type: 'Messe pour les Époux', location: 'Belgium', date: '1915' },
    'MS M.688a.1': {
      type: '[Gospel Book leaf].',
      location: 'United States',
      date: '1924'
    },
    'MS M.688b': {
      type: '[Gospel of St. John].',
      location: 'United States',
      date: '1930'
    },
    'MS M.688c': { type: '[Psalm 119].', location: 'United States', date: '1934' },
    'MS M.811': { type: 'Bible leaves', location: 'England', date: '1940' },
    'MS M.904': {
      type: 'Able of Christian calendars',
      location: 'Turkey',
      date: '1780'
    },
    'MS M.1085': { type: 'Gradual leaf', location: 'France', date: '15th century' },
    'MS M.1088': {
      type: 'Ethiopian synaxarium',
      location: 'Ethiopia',
      date: '18th century'
    },
    'MS M.1096.1-3': {
      type: 'Three lacquer-painted traveling mirror cases',
      location: '',
      date: '1901'
    },
    'MS M.1138': {
      type: 'Ethiopian prayer scroll',
      location: 'Ethiopia',
      date: '20th century'
    },
    'MS M.1139': {
      type: 'Ethiopian prayer scroll',
      location: 'Ethiopia',
      date: '19th century'
    },
    'MS M.1165.1-2': { type: 'Manuscript leaves', location: 'France', date: '189u' },
    'MS S.17': { type: 'Glory of Kings.', location: 'Ethiopia', date: '1952' },
    'MS S.18': { type: 'Apocalypse.', location: 'Russia', date: '1901' },
    'MS W.11': { type: '[Hand and soul].', location: 'England', date: '1904' },
    'MS W.12': {
      type: 'Psalter and other texts.',
      location: 'Ethiopia',
      date: '20th century'
    },
    'MS W.16': { type: 'Dīvān of Ḥāfiẓ', location: 'Iran', date: '1895' },
    'MS W.44': { type: '[Canticle of the Sun].', location: 'England', date: '1949' },
    'MS W.45': { type: 'Camel Rider].', location: 'England', date: '1905' },
    'MS W.46': {
      type: 'Ethiopian prayer scroll',
      location: 'Ethiopia',
      date: '1955'
    } 
}
*/
function getUniqueValues(data, prop) {

    let uniqueValues = [];
  
    for (let key in data) {
      const value = data[key][prop];
      if (value && !uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    }
  
    return uniqueValues;
  }

function strToNums (str) {

    const match = str.match(/\d+/);
    const fullnum = match ? parseInt(match[0]) : null;
    const num = Math.round(fullnum / 100) * 100;
    return num

};

function countEachValue (data, prop, arrayEl) {

        let count = 0;

        for (let key in data) {

          if (prop === 'location'){
            if (data[key].location === arrayEl) {
              count++;
            };
          };
          if (prop === 'type') {
            if (data[key].type === arrayEl) {
              count++;
            };
          };

        }

        return count;

};


module.exports = { strToNums, getUniqueValues, countEachValue };