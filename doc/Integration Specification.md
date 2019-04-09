
# marketing-cloud-connector: Interation Specification #
---
###### - Done? Go Back to the [readMe.md](README.md)
**What is the marketing-cloud-connector?**   
A [Salesforce Labs](https://twitter.com/salesforce_labs?lang=en) project that facilitates an "above the API" integration between Salesforce B2C Commerce and Marketing Clouds.

## Additional Resources & Useful Links

* [Marketing Cloud Connector Installation Guide] (Installation Specification.md)
* [Marketing Cloud Connector Triggered Send Configuration](MC Connector Installation - Triggered Send Configuration.md)
* [Marketing Cloud Connector Repository](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector)
* [Handler Framework Dependencies](https://github.com/SalesforceCommerceCloud/handler-framework)
* [Handler Framework - Installation Guide](https://github.com/SalesforceCommerceCloud/handler-framework/wiki/Installation)

* * *

## Marketing Cloud Connector: Overview

The Marketing Cloud Connector is a reusable code asset to support the enablement and acceleration of specific integration use cases between Commerce Cloud and Marketing Cloud. SiteGenesis is used as a reference storefront for MC Connector cartridge integration. 

## Features & Requirements

The Marketing Cloud Connector cartridge will have new functionality added to it in an incremental manner. 

### Implemented requirements

**Transactional Emails**

The following OOB SiteGenesis emails are replaced with Marketing Cloud email triggers: 

1. Account - Created
2. Account - Updated
3. Account - Password Changed
4. Account - Password Reset
5. Account - Locked Out
6. Customer Service - Contact Us
7. Gift Certificate - Send Certificate
8. Order - Confirmation 

Transactional emails are built using the Salesforce Commerce Cloud platform hooks, leveraging "triggered email" functionality in Marketing Cloud, to send emails. Configurable trigger definitions, stored in Custom Objects, are used to support custom trigger keys and support mapping of data for each trigger, from predefined attribute values to data extension attributes that you define. Configuration can be used to achieve a mix and match of SiteGenesis emails with Marketing Cloud emails.

**Data Sync**

Catalog, content, customer, and order sync to Marketing Cloud via jobs.


## Integration Architecture Diagram

[[images/integration-specification-1.jpg]]

## Implementation Details

### Storefront integration touch-points

The Marketing Cloud Connector itself doesn’t have any touch-points in SiteGenesis, rather the Handler Framework that it depends on, does the SiteGenesis integration.

For more details, see the [Handler Framework - Installation Guide](https://bitbucket.org/demandware/marketing-cloud-connector/wiki/Handler%20Framework%20-%20Installation%20Guide).

### Implementation Approach

* CommonJS modules are used
    * one module for the triggers
    * one (or more) modules for the actual REST/SOAP service communication
    * no pipelines
    * JSDoc is used to comment extensively
* Hooks are used extensively for integration
    * Email triggers
    * Incorporating Analytics into the template
    * Product/Content Recommendations
    * Opt-in/Opt-out/Marketing preferences
* Support mixing of SiteGenesis email with Marketing Cloud triggered email
* Platform Service Framework is used to communicate to MC
    * service ID: marketingcloud.rest.messaging.send
    * service is used globally
    * endpoint/credentials would be managed as part of the service credentials configuration
    * support for site-specific credentials is handled with site ID as suffix to the credential ID
        * ex: marketingcloud.rest.auth-SITEID 
* Configuration
    * System preferences to manage:
        * Analytics
            * Enable/disable
            * Business Unit ID
        * Marketing Preferences
            * Opt-in toggle
            * Opt-out toggle
            * User preferences enablement
    * Custom Objects used for individual trigger configuration
    * Custom Objects used for analytic configuration
    * Custom Objects used for job configuration (field-mapping)

### Integration Cartridge

 **int\_marketing\_cloud File Structure**


```
.
|__api.md
|__cartridges
| |__int_marketing_cloud
| | |__.project
| | |__.tern-project
| | |__cartridge
| | | |__controllers
| | | | |__MCSubscription.js
| | | |__forms
| | | | |__default
| | | | | |__mcpreferences.xml
| | | | | |__mcsubscribe.xml
| | | |__int_marketing_cloud.properties
| | | |__scripts
| | | | |__communication
| | | | | |__account.js
| | | | | |__customerService.js
| | | | | |__giftCertificate.js
| | | | | |__handler.js
| | | | | |__order.js
| | | | | |__util
| | | | | | |__send.js
| | | | |__feeds
| | | | | |__catalog.js
| | | | | |__content.js
| | | | | |__customers.js
| | | | | |__orders.js
| | | | | |__promotions.js
| | | | | |__upload.js
| | | | |__init
| | | | | |__rest.js
| | | | | |__soap.js
| | | | |__jobs
| | | | | |__compileMappingTemplates.js
| | | | | |__triggers.js
| | | | |__lists
| | | | | |__subscription.js
| | | | |__models
| | | | | |__analytic.js
| | | | | |__authToken.js
| | | | | |__dataExport.js
| | | | | |__dataExportStatus.js
| | | | | |__dataExportVelocity.js
| | | | | |__event.js
| | | | | |__export.js
| | | | | |__message.js
| | | | | |__subscriber.js
| | | | | |__trigger.js
| | | | |__Registry.js
| | | | |__tracking
| | | | | |__dataLayer.js
| | | | | |__trackingLink.js
| | | | |__util
| | | | | |__helpers.js
| | | |__templates
| | | | |__default
| | | | | |__marketingcloud
| | | | | | |__preferences.isml
| | | | | | |__subscribe.isml
| | | | |__resources
| | | | | |__forms.properties
| | | |__webreferences2
| | | | |__etframework.wsdl
| | |__hooks.json
| | |__package.json
| | |__steptypes.json
|__package.json
|__README.md
|__reference
| |__comps
| | |__comps-go-here.txt
| |__mc-templates
| | |__abandonedcart-originalcomp.html
| | |__abandonedcart.html
| | |__accountcreatedemail.html
| | |__accountupdatedemail.html
| | |__contactus.html
| | |__giftcert.html
| | |__lockoutemail.html
| | |__orderconfirmation.html
| | |__passwordchangedemail.html
| | |__resetpasswordemail.html
| |__sg-reference-html
| | |__gift-certificate.html
| | |__new-account.html
| | |__order-confirmation-gift-certificate.html
| | |__order-confirmation-japanese.html
| | |__order-confirmation-multiple-items.html
| | |__order-confirmation-multiple-shipments-languages.html
| | |__order-confirmation-multiple-shipments.html
| |__wsdl
| | |__etframework
| | | |__etframework.api.zip
|__sites
| |__site_template
| | |__jobs.xml
| | |__meta
| | | |__custom-objecttype-definitions.xml
| | | |__system-objecttype-extensions.xml
| | |__services.xml
| | |__sites
| | | |__SiteGenesis
| | | | |__custom-objects
| | | | | |__CommunicationHandlers.xml
| | | | | |__MarketingCloudAnalytics.xml
| | | | | |__MarketingCloudAuthToken.xml
| | | | | |__MarketingCloudDataExport.xml
| | | | | |__MarketingCloudDataExportStatus.xml
| | | | | |__MarketingCloudTriggers.xml
| | |__version.txt
```

## Transactional Emails - Implementation Details

Transactional emails will make use of the triggered email functionality in Marketing Cloud.

### REST APIS

We're using REST API for MC Connector implementation.

For more information, see [Intro to Marketing Cloud APIs] (https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/index-api.htm).

### Authentication

Marketing Cloud uses oAuth, which returns a token upon successful authentication. To avoid authenticating excessively, the retrieved token is stored in a custom object for reuse.

**Standard API Calls**

All calls to REST API (other than the authentication call) are modified to apply the auth header.
If a token is missing or expired, a new token is automatically requested in this process.

### Response Handling

All standard API calls have their response parsed, and the response object wrapped.
The object wrapper contains checks indicating if there was a JSON parsing error, such as an auth error.

**Example API Response Handling**

```
return {
    isValidJSON: isJSON,
    isAuthError: isValid401(client),
    responseObj: parsedBody
};
```

The executing code is responsible for reacting to any errors and handling retries.

### Email Hooks

Email sending in the application is abstracted into hooks.

**Communication Hook Execution Sample**

```
dw.system.HookMgr.callHook( "app.communication.account.created", "created", {
    toEmail : customer.profile.email,
    subject : "Your account at www.mystore.com has been created",
    messageBody : someMessageThatWasGeneratedUsingTemplate,
    params : {} // additional parameters passed to the hook, such as forms, customer profile, etc
} );
```

The supported trigger hooks initiated by user interaction are:

* app.communication.account.created
* app.communication.account.updated
* app.communication.account.passwordChanged
* app.communication.account.passwordReset
* app.communication.account.lockedOut
* app.communication.customerService.contactUs
* app.communication.giftCertificate.sendCertificate
* app.communication.order.confirmation


**Communication Hook Implementation Sample**

```
'use strict';
 
/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {Object} params Object containing additional parameters for usage by the hook
 * @property {dw/web/Forms} params.CurrentForms The forms available in current session
 * @property {dw/web/HTTPParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {dw/customer/Customer} params.CurrentCustomer The current customer
 */
  
/**
 * Sends account created notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function created(data) {}
 
module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    'some_handler_id',
    'app.communication.account',
    {
        created: created
    }
);
```

### Simple Email Sending Implementation

To support triggering MC emails, we replace the current email logic within various locations of SiteGenesis with the Marketing Cloud alternative. This is only an alternative, so we still need to support standard email execution.

**Simple Email Hook Implementation**

```
'use strict';
 
var Mail = require('dw/net/Mail');
var ArrayList = require('dw/util/ArrayList');
 
/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {Object} params Object containing additional parameters for usage by the hook
 * @property {dw/web/Forms} params.CurrentForms The forms available in current session
 * @property {dw/web/HTTPParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {dw/customer/Customer} params.CurrentCustomer The current customer
 */
 
/**
 * Send a customer notification email
 * @param {CustomerNotification} data
 * @returns {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure
 */
function sendEmail(data){
    var email = new Mail();
    email.setTo(new ArrayList(data.toEmail));
    email.setFrom(data.fromEmail);
    email.setSubject(data.subject);
    email.setContent(data.messageBody, 'text/html', 'UTF-8');
    var status = email.send();
 
    return {
        status: !status.isError() ? 'OK' : 'ERROR'
    };
}
 
/**
 * Sends account created notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function created(data) {
    return sendEmail(data);
}
 
module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    'sitegenesis_email',
    'app.communication.account',
    {
        created: created
    }
);
```


## Data Sync - Implementation Details

Catalog, content, order, and customer data need to be exported to Marketing Cloud.
Custom jobs are built to be executed within Business Manager.
Flat-file batch exports are generated at minimum, daily.
Each job can be enabled/disabled separately from the other available jobs.

Jobs have been defined using the native Job Scheduler, as script-based workflows, with a job existing for each type of data to be exported.
Custom chunk-oriented job steps are defined for each data extract. A task-oriented job step is defined for the file transfer handling.
Jobs execute at the site level.
The approach used for chunk and task-oriented custom job steps has followed the recommendations documented in InfoCenter.

For more information, see [Creating Custom Jobs](https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FJobs%2FCreatingCustomJobSteps.html).

Feeds and import activities follow the documentation provided for Marketing Cloud:

* [Importing into Data Extensions](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/importing_into_a_data_extension/)
* [Create an Import Activity](https://help.marketingcloud.com/en/documentation/exacttarget/interactions/activities/import_activity/)
* [Decompress a compressed import](https://help.marketingcloud.com/en/documentation/exacttarget/interactions/activities/file_transfer_activity/)
* [Enhanced FTP](https://help.marketingcloud.com/en/documentation/exacttarget/resources/enhanced_ftp_guide/)

### File Upload

Job Step ID: custom.MCC-Feed-Upload  
Job Step Type: script-module-step  

### Catalog Export

Job ID: MCC-Feed-Catalog  
Job Step ID: custom.MCC-Feed-ExportCatalog  
Job Step Type: chunk-script-module-step  

### Content Export

Job ID: MCC-Feed-Content  
Job Step ID: custom.MCC-Feed-ExportContent  
Job Step Type: chunk-script-module-step  

### Order Export

Job ID: MCC-Feed-Order  
Job Step ID: custom.MCC-Feed-ExportOrders  
Job Step Type: chunk-script-module-step  

### Customer Export

Job ID: MCC-Feed-Customer  
Job Step ID: custom.MCC-Feed-ExportCustomers  
Job Step Type: chunk-script-module-step  

### Sample Steps JSON

See int\_marketing\_cloud/cartridge/steptypes.json


## Site Preferences

For Phase 1, this integration is not leveraging any Site Preferences. The capability to turn off Marketing Cloud transactional emails is available via a custom object configuratino.

Site Preferences are used to manage some preferences related to Analytics collection in Phase 2.