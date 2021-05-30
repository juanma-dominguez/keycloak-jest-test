import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const getToken = (username: string, password: string): Promise<AxiosResponse> =>
  axios.post(
    `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
    qs.stringify({
      grant_type: 'password',
      username,
      password,
      client_secret: process.env.KEYCLOAK_SECRET,
      scope: 'profile',
      client_id: process.env.KEYCLOAK_RESOURCE,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );

export const getAccessToken = async (username: string, password: string): Promise<string | void> => {
  try {
    const grant = await getToken(username, password);
    return 'bearer ' + grant.data.access_token;
  } catch (error) {
    console.log(error);
  }
};
