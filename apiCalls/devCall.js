import axios from 'axios'
const backendConnection = require('../config');

async function devCall() {
  try {
    const params = {
      userId: "1",
      seedSongId: '11111',
    };
    const response = await axios.post(`${backendConnection}/devRoute`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = response.data;
    return responseData
  }
  catch (error) {
    console.log("Error on DevCall")
  }
}

export { devCall };
