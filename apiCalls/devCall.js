import axios from 'axios'
const backendConnection = require('../config');

async function devCall(spotifyToken, songId) {
  try {
    const params = {
      userId: "1",
      song: songId,
      token: spotifyToken
    };
    const response = await axios.post(`${backendConnection}/createModel`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = response.data;
    return responseData
  }
  catch (error) {
    console.log("Error on DevCall: ", error)
  }
}

export { devCall };
