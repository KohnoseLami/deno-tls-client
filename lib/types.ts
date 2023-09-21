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

export type tlsClientIdentifier =
  | "chrome_103"
  | "chrome_104"
  | "chrome_105"
  | "chrome_106"
  | "chrome_107"
  | "chrome_108"
  | "chrome_109"
  | "chrome_110"
  | "chrome_111"
  | "chrome_112"
  | "chrome_117"
  | "safari_15_6_1"
  | "safari_16_0"
  | "safari_ios_15_5"
  | "safari_ios_15_6"
  | "safari_ios_16_0"
  | "safari_ios_15_6"
  | "firefox_102"
  | "firefox_104"
  | "firefox_105"
  | "firefox_106"
  | "firefox_108"
  | "firefox_110"
  | "firefox_117"
  | "opera_89"
  | "opera_90"
  | "opera_91"
  | "zalando_ios_mobile"
  | "nike_ios_mobile"
  | "mms_ios"
  | "mesh_ios"
  | "confirmed_ios"
  | "okhttp4_android_7"
  | "okhttp4_android_8"
  | "okhttp4_android_9"
  | "okhttp4_android_10"
  | "okhttp4_android_11"
  | "okhttp4_android_12"
  | "okhttp4_android_13"
  | "zalando_android_mobile"
  | "nike_android_mobile"
  | "mesh_ios_2"
  | "mesh_android"
  | "mesh_android_1"
  | "mesh_android_2"
  | "confirmed_android"
  | "confirmed_android_2";

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