export interface WidgetMatrixAuth {
  matrixOpenIdAccessToken: string;
  matrixServerName: string;
}

const cache: Record<string, string> = {};

export async function authWithMatrix(
  isDebug: boolean,
  matrixOpenIdAccessToken: string,
  matrixServerName: string
) {
  if (isDebug) return 'DEV_USER' + Date.now();

  if (!matrixOpenIdAccessToken) {
    console.error('onAuth attempt without matrixOpenIdAccessToken');
    return false;
  }

  if (cache[matrixOpenIdAccessToken]) {
    // Already been authed
    console.log('onAuth already authed: ', cache[matrixOpenIdAccessToken]);
    return cache[matrixOpenIdAccessToken];
  }

  try {
    const homeserver = await lookupHomeserver(matrixServerName);
    const resp = await fetch(
      homeserver +
        '/_matrix/federation/v1/openid/userinfo' +
        '?access_token=' +
        matrixOpenIdAccessToken
    );
    const data = await resp.json();

    if (data.error || data.errcode) {
      throw data;
    }

    console.log('matrix lookup success', data);

    cache[matrixOpenIdAccessToken] = data.sub;

    console.log('onAuth authed: ', data.sub);
    return data.sub;
  } catch (e) {
    console.error('matrix lookup failed', e);
    return false;
  }
}

// includes protocol
async function lookupHomeserver(serverName: string) {
  if (serverName === 'matrix.test') return 'http://localhost:8008';

  const resp = await fetch('https://' + serverName + '/.well-known/matrix/server');
  const data: { 'm.server': string } = await resp.json();
  return 'https://' + data['m.server'];
}
