require('isomorphic-fetch');

const _BaseURL = 'http://localhost:4321/';

const Request = async (method, endpoint, data, BaseURL) => {
  // if (AuthService.auth == null) AuthService.fillAuthData();
  // if (!AuthService.auth || !AuthService.auth.user) throw 'User not signed in.';

  const config = {
    method: method,
    mode: 'cors',
    // cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${AuthService.auth.user.BearerToken}`
    },
    body: null
  };
  if (['POST', 'PUT', 'DELETE'].includes(method)) config.body = JSON.stringify(data);
  let response = await fetch((BaseURL || _BaseURL) + endpoint, config);
  if (response) {
    if (!response.ok) throw await response.json();
    if (response.status == 403) console.log('Invalid Role.');
    if (response.status == 401) throw response;
  } else {
    console.log('Failed to fetch. Probably server is down.');
  }
  try {
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
};

module.exports.get = async (endpoint, baseURL) => {
  await Request('GET', '/Generator/ClearCache', null, baseURL);
  return await Request('GET', endpoint, null, baseURL);
};
module.exports.post = async (endpoint, data, baseURL) => {
  await Request('GET', '/Generator/ClearCache', null, baseURL);
  return await Request('POST', endpoint, data, baseURL);
};
