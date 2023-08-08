export interface PriorityParam {
  exclusive?: boolean;
  streamDep?: number;
  weight?: number;
}

export interface PriorityFrames {
  priorityParam?: PriorityParam;
  streamID?: number;
}

export interface CustomTlsClient {
  certCompressionAlgo?: string;
  connectionFlow?: number;
  h2Settings?: { [key: string]: number };
  h2SettingsOrder?: string[];
  headerPriority?: PriorityParam;
  ja3String?: string;
  keyShareCurves?: string[];
  priorityFrames?: PriorityFrames[];
  pseudoHeaderOrder?: string[];
  supportedDelegatedCredentialsAlgorithms?: string[];
  supportedSignatureAlgorithms?: string[];
  supportedVersions?: string[];
}

export interface TransportOptions {
  disableKeepAlives?: boolean;
  disableCompression?: boolean;
  maxIdleConns?: number;
  maxIdleConnsPerHost?: number;
  maxConnsPerHost?: number;
  maxResponseHeaderBytes?: number;
  writeBufferSize?: number;
  readBufferSize?: number;
  idleConnTimeout?: number;
}

export interface SessionOptions {
  catchPanics?: boolean;
  certificatePinningHosts?: { [key: string]: string[] };
  customTlsClient?: CustomTlsClient;
  transportOptions?: TransportOptions;
  followRedirects?: boolean;
  forceHttp1?: boolean;
  headerOrder?: string[];
  headers?: { [key: string]: string };
  insecureSkipVerify?: boolean;
  isByteRequest?: boolean;
  isByteResponse?: boolean;
  isRotatingProxy?: boolean;
  disableIPV6?: boolean;
  localAddress?: string;
  proxyUrl?: string;
  sessionId?: string;
  streamOutputBlockSize?: number;
  streamOutputEOFSymbol?: string;
  streamOutputPath?: string;
  timeoutMilliseconds?: number;
  timeoutSeconds?: number;
  tlsClientIdentifier?: string;
  withDebug?: boolean;
  withDefaultCookieJar?: boolean;
  withoutCookieJar?: boolean;
  withRandomTLSExtensionOrder?: boolean;
}