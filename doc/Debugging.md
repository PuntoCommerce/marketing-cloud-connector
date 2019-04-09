#Debugging#


##Commerce Cloud Log Settings##

To turn on the debug logs:

1. In Business Manager, navigate to **Administrator > Operations > Custom Log Settings**.
2. Choose Log level as the Debug for Log Category root.
3. Add email . to custom log targets.

Navigate to Custom Object Editor: **Merchant Tools > Custom Objects > Custom Objects**

1. Select *CommunicationHandlers* from Object Type, and click **Find**.
2. Click to edit "development" object.

	You should be presented with a JSON object, with two top-level properties: 
	 - standard_email 
	 - int\_marketing\_cloud
4. Make sure int\_marketing\_cloud is enabled, and standard_email is disabled, and click **Apply**.
5. Select *MarketingCloudTriggers* from Object Type, and click **Find**.
6. Edit each entry. 

	Each trigger has a Trigger Key that maps it to Marketing Cloud. Enter the External key that we 
   got from the Triggered Send we created. Each trigger can be directly enabled/disabled. Additionally, a list of 
   Subscriber Attributes has been defined, which is a mapping of available values from Commerce Cloud to the 
   attribute key they should be sent as to Marketing Cloud.


##Synchronous Promise Errors##

If debugging indicates `SynchronousPromise.js` errors, make sure that the file is placed in a directory where the function can be accessed globally, such as the module directory.

To debug, use a client to ease web request testing such as [Restlet Client](https://restlet.com/modules/client/?utm_source=DHC).

Below are some sample calls you can use to perform direct API testing. The Host value will vary based on what Marketing Cloud instance you're connecting to.

## Authorization Token Request ##

Request an API token (replace `Host value`, `CLIENTID`, and `CLIENTSECRETVALUE`):

```
POST /v1/requestToken HTTP/1.1
Content-Length: 90
Host: auth-s7.exacttargetapis.com
Content-Type: application/json

{
  "clientId": "CLIENTID",
  "clientSecret": "CLIENTSECRETVALUE"
}

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
X-Mashery-Responder: 01-15
Vary: Origin
X-Mashery-Message-ID: a079376e-919e-4c1a-830c-31bc07cd6704
Content-Encoding: gzip
Content-Type: application/json
Content-Length: 78
Date: Mon, 14 Aug 2017 14:31:35 GMT

{"accessToken":"NEWACCESSTOKEN","expiresIn":3479}
```

**Important**: For all requests other than auth, you need to include an Authorization header with the value of `accessToken`. 

## Sent Message Status ##

After you have issued a triggered send, the response value contains a `location` header. This location gives you a follow-up URL to request the status of the sent message. 

That location value has been requested below:

```
GET /messaging/v1/messageDefinitionSends/be52dfb1-134a-e711-ada2-38eaa791d4a1/deliveryRecords/a408d926-e100-46ce-aef5-a576520668ec HTTP/1.1
Authorization: Bearer NEWACCESSTOKEN
Cache-Control: no-cache
Host: www.exacttargetapis.com

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
X-Mashery-Responder: 03-23
Vary: Origin
X-Mashery-Message-ID: b8c6d6b8-52c4-45bf-a3af-3f1dcc22ac08
Content-Encoding: gzip
Content-Type: application/json;charset=UTF-8
Content-Length: 206
Date: Mon, 14 Aug 2017 14:30:43 GMT

{"deliveryTime":"2017-08-08T09:23:52.517","id":"be52dfb1-134a-e711-ada2-38eaa791d4a1","messageId":"a408d926-e100-46ce-aef5-a576520668ec","status":"Sent","to":{"address":"jlangevin+customerservice@salesforce.com","id":50069331,"key":"jlangevin+customerservice@salesforce.com"}}
```