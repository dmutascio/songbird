import axios from 'axios'
const backendConnection = require('../config');

async function trainModel(spotifyToken, song, decision, modelId) {
  //console.log("training model " + modelId + " with song " + song.id)
  try {
    const params = {
      userId: "1",
      song: song,
      token: spotifyToken,
      decision: decision,
      modelId: modelId
    };
    console.log(params)
    const response = await axios.post(`${backendConnection}/trainModel`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = response.data;
    return responseData
  }
  catch (error) {
    console.log("Error on TrainModel: ", error)
  }
}

export { trainModel };
