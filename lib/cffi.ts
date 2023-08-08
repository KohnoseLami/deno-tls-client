import {
  fromFileUrl,
  dirname,
  join,
} from "https://deno.land/std@0.197.0/path/mod.ts";
import {
  exists,
} from "https://deno.land/std@0.197.0/fs/mod.ts";

const basePath = join(dirname(fromFileUrl(import.meta.url)), 'dependencies', 'tls-client-xgo-1.5.0-');

const depPaths = {
  darwin: {
    x64: basePath + 'darwin-amd64.dylib',
    arm64: basePath + 'darwin-arm64.dylib',
  },
  linux: {
    x86: basePath + 'linux-386.so',
    x64: basePath + 'linux-amd64.so',
    arm: basePath + 'linux-arm-5.so',
    arm6: basePath + 'linux-arm-6.so',
    arm7: basePath + 'linux-arm-7.so',
    arm64: basePath + 'linux-arm64.so',
    ppc64le: basePath + 'linux-ppc64le.so',
    riscv64: basePath + 'linux-riscv64.so',
    s390x: basePath + 'linux-s390x.so',
  },
  windows: {
    x86: basePath + 'windows-386.dll',
    x64: basePath + 'windows-amd64.dll',
  },
};

let path: string | undefined;
switch (Deno.build.os) {
  case 'darwin':
    switch (Deno.build.arch) {
      case 'x86_64':
        path = depPaths.darwin.x64;
        break;
      case 'aarch64':
        path = depPaths.darwin.arm64;
        break;
    }
    break;
  case 'linux':
    switch (Deno.build.arch) {
      case 'x86_64':
        path = depPaths.linux.x64;
        break;
      case 'aarch64':
        path = depPaths.linux.arm64;
        break;
    }
    break;
  case 'windows':
    switch (Deno.build.arch) {
      case 'x86_64':
        path = depPaths.windows.x64;
        break;
    }
    break;
}

if (!path) {
  throw new Error(`Unsupported platform: ${Deno.build.os} ${Deno.build.arch}`);
}

if (!(await exists(path))) {
  const url = `https://github.com/bogdanfinn/tls-client/releases/download/v1.5.0/${path.split('\\').pop()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  await Deno.mkdir(dirname(path), { recursive: true });
  await Deno.writeFile(path, new Uint8Array(await res.arrayBuffer()));
}

export const library = Deno.dlopen(path, {
  freeMemory: {
    parameters: ['buffer'],
    result: 'void',
  },
  destroyAll: {
    parameters: [],
    result: 'buffer',
  },
  destroySession: {
    parameters: ['buffer'],
    result: 'buffer',
  },
  getCookiesFromSession: {
    parameters: ['buffer'],
    result: 'buffer',
  },
  addCookiesToSession: {
    parameters: ['buffer'],
    result: 'buffer',
  },
  request: {
    parameters: ['buffer'],
    result: 'buffer',
    nonblocking: true,
  },
});
