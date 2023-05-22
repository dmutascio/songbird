import axios from 'axios';
import { encode as base64Encode } from 'base-64';

const getSpotifyToken = async function() {
  try {
    const clientID = '510a97d13f23491c88383f2a39c3954c';
    const clientSecret = 'df14b856698a4385a2d97199e15565c4';
    const credentials = `${clientID}:${clientSecret}`;
    const encodedCredentials = base64Encode(credentials);
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${encodedCredentials}`,
        },
      }
    );
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export default getSpotifyToken;
