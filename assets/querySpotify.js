import axios from 'axios';

const querySpotify = async function(query, token) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: "track",
        //limit: 10,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    // Handle the response data here
    return response.data.tracks.items
  } catch (error) {
    // Handle any errors here
    console.error(error);
  }
}

export default querySpotify;
