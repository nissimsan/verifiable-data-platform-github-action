
const operationSwitch = require('../src/operationSwitch');

describe.skip("issueCredential", () => {
  beforeAll(async ()=>{
    await operationSwitch({
      operationId: 'getAccessToken',
      did: process.env.ORGANIZATION_DID_WEB,
      tokenEndpoint: process.env.TOKEN_ENDPOINT,
      tokenAudience: process.env.TOKEN_AUDIENCE,
      apiBaseUrl: process.env.API_BASE_URL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
  })
  it("issueCredential", async () => {
    expect(process.env.verifiable_data_platform_api_response).toBeUndefined()
    await operationSwitch({
      operationId: 'issueCredential',
      credential: `${JSON.stringify({
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://ref.gs1.org/gs1/vc/licence-context/",
          "https://w3id.org/vc/status-list/2021/v1"
        ],
        "id": "did:example:60cda318-a0a7-4e39-b600-ea38bf68a31f",
        "type": [
          "VerifiableCredential",
          "GS1KeyCredential"
        ],
        "issuer": process.env.ORGANIZATION_DID_WEB,
        "issuanceDate": "2020-12-02T09:48:11Z",
        "credentialSubject": {
          "id": "https://id.gs1.org/01/07541234555551",
          "extendsCredential": "did:example:b6d13abe-464d-4bb9-a568-b6d81efd57e3"
        },
        "credentialStatus": {
          "id": "https://www.example.com/mycreds/status/60cda318-a0a7-4e39-b600-ea38bf68a31f",
          "type": "StatusList2021Credential"
        },
      }, null, 2)}`
    });
    expect(process.env.verifiable_data_platform_api_response).toBeDefined()
  });
});
