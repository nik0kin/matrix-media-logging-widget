// import { WidgetApi } from 'matrix-widget-api';

export function startClient(mxwidgets, widgetId): Promise<[string, string]> {
  const api = new mxwidgets.WidgetApi(widgetId);
  api.requestCapability(mxwidgets.MatrixCapabilities.AlwaysOnScreen);

  // Start the messaging
  // api.start();
  // console.log('widgetApi client api started');

  return new Promise((resolve, reject) => {
    api.on('ready', () => {
      console.log('widget api ready');

      api
        .requestOpenIDConnectToken()
        .then((response) => {
          console.log('Matrix OpenId request success: ', response);
          resolve([response.access_token, response.matrix_server_name]);
        })
        .catch((error) => {
          console.error('Matrix OpenId request failed', error);
          reject(error);
        });
    });

    api.start();
  });
  // return () => api.stop();
}

export function getOpenIDConnectToken(widgetApi) {
  return widgetApi
    .requestOpenIDConnectToken()
    .then((response) => {
      console.log('Matrix OpenId request success: ', response);
      return [response.access_token, response.matrix_server_name];
    })
    .catch((error) => {
      console.error('Matrix OpenId request failed', error);
      throw error;
    });
}
