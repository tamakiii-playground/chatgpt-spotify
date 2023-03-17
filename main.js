const axios = require('axios');
const qs = require('querystring');

async function getAccessToken(clientId, clientSecret) {
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const requestBody = {
    grant_type: 'client_credentials',
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
  };

  try {
    const response = await axios.post(tokenEndpoint, qs.stringify(requestBody), config);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token', error);
    return null;
  }
}

async function searchTrack(accessToken, query) {
  const searchEndpoint = 'https://api.spotify.com/v1/search';
  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    params: {
      q: query,
      type: 'track',
      limit: 1,
    },
  };

  try {
    const response = await axios.get(searchEndpoint, config);
    const tracks = response.data.tracks.items;
    return tracks.length > 0 ? tracks[0].id : null;
  } catch (error) {
    console.error('Error searching track', error);
    return null;
  }
}

(async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const accessToken = await getAccessToken(clientId, clientSecret);

  if (accessToken) {
    console.log('Access token:', accessToken);
  } else {
    console.error('Failed to get access token');
  }

	const query = 'The Beatles - Come Together';
	const trackId = await searchTrack(accessToken, query);

  if (trackId) {
    console.log('Track ID:', trackId);
  } else {
    console.error('Track not found');
  }
})();
