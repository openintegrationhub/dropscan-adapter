"use strict";
const co = require("co");
const request = require("request-promise");
const messages = require("elasticio-node").messages;

const API_BASE_URI = "https://api.dropscan.de/v1";

exports.process = processTrigger;
function processTrigger(msg, cfg) {
  console.log(msg, cfg);

  const accessToken = cfg.oauth.access_token;

  if (!accessToken) {
    throw new Error("accessToken field is required");
  }

  return co(function*() {
    console.log("list all scanboxes", scanboxes);
    const requestOptions = {
      uri: `${API_BASE_URI}/scanboxes`,
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
  });
}
