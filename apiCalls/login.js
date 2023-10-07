import axios from 'axios'
const backendConnection = require('../config');

async function login() {
  try {
    // const params = {
    // };
    const response = await axios.get(`${backendConnection}/login`, {
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

export { login };
