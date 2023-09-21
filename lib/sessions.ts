import { library } from './cffi.ts';
import {
  RequestError,
} from './errors.ts';
import type {
  CustomTlsClient,
  TransportOptions,
  SessionOptions,
} from './types.ts';
import {
  Response,
} from './models.ts';
import type {
  HttpMethod,
  InformationalStatus,
  SuccessfulStatus,
  RedirectStatus,
  ClientErrorStatus,
  ServerErrorStatus,
} from "https://deno.land/std@0.197.0/http/mod.ts";

export class Session {
  private sessionId = crypto.randomUUID();
  public catchPanics?: boolean;
  public certificatePinningHosts?: { [key: string]: string[] };
  public customTlsClient?: CustomTlsClient;
  public transportOptions?: TransportOptions;
  public followRedirects = true;
  public forceHttp1 = false;
  public headerOrder: string[] = [];
  public headers: { [key: string]: string } = {
    'user-agent': `tls-client/0.0.4 (https://github.com/kohnoselami/deno-tls-client)`,
  };
  public insecureSkipVerify?: boolean;
  public isByteRequest?: boolean;
  public isByteResponse?: boolean;
  public isRotatingProxy?: boolean;
  public disableIPV6?: boolean;
  public localAddress?: string;
  public proxyUrl?: string;
  public streamOutputBlockSize?: number;
  public streamOutputEOFSymbol?: string;
  public streamOutputPath?: string;
  public timeoutMilliseconds?: number;
  public timeoutSeconds?: number;
  public tlsClientIdentifier?: string;
  public withDebug?: boolean;
  public withDefaultCookieJar?: boolean;
  public withoutCookieJar?: boolean;
  public withRandomTLSExtensionOrder?: boolean;
  constructor(options: SessionOptions = {}) {
    this.catchPanics = options.catchPanics;
    this.certificatePinningHosts = options.certificatePinningHosts;
    this.customTlsClient = options.customTlsClient;
    this.transportOptions = options.transportOptions;
    if (options.followRedirects) this.followRedirects = options.followRedirects;
    if (options.forceHttp1) this.forceHttp1 = options.forceHttp1;
    if (options.headerOrder) this.headerOrder = options.headerOrder;
    if (options.headers) this.headers = options.headers;
    this.insecureSkipVerify = options.insecureSkipVerify;
    this.isByteRequest = options.isByteRequest;
    this.isByteResponse = options.isByteResponse;
    this.isRotatingProxy = options.isRotatingProxy;
    this.disableIPV6 = options.disableIPV6;
    this.localAddress = options.localAddress;
    this.proxyUrl = options.proxyUrl;
    this.streamOutputBlockSize = options.streamOutputBlockSize;
    this.streamOutputEOFSymbol = options.streamOutputEOFSymbol;
    this.streamOutputPath = options.streamOutputPath;
    this.timeoutMilliseconds = options.timeoutMilliseconds;
    this.timeoutSeconds = options.timeoutSeconds;
    this.tlsClientIdentifier = options.tlsClientIdentifier;
    this.withDebug = options.withDebug;
    this.withDefaultCookieJar = options.withDefaultCookieJar;
    this.withoutCookieJar = options.withoutCookieJar;
    this.withRandomTLSExtensionOrder = options.withRandomTLSExtensionOrder;
  }
  destroy() {
    const response = library.symbols.destroySession(new TextEncoder().encode(`${JSON.stringify({
      sessionId: this.sessionId,
    })}\0`));
    if (!response) {
      throw new Error('Response is undefined');
    }
    const responseJson: { id: string, success: true } = JSON.parse(new Deno.UnsafePointerView(response).getCString());
    library.symbols.freeMemory(new TextEncoder().encode(`${responseJson.id}\0`));
    return responseJson.success;
  }
  getCookies(url: string | URL) {
    const response = library.symbols.getCookiesFromSession(new TextEncoder().encode(`${JSON.stringify({
      sessionId: this.sessionId,
      url,
    })}\0`));
    if (!response) {
      throw new Error('Response is undefined');
    }
    const responseJson: { id: string, cookies: object[] } = JSON.parse(new Deno.UnsafePointerView(response).getCString());
    library.symbols.freeMemory(new TextEncoder().encode(`${responseJson.id}\0`));
    return responseJson.cookies;
  }
  addCookies(url: string | URL, cookies: object[]) {
    const response = library.symbols.addCookiesToSession(new TextEncoder().encode(`${JSON.stringify({
      sessionId: this.sessionId,
      url,
      cookies,
    })}\0`));
    if (!response) {
      throw new Error('Response is undefined');
    }
    const responseJson: { id: string, cookies: object[] } = JSON.parse(new Deno.UnsafePointerView(response).getCString());
    library.symbols.freeMemory(new TextEncoder().encode(`${responseJson.id}\0`));
    return responseJson.cookies;
  }
  async request(method: HttpMethod, url: string | URL, options: SessionOptions & { body?: string, cookies?: Record<string, string> } = {}) {
    const response = await library.symbols.request(new TextEncoder().encode(`${JSON.stringify({
      catchPanics: options.catchPanics ?? this.catchPanics,
      certificatePinningHosts: options.certificatePinningHosts ?? this.certificatePinningHosts,
      customTlsClient: options.customTlsClient ?? this.customTlsClient,
      transportOptions: options.transportOptions ?? this.transportOptions,
      followRedirects: options.followRedirects ?? this.followRedirects,
      forceHttp1: options.forceHttp1 ?? this.forceHttp1,
      headerOrder: options.headerOrder ?? this.headerOrder,
      headers: options.headers ?? this.headers,
      insecureSkipVerify: options.insecureSkipVerify ?? this.insecureSkipVerify,
      isByteRequest: options.isByteRequest ?? this.isByteRequest,
      isByteResponse: options.isByteResponse ?? this.isByteResponse,
      isRotatingProxy: options.isRotatingProxy ?? this.isRotatingProxy,
      disableIPV6: options.disableIPV6 ?? this.disableIPV6,
      localAddress: options.localAddress ?? this.localAddress,
      proxyUrl: options.proxyUrl ?? this.proxyUrl,
      requestBody: options.body,
      requestCookies: options.cookies ? Object.entries(options.cookies).map(([name, value]) => ({ name, value })) : undefined,
      requestMethod: method,
      requestUrl: url,
      sessionId: this.sessionId,
      streamOutputBlockSize: options.streamOutputBlockSize ?? this.streamOutputBlockSize,
      streamOutputEOFSymbol: options.streamOutputEOFSymbol ?? this.streamOutputEOFSymbol,
      streamOutputPath: options.streamOutputPath ?? this.streamOutputPath,
      timeoutMilliseconds: options.timeoutMilliseconds ?? this.timeoutMilliseconds,
      timeoutSeconds: options.timeoutSeconds ?? this.timeoutSeconds,
      tlsClientIdentifier: options.tlsClientIdentifier ?? this.tlsClientIdentifier,
      withDebug: options.withDebug ?? this.withDebug,
      withDefaultCookieJar: options.withDefaultCookieJar ?? this.withDefaultCookieJar,
      withoutCookieJar: options.withoutCookieJar ?? this.withoutCookieJar,
      withRandomTLSExtensionOrder: options.withRandomTLSExtensionOrder ?? this.withRandomTLSExtensionOrder,
    })}\0`));
    if (!response) {
      throw new Error('Response is undefined');
    }
    const responseJson: {
      id: string;
      body: string;
      cookies: { [key: string]: string };
      headers: { [key: string]: string[] };
      sessionId: string;
      status: InformationalStatus | SuccessfulStatus | RedirectStatus | ClientErrorStatus | ServerErrorStatus;
      target: string;
      usedProtocol: string;
    } | {
      id: string;
      status: 0;
      body: string;
      headers: null,
      cookies: null,
    } = JSON.parse(new Deno.UnsafePointerView(response).getCString());
    library.symbols.freeMemory(new TextEncoder().encode(`${responseJson.id}\0`));
    if (responseJson.status === 0) {
      throw new RequestError(responseJson.body);
    }
    return new Response(responseJson);
  }
  get(url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
  } = {}) {
    if (options.params) {
      if (options.params instanceof URLSearchParams) {
        url = `${url}?${options.params.toString()}`;
      } else {
        url = `${url}?${new URLSearchParams(options.params).toString()}`;
      }
    }
    return this.request('GET', url, options);
  }
  post(url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) {
    let body: string | undefined;
    if (options.data) {
      if (typeof options.data === 'string') {
        body = options.data;
      } else if (options.data instanceof URLSearchParams) {
        body = options.data.toString();
      } else {
        body = new URLSearchParams(options.data).toString();
      }
    }
    if (options.json) {
      body = JSON.stringify(options.json);
    }
    if (options.params) {
      if (options.params instanceof URLSearchParams) {
        url = `${url}?${options.params.toString()}`;
      } else {
        url = `${url}?${new URLSearchParams(options.params).toString()}`;
      }
    }
    return this.request('POST', url, { ...options, body });
  }
  put(url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) {
    let body: string | undefined;
    if (options.data) {
      if (typeof options.data === 'string') {
        body = options.data;
      } else if (options.data instanceof URLSearchParams) {
        body = options.data.toString();
      } else {
        body = new URLSearchParams(options.data).toString();
      }
    }
    if (options.json) {
      body = JSON.stringify(options.json);
    }
    if (options.params) {
      if (options.params instanceof URLSearchParams) {
        url = `${url}?${options.params.toString()}`;
      } else {
        url = `${url}?${new URLSearchParams(options.params).toString()}`;
      }
    }
    return this.request('PUT', url, { ...options, body });
  }
  patch(url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) {
    let body: string | undefined;
    if (options.data) {
      if (typeof options.data === 'string') {
        body = options.data;
      } else if (options.data instanceof URLSearchParams) {
        body = options.data.toString();
      } else {
        body = new URLSearchParams(options.data).toString();
      }
    }
    if (options.json) {
      body = JSON.stringify(options.json);
    }
    if (options.params) {
      if (options.params instanceof URLSearchParams) {
        url = `${url}?${options.params.toString()}`;
      } else {
        url = `${url}?${new URLSearchParams(options.params).toString()}`;
      }
    }
    return this.request('PATCH', url, { ...options, body });
  }
  delete(url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) {
    let body: string | undefined;
    if (options.data) {
      if (typeof options.data === 'string') {
        body = options.data;
      } else if (options.data instanceof URLSearchParams) {
        body = options.data.toString();
      } else {
        body = new URLSearchParams(options.data).toString();
      }
    }
    if (options.json) {
      body = JSON.stringify(options.json);
    }
    if (options.params) {
      if (options.params instanceof URLSearchParams) {
        url = `${url}?${options.params.toString()}`;
      } else {
        url = `${url}?${new URLSearchParams(options.params).toString()}`;
      }
    }
    return this.request('DELETE', url, { ...options, body });
  }
  head(url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
  } = {}) {
    if (options.params) {
      if (options.params instanceof URLSearchParams) {
        url = `${url}?${options.params.toString()}`;
      } else {
        url = `${url}?${new URLSearchParams(options.params).toString()}`;
      }
    }
    return this.request('HEAD', url, options);
  }
  options(url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
  } = {}) {
    if (options.params) {
      if (options.params instanceof URLSearchParams) {
        url = `${url}?${options.params.toString()}`;
      } else {
        url = `${url}?${new URLSearchParams(options.params).toString()}`;
      }
    }
    return this.request('OPTIONS', url, options);
  }
}
