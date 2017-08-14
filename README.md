# Marketing Cloud Connector #

## Introduction ##

The Marketing Cloud Connector is an integration solution, built to accelerate time to market.
It connects Commerce Cloud to Marketing Cloud "above the API", which means that it is using public API rather than direct backend integration.

## More Information ##
 
### License ###

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)

### Installation ###

Installation and usage can be found in the [Wiki](https://bitbucket.org/demandware/marketing-cloud-connector/wiki/Home)

### Changelog ###

#### [unreleased] ####

#### [[1.0.0-rc.3]](https://bitbucket.org/demandware/marketing-cloud-connector/commits/tag/1.0.0-rc.3) - 2017-08-14 ####

#### Fixed ####
 - Fixed bug where data object wasn't being passed to catalog feed.
 - Fixed issue where feed was being marked as exported when execution completed, rather than using job start timestamp.
 
#### Added ####
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
 
##### Added #####
 - Initial packaging of MC Connector Cartridge
 - Added triggered send email support
 - Added data feed support

### Features ###

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

### Dependencies ###

* [Handler Framework](https://bitbucket.org/demandware/handler-framework)

### Changelog ###



## Contribution guidelines ##

* Writing tests
* Code review
* Other guidelines

## Who do I talk to? ##

* @intel352
* [Commerce Cloud Community Slack](https://sfcc-community.slack.com)