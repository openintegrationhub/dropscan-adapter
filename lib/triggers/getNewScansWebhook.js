const request = require("request-promise");
const messages = require("elasticio-node").messages;
const uuidv1 = require("uuid/v1");

const API_BASE_URI = "https://api.dropscan.de/v1";
exports.startup = async function startup(cfg) {
  console.log("startup", cfg);
};

exports.shutdown = async function shutdown(cfg, startData) {
  console.log("startup", cfg, startData);
};

exports.process = processTrigger;

function processTrigger(msg, cfg) {
  console.log("processTrigger msg", Object.keys(msg).join(", "));
  console.log("processTrigger cfg", Object.keys(cfg).join(", "));

  const { body } = msg;
  const mailingUUID = body.uuid;
  const scanboxId = body.scanbox_id;

  if (!mailingUUID) {
    throw new Error("Mailing UUID is required");
  }

  if (!scanboxId) {
    throw new Error("Scanbox ID is required");
  }

  const accessToken = cfg.oauth.access_token;

  if (!accessToken) {
    throw new Error("access token is required");
  }

  const requestOptions = {
    uri: `${API_BASE_URI}/scanboxes/${scanboxId}/mailings/${mailingUUID}/pdf`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    encoding: null
  };

  console.log("get: ", mailingUUID, scanboxId, accessToken);

  this.emit("mailing", body);

  return;
  request
    .get(requestOptions)
    .then(response => {
      const buffer = Buffer.from(response);

      console.log("buffer length", buffer.length);
      if (buffer.length > 0) {
        s;
        let tempUuid = uuidv1();
        const iamToken = process.env.ELASTICIO_IAM_TOKEN;
        request.put({
          uri: `http://attachment-storage-service.openintegrationhub.com/objects/${tempUuid}`,
          header: `Bearer ${iamToken}`,
          body: elem,
          json: true
        });

        elem.fileUuid = tempUuid;
        meta.recordUid = elem.id;
        delete elem.id;

        this.emit(
          "data",
          messages.newMessageWithBody({
            meta,
            data: elem
          })
        );
      }
    })
    .catch(function(err) {
      console.log("Error occurred", err);
      this.emit("error", err);
    })
    .finally(function() {
      console.log("Finished execution");
      this.emit("end");
    });
}
