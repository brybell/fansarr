/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config } from '../../models/Config';

export default class StashServiceBase {
  public static async request<T = unknown>(
    config: Config,
    requestData: unknown,
  ): Promise<T> {
    try {
      return await GM.xmlHttpRequest({
        url: config.stashGqlEndpoint(),
        method: 'POST',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          ApiKey: config.stashApiKey,
        },
        data: JSON.stringify(requestData),
      }).then((res: any) => res.response);
    } catch (e) {
      console.error('GM.xmlHttpRequest error', e);
      throw e;
    }
  }

  public static async systemStatus(config: Config): Promise<boolean> {
    const query = `
      query SystemStatus {
        systemStatus {
            databaseSchema
            databasePath
            configPath
            appSchema
            status
            os
            workingDir
            homeDir
            ffmpegPath
            ffprobePath
        }
      }`;
    const request = StashServiceBase.request(config, { query });
    return request.then(
      (res) => (res as any)?.data?.systemStatus?.status === 'OK',
      () => false,
    );
  }
}
