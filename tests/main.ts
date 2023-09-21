import TlsClient from "../mod.ts";

let response = await TlsClient.get("https://httpbin.org/get", {
  params: {
    hello: "world",
  },
});
console.log(response.json());

response = await TlsClient.post("https://httpbin.org/post", {
  params: {
    hello: "world",
  },
  json: {
    hello: "world",
  },
});
console.log(response.json());

response = await TlsClient.put("https://httpbin.org/put", {
  params: {
    hello: "world",
  },
  json: {
    hello: "world",
  },
});
console.log(response.json());

response = await TlsClient.patch("https://httpbin.org/patch", {
  params: {
    hello: "world",
  },
  json: {
    hello: "world",
  },
});
console.log(response.json());

response = await TlsClient.delete("https://httpbin.org/delete", {
  params: {
    hello: "world",
  },
  json: {
    hello: "world",
  },
});
console.log(response.json());
