/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config } from '../../models/Config';

// Import Violentmonkey types
declare const GM: {
  xmlHttpRequest: (options: {
    url: string;
    method: 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE';
    responseType: 'json';
    headers: { [key: string]: string };
    data?: string;
  }) => Promise<{
    response: unknown;
    responseHeaders: string;
    status: number;
    statusText: string;
    readyState: number;
    responseText: string | undefined;
    responseXML: Document | null;
    finalUrl: string;
  }>;
};

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
      }).then((res) => (res as VmXHRDetails).response);
    } catch (e) {
      console.error('GM.xmlHttpREquest error', e);
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
      (res) => res?.data?.systemStatus?.status === 'OK',
      () => false,
    );
  }
}
