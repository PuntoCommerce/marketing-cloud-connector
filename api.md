## Modules
Module | Description
------ | -----------
[communication/account](#markdown-header-communicationaccount) | 
[communication/customerService](#markdown-header-communicationcustomerservice) | 
[communication/giftCertificate](#markdown-header-communicationgiftcertificate) | 
[communication/handler](#markdown-header-communicationhandler) | 
[communication/order](#markdown-header-communicationorder) | 
[communication/util/trigger](#markdown-header-communicationutiltrigger) | 
[feeds/catalog](#markdown-header-feedscatalog) | 
[feeds/content](#markdown-header-feedscontent) | 
[init/bootstrap](#markdown-header-initbootstrap) | 
[init/rest](#markdown-header-initrest) | 
[models/authToken](#markdown-header-modelsauthtoken) | 
[models/message](#markdown-header-modelsmessage) | 
[models/trigger](#markdown-header-modelstrigger) | 
[models/util/helpers](#markdown-header-modelsutilhelpers) | 
[int_marketing_cloud](#markdown-header-int_marketing_cloud-object) : Object | Registry object
[template/footer](#markdown-header-templatefooter) | 

## communication/account

* [communication/account](#markdown-header-communicationaccount)
    * [~created(data)](#markdown-header-communicationaccountcreateddata-object) ⇒ Object
    * [~updated(data)](#markdown-header-communicationaccountupdateddata-object) ⇒ Object
    * [~passwordChanged(data)](#markdown-header-communicationaccountpasswordchangeddata-object) ⇒ Object
    * [~passwordReset(data)](#markdown-header-communicationaccountpasswordresetdata-object) ⇒ Object
    * [~lockedOut(data)](#markdown-header-communicationaccountlockedoutdata-object) ⇒ Object
    * [~triggerDefinitions()](#markdown-header-communicationaccounttriggerdefinitions-object) ⇒ Object

### communication/account~created(data) ⇒ Object
Trigger account created notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/account~updated(data) ⇒ Object
Trigger account updated notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/account~passwordChanged(data) ⇒ Object
Trigger password changed notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/account~passwordReset(data) ⇒ Object
Trigger password reset notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/account~lockedOut(data) ⇒ Object
Trigger account locked out notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/account~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/customerService

* [communication/customerService](#markdown-header-communicationcustomerservice)
    * [~contactUs(data)](#markdown-header-communicationcustomerservicecontactusdata-object) ⇒ Object
    * [~triggerDefinitions()](#markdown-header-communicationcustomerservicetriggerdefinitions-object) ⇒ Object

### communication/customerService~contactUs(data) ⇒ Object
Trigger a customer service notification

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/customerService~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/giftCertificate

* [communication/giftCertificate](#markdown-header-communicationgiftcertificate)
    * [~sendCertificate(data)](#markdown-header-communicationgiftcertificatesendcertificatedata-object) ⇒ Object
    * [~triggerDefinitions()](#markdown-header-communicationgiftcertificatetriggerdefinitions-object) ⇒ Object

### communication/giftCertificate~sendCertificate(data) ⇒ Object
Trigger a gift certificate notification

**Kind**: inner method of [communication/giftCertificate](#markdown-header-communicationgiftcertificate)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/giftCertificate~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/giftCertificate](#markdown-header-communicationgiftcertificate)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/handler
### communication/handler.registerHandler(registerHandler)
Register communication handler

**Kind**: static method of [communication/handler](#markdown-header-communicationhandler)  

| Param | Type |
| --- | --- |
| registerHandler | Object | 

## communication/order

* [communication/order](#markdown-header-communicationorder)
    * [~confirmation(data)](#markdown-header-communicationorderconfirmationdata-object) ⇒ Object
    * [~triggerDefinitions()](#markdown-header-communicationordertriggerdefinitions-object) ⇒ Object

### communication/order~confirmation(data) ⇒ Object
Trigger an order confirmation notification

**Kind**: inner method of [communication/order](#markdown-header-communicationorder)  

| Param | Type |
| --- | --- |
| data | CustomerNotification | 

### communication/order~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/order](#markdown-header-communicationorder)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/util/trigger

* [communication/util/trigger](#markdown-header-communicationutiltrigger)
    * [~sendTrigger(hookID, data)](#markdown-header-communicationutiltriggersendtriggerhookid-data-object) ⇒ Object
    * [~CustomerNotification](#markdown-header-communicationutiltriggercustomernotification-object) : Object

### communication/util/trigger~sendTrigger(hookID, data) ⇒ Object
Trigger a customer notification

**Kind**: inner method of [communication/util/trigger](#markdown-header-communicationutiltrigger)  
**Returns**: Object - Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure  

| Param | Type |
| --- | --- |
| hookID | string | 
| data | CustomerNotification | 

### communication/util/trigger~CustomerNotification : Object
**Kind**: inner typedef of [communication/util/trigger](#markdown-header-communicationutiltrigger)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fromEmail | string | The email address the communication is sent from |
| toEmail | string ⎮ array | The email address the communication is sent to |
| subject | string | The communication subject |
| messageBody | string | The body of the communication to send |
| params | Object | Object containing additional parameters for usage by the hook |
| params.CurrentForms | module:dw/web/Forms | The forms available in current session |
| params.CurrentHttpParameterMap | module:dw/web/HTTPParameterMap | The parameters in current request |
| params.CurrentCustomer | module:dw/customer/Customer | The current customer |

## feeds/catalog
## feeds/content
## init/bootstrap

* [init/bootstrap](#markdown-header-initbootstrap)
    * [~hookFilter(hook)](#markdown-header-initbootstraphookfilterhook-boolean) ⇒ boolean
    * [~initTriggers()](#markdown-header-initbootstrapinittriggers)

### init/bootstrap~hookFilter(hook) ⇒ boolean
Use with array filter, to filter hooks not matching the communication handler pattern

**Kind**: inner method of [init/bootstrap](#markdown-header-initbootstrap)  
**Returns**: boolean - Whether hook is comm handler  

| Param | Type | Description |
| --- | --- | --- |
| hook | string | The hook path/ID |

### init/bootstrap~initTriggers()
Initializes trigger configurations

**Kind**: inner method of [init/bootstrap](#markdown-header-initbootstrap)  
## init/rest

* [init/rest](#markdown-header-initrest)
    * [~ServiceRegistry](#markdown-header-initrestserviceregistry)
    * [~setAuthHeader(svc)](#markdown-header-initrestsetauthheadersvc)
    * [~isValid401(client)](#markdown-header-initrestisvalid401client-boolean) ⇒ boolean
    * [~isResponseJSON(client)](#markdown-header-initrestisresponsejsonclient-boolean) ⇒ boolean
    * [~parseResponse(svc, client)](#markdown-header-initrestparseresponsesvc-client-object) ⇒ Object
    * [~createRequest(svc)](#markdown-header-initrestcreaterequestsvc)
        * [~svcCredential](#markdown-header-createrequestsvccredential)
    * [~createRequest(svc, message)](#markdown-header-initrestcreaterequestsvc-message-string) ⇒ string
        * [~svcCredential](#markdown-header-createrequestsvccredential)
    * [~createRequest(svc, sendID, customerKey, recipientSendID)](#markdown-header-initrestcreaterequestsvc-sendid-customerkey-recipientsendid)
        * [~svcCredential](#markdown-header-createrequestsvccredential)

### init/rest~ServiceRegistry
Marketing Cloud Connector
REST API webservice
Documentation:
 https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/index-api.htm
 https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/routes.htm

Production Env: https://mc.exacttarget.com
Sandbox Env: https://mc.test.exacttarget.com

Production API: https://www.exacttargetapis.com

**Kind**: inner property of [init/rest](#markdown-header-initrest)  
### init/rest~setAuthHeader(svc)
Inserts auth token into request header

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Throws**:

- Error Throws error when no valid auth token is available (i.e.- service error, service down)


| Param | Type |
| --- | --- |
| svc | module:dw/svc/HTTPService | 

### init/rest~isValid401(client) ⇒ boolean
Check if 401 due to expired token

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: boolean - true if expired auth token  

| Param | Type |
| --- | --- |
| client | module:dw/net/HTTPClient | 

### init/rest~isResponseJSON(client) ⇒ boolean
Check if response type is JSON

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| client | module:dw/net/HTTPClient | 

### init/rest~parseResponse(svc, client) ⇒ Object
Parses response JSON and wraps with an object containing additional helper properties

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| svc | module:dw/svc/HTTPService | 
| client | module:dw/net/HTTPClient | 

### init/rest~createRequest(svc)
Create request for service authentication

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Throws**:

- Error Throws error when service credentials are missing


| Param | Type |
| --- | --- |
| svc | module:dw/svc/HTTPService | 

#### createRequest~svcCredential
TODO: Convert to custom preference or custom object? less secure storage for password...

**Kind**: inner property of createRequest  
### init/rest~createRequest(svc, message) ⇒ string
Create request for sending an email

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: string - Request body  

| Param | Type | Description |
| --- | --- | --- |
| svc | module:dw/svc/HTTPService |  |
| message | Message | A message model instance to be sent to Marketing Cloud |

#### createRequest~svcCredential
TODO: Convert to custom preference or custom object? less secure storage for password...

**Kind**: inner property of createRequest  
### init/rest~createRequest(svc, sendID, customerKey, recipientSendID)
Create request for viewing delivery records

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param |
| --- |
| svc | 
| sendID | 
| customerKey | 
| recipientSendID | 

#### createRequest~svcCredential
TODO: Convert to custom preference or custom object? less secure storage for password...

**Kind**: inner property of createRequest  
## models/authToken

* [models/authToken](#markdown-header-modelsauthtoken)
    * [~AuthToken](#markdown-header-modelsauthtokenauthtoken)
        * [new AuthToken()](#markdown-header-new-authtoken)
        * [.token](#markdown-header-authtokentoken-object) : Object
        * [.isValidAuth()](#markdown-header-authtokenisvalidauth-boolean) ⇒ boolean
        * [.getValidToken()](#markdown-header-authtokengetvalidtoken-booleanobject) ⇒ boolean ⎮ Object
    * [~getCachedTokenObject()](#markdown-header-modelsauthtokengetcachedtokenobject-moduledwobjectcustomattributes) ⇒ module:dw/object/CustomAttributes
    * [~updateCachedTokenObject(obj)](#markdown-header-modelsauthtokenupdatecachedtokenobjectobj-object) ⇒ Object

### models/authToken~AuthToken
**Kind**: inner class of [models/authToken](#markdown-header-modelsauthtoken)  

* [~AuthToken](#markdown-header-modelsauthtokenauthtoken)
    * [new AuthToken()](#markdown-header-new-authtoken)
    * [.token](#markdown-header-authtokentoken-object) : Object
    * [.isValidAuth()](#markdown-header-authtokenisvalidauth-boolean) ⇒ boolean
    * [.getValidToken()](#markdown-header-authtokengetvalidtoken-booleanobject) ⇒ boolean ⎮ Object

#### new AuthToken()
Token class for checking auth and retrieving valid token

#### authToken.token : Object
Token object returned by Marketing Cloud

**Kind**: instance property of [AuthToken](#markdown-header-new-authtoken)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| accessToken | string | The token auth string |
| expiresIn | number | Expiration in seconds, relative to when requested |
| issued | Date | Date issued |
| expires | Date | Date expires |

#### authToken.isValidAuth() ⇒ boolean
Returns whether the stored token is valid

**Kind**: instance method of [AuthToken](#markdown-header-new-authtoken)  
**Returns**: boolean - Whether the stored token is valid and not expired  
#### authToken.getValidToken() ⇒ boolean ⎮ Object
Gets a valid token from storage or from a new auth request

**Kind**: instance method of [AuthToken](#markdown-header-new-authtoken)  
**Returns**: boolean ⎮ Object - False or plain JS object containing the token response  
### models/authToken~getCachedTokenObject() ⇒ module:dw/object/CustomAttributes
Retrieves cached token from custom object storage
If no existing token object, an empty one is created

**Kind**: inner method of [models/authToken](#markdown-header-modelsauthtoken)  
**Returns**: module:dw/object/CustomAttributes - Returns token custom attributes  
**See**: [[dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html}]([dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html})
### models/authToken~updateCachedTokenObject(obj) ⇒ Object
Puts token into custom object storage

**Kind**: inner method of [models/authToken](#markdown-header-modelsauthtoken)  
**Returns**: Object - Returns the same plain JS object  

| Param | Type | Description |
| --- | --- | --- |
| obj | Object | A plain JS object with the token |

## models/message

* [models/message](#markdown-header-modelsmessage)
    * [~Message](#markdown-header-modelsmessagemessage)
        * [new Message(customerKey, [sendID])](#markdown-header-new-messagecustomerkey-sendid)
        * [.from](#markdown-header-messagefrom-object) : Object
        * [.to](#markdown-header-messageto-object) : Object
        * [.options](#markdown-header-messageoptions-object) : Object
        * [.setFrom(address, [name])](#markdown-header-messagesetfromaddress-name-modulemodelsmessagemessage) ⇒ Message
        * [.setTo(address)](#markdown-header-messagesettoaddress-modulemodelsmessagemessage) ⇒ Message
        * [.setAsync(isAsync)](#markdown-header-messagesetasyncisasync-modulemodelsmessagemessage) ⇒ Message
        * [.setSubscriberAttribute(key, value)](#markdown-header-messagesetsubscriberattributekey-value-modulemodelsmessagemessage) ⇒ Message
        * [.toJSON()](#markdown-header-messagetojson-object) ⇒ Object
    * [~messageToJson(obj)](#markdown-header-modelsmessagemessagetojsonobj-object) ⇒ Object

### models/message~Message
**Kind**: inner class of [models/message](#markdown-header-modelsmessage)  

* [~Message](#markdown-header-modelsmessagemessage)
    * [new Message(customerKey, [sendID])](#markdown-header-new-messagecustomerkey-sendid)
    * [.from](#markdown-header-messagefrom-object) : Object
    * [.to](#markdown-header-messageto-object) : Object
    * [.options](#markdown-header-messageoptions-object) : Object
    * [.setFrom(address, [name])](#markdown-header-messagesetfromaddress-name-modulemodelsmessagemessage) ⇒ Message
    * [.setTo(address)](#markdown-header-messagesettoaddress-modulemodelsmessagemessage) ⇒ Message
    * [.setAsync(isAsync)](#markdown-header-messagesetasyncisasync-modulemodelsmessagemessage) ⇒ Message
    * [.setSubscriberAttribute(key, value)](#markdown-header-messagesetsubscriberattributekey-value-modulemodelsmessagemessage) ⇒ Message
    * [.toJSON()](#markdown-header-messagetojson-object) ⇒ Object

#### new Message(customerKey, [sendID])
Message class


| Param | Type | Description |
| --- | --- | --- |
| customerKey | string | CustomerKey of the entry event send definition. Either this or the SendID is required. |
| [sendID] | string | ID of the entry event send definition. Either this or the customer key is required. |

#### message.from : Object
From object

**Kind**: instance property of [Message](#markdown-header-new-messagecustomerkey-sendid)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The sender's email address |
| name | string | The sender's name |

#### message.to : Object
To object

**Kind**: instance property of [Message](#markdown-header-new-messagecustomerkey-sendid)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The recipient's email address |
| subscriberKey | string | The recipient's unique subscriber key (typically email) |
| contactAttributes | Object | Contact attributes |
| contactAttributes.subscriberAttributes | Object | Subscriber attributes |

#### message.options : Object
Available options

**Kind**: instance property of [Message](#markdown-header-new-messagecustomerkey-sendid)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| requestType | string | The request type. Value can be SYNC or ASYNC (default) |

#### message.setFrom(address, [name]) ⇒ Message
Set FROM details

**Kind**: instance method of [Message](#markdown-header-new-messagecustomerkey-sendid)  

| Param | Type | Description |
| --- | --- | --- |
| address | string | Sender email address |
| [name] | string | Sender name |

#### message.setTo(address) ⇒ Message
Set TO details

**Kind**: instance method of [Message](#markdown-header-new-messagecustomerkey-sendid)  

| Param | Type | Description |
| --- | --- | --- |
| address | string | Recipient email address |

#### message.setAsync(isAsync) ⇒ Message
Set ASYNC on/off

**Kind**: instance method of [Message](#markdown-header-new-messagecustomerkey-sendid)  

| Param | Type | Description |
| --- | --- | --- |
| isAsync | boolean | Set true if message should send async |

#### message.setSubscriberAttribute(key, value) ⇒ Message
Set a custom subscriber attribute

**Kind**: instance method of [Message](#markdown-header-new-messagecustomerkey-sendid)  

| Param | Type |
| --- | --- |
| key | string | 
| value | * | 

#### message.toJSON() ⇒ Object
Builds up a formatted object for JSON.stringify()

**Kind**: instance method of [Message](#markdown-header-new-messagecustomerkey-sendid)  
### models/message~messageToJson(obj) ⇒ Object
Recursive method to handle Message during JSON.stringify().
Used to ensure exported JSON is webservice compatible

**Kind**: inner method of [models/message](#markdown-header-modelsmessage)  

| Param | Type |
| --- | --- |
| obj | [Message](#markdown-header-new-messagecustomerkey-sendid) ⎮ Object | 

## models/trigger

* [models/trigger](#markdown-header-modelstrigger)
    * [~Trigger](#markdown-header-modelstriggertrigger)
        * [new Trigger(hookID)](#markdown-header-new-triggerhookid)
        * [.hookID](#markdown-header-triggerhookid-string) : string
        * [.definition](#markdown-header-triggerdefinition-moduledwobjectcustomattributes) : module:dw/object/CustomAttributes
        * [.attributes](#markdown-header-triggerattributes-object) : Object
        * [.message](#markdown-header-triggermessage-modulemodelsmessagemessage) : Message
        * [.isEnabled()](#markdown-header-triggerisenabled-boolean) ⇒ boolean
    * [~getTriggerDefinitionObject(hookID)](#markdown-header-modelstriggergettriggerdefinitionobjecthookid-moduledwobjectcustomattributes) ⇒ module:dw/object/CustomAttributes
    * [~mergeAttributes(newAttributes, oldAttributes)](#markdown-header-modelstriggermergeattributesnewattributes-oldattributes)
    * [~expandAttributes(definition)](#markdown-header-modelstriggerexpandattributesdefinition-object) ⇒ Object
    * [~getTriggerDefinition(hookID, attributes)](#markdown-header-modelstriggergettriggerdefinitionhookid-attributes-object) ⇒ Object
    * [~getParamValue(attr, data)](#markdown-header-modelstriggergetparamvalueattr-data-) ⇒ *

### models/trigger~Trigger
**Kind**: inner class of [models/trigger](#markdown-header-modelstrigger)  

* [~Trigger](#markdown-header-modelstriggertrigger)
    * [new Trigger(hookID)](#markdown-header-new-triggerhookid)
    * [.hookID](#markdown-header-triggerhookid-string) : string
    * [.definition](#markdown-header-triggerdefinition-moduledwobjectcustomattributes) : module:dw/object/CustomAttributes
    * [.attributes](#markdown-header-triggerattributes-object) : Object
    * [.message](#markdown-header-triggermessage-modulemodelsmessagemessage) : Message
    * [.isEnabled()](#markdown-header-triggerisenabled-boolean) ⇒ boolean

#### new Trigger(hookID)
Trigger constructor


| Param | Type |
| --- | --- |
| hookID | string | 

#### trigger.hookID : string
The instance hook ID

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.definition : module:dw/object/CustomAttributes
Definition object

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.attributes : Object
Expanded attributes from trigger definition

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.message : Message
The current Message instance

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.isEnabled() ⇒ boolean
Returns whether this trigger is enabled

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  
### models/trigger~getTriggerDefinitionObject(hookID) ⇒ module:dw/object/CustomAttributes
Fetches trigger definition from Custom Object

**Kind**: inner method of [models/trigger](#markdown-header-modelstrigger)  
**See**: [[dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html}]([dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html})

| Param | Type |
| --- | --- |
| hookID | string | 

### models/trigger~mergeAttributes(newAttributes, oldAttributes)
Merges attribute JS objects in place, preserving old values

**Kind**: inner method of [models/trigger](#markdown-header-modelstrigger)  

| Param | Type |
| --- | --- |
| newAttributes | Object | 
| oldAttributes | Object | 

### models/trigger~expandAttributes(definition) ⇒ Object
Expands Subscriber Attributes from JSON definition

**Kind**: inner method of [models/trigger](#markdown-header-modelstrigger)  
**See**: [[dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html}]([dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html})

| Param | Type |
| --- | --- |
| definition | module:dw/object/CustomAttributes | 

### models/trigger~getTriggerDefinition(hookID, attributes) ⇒ Object
Returns trigger definition for a hook

**Kind**: inner method of [models/trigger](#markdown-header-modelstrigger)  

| Param | Type |
| --- | --- |
| hookID | string | 
| attributes | Object | 

### models/trigger~getParamValue(attr, data) ⇒ *
Returns parameter value from data (uses recursion)

**Kind**: inner method of [models/trigger](#markdown-header-modelstrigger)  

| Param | Type | Description |
| --- | --- | --- |
| attr | string | Period-delimited path to a parameter |
| data | Object |  |

## models/util/helpers

* [models/util/helpers](#markdown-header-modelsutilhelpers)
    * [.isObject(obj)](#markdown-header-modelsutilhelpersisobjectobj-boolean) ⇒ boolean
    * [.ucfirst(str)](#markdown-header-modelsutilhelpersucfirststr-string) ⇒ string
    * [.dwValue(obj)](#markdown-header-modelsutilhelpersdwvalueobj-) ⇒ *

### models/util/helpers.isObject(obj) ⇒ boolean
Checks if submitted value type is an Object (and not an Array)

**Kind**: static method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | * | Object to be checked |

### models/util/helpers.ucfirst(str) ⇒ string
Uppercases first char of string

**Kind**: static method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| str | string | String to uppercased |

### models/util/helpers.dwValue(obj) ⇒ *
Returns an object's preferred value, based on what DW object type it represents

**Kind**: static method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | * | Object to use for value return |

## int_marketing_cloud : Object
Registry object


* [int_marketing_cloud](#markdown-header-int_marketing_cloud-object) : Object
    * [.authToken()](#markdown-header-int_marketing_cloudauthtoken-modulemodelsauthtokenauthtoken) ⇒ AuthToken
    * [.message(customerKey, sendID)](#markdown-header-int_marketing_cloudmessagecustomerkey-sendid-modulemodelsmessagemessage) ⇒ Message
    * [.trigger(hookID)](#markdown-header-int_marketing_cloudtriggerhookid-modulemodelstriggertrigger) ⇒ Trigger

### int_marketing_cloud.authToken() ⇒ AuthToken
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [AuthToken](#markdown-header-new-authtoken) - Instance of AuthToken  
### int_marketing_cloud.message(customerKey, sendID) ⇒ Message
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [Message](#markdown-header-new-messagecustomerkey-sendid) - Instance of Message  

| Param | Type | Description |
| --- | --- | --- |
| customerKey | string | CustomerKey of the entry event send definition. Either this or the SendID is required. |
| sendID | string | ID of the entry event send definition. Either this or the customer key is required. |

### int_marketing_cloud.trigger(hookID) ⇒ Trigger
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  

| Param | Type | Description |
| --- | --- | --- |
| hookID | string | The trigger hook ID |

## template/footer

* [template/footer](#markdown-header-templatefooter)
    * [~stringifyError(key, value)](#markdown-header-templatefooterstringifyerrorkey-value-) ⇒ *
    * [~afterFooter(params)](#markdown-header-templatefooterafterfooterparams)

### template/footer~stringifyError(key, value) ⇒ *
Helper method to stringify an Error instance

**Kind**: inner method of [template/footer](#markdown-header-templatefooter)  

| Param | Type |
| --- | --- |
| key | string | 
| value | * | 

### template/footer~afterFooter(params)
Template-based hook function
Used here to insert Marketing Cloud tracking analytics into each page
Doesn't return any value, so other hooks can also execute

**Kind**: inner method of [template/footer](#markdown-header-templatefooter)  

| Param | Type | Description |
| --- | --- | --- |
| params | Object | Parameters from the template, includes requesting page's pdict as `pageParams` property |

