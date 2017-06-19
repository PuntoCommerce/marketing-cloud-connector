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
[feeds/customers](#markdown-header-feedscustomers) | 
[feeds/orders](#markdown-header-feedsorders) | 
[feeds/upload](#markdown-header-feedsupload) | 
[init/bootstrap](#markdown-header-initbootstrap) | 
[init/rest](#markdown-header-initrest) | 
[models/authToken](#markdown-header-modelsauthtoken) | 
[models/dataExport](#markdown-header-modelsdataexport) | 
[models/dataExportStatus](#markdown-header-modelsdataexportstatus) | 
[models/event](#markdown-header-modelsevent) | 
[models/export](#markdown-header-modelsexport) | 
[models/message](#markdown-header-modelsmessage) | 
[models/trigger](#markdown-header-modelstrigger) | 
[models/util/helpers](#markdown-header-modelsutilhelpers) | 
[int_marketing_cloud](#markdown-header-int_marketing_cloud-object) : Object | Registry object
[template/footer](#markdown-header-templatefooter) | 

## communication/account

* [communication/account](#markdown-header-communicationaccount)
    * [~sendTrigger(hookID, promise, data)](#markdown-header-communicationaccountsendtriggerhookid-promise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~created(promise, data)](#markdown-header-communicationaccountcreatedpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~updated(promise, data)](#markdown-header-communicationaccountupdatedpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~passwordChanged(promise, data)](#markdown-header-communicationaccountpasswordchangedpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~passwordReset(promise, data)](#markdown-header-communicationaccountpasswordresetpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~lockedOut(promise, data)](#markdown-header-communicationaccountlockedoutpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~triggerDefinitions()](#markdown-header-communicationaccounttriggerdefinitions-object) ⇒ Object

### communication/account~sendTrigger(hookID, promise, data) ⇒ SynchronousPromise
Wrapper to trigger.sendTrigger() to allow common variable injection for all hooks in the file

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param |
| --- |
| hookID | 
| promise | 
| data | 

### communication/account~created(promise, data) ⇒ SynchronousPromise
Trigger account created notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | CustomerNotification | 

### communication/account~updated(promise, data) ⇒ SynchronousPromise
Trigger account updated notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | CustomerNotification | 

### communication/account~passwordChanged(promise, data) ⇒ SynchronousPromise
Trigger password changed notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | CustomerNotification | 

### communication/account~passwordReset(promise, data) ⇒ SynchronousPromise
Trigger password reset notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | CustomerNotification | 

### communication/account~lockedOut(promise, data) ⇒ SynchronousPromise
Trigger account locked out notification

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | CustomerNotification | 

### communication/account~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/account](#markdown-header-communicationaccount)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/customerService

* [communication/customerService](#markdown-header-communicationcustomerservice)
    * [~contactUs(promise, data)](#markdown-header-communicationcustomerservicecontactuspromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~customFromTo(trigger, data)](#markdown-header-communicationcustomerservicecustomfromtotrigger-data)
    * [~triggerDefinitions()](#markdown-header-communicationcustomerservicetriggerdefinitions-object) ⇒ Object

### communication/customerService~contactUs(promise, data) ⇒ SynchronousPromise
Trigger a customer service notification

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | CustomerNotification | 

### communication/customerService~customFromTo(trigger, data)
Override the trigger message from/to values

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  

| Param | Type |
| --- | --- |
| trigger | Trigger | 
| data | CustomerNotification | 

### communication/customerService~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/customerService](#markdown-header-communicationcustomerservice)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/giftCertificate

* [communication/giftCertificate](#markdown-header-communicationgiftcertificate)
    * [~sendCertificate(promise, data)](#markdown-header-communicationgiftcertificatesendcertificatepromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~triggerDefinitions()](#markdown-header-communicationgiftcertificatetriggerdefinitions-object) ⇒ Object

### communication/giftCertificate~sendCertificate(promise, data) ⇒ SynchronousPromise
Trigger a gift certificate notification

**Kind**: inner method of [communication/giftCertificate](#markdown-header-communicationgiftcertificate)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
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
    * [~confirmation(promise, data)](#markdown-header-communicationorderconfirmationpromise-data-synchronouspromise) ⇒ SynchronousPromise
    * [~triggerDefinitions()](#markdown-header-communicationordertriggerdefinitions-object) ⇒ Object

### communication/order~confirmation(promise, data) ⇒ SynchronousPromise
Trigger an order confirmation notification

**Kind**: inner method of [communication/order](#markdown-header-communicationorder)  

| Param | Type |
| --- | --- |
| promise | SynchronousPromise | 
| data | CustomerNotification | 

### communication/order~triggerDefinitions() ⇒ Object
Declares attributes available for data mapping configuration

**Kind**: inner method of [communication/order](#markdown-header-communicationorder)  
**Returns**: Object - Map of hook function to an array of strings  
## communication/util/trigger

* [communication/util/trigger](#markdown-header-communicationutiltrigger)
    * [~sendTrigger(hookID, promise, data, [cb])](#markdown-header-communicationutiltriggersendtriggerhookid-promise-data-cb-synchronouspromise) ⇒ SynchronousPromise
    * [~CustomerNotification](#markdown-header-communicationutiltriggercustomernotification-object) : Object

### communication/util/trigger~sendTrigger(hookID, promise, data, [cb]) ⇒ SynchronousPromise
Trigger a customer notification
Resolves promise with a {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure

**Kind**: inner method of [communication/util/trigger](#markdown-header-communicationutiltrigger)  

| Param | Type | Description |
| --- | --- | --- |
| hookID | string |  |
| promise | SynchronousPromise |  |
| data | CustomerNotification |  |
| [cb] | function | Optional callback, is called with the created trigger instance and the data object |

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
| params.CurrentForms | dw/web/Forms ⎮ dw.web.Forms | The forms available in current session |
| params.CurrentHttpParameterMap | dw/web/HttpParameterMap ⎮ dw.web.HttpParameterMap | The parameters in current request |
| params.CurrentCustomer | dw/customer/Customer ⎮ dw.customer.Customer | The current customer |

## feeds/catalog

* [feeds/catalog](#markdown-header-feedscatalog)
    * [~exportModel](#markdown-header-feedscatalogexportmodel-modulemodelsexportexport) : Export
    * [~ProductMgr](#markdown-header-feedscatalogproductmgr-dwcatalogproductmgrdwcatalogproductmgr) : dw/catalog/ProductMgr ⎮ dw.catalog.ProductMgr
    * [~Export](#markdown-header-feedscatalogexport-modulemodelsexportexport) : [Export](#markdown-header-feedscatalogexport-modulemodelsexportexport)
    * [~process(product, parameters, stepExecution)](#markdown-header-feedscatalogprocessproduct-parameters-stepexecution-voidarray) ⇒ void ⎮ Array

### feeds/catalog~exportModel : [Export](#markdown-header-feedscatalogexport-modulemodelsexportexport)
**Kind**: inner property of [feeds/catalog](#markdown-header-feedscatalog)  
**See**: [https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/](https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/)
### feeds/catalog~ProductMgr : dw/catalog/ProductMgr ⎮ dw.catalog.ProductMgr
**Kind**: inner constant of [feeds/catalog](#markdown-header-feedscatalog)  
### feeds/catalog~Export : [Export](#markdown-header-feedscatalogexport-modulemodelsexportexport)
**Kind**: inner constant of [feeds/catalog](#markdown-header-feedscatalog)  
### feeds/catalog~process(product, parameters, stepExecution) ⇒ void ⎮ Array
**Kind**: inner method of [feeds/catalog](#markdown-header-feedscatalog)  

| Param | Type |
| --- | --- |
| product | dw/catalog/Product ⎮ dw.catalog.Product | 
| parameters |  | 
| stepExecution |  | 

## feeds/content
## feeds/customers

* [feeds/customers](#markdown-header-feedscustomers)
    * [~exportModel](#markdown-header-feedscustomersexportmodel-modulemodelsexportexport) : Export
    * [~CustomerMgr](#markdown-header-feedscustomerscustomermgr-dwcustomercustomermgrdwcustomercustomermgr) : dw/customer/CustomerMgr ⎮ dw.customer.CustomerMgr
    * [~Export](#markdown-header-feedscustomersexport-modulemodelsexportexport) : [Export](#markdown-header-feedscustomersexport-modulemodelsexportexport)
    * [~process(profile, parameters, stepExecution)](#markdown-header-feedscustomersprocessprofile-parameters-stepexecution-voidarray) ⇒ void ⎮ Array

### feeds/customers~exportModel : [Export](#markdown-header-feedscustomersexport-modulemodelsexportexport)
**Kind**: inner property of [feeds/customers](#markdown-header-feedscustomers)  
**See**: [https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/](https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/)
### feeds/customers~CustomerMgr : dw/customer/CustomerMgr ⎮ dw.customer.CustomerMgr
**Kind**: inner constant of [feeds/customers](#markdown-header-feedscustomers)  
### feeds/customers~Export : [Export](#markdown-header-feedscustomersexport-modulemodelsexportexport)
**Kind**: inner constant of [feeds/customers](#markdown-header-feedscustomers)  
### feeds/customers~process(profile, parameters, stepExecution) ⇒ void ⎮ Array
**Kind**: inner method of [feeds/customers](#markdown-header-feedscustomers)  

| Param | Type |
| --- | --- |
| profile | dw/customer/Profile ⎮ dw.customer.Profile | 
| parameters |  | 
| stepExecution |  | 

## feeds/orders

* [feeds/orders](#markdown-header-feedsorders)
    * [~exportModel](#markdown-header-feedsordersexportmodel-modulemodelsexportexport) : Export
    * [~OrderMgr](#markdown-header-feedsordersordermgr-dworderordermgrdworderordermgr) : dw/order/OrderMgr ⎮ dw.order.OrderMgr
    * [~Export](#markdown-header-feedsordersexport-modulemodelsexportexport) : [Export](#markdown-header-feedsordersexport-modulemodelsexportexport)
    * [~process(order, parameters, stepExecution)](#markdown-header-feedsordersprocessorder-parameters-stepexecution-voidarray) ⇒ void ⎮ Array

### feeds/orders~exportModel : [Export](#markdown-header-feedsordersexport-modulemodelsexportexport)
**Kind**: inner property of [feeds/orders](#markdown-header-feedsorders)  
**See**: [https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/](https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/)
### feeds/orders~OrderMgr : dw/order/OrderMgr ⎮ dw.order.OrderMgr
**Kind**: inner constant of [feeds/orders](#markdown-header-feedsorders)  
### feeds/orders~Export : [Export](#markdown-header-feedsordersexport-modulemodelsexportexport)
**Kind**: inner constant of [feeds/orders](#markdown-header-feedsorders)  
### feeds/orders~process(order, parameters, stepExecution) ⇒ void ⎮ Array
**Kind**: inner method of [feeds/orders](#markdown-header-feedsorders)  

| Param | Type |
| --- | --- |
| order | dw/order/Order ⎮ dw.order.Order | 
| parameters |  | 
| stepExecution |  | 

## feeds/upload

* [feeds/upload](#markdown-header-feedsupload)
    * [~File](#markdown-header-feedsuploadfile-dwiofiledwiofile) : dw/io/File ⎮ dw.io.File
    * [~ServiceRegistry](#markdown-header-feedsuploadserviceregistry-dwsvcserviceregistrydwsvcserviceregistry) : dw/svc/ServiceRegistry ⎮ dw.svc.ServiceRegistry
    * [~Status](#markdown-header-feedsuploadstatus-dwsystemstatusdwsystemstatus) : dw/system/Status ⎮ dw.system.Status
    * [~registerSFTP(serviceID)](#markdown-header-feedsuploadregistersftpserviceid-dwsvcftpservicedwioftpservice) ⇒ dw/svc/FTPService ⎮ dw.io.FTPService

### feeds/upload~File : dw/io/File ⎮ dw.io.File
**Kind**: inner constant of [feeds/upload](#markdown-header-feedsupload)  
### feeds/upload~ServiceRegistry : dw/svc/ServiceRegistry ⎮ dw.svc.ServiceRegistry
**Kind**: inner constant of [feeds/upload](#markdown-header-feedsupload)  
### feeds/upload~Status : dw/system/Status ⎮ dw.system.Status
**Kind**: inner constant of [feeds/upload](#markdown-header-feedsupload)  
### feeds/upload~registerSFTP(serviceID) ⇒ dw/svc/FTPService ⎮ dw.io.FTPService
**Kind**: inner method of [feeds/upload](#markdown-header-feedsupload)  

| Param | Type |
| --- | --- |
| serviceID | string | 

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
        * [~authToken](#markdown-header-setauthheaderauthtoken-modulemodelsauthtokenauthtoken) : AuthToken
    * [~isValid401(client)](#markdown-header-initrestisvalid401client-boolean) ⇒ boolean
    * [~isResponseJSON(client)](#markdown-header-initrestisresponsejsonclient-boolean) ⇒ boolean
    * [~parseResponse(svc, client)](#markdown-header-initrestparseresponsesvc-client-object) ⇒ Object
    * [~createRequest(svc)](#markdown-header-initrestcreaterequestsvc)
    * [~createRequest(svc, message)](#markdown-header-initrestcreaterequestsvc-message-string) ⇒ string
    * [~createRequest(svc, sendID, customerKey, recipientSendID)](#markdown-header-initrestcreaterequestsvc-sendid-customerkey-recipientsendid)
    * [~createRequest(svc, event)](#markdown-header-initrestcreaterequestsvc-event-string) ⇒ string

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
| svc | dw/svc/HTTPService ⎮ dw.svc.HTTPService | 

#### setAuthHeader~authToken : AuthToken
**Kind**: inner property of setAuthHeader  
### init/rest~isValid401(client) ⇒ boolean
Check if 401 due to expired token

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: boolean - true if expired auth token  

| Param | Type |
| --- | --- |
| client | dw/svc/HTTPService ⎮ dw.svc.HTTPService | 

### init/rest~isResponseJSON(client) ⇒ boolean
Check if response type is JSON

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| client | dw/svc/HTTPService ⎮ dw.svc.HTTPService | 

### init/rest~parseResponse(svc, client) ⇒ Object
Parses response JSON and wraps with an object containing additional helper properties

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param | Type |
| --- | --- |
| svc | dw/svc/HTTPService ⎮ dw.svc.HTTPService | 
| client | dw/svc/HTTPService ⎮ dw.svc.HTTPService | 

### init/rest~createRequest(svc)
Create request for service authentication

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Throws**:

- Error Throws error when service credentials are missing

**Todo**

- [ ] Switch credentials based on site suffix, fall back on a default


| Param | Type |
| --- | --- |
| svc | dw/svc/HTTPService ⎮ dw.svc.HTTPService | 

### init/rest~createRequest(svc, message) ⇒ string
Create request for sending an email

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: string - Request body  

| Param | Type | Description |
| --- | --- | --- |
| svc | dw/svc/HTTPService ⎮ dw.svc.HTTPService |  |
| message | Message | A message model instance to be sent to Marketing Cloud |

### init/rest~createRequest(svc, sendID, customerKey, recipientSendID)
Create request for viewing delivery records

**Kind**: inner method of [init/rest](#markdown-header-initrest)  

| Param |
| --- |
| svc | 
| sendID | 
| customerKey | 
| recipientSendID | 

### init/rest~createRequest(svc, event) ⇒ string
Create request for posting an event

**Kind**: inner method of [init/rest](#markdown-header-initrest)  
**Returns**: string - Request body  

| Param | Type | Description |
| --- | --- | --- |
| svc | dw/svc/HTTPService ⎮ dw.svc.HTTPService |  |
| event | Event | An event model instance to be sent to Marketing Cloud |

## models/authToken

* [models/authToken](#markdown-header-modelsauthtoken)
    * [~AuthToken](#markdown-header-modelsauthtokenauthtoken)
        * [new AuthToken()](#markdown-header-new-authtoken)
        * [.token](#markdown-header-authtokentoken-object) : Object
        * [.isValidAuth()](#markdown-header-authtokenisvalidauth-boolean) ⇒ boolean
        * [.getValidToken()](#markdown-header-authtokengetvalidtoken-booleanobject) ⇒ boolean ⎮ Object
    * [~getObject()](#markdown-header-modelsauthtokengetobject-dwobjectcustomattributesdwobjectcustomattributes) ⇒ dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
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
### models/authToken~getObject() ⇒ dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
Retrieves cached token from custom object storage
If no existing token object, an empty one is created

**Kind**: inner method of [models/authToken](#markdown-header-modelsauthtoken)  
**Returns**: dw/object/CustomAttributes ⎮ dw.object.CustomAttributes - Returns token custom attributes  
### models/authToken~updateCachedTokenObject(obj) ⇒ Object
Puts token into custom object storage

**Kind**: inner method of [models/authToken](#markdown-header-modelsauthtoken)  
**Returns**: Object - Returns the same plain JS object  

| Param | Type | Description |
| --- | --- | --- |
| obj | Object | A plain JS object with the token |

## models/dataExport

* [models/dataExport](#markdown-header-modelsdataexport)
    * [~DataExport](#markdown-header-modelsdataexportdataexport)
        * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
        * [.exportID](#markdown-header-dataexportexportid-string) : string
        * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributesdwobjectcustomattributes) : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
        * [.attributes](#markdown-header-dataexportattributes-object) : Object
        * [.header](#markdown-header-dataexportheader-array) : Array
        * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus

### models/dataExport~DataExport
**Kind**: inner class of [models/dataExport](#markdown-header-modelsdataexport)  

* [~DataExport](#markdown-header-modelsdataexportdataexport)
    * [new DataExport(exportID)](#markdown-header-new-dataexportexportid)
    * [.exportID](#markdown-header-dataexportexportid-string) : string
    * [.definition](#markdown-header-dataexportdefinition-dwobjectcustomattributesdwobjectcustomattributes) : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
    * [.attributes](#markdown-header-dataexportattributes-object) : Object
    * [.header](#markdown-header-dataexportheader-array) : Array
    * [.lastExportStatus](#markdown-header-dataexportlastexportstatus-dataexportstatus) : DataExportStatus

#### new DataExport(exportID)
DataExport constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### dataExport.exportID : string
The export ID

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.definition : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.attributes : Object
Expanded attributes from dataExport definition

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.header : Array
Array header (attributes object values)

**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
#### dataExport.lastExportStatus : DataExportStatus
**Kind**: instance property of [DataExport](#markdown-header-new-dataexportexportid)  
## models/dataExportStatus

* [models/dataExportStatus](#markdown-header-modelsdataexportstatus)
    * [~DataExportStatus](#markdown-header-modelsdataexportstatusdataexportstatus)
        * [new DataExportStatus(exportID)](#markdown-header-new-dataexportstatusexportid)
        * [.siteID_exportID](#markdown-header-dataexportstatussiteid_exportid-string) : string
        * [._definition](#markdown-header-dataexportstatus_definition-dwobjectcustomattributesdwobjectcustomattributes) : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
        * [.lastExported](#markdown-header-dataexportstatuslastexported-date) : Date

### models/dataExportStatus~DataExportStatus
**Kind**: inner class of [models/dataExportStatus](#markdown-header-modelsdataexportstatus)  

* [~DataExportStatus](#markdown-header-modelsdataexportstatusdataexportstatus)
    * [new DataExportStatus(exportID)](#markdown-header-new-dataexportstatusexportid)
    * [.siteID_exportID](#markdown-header-dataexportstatussiteid_exportid-string) : string
    * [._definition](#markdown-header-dataexportstatus_definition-dwobjectcustomattributesdwobjectcustomattributes) : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
    * [.lastExported](#markdown-header-dataexportstatuslastexported-date) : Date

#### new DataExportStatus(exportID)
DataExportStatus constructor


| Param | Type |
| --- | --- |
| exportID | string | 

#### dataExportStatus.siteID_exportID : string
The site ID + export ID

**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
#### dataExportStatus._definition : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
Definition object

**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
#### dataExportStatus.lastExported : Date
Date last exported

**Kind**: instance property of [DataExportStatus](#markdown-header-new-dataexportstatusexportid)  
## models/event

* [models/event](#markdown-header-modelsevent)
    * [~Event](#markdown-header-modelseventevent)
        * [new Event(contactKey, eventKey)](#markdown-header-new-eventcontactkey-eventkey)
        * [.contactKey](#markdown-header-contactkey) : [string](#markdown-header-string)
        * [.eventDefinitionKey](#markdown-header-eventdefinitionkey) : [string](#markdown-header-string)
        * [.establishContactKey](#markdown-header-establishcontactkey) : [boolean](#markdown-header-boolean)
        * [.data](#markdown-header-data) : [Object](#markdown-header-object)
        * [.setEstablishContactKey(enabled)](#markdown-header-setestablishcontactkey) ⇒ [Event](#markdown-header-event)
        * [.setDataAttribute(key, value)](#markdown-header-setdataattribute) ⇒ [Event](#markdown-header-event)
        * [.toJSON()](#markdown-header-tojson) ⇒ [Object](#markdown-header-object)
    * [~messageToJson(obj)](#markdown-header-modelseventmessagetojsonobj-object) ⇒ Object

### models/event~Event
**Kind**: inner class of [models/event](#markdown-header-modelsevent)  

* [~Event](#markdown-header-modelseventevent)
    * [new Event(contactKey, eventKey)](#markdown-header-new-eventcontactkey-eventkey)
    * [.contactKey](#markdown-header-contactkey) : [string](#markdown-header-string)
    * [.eventDefinitionKey](#markdown-header-eventdefinitionkey) : [string](#markdown-header-string)
    * [.establishContactKey](#markdown-header-establishcontactkey) : [boolean](#markdown-header-boolean)
    * [.data](#markdown-header-data) : [Object](#markdown-header-object)
    * [.setEstablishContactKey(enabled)](#markdown-header-setestablishcontactkey) ⇒ [Event](#markdown-header-event)
    * [.setDataAttribute(key, value)](#markdown-header-setdataattribute) ⇒ [Event](#markdown-header-event)
    * [.toJSON()](#markdown-header-tojson) ⇒ [Object](#markdown-header-object)

#### new Event(contactKey, eventKey)
Event class


| Param | Type | Description |
| --- | --- | --- |
| contactKey | string | The ID that uniquely identifies a subscriber/contact |
| eventKey | string | The EventDefinitionKey in Event Administration after the event is created and saved |

#### event.contactKey : [string](#markdown-header-string)
Contact key

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.eventDefinitionKey : [string](#markdown-header-string)
Event definition key

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.establishContactKey : [boolean](#markdown-header-boolean)
Whether to add contact key to contact model

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.data : [Object](#markdown-header-object)
Data object
Properties of the event. Only required if defined in a custom event or by the event.

**Kind**: instance property of [Event](#markdown-header-new-eventcontactkey-eventkey)  
#### event.setEstablishContactKey(enabled) ⇒ [Event](#markdown-header-event)
If true, the contact key is automatically added to the contact model if it isn't already included, making
it available to be injected into the journey. Default is true.

**Kind**: instance method of [Event](#markdown-header-new-eventcontactkey-eventkey)  

| Param | Type |
| --- | --- |
| enabled | boolean | 

#### event.setDataAttribute(key, value) ⇒ [Event](#markdown-header-event)
Set a data attribute

**Kind**: instance method of [Event](#markdown-header-new-eventcontactkey-eventkey)  

| Param | Type |
| --- | --- |
| key | string | 
| value | * | 

#### event.toJSON() ⇒ [Object](#markdown-header-object)
Builds up a formatted object for JSON.stringify()

**Kind**: instance method of [Event](#markdown-header-new-eventcontactkey-eventkey)  
### models/event~messageToJson(obj) ⇒ Object
Recursive method to handle Event during JSON.stringify().
Used to ensure exported JSON is webservice compatible

**Kind**: inner method of [models/event](#markdown-header-modelsevent)  

| Param | Type |
| --- | --- |
| obj | [Event](#markdown-header-new-eventcontactkey-eventkey) ⎮ Object | 

## models/export

* [models/export](#markdown-header-modelsexport)
    * [~Export](#markdown-header-modelsexportexport)
        * [new Export(params, seekableCallback)](#markdown-header-new-exportparams-seekablecallback)
        * [.isIncremental](#markdown-header-exportisincremental-boolean) : boolean
        * [.lastExported](#markdown-header-exportlastexported-date) : Date
        * [.header](#markdown-header-exportheader-array) : Array
        * [.seekableIterator](#markdown-header-exportseekableiterator-dwutilseekableiteratordwutilseekableiterator) : dw/util/SeekableIterator ⎮ dw.util.SeekableIterator
        * [.buildRow(data)](#markdown-header-exportbuildrowdata-arraystring) ⇒ Array.<String>
        * [.writeRow(data)](#markdown-header-exportwriterowdata)
    * [~File](#markdown-header-modelsexportfile-dwiofiledwiofile) : dw/io/File ⎮ dw.io.File
    * [~FileWriter](#markdown-header-modelsexportfilewriter-dwiofilewriterdwiofilewriter) : dw/io/FileWriter ⎮ dw.io.FileWriter
    * [~CSVStreamWriter](#markdown-header-modelsexportcsvstreamwriter-dwiocsvstreamwriterdwiocsvstreamwriter) : dw/io/CSVStreamWriter ⎮ dw.io.CSVStreamWriter

### models/export~Export
**Kind**: inner class of [models/export](#markdown-header-modelsexport)  

* [~Export](#markdown-header-modelsexportexport)
    * [new Export(params, seekableCallback)](#markdown-header-new-exportparams-seekablecallback)
    * [.isIncremental](#markdown-header-exportisincremental-boolean) : boolean
    * [.lastExported](#markdown-header-exportlastexported-date) : Date
    * [.header](#markdown-header-exportheader-array) : Array
    * [.seekableIterator](#markdown-header-exportseekableiterator-dwutilseekableiteratordwutilseekableiterator) : dw/util/SeekableIterator ⎮ dw.util.SeekableIterator
    * [.buildRow(data)](#markdown-header-exportbuildrowdata-arraystring) ⇒ Array.<String>
    * [.writeRow(data)](#markdown-header-exportwriterowdata)

#### new Export(params, seekableCallback)

| Param | Type |
| --- | --- |
| params | object | 
| seekableCallback | function | 

#### export.isIncremental : boolean
**Kind**: instance property of [Export](#markdown-header-new-exportparams-seekablecallback)  
#### export.lastExported : Date
**Kind**: instance property of [Export](#markdown-header-new-exportparams-seekablecallback)  
#### export.header : Array
**Kind**: instance property of [Export](#markdown-header-new-exportparams-seekablecallback)  
#### export.seekableIterator : dw/util/SeekableIterator ⎮ dw.util.SeekableIterator
**Kind**: instance property of [Export](#markdown-header-new-exportparams-seekablecallback)  
#### export.buildRow(data) ⇒ Array.<String>
Translates object into an array of mapped values

**Kind**: instance method of [Export](#markdown-header-new-exportparams-seekablecallback)  

| Param | Type |
| --- | --- |
| data | Object | 

#### export.writeRow(data)
Writes array of data to file

**Kind**: instance method of [Export](#markdown-header-new-exportparams-seekablecallback)  

| Param | Type |
| --- | --- |
| data | dw/util/ArrayList ⎮ dw.util.ArrayList | 

### models/export~File : dw/io/File ⎮ dw.io.File
**Kind**: inner constant of [models/export](#markdown-header-modelsexport)  
### models/export~FileWriter : dw/io/FileWriter ⎮ dw.io.FileWriter
**Kind**: inner constant of [models/export](#markdown-header-modelsexport)  
### models/export~CSVStreamWriter : dw/io/CSVStreamWriter ⎮ dw.io.CSVStreamWriter
**Kind**: inner constant of [models/export](#markdown-header-modelsexport)  
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
    * [~convertValues(obj)](#markdown-header-modelsmessageconvertvaluesobj-object) ⇒ Object

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

### models/message~convertValues(obj) ⇒ Object
Handle value type conversion for Message

**Kind**: inner method of [models/message](#markdown-header-modelsmessage)  

| Param | Type |
| --- | --- |
| obj | Object | 

## models/trigger

* [models/trigger](#markdown-header-modelstrigger)
    * [~Trigger](#markdown-header-modelstriggertrigger)
        * [new Trigger(hookID)](#markdown-header-new-triggerhookid)
        * [.hookID](#markdown-header-triggerhookid-string) : string
        * [.definition](#markdown-header-triggerdefinition-dwobjectcustomattributesdwobjectcustomattributes) : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
        * [.attributes](#markdown-header-triggerattributes-object) : Object
        * [.message](#markdown-header-triggermessage-modulemodelsmessagemessage) : Message
        * [.rebuild()](#markdown-header-triggerrebuild)
        * [.newMessage(data)](#markdown-header-triggernewmessagedata-modulemodelsmessagemessage) ⇒ Message
        * [.send()](#markdown-header-triggersend-dwsvcresultdwsvcresult) ⇒ dw/svc/Result ⎮ dw.svc.Result
            * [~msgSvc](#markdown-header-sendmsgsvc-dwsvcservicedwsvcservice) : dw/svc/Service ⎮ dw.svc.Service
        * [.isEnabled()](#markdown-header-triggerisenabled-boolean) ⇒ boolean
    * [~getTriggerDefinition(hookID, attributes)](#markdown-header-modelstriggergettriggerdefinitionhookid-attributes-object) ⇒ Object

### models/trigger~Trigger
**Kind**: inner class of [models/trigger](#markdown-header-modelstrigger)  

* [~Trigger](#markdown-header-modelstriggertrigger)
    * [new Trigger(hookID)](#markdown-header-new-triggerhookid)
    * [.hookID](#markdown-header-triggerhookid-string) : string
    * [.definition](#markdown-header-triggerdefinition-dwobjectcustomattributesdwobjectcustomattributes) : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
    * [.attributes](#markdown-header-triggerattributes-object) : Object
    * [.message](#markdown-header-triggermessage-modulemodelsmessagemessage) : Message
    * [.rebuild()](#markdown-header-triggerrebuild)
    * [.newMessage(data)](#markdown-header-triggernewmessagedata-modulemodelsmessagemessage) ⇒ Message
    * [.send()](#markdown-header-triggersend-dwsvcresultdwsvcresult) ⇒ dw/svc/Result ⎮ dw.svc.Result
        * [~msgSvc](#markdown-header-sendmsgsvc-dwsvcservicedwsvcservice) : dw/svc/Service ⎮ dw.svc.Service
    * [.isEnabled()](#markdown-header-triggerisenabled-boolean) ⇒ boolean

#### new Trigger(hookID)
Trigger constructor


| Param | Type |
| --- | --- |
| hookID | string | 

#### trigger.hookID : string
The instance hook ID

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.definition : dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
Definition object

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.attributes : Object
Expanded attributes from trigger definition

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.message : Message
The current Message instance

**Kind**: instance property of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.rebuild()
Rebuilds trigger definition in Custom Object

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  
#### trigger.newMessage(data) ⇒ Message
Returns a new Message instance

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  

| Param | Type | Description |
| --- | --- | --- |
| data | CustomerNotification | Data to populate the Message with. |

#### trigger.send() ⇒ dw/svc/Result ⎮ dw.svc.Result
Sends a trigger message

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  
##### send~msgSvc : dw/svc/Service ⎮ dw.svc.Service
**Kind**: inner property of send  
#### trigger.isEnabled() ⇒ boolean
Returns whether this trigger is enabled

**Kind**: instance method of [Trigger](#markdown-header-new-triggerhookid)  
### models/trigger~getTriggerDefinition(hookID, attributes) ⇒ Object
Returns trigger definition for a hook

**Kind**: inner method of [models/trigger](#markdown-header-modelstrigger)  

| Param | Type |
| --- | --- |
| hookID | string | 
| attributes | Object | 

## models/util/helpers

* [models/util/helpers](#markdown-header-modelsutilhelpers)
    * _static_
        * [.isObject(obj)](#markdown-header-modelsutilhelpersisobjectobj-boolean) ⇒ boolean
        * [.ucfirst(str)](#markdown-header-modelsutilhelpersucfirststr-string) ⇒ string
        * [.dwValue(obj)](#markdown-header-modelsutilhelpersdwvalueobj-) ⇒ *
    * _inner_
        * [~expandAttributes(attrJSON)](#markdown-header-modelsutilhelpersexpandattributesattrjson-object) ⇒ Object
        * [~getCustomObject(customObjectName, objectID)](#markdown-header-modelsutilhelpersgetcustomobjectcustomobjectname-objectid-dwobjectcustomattributesdwobjectcustomattributes) ⇒ dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
        * [~mergeAttributes(newAttributes, oldAttributes)](#markdown-header-modelsutilhelpersmergeattributesnewattributes-oldattributes)
        * [~getParamValue(attr, data)](#markdown-header-modelsutilhelpersgetparamvalueattr-data-) ⇒ *
        * [~mapValues(obj, data, outputCallback)](#markdown-header-modelsutilhelpersmapvaluesobj-data-outputcallback)
        * [~objValues(obj)](#markdown-header-modelsutilhelpersobjvaluesobj-array) ⇒ Array
        * [~isNonEmptyString(str)](#markdown-header-modelsutilhelpersisnonemptystringstr-boolean) ⇒ boolean

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
| str | string | String to uppercase |

### models/util/helpers.dwValue(obj) ⇒ *
Returns an object's preferred value, based on what DW object type it represents

**Kind**: static method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | * | Object to use for value return |

### models/util/helpers~expandAttributes(attrJSON) ⇒ Object
Expands JSON attributes

**Kind**: inner method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type |
| --- | --- |
| attrJSON | string | 

### models/util/helpers~getCustomObject(customObjectName, objectID) ⇒ dw/object/CustomAttributes ⎮ dw.object.CustomAttributes
Fetches object definition from Custom Object, creating it if not exists

**Kind**: inner method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type |
| --- | --- |
| customObjectName | string | 
| objectID | string | 

### models/util/helpers~mergeAttributes(newAttributes, oldAttributes)
Merges attribute JS objects in place, preserving old values

**Kind**: inner method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type |
| --- | --- |
| newAttributes | Object | 
| oldAttributes | Object | 

### models/util/helpers~getParamValue(attr, data) ⇒ *
Returns parameter value from data (uses recursion)

**Kind**: inner method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| attr | string | Period-delimited path to a parameter |
| data | Object |  |

### models/util/helpers~mapValues(obj, data, outputCallback)
Handles object key/value mapping, writes to callback that accepts key and value as params

**Kind**: inner method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type | Description |
| --- | --- | --- |
| obj | Object | Keys serve as the value path, Values serve as the key to be written to |
| data | Object | Source of data that should fulfill provide values to be mapped |
| outputCallback | function |  |

### models/util/helpers~objValues(obj) ⇒ Array
Return object values as an array

**Kind**: inner method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type |
| --- | --- |
| obj | Object | 

### models/util/helpers~isNonEmptyString(str) ⇒ boolean
**Kind**: inner method of [models/util/helpers](#markdown-header-modelsutilhelpers)  

| Param | Type |
| --- | --- |
| str | * | 

## int_marketing_cloud : Object
Registry object


* [int_marketing_cloud](#markdown-header-int_marketing_cloud-object) : Object
    * [.authToken()](#markdown-header-int_marketing_cloudauthtoken-modulemodelsauthtokenauthtoken) ⇒ AuthToken
        * [~model](#markdown-header-authtokenmodel-modulemodelsauthtokenauthtoken) : AuthToken
    * [.event(contactKey, eventKey)](#markdown-header-int_marketing_cloudeventcontactkey-eventkey-modulemodelseventevent) ⇒ Event
        * [~model](#markdown-header-model) : [Event](#markdown-header-event)
    * [.dataExport(exportID)](#markdown-header-int_marketing_clouddataexportexportid-modulemodelsdataexportdataexport) ⇒ DataExport
        * [~model](#markdown-header-dataexportmodel-modulemodelsdataexportdataexport) : DataExport
    * [.message(customerKey, sendID)](#markdown-header-int_marketing_cloudmessagecustomerkey-sendid-modulemodelsmessagemessage) ⇒ Message
        * [~model](#markdown-header-messagemodel-modulemodelsmessagemessage) : Message
    * [.trigger(hookID)](#markdown-header-int_marketing_cloudtriggerhookid-modulemodelstriggertrigger) ⇒ Trigger
        * [~model](#markdown-header-triggermodel-modulemodelstriggertrigger) : Trigger

### int_marketing_cloud.authToken() ⇒ AuthToken
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [AuthToken](#markdown-header-new-authtoken) - Instance of AuthToken  
#### authToken~model : AuthToken
**Kind**: inner property of authToken  
### int_marketing_cloud.event(contactKey, eventKey) ⇒ Event
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [Event](#markdown-header-new-eventcontactkey-eventkey) - Instance of Event  

| Param | Type | Description |
| --- | --- | --- |
| contactKey | string | The ID that uniquely identifies a subscriber/contact |
| eventKey | string | The EventDefinitionKey in Event Administration after the event is created and saved |

#### event~model : [Event](#markdown-header-event)
**Kind**: inner property of event  
### int_marketing_cloud.dataExport(exportID) ⇒ DataExport
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [DataExport](#markdown-header-new-dataexportexportid) - Instance of DataExport  

| Param | Type | Description |
| --- | --- | --- |
| exportID | string | The data export ID |

#### dataExport~model : DataExport
**Kind**: inner property of dataExport  
### int_marketing_cloud.message(customerKey, sendID) ⇒ Message
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [Message](#markdown-header-new-messagecustomerkey-sendid) - Instance of Message  

| Param | Type | Description |
| --- | --- | --- |
| customerKey | string | CustomerKey of the entry event send definition. Either this or the SendID is required. |
| sendID | string | ID of the entry event send definition. Either this or the customer key is required. |

#### message~model : Message
**Kind**: inner property of message  
### int_marketing_cloud.trigger(hookID) ⇒ Trigger
**Kind**: static method of [int_marketing_cloud](#markdown-header-int_marketing_cloud-object)  
**Returns**: [Trigger](#markdown-header-new-triggerhookid) - Instance of Trigger  

| Param | Type | Description |
| --- | --- | --- |
| hookID | string | The trigger hook ID |

#### trigger~model : Trigger
**Kind**: inner property of trigger  
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

