# Salesforce B2C Commerce to Marketing Cloud Connector #

1. [Application Overview] (#Overview)
2. [Application Documentation] (#Doc)
3. [More Information] (#MoreInfo)
4. [Application Changelog] (#Changes)
5. [Terms and Conditions] (#Legalese)


## Introduction ##

The Salesforce B2C Commerce to Marketing Cloud Connector is a project that facilitates the integration between the two clouds. The project connects Commerce Cloud to Marketing Cloud "above the API", meaning it is using public API rather than direct backend integration. This framework allows you to share and synchronize data between the two clouds.

<a name="Overview"></a>
## Application Overview ##
### Features ###

#### API Implementation ####
This cartridge implements in-part both the REST API and SOAP API from Marketing Cloud.  
The inclusion of both APIs means that the groundwork is started to help you along with your own custom use of Marketing 
Cloud's APIs, of which there are many abilities not already employed within this cartridge.

#### Analytics ####
Analytic tracking, using MC's `collect.js`, is enabled via configuration.
The following events are tracked by default:

- Page view
- Search request (search page)
- Product view (PDP)
- Category view (PLP)
- Cart (add/modify/remove)
- Order placement

The above tracked information then prepares you for MC's Abandonment functionality (which requires a services engagement with MC team).
MC's Abandonment functionality includes abandoned cart, abandoned browse, abandoned search.

In addition to tracking page analytics, you can also opt to enable Streaming Updates, which updates your product catalog and content assets in MC's database as they are viewed.

#### Marketing Management ####
Marketing management is enabled by providing the following abilities:  

- Marketing opt-in check-box (during registration and ordering)
- Email subscribe form support
- Marketing preferences page in My Account, for selectively opting into or out of specific mailing lists

#### Transactional emails ####
The following OOB SiteGenesis emails are replaced with MC email triggers: 

* Account - Created
* Account - Updated
* Account - Password Changed
* Account - Password Reset
* Account - Locked Out
* Customer Service - Contact Us
* Gift Certificate - Send Certificate
* Order - Confirmation 

Transactional emails are  built using SFCC platform hooks, leveraging "triggered email" functionality in Marketing Cloud, to send emails. Configurable trigger definitions, stored in Custom Objects, are used to support custom trigger keys as well as support mapping of data for each trigger, from predefined attribute values to data extension attributes that you define. Configuration can be used to achieve a mix and match of SiteGenesis emails with Marketing Cloud emails.

#### Data sync ####
Data sync to Marketing Cloud via jobs:

* Product Catalog
* Content Catalog
* Customers
* Orders
* Promotions/Campaigns

<a name="Doc"></a>
## Application Documentation ##


1. [HandlerFramework Cartridge](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/docs/Handler-Installation.md) 
2. [Marketing Cloud Connector Cartridge](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/docs/marketing-cloud-connector-docs/Home.md) 
    1. [SiteGenesis Instructions](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/docs/handler-framework-docs/Modification-Instructions-for-SiteGenesis.md)
    2. [SFRA Instructions](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/docs/handler-framework-docs/Modification-Instructions-for-SFRA.md)

<a name="MoreInfo"></a>
## More Information ##
 
### Who do I talk to? ##

* [XChange Developer Forum](https://xchange.demandware.com/community/developer/marketing-cloud-connector/activity)
* [Unofficial Community Slack](https://sfcc-unofficial.slack.com)

### Contributing

1. Create a fork, if you don't already have one.
2. Ensure your fork is synced with the latest changes from the main repository.
3. Create a new branch in your fork to hold your changes.
4. Submit a [pull request](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/compare).

<a name="Changes"></a>
## Changelog ##

#### 1.0.3 ####
- SFRA Support added for MC Connector (Refer Handler framework 1.0.1 Wiki)


#### [unreleased] ####

##### Added #####
 - Added OMS email hooks
 - Added ability to populate/send custom attributes via Subscriber form (thanks @pfscsantiago)

##### Fixed #####
 - Fixed a syntax error in compileMappingTemplates.js

#### [[1.0.2.1]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.2.1) - 2017-01-17 ####

##### Added #####
 - Added missing service configuration definitions

#### [[1.0.2]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.2) - 2017-01-17 ####

##### Fixed #####
 - Fix for treegen doc generation to ignore dot-files
 - Fixed array conversion error for analytics
 - Fixed order ID missing for analytics

##### Added #####
 - Added Promotions/Campaigns feed
 - Added mailing list / subscription functionality
 - Added soap service
 - Added two hooks for mailing list subscribe / unsubscribe
 - Added wsdl generated API zip file for reference
 - Added new site preferences

#### [[1.0.1-rc.1]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.1-rc.1) - 2017-10-24 ####

##### Fixed #####
 - Fixed incorrect path to hooks.json
 - Fixed typo in variable casing in catalog feed job
 - Fixed `isValid401()` check, which was expecting a value as string rather than number
 - Fixed possible issue with expires comparison
 - Corrected `marketingcloud.rest.interaction.events` stub.

##### Added #####
 - Added more returned details to the `parseResponse()` method.
 - Added job which can be used to generate necessary velocity data mapping templates.
 - Added Analytics model
 - Added a currently-unused model for data feed jobs to export using Velocity templates. This is to support future functionality.
 - Added data layer script for Analytic use. This handles bulk of logic for analytic implementation with Marketing Cloud.
 - Added tracking link script for Analytic use. This handles tracking link(s) used for analytic init.
 - Registered 5 new hooks.
 - Added MCC-CompileMappingTemplates job.
 - Added custom object MarketingCloudAnalytics
 - Added MC custom preferences to control tracking link.

##### Changed #####
 - Service credential fallback now relies upon the service name for fallback credential ID.
 - Updated `helpers.getCustomObject()` to no longer auto-assume that you want a new object created if it wasn't found.
 - Slight improvement to `isValidAuth()` check.
 - Trigger logic no longer auto-creates missing trigger, instead uses plain JS object marking trigger as disabled.
 - Renamed MCC Init job to MCC InitTriggers.
 - Updated Order Confirmation email sample with a fully working email template.

#### [[1.0.0-rc.3]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.0-rc.3) - 2017-08-14 ####

##### Fixed #####
 - Fixed bug where data object wasn't being passed to catalog feed.
 - Fixed issue where feed was being marked as exported when execution completed, rather than using job start timestamp.
 
##### Added #####
 - Added fallback logic for data mappings (to support a fallback object, so if a value isn't found in variant, for example, we then search master)
 - Added function to print list of images for product catalog.
 - Added support for variation groups in catalog feed.
 - DefaultProduct added to catalog list of variables, contains default variant || variation group || master. Useful for fallback parameter
 - Added support for mapping collections to arrays/strings (specifically to support customer groups in customer feed).
 - Added support for a "format" option for value mappings into MC. The format option is passed to dw.util.StringUtils along with the found value.
 - Added preferences to catalog feed to support including or skipping master product, variation group, variant, or simple products.
 - Added preference for data feeds to accept directory path for upload target server.

##### Changed #####
 - Changed product catalog export to use ProductSearchModel, and ensure we output variants
 - Changed content catalog export to use ContentSearchModel
 - Moved util directory out of models directory
 - Updated orderAsXML to strip namespace from XML sent to MC.
 - Ensuring empty string on export for empty values, fixes some values that were returning "undefined".
 - Exported fields are now trimmed to remove leading/trailing spaces.
 - Updated standardPrice function to additionally check master product for price (list price).
 - Ensure image links return as strings
 - Updated standardPrice() to return nothing if no price (to ensure no issue with fallback parameter)
 - Ensuring writeChildProducts is operating off of variation model.
 - Removed _aliases behavior, as it was too broad and a performance drain. New approach is to use fallback parameter in mapping, for values that may need to fall back...
 - Updated catalog export config to reflect the new functionality.
 - Updated jobs definitions export to change incremental to false by default (otherwise troubleshooting on a fresh install is problematic)
 - Updated api doc

#### [[1.0.0-rc.2]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.0-rc.2) - 2017-06-27 ####
 
##### Changed #####
 - MC service now attempts to use site-specific credentials, if they exist.

#### [[1.0.0-rc.1]](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/releases/tag/1.0.0-rc.1) - 2017-06-26 ####
 
#### Added #####
 - Initial packaging of MC Connector Cartridge
 - Added triggered send email support
 - Added data feed support



### License ###

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)

<a name="Legalese"></a>
## Terms & Conditions ##

Copyright 2018 [salesforce.com](https://www.salesforce.com/), inc. All rights reserved. 

These Terms of Use are between **You**, (being the Customer that purchased Commerce Cloud Services) and salesforce.com, inc. or its Affiliate ("**SFDC**") that entered into a subscription agreement (the "**Agreement**") with You that governs Your purchase of Commerce Cloud Services (formerly known as “Demandware Services”).
 
These Terms of Use were last updated on  June 11, 2018 and constitute a legally binding agreement between You and SFDC effective upon Your first download, installation or use of the Connector, whichever is earliest. If You do not have authority to bind the Customer that entered into the Agreement or You do not agree to these Terms of Use, You may not install or use the Connector
 
SFDC grants You a limited non-exclusive, nontransferable, non-sublicensable, revocable license to use the Connector internally solely for the purpose of integrating Your subscription to Commerce Cloud Services with Your subscription to SFDC’s Marketing Cloud Services in the manner as described by the Documentation.  

Subject to the limited rights expressly granted hereunder, SFDC reserves all rights, title and interest in and to all intellectual property rights subsisting in the Connector. No rights are granted to You hereunder other than as expressly set forth herein.  Users residing in countries on the United States Office of Foreign Assets Control sanction list, or which are otherwise subject to a US export embargo, may not use the Connector.
 
The Connector is not part of the Commerce Cloud Services nor the Marketing Cloud Services. Implementation of the Connector requires development work and appropriate configuration and permissions within Your instances of Commerce Cloud and Marketing Cloud for which You are responsible. The Connector may contain bugs, errors and incompatibilities with Your configuration of Commerce Cloud Services or Marketing Cloud Services and is made available on an AS IS basis without support, updates, or service level commitments. 
 
SFDC reserves the right at any time to modify or discontinue, temporarily or permanently, the Connector (or any part thereof) with or without notice. You agree that SFDC shall not be liable to You or to any third party for any modification, suspension or discontinuance

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE CONNECTOR IS NOT SUPPORTED, AND IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL  SFDC HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE CONNECTOR, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

 
These Terms of Use shall be governed exclusively by the internal laws of the State of California, without regard to its conflicts of laws rules. Each party hereby consents to the exclusive jurisdiction of the state and federal courts located in San Francisco County,California to adjudicate any dispute arising out of or relating to this Agreement. Except as expressly stated in these Terms of Use, these Terms of Use constitute the entire agreement between the parties, and supersede all prior and contemporaneous agreements, proposals or representations, written or oral, concerning their subject matter.No modification, amendment, or waiver of any provision of these Terms of Use shall be effective unless it is by an update to these Terms of Use that we make available on this website, or is in writing and signed by the party against whom the modification, amendment or waiver is to be asserted.
