const request = require("request-promise");
const messages = require("elasticio-node").messages;

const API_BASE_URI = "https://api.dropscan.de/v1";

exports.process = processTrigger;

function processTrigger(msg, cfg) {
  const scanboxId = cfg.scanboxId;

  if (!scanboxId) {
    throw new Error("Scanbox Id is required");
  }

  const accessToken = cfg.oauth.access_token;

  if (!accessToken) {
    throw new Error("access token is required");
  }

  const requestOptions = {
    uri: `${API_BASE_URI}/scanboxes/${$scanboxId}/mailings?current_status=scanned`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  };

  return request.get(requestOptions).then(response => {
    console.log("Got %s mailnigs", response.length);
    if (response.length) {
      return messages.newMessageWithBody({
        scanboxes: response
      });
    }
  });
}
