"use strict";
const request = require("request-promise");
const messages = require("elasticio-node").messages;

const API_BASE_URI = "https://api.dropscan.de/v1";

exports.process = processTrigger;

function processTrigger(msg, cfg) {
  console.log(msg, cfg);
  const accessToken = cfg.oauth.access_token;

  if (!accessToken) {
    throw new Error("Status field is required");
  }

  console.log("About to find pets by status:", status);

  const requestOptions = {
    uri: `${API_BASE_URI}/scanboxes`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  };

  return request.get(requestOptions).then(response => {
    console.log("Got %s scanboxes", response.length);
    if (response.length) {
      return messages.newMessageWithBody({
        scanboxes: response
      });
    }
  });
}
