import axios from "axios";
import https from 'https';
import fs from 'fs'

const baseUrl = "https://127.0.0.1:2999/liveclientdata";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  cert: fs.readFileSync(__dirname + '/../assets/certificates/local_ssl_root.pem'),
})

export const request = async (url: string, body?: any, options?: any) => {
  try {
    const response = await axios({
      url: baseUrl + url,
      data: body,
      method: options?.method || 'get',
      httpsAgent,
      ...options
    });

    if (response.statusText !== "OK") {
      console.error(`an error occured (${response.status} ${response.statusText }) while requesting resource at ${baseUrl + url}`);
    } else {
      return response.data;
    }
  } catch (error) {
    // most likely the league client api isnt available, meaning there is no game running
    //console.error(error);
  }
}