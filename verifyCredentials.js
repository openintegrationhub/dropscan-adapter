"use strict";
const request = require("request-promise");

module.exports = verify;
const base = "https://api.dropscan.de/v1";

async function verify(credentials) {
  console.log(JSON.stringify(credentials));

  try {
    const accessToken = credentials.oauth.access_token;

    const requestOptions = {
      uri: `${base}/scanboxes`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      json: true
    };

    const valid = await request.get(requestOptions);

    console.log(JSON.stringify(valid));
    if (valid) {
      console.log("Credentials verified successfully");
      return true;
    } else {
      throw new Error("Error in validating credentials!");
    }
  } catch (e) {
    console.log(`${e}`);
    throw new Error(e);
  }
}
