# Marketing Cloud Connector #

## Introduction ##

The Marketing Cloud Connector is an integration solution, built to accelerate time to market.
It connects Commerce Cloud to Marketing Cloud "above the API", which means that it is using public API rather than direct backend integration.

## More Information ##
 
### License ###

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)

### Dependencies ###

* [Handler Framework](https://bitbucket.org/demandware/handler-framework)

### Installation ###

Installation and usage can be found in the [Wiki](https://bitbucket.org/demandware/marketing-cloud-connector/wiki/Home)

## Who do I talk to? ##

* Maintainer: @intel352
* [Commerce Cloud Community Slack](https://sfcc-community.slack.com)

## Contributing

1. Create a [fork](https://bitbucket.org/demandware/marketing-cloud-connector/fork), if you don't already have one
2. Ensure your fork is caught up (message from Bitbucket shows up on your fork main page, if you are not current on commits)
3. Create a new branch in your fork to hold your changes
4. Submit a [pull request](https://bitbucket.org/demandware/marketing-cloud-connector/pull-requests/new)

### Changelog ###

#### [unreleased] ####

##### Added #####
 - Added OMS email hooks
 - Added ability to populate/send custom attributes via Subscriber form (thanks @pfscsantiago)

##### Fixed #####
 - Fixed a syntax error in compileMappingTemplates.js

#### [[1.0.2.1]](https://bitbucket.org/demandware/marketing-cloud-connector/commits/tag/1.0.2.1) - 2017-01-17 ####

##### Added #####
 - Added missing service configuration definitions

#### [[1.0.2]](https://bitbucket.org/demandware/marketing-cloud-connector/commits/tag/1.0.2) - 2017-01-17 ####

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

#### [[1.0.1-rc.1]](https://bitbucket.org/demandware/marketing-cloud-connector/commits/tag/1.0.1-rc.1) - 2017-10-24 ####

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

#### [[1.0.0-rc.3]](https://bitbucket.org/demandware/marketing-cloud-connector/commits/tag/1.0.0-rc.3) - 2017-08-14 ####

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

#### [[1.0.0-rc.2]](https://bitbucket.org/demandware/marketing-cloud-connector/commits/tag/1.0.0-rc.2) - 2017-06-27 ####
 
##### Changed #####
 - MC service now attempts to use site-specific credentials, if they exist.

#### [[1.0.0-rc.1]](https://bitbucket.org/demandware/marketing-cloud-connector/commits/tag/1.0.0-rc.1) - 2017-06-26 ####
 
#### Added #####
 - Initial packaging of MC Connector Cartridge
 - Added triggered send email support
 - Added data feed support

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
