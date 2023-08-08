import type {
  SessionOptions,
} from "./lib/types.ts";
import {
  Session,
} from "./lib/sessions.ts";

export {
  Session,
};

export default {
  Session,
  get: (url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
  } = {}) => {
    return new Session().get(url, options);
  },
  post: (url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) => {
    return new Session().post(url, options);
  },
  put: (url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) => {
    return new Session().put(url, options);
  },
  patch: (url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) => {
    return new Session().patch(url, options);
  },
  delete: (url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
    data?: string | Record<string, string> | URLSearchParams | Iterable<string[]>;
    json?: object;
  } = {}) => {
    return new Session().delete(url, options);
  },
  head: (url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
  } = {}) => {
    return new Session().head(url, options);
  },
  options: (url: string | URL, options: SessionOptions & {
    params?: URLSearchParams | string | Record<string, string> | Iterable<string[]>;
  } = {}) => {
    return new Session().options(url, options);
  },
};