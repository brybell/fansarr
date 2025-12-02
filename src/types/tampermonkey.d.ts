/// <reference types="tampermonkey" />

/**
 * Tampermonkey-specific types for GM.xmlHttpRequest API
 * These types replace the removed Violentmonkey types
 */

export interface TampermonkeyResponse<T = unknown> {
  response: T;
  responseHeaders: string;
  status: number;
  statusText: string;
  readyState: number;
  responseText: string | undefined;
  responseXML: Document | null;
  finalUrl: string;
  context?: unknown;
  lengthComputable?: boolean;
  loaded?: number;
  total?: number;
}

export interface TampermonkeyRequestDetails<T = unknown> {
  url: string;
  method?: 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  data?: string;
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'stream';
  timeout?: number;
  context?: unknown;
  overrideMimeType?: string;
  anonymous?: boolean;
  fetch?: boolean;
  user?: string;
  password?: string;
  binary?: boolean;
  nocache?: boolean;
  revalidate?: boolean;
  withCredentials?: boolean;

  // Event handlers
  onload?: (response: TampermonkeyResponse<T>) => void;
  onerror?: (response: TampermonkeyResponse<T>) => void;
  onabort?: (response: TampermonkeyResponse<T>) => void;
  ontimeout?: (response: TampermonkeyResponse<T>) => void;
  onprogress?: (response: TampermonkeyResponse<T>) => void;
  onreadystatechange?: (response: TampermonkeyResponse<T>) => void;
}

// Global GM interface for Tampermonkey
declare global {
  interface Window {
    GM: {
      xmlHttpRequest: <T = unknown>(
        details: TampermonkeyRequestDetails<T>,
      ) => Promise<TampermonkeyResponse<T>>;
      setClipboard: (text: string, info?: string) => void;
      getValue: (key: string, defaultValue?: unknown) => Promise<unknown>;
      setValue: (key: string, value: unknown) => Promise<void>;
      registerMenuCommand: (
        name: string,
        callback: () => void,
        accessKey?: string,
      ) => number;
      unregisterMenuCommand: (menuCmdId: number) => void;
      openInTab: (url: string, open_in_background?: boolean) => void;
      notification: (
        text: string,
        title?: string,
        image?: string,
        onclick?: () => void,
      ) => void;
    };

    // Global functions (also available as GM.*)
    GM_setClipboard: (text: string, info?: string) => void;
    GM_getValue: (key: string, defaultValue?: unknown) => Promise<unknown>;
    GM_setValue: (key: string, value: unknown) => Promise<void>;
    GM_registerMenuCommand: (
      name: string,
      callback: () => void,
      accessKey?: string,
    ) => number;
    GM_unregisterMenuCommand: (menuCmdId: number) => void;
    GM_openInTab: (url: string, open_in_background?: boolean) => void;
    GM_notification: (
      text: string,
      title?: string,
      image?: string,
      onclick?: () => void,
    ) => void;
  }
}

export {};
