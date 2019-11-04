const request = require("request-promise");
const messages = require("elasticio-node").messages;

const API_BASE_URI = "https://api.dropscan.de/v1";

exports.process = processTrigger;

function processTrigger(msg, cfg) {
  console.log("processTrigger", msg, cfg);
  this.emitData(msg);
}
