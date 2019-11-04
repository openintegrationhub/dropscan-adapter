# Dropscan Openintegrationhub adapter

Dropscan is a web based scan-service based in Berlin, Germany.
Customers of Dropscan can send documents and/or forward postal mail to their Scanbox, similar to a post box.
After mail or documents have been received by our Scan-Center they can be scanned, forwarded, archived, or securely destroyed.
We provide high-quality compressed and searchable PDF-Documents of every scan.
Using the Dropscan connector users of an OIH installation can import the produced PDFs (incl. meta-data) of postal mail and other paper documents.

## How to use this adapter

In order to use this adapter a OIH-user has to be a registered Dropscan user. Signup here on the Dropscan [homepage](https://secure.dropscan.de). The User needs to have an upgraded account with at least one active Scanbox!

To enable the OAuth2-Flow please make sure the ENV variables `DROPSCAN_CLIENT_KEY` and `DROPSCAN_CLIENT_SECRET` are set. Please contact service@dropscan.de and provide an oauth-callback URL to get a KEY/SECRET-pair for your server installation to enable our RESTful API.

the only usecase supported by this adaper is to receive a webhook-trigger, which will emit the new 

### Triggers

TBD

### Actions

TBD

## License

Apache-2.0 © [Dropscan GmbH](https://www.dropscan.de/)
