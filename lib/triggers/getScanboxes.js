"use strict";
const co = require("co");
const request = require("request-promise");
const messages = require("elasticio-node").messages;

const API_BASE_URI = "https://api.dropscan.de/v1";

exports.process = processTrigger;
function processTrigger(msg, cfg) {
  console.log("TEST: ", msg, cfg);

  try {
    const accessToken = credentials.oauth.access_token;

    const requestOptions = {
      uri: `${base}/scanboxes`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      json: true
    };

    let response = yield request.get(requestOptions);
    const scanboxesCount = response.length;
    console.log("Got %s scanboxdes", scanboxesCount);
    if (scanboxesCount) {
      return messages.newMessageWithBody({
        scanboxes: response
      });
    }

  } catch (e) {
    console.log(`${e}`);
    throw new Error(e);
  }

}
