const axios = require('axios');

const HttpError = require('../models/http-error');
const API_KEY = 'pk.eyJ1IjoiZGhydXZzb25hbmkiLCJhIjoiY2xrcXdqdjVvMTNjODNjb2N4aGoweDkxbSJ9.5GA52CTFJVpGWzmaWfHD5Q';

async function getCoordsForAddress(address) {

const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${API_KEY}&limit=1`)

const data = response.data;

if(!data || !data.features){
  const error = new HttpError('Could not find location for the specified address',422);
  throw error;
}
const coordinates = {
  lat : data.features[0].center[1],
  lng : data.features[0].center[0]
}
return coordinates;
}

module.exports = getCoordsForAddress;