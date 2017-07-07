# Marketing Cloud Connector #

## Introduction ##

The Marketing Cloud Connector is an integration solution, built to accelerate time to market.
It connects Commerce Cloud to Marketing Cloud "above the API", which means that it is using public API rather than direct backend integration.

## More Information ##
 
### License ###

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)

### Changelog ###

#### [unreleased] ####

##### Changed #####
 - Updated data feeds to accept directory path for upload target server.
 - Changed product catalog export to use ProductSearchModel, and ensure we output variants
 - Changed content catalog export to use ContentSearchModel
 - Moved util directory out of models directory
 - Added fallback logic for data mappings (to support a fallback object, so if a value isn't found in variant, for example, we then search master)
 - Updated orderAsXML to strip namespace from XML sent to MC.
 - Added support for a "format" option for value mappings into MC. The format option is passed to dw.util.StringUtils along with the found value.
 - Ensuring empty string on export for empty values, fixes some values that were returning "undefined".
 - Exported fields are now trimmed to remove leading/trailing spaces.
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