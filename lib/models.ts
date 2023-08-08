import {
  RequestError,
} from './errors.ts';
import {
  type InformationalStatus,
  type SuccessfulStatus,
  type RedirectStatus,
  type ClientErrorStatus,
  type ServerErrorStatus,
  isSuccessfulStatus,
  STATUS_TEXT,
} from "https://deno.land/std@0.197.0/http/mod.ts";

export class Response {
  public readonly body: string;
  public readonly cookies: { [key: string]: string };
  public readonly headers: { [key: string]: string[] };
  public readonly ok: boolean;
  public readonly status: InformationalStatus | SuccessfulStatus | RedirectStatus | ClientErrorStatus | ServerErrorStatus;
  public readonly statusText: string;
  public readonly url: string;
  constructor(responseJson: {
    id: string;
    body: string;
    cookies: { [key: string]: string };
    headers: { [key: string]: string[] };
    sessionId: string;
    status: InformationalStatus | SuccessfulStatus | RedirectStatus | ClientErrorStatus | ServerErrorStatus;
    target: string;
    usedProtocol: string;
  }) {
    this.body = responseJson.body;
    this.cookies = responseJson.cookies;
    this.headers = responseJson.headers;
    this.ok = isSuccessfulStatus(responseJson.status);
    this.status = responseJson.status;
    this.statusText = STATUS_TEXT[responseJson.status];
    this.url = responseJson.target;
  }
  json(): unknown {
    return JSON.parse(this.body);
  }
  raiseForStatus(): void {
    if (!this.ok) {
      throw new RequestError(`Request failed with status code ${this.status} (${this.statusText})`);
    }
  }
}

