# Marketing Cloud Connector #

## Introduction ##

The Marketing Cloud Connector is an integration solution, built to accelerate time to market.
It connects Commerce Cloud to Marketing Cloud "above the API", which means that it is using public API rather than direct backend integration.

## More Information ##
 
### License ###

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)

### Dependencies ###

* [Handler Framework](https://github.com/SalesforceCommerceCloud/handler-framework)

### Installation ###

Installation and usage can be found in the [Wiki](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/wiki)

## Who do I talk to? ##

* Maintainer: @intel352
* [XChange Developer Forum](https://xchange.demandware.com/community/developer/marketing-cloud-connector/activity)
* [Unofficial Community Slack](https://sfcc-unofficial.slack.com)

## Contributing

1. Create a fork, if you don't already have one
2. Ensure your fork is synced with the latest changes from the main repository
3. Create a new branch in your fork to hold your changes
4. Submit a [pull request](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/compare)

### Changelog ###

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

## Terms & Conditions ##

Commerce Cloud does not provide support for this application.

THIS APPLICATION IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL OR SIMILAR DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS APPLICATION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

SUBJECT TO THE FOREGOING, THIS APPLICATION MAY BE FREELY REPRODUCED, DISTRIBUTED, TRANSMITTED, USED, MODIFIED, BUILT UPON, OR OTHERWISE EXPLOITED BY OR ON BEHALF OF SALESFORCE.COM OR ITS AFFILIATES, ANY CUSTOMER OR PARTNER OF SALESFORCE.COM OR ITS AFFILIATES, OR ANY DEVELOPER OF APPLICATIONS THAT INTERFACE WITH THE SALESFORCE.COM APPLICATION, FOR ANY PURPOSE, COMMERCIAL OR NON-COMMERCIAL, RELATED TO USE OF THE SALESFORCE.COM APPLICATION, AND IN ANY WAY, INCLUDING BY METHODS THAT HAVE NOT YET BEEN INVENTED OR CONCEIVED.