# Marketing Cloud Connector #

The Marketing Cloud Connector is an integration solution, built to accelerate time to market.
It connects Commerce Cloud to Marketing Cloud "above the API", which means that it is using public API rather than direct backend integration.

## More Information ##

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

## Contribution guidelines ##

* Writing tests
* Code review
* Other guidelines

## Who do I talk to? ##

* @intel352
* [Commerce Cloud Community Slack](https://sfcc-community.slack.com)