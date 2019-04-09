# marketing-cloud-connector: Installation Guide #
---
###### - Done? Go Back to the [readMe.md](README.md)
**What is the marketing-cloud-connector?**   
A [Salesforce Labs](https://twitter.com/salesforce_labs?lang=en) project that facilitates an "above the API" integration between Salesforce B2C Commerce and Marketing Clouds.

## Table of Contents
1. [Commerce Cloud Configuration] (#Config)
2. [Triggered Send / Transactional Emails](#Triggered)
3. [Marketing Cloud App and API Key] (#MarketingCloudApp)
4. [Commerce Cloud - Service Configuration] (#ServiceConfig)
5. [Marketing Cloud - Triggered Send Configuration] (#TSConfig)
6. [Marketing Cloud - Predictive Web Configuration (collect.js / Analytics)] (#PWConfig)
7. [Sync Your Catalog] (#CatalogSync)
8. [Commerce Cloud - Marketing Opt-in / Subscription Management](#OptIn)
9. [Commerce Cloud - Custom Object Configuration](#CustomObjectConfig)
10. [Data Feeds] (#DataFeeds)

<a name="Config"></a>
#Commerce Cloud Configuration #

Ensure that the Handler Framework has been installed according to instructions and your storefront code has been adjusted.

1. Check out the latest tagged release of the Marketing Cloud Connector from Github.
2. Add the `int_marketing_cloud` directory to your storefront cartridges, and upload the cartridge to your Commerce Cloud storefront instance.
3. Import metadata, jobs, services, and custom objects, from the `/sites/site_template/` directory.

	The custom object definitions for `MarketingCloudDataExport` and `MarketingCloudTriggers` are set to site-level by default. This is to support different configurations per site, if desired. If you are using the same configuration for your entire organization, you can change from site-level custom objects to organization-level. 
	
	To do so, edit `marketing-cloud-connector/sites/site_template/meta/custom-objecttype-definitions.xml` and change `<storage-scope>site</storage-scope>` to `<storage-scope>organization</storage-scope>` for each object type that is intended to be global, *prior to importing the definition file*.
5. Update your site cartridge path, for example:
`app_storefront_controllers:app_storefront_core:int_marketing_cloud:int_handlerframework`

<a name="Triggered"></a>
# Triggered Send/Transactional Emails #

Before beginning with these instructions, speak with your Marketing Cloud representative.
  
**Important:** Make sure that your Marketing Cloud representative is aware that you intend to use Triggered Send functionality, Triggered Send Data Extension templates, and that you are connecting to Triggered Send using REST API. Your representative should be able to ensure that the necessary permissions are turned on and enabled for your account. These permissions should be checked and enabled, or inherited, for every Business Unit that you want to utilize with Triggered Sends.  

For each trigger, its corresponding hook definition must be enabled in `CommunicationHandlers`, the triggered send definition must be enabled in `MarketingCloudTriggers`, and have a trigger key defined. 

For attributes to be sent to Marketing Cloud, a triggered email needs to be defined, typically with a data extension attached. Each data extension attribute is used for mapping Subscriber attributes in the trigger definition. If a defined attribute does not exist on the Marketing Cloud side, it is ignored by Marketing Cloud.

<a name="MarketingCloudApp"></a>
#Marketing Cloud App and API Key#

This step must be done for each Commerce Cloud Business Unit that you want to connect with.

See [Salesforce Developers App Center](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/get-api-key.htm) for more information.

1. If you don't already have an App Center account, create one here: [App Center Create Account](https://appcenter-auth.s1.marketingcloudapps.com/create). 
	
	See the [Salesforce Developers App Center Overview](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/app-center.htm) for more information.

2. Log in here: [App Center](https://appcenter-auth.s1.marketingcloudapps.com/).
3. If necessary, create a package.

	See [Create and Install Packages] (https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/install-packages.htm) for additional information.
	
	**Note:** Deselect Create with enhanced functionality.
4. Create an API Integration component.

	See [Create an API Integration in Legacy Packages](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-integration-legacy.htm) for more information.
	
	Specify the following permissions: 
	- Channels - Email: Send
	- Data - Data Extensions: Read and Write

5. Save the Details page for your records.

<a name="ServiceConfig"></a>
#Commerce Cloud - Service Configuration #

Within Commerce Cloud Business Manager, update the services that have been imported into Commerce Cloud using the provided XML files.

If you have multiple Commerce Cloud sites, and follow the pattern of connecting a single site to a single business unit, you need to create a separate Service Credential for each site, and repeat the steps described below. 

1. In Business Manager, go to **Administration > Operations > Services**, and click the **Creditials** tab.

	**NOTE**: If you intend to only use one Marketing Cloud business unit despite having multiple sites in Commerce Cloud, you can modify the service credential `marketingcloud.rest.auth` directly.

2.  Click **New**, and create a new Service Credential based on `marketingcloud.rest.auth`.

	1. Append your own Business Manager Site ID to the Credential Name (for example, `marketingcloud.rest.auth-SiteGenesis`).
	2. Enter the URL.
	3. Populate the User ID field with your own API User ID from Marketing Cloud (aka "Client ID").
	4. Populate the Password field with your own API password from Marketing Cloud (aka "Client Secret").
	5. Click **Apply**.
3. Click the **Services** tab, and click the `marketingcloud.rest.auth` Service.
4. Update the Credentials dropdown to match the credentials you saved. 

	In case you have multiple sites/credentials, the cartridge automatically attempts to switch to site-specific credentials if the assigned credentials aren't site-specific, and failing that, will then revert to the default assigned credentials if site-specific credentials can't be found.

5. Click **Apply**.



<a name="TSConfig"></a>
# Marketing Cloud - Triggered Send Configuration #

See the [[MC Connector Installation - Triggered Send Configuration]] document for additional information.  

In Marketing Cloud: 

1. [Create a data extension from a template](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/creating_a_data_extension_from_a_template/). 

	Each triggered send must connect to a **Data Extension**. A data extension can be shared, when the data being stored overlaps between triggers.
	
	**Note:** Data extensions that collect triggering subscriber information must be built using a triggered send source data extension template.  

2. [Build a template-based email.](https://help.marketingcloud.com/en/documentation/exacttarget/content/create_an_email/build_a_template_based_email/)

	Each triggered send requires an email. It's recommended to create your email using Content Builder.  

3. [Create a triggered email message interaction.](https://help.marketingcloud.com/en/documentation/exacttarget/interactions/triggered_emails/triggered_emails_guide/how_to_create_a_triggered_email_message_interaction/)
	
	Be sure to associate the email and data extension that you created. It's also recommended to enable the feature to Disable the Triggered Send when API errors are encountered.  
4. Ensure your triggered send is in a running state, otherwise it cannot be used by Commerce Cloud.  

<a name="PWConfig"></a>
# Marketing Cloud - Predictive Web Configuration (collect.js / Analytics) #

Predictive Web, also referred to by some as Analytics or collect.js, provides you with the ability to track customer activity throughout your storefront. This information can be used to power personalized recommendations. This information can also be used to facilitate abandoned cart, search, or browse journeys.  

The Predictive Web feature can be found under Personalization Builder. To ensure that you set up Personalization Builder correctly, it is recommended that you work with your Marketing Cloud representative.

Personalization Builder provides you with a wizard that walks you through the set-up process. In this process, you define whether you want to personalize products, content, or both. You also can define additional fields that you want to store within the product and content catalog respectively, to be used for recommendation behavior.  

<a name="CatalogSync"></a>
## Sync Your Catalog ##

### Streaming Updates ###

The Predictive Web feature supports streaming updates for your catalogs. As a product or content item is viewed, its details are sent to Marketing Cloud so that the latest information about that item is updated. A caveat to this feature is that the complete details for the product or content item should be sent, ensuring that you match the same data structure that is sent by any data feed for the product and content catalogs. If fields are omitted, it is assumed those fields are intended to be emptied out.  

### Batch Upload ###

Batch import can occur via a data feed, once per day. See [Data Feeds](#DataFeeds) for more information.

<a name="OptIn"></a>
# Commerce Cloud - Marketing Opt-in / Subscription Management #

Marketing opt-in and subscription management is available via a new controller included with the cartridge. The following controller end-points are available to use:  

- MCSubscription-Manage: Allows a logged-in customer to manage their mailing list preferences, enabling or disabling lists as they desire.
- MCSubscription-Subscribe: A standard email-subscription form page.
- MCSubscription-SubscribeFooter: A standard email-subscription form page, without a decorator template applied.
- MCSubscription-Unsubscribe: A standard email-unsubscribe form page.

Hooks have also been added to support *subscribe* and *unsubscribe*. The subscribe hook is executed when the marketing opt-in checkbox is checked on the user registration and checkout forms.  

The following preferences are available for you to manage this functionality:  

- Enable Mailing List Hooks: Allows you to turn on and off the hook that executes when the opt-in checkbox is submitted.
- Default Mailing Lists: A list of mailing list IDs that a user should be subscribed to by default, when using the opt-in checkbox or subscribe forms.
- Mailing Lists Whitelist: A list of mailing list IDs that act as a whitelist to control what lists are displayed to the user on the MCSubscription-Manage page. If left blank, all lists are displayed.

<a name="CustomObjectConfig"></a>
# Commerce Cloud – Custom Object Configuration #


1. In Business Manager, navigate to **Merchant Tools > Custom Objects > Custom Objects Editor**.
2. Select **CommunicationHandlers** from the Object Type dropdown, and click **Find**.
3. Click the "**development**" instanceType to edit the object.
	
		A JSON object with the two top-level properties of `standard_email` and `int_marketing_cloud` displays.
		Each top-level property contains a list of hooks (each of which can be enabled or disabled), followed by an `enabled` property, to either turn the entire section on or off.
	1. Update the JSON object's "enabled" properties as desired. 
		
		Keep in mind that if you allow two handlers to have the same hook enabled, the first hook executed and returning a value will succeed.
		
		**NOTE**: The order of execution furthermore depends on cartridge path priority. Hence the lookup path will be cartridge location in path > hook definition > “enabled” property.
	2. Click **Apply**.
		
4. Select **MarketingCloudTriggers** from Object Type dropdown, and click **Find**.

	1. Edit each hook as necessary. 
	
		Each trigger has a Trigger Key that maps to Marketing Cloud. Each trigger can be directly enabled/disabled. Additionally, a list of Subscriber Attributes has been defined, which is a mapping of available values from Commerce Cloud to the attribute key they should be sent as to Marketing Cloud.
		
		See [Marketing Cloud - Triggered Send Configuration](#TSConfig) for additional information. 
	2. Click **Apply**.


<a name="DataFeeds"></a>
# Data Feeds #

## Feed Configuration ##

Multiple jobs are defined in the Business Manager Job Scheduler, named in the format `MCC-Feed-`. Within each job, on its Step Configurator tab, is a step named in the format `mcc-feed-export`.

Each export step contains the following fields:

* ExportID - corresponds to exportID in MarketingCloudDataExport custom objects.
* ExportFileName - specifies the filename that is generated from the job export.
* Delimiter - options are pipe, comma, or tab character.
* IncrementalExport - only exports records added or modified since the last execution

Each job also lists a step named `mcc-feed-upload`, with the following fields:

* SFTPServiceID - ID of the [S]FTP service configured in **Administration > Operations > Services**.
* ExportFileName - Filename of the exported feed, as configured in the export step.
* TargetPath - The directory path for the file to be uploaded into, on the destination [S]FTP server.

The MarketingCloudDataExport custom objects that are defined for each export job, provide a field mapping similar to what is available for the MarketingCloudTriggers custom objects.

## SFTP Configuration ##

After having imported metadata, services, and jobs, you should now have the `marketingcloud.sftp` service defined in **Administration > Operations > Services**. This service is used to configure your SFTP credentials used with your Marketing Cloud account.

Your FTP/SFTP service configuration can be named as desired by your organization, but the service name must match what you enter into your Marketing Cloud job configurations in Business Manager's Job Scheduler.

To use a Marketing Cloud-provided SFTP account:

1. Log into your Marketing Cloud dashboard, and proceed to Administration (hover your username in the upper right corner, and click **Administration** in the dropdown).

	[[images/installation-specification-1.png]]

2. Within Administration, navigate to **Account > FTP Accounts**.

	[[images/installation-specification-2.png]]

	If an account has already been created, you see a user listed under FTP Users. 
	1. If you do not already have an FTP user defined, click **Add FTP User**. 
	2. Create a password for the form (save this password, along with the FTP Username), and click **Save**. 

		After a few minutes, your FTP user should be created.

3. Proceed to the Services page in Business Manager, and update the `marketingcloud.sftp` service credentials with the correct FTP/SFTP details in your Marketing Cloud account.

	On the FTP users page, you can see the details for your FTP account, such as the server address and the port. If the port is 22 (default), then the server is actually an SFTP server.


## Product and Content Catalogs ##

Product and Content catalogs can be imported into Marketing Cloud through Personalization Builder. Personalization Builder provides you with a wizard for setup (described earlier), which includes configuring your product and content catalogs. Personalization Builder also walks you through entering your FTP/SFTP, and specifying the path to your file. 

A recommended configuration looks like the following image:

[[images/installation-specification-3.png]]


## Customers and Orders Feeds ##

Marketing Cloud provides numerous ways to store and link data, so work with your Marketing Cloud representative to determine the appropriate approach for you. During the development of the Marketing Cloud Connector cartridge, the solution employed was to create a generic data extension for both Customers and Orders, and then to use Journey Builder to create a [file import automation](http://help.marketingcloud.com/en/documentation/automation_studio/using_automation_studio_activities/use_an_import_activity/update_a_list_or_data_extension_using_an_external_file/).

Within Journey Builder, the automation's Trigger was defined as follows:

[[images/installation-specification-4.png]]

And then an “Import File” activity was dragged into “Step 1”, and configured as:

[[images/installation-specification-5.png]]