const request = require("request-promise");
const messages = require("elasticio-node").messages;

const API_BASE_URI = "https://api.dropscan.de/v1";

exports.process = processTrigger;

function processTrigger(msg, cfg) {
  const scanboxId = cfg.scanboxId;
  const mailingUUID = cfg.mailingUUID;

  if (!scanboxId) {
    throw new Error("Scanbox Id is required");
  }

  const accessToken = cfg.oauth.access_token;

  if (!accessToken) {
    throw new Error("access token is required");
  }

  const requestOptions = {
    uri: `${API_BASE_URI}/mailings/${mailings.uuid}/pdf`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  request
    .get(requestOptions)
    .then(response => {
      console.log("Got %s objects", response.total);
      if (response.total) {
        // this message will be emitted to the platform
        // please note that we wrap the request payload into a message object
        response.objList.forEach(elem => {
          /**Creates a version1 uuid and makes a request to the Open Integration Hub Attachments Storage
           * The uuid is than added to the body of the message with key fileUuid
           */
          let tempUuid = uuidv1();
          const requestOptions = {
            uri: `http://attachment-storage-service.openintegrationhub.com/objects/${tempUuid}`,
            header: `Bearer ${iamToken}`,
            body: elem,
            json: true
          };
          request.put(requestOptions);
          elem.fileUuid = tempUuid;

          /** Adds the elements unique identifier to the meta object with key recordUid
           *
           */
          meta.recordUid = elem.id;
          delete elem.id;
          contentWithMeta = {
            meta,
            data: elem
          };

          //Emitts data to be further processed by the next flow step
          self.emit("data", messages.newMessageWithBody(contentWithMeta));
        });
      }
    })
    .catch(function(err) {
      console.log("Error occurred", err);
      self.emit("error", err);
    })
    .finally(function() {
      console.log("Finished execution");
      self.emit("end");
    });
}
