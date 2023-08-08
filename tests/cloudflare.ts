import TlsClient from '../mod.ts';

const response = await TlsClient.post('https://benbaotran.com/', {
  tlsClientIdentifier: 'firefox_102',
});
console.log(response.body);

// Cf-Bot-Score: 98