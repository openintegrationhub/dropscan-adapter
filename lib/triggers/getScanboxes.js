"use strict";
const request = require("request-promise");
const messages = require("elasticio-node").messages;

const API_BASE_URI = "https://api.dropscan.de/v1";

exports.process = processTrigger;
function processTrigger(msg, cfg) {
  console.log("getScanboxes: ", msg, cfg);

  try {
    const accessToken = credentials.oauth.access_token;

    let response = yield request.get({
      uri: `${API_BASE_URI}/scanboxes`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      json: true
    });

    const scanboxesCount = response.length;
    console.log("Got %s scanboxes", scanboxesCount);

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
