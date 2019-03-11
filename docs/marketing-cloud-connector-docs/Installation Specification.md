[TOC]

# Commerce Cloud Configuration #

Please ensure the Handler Framework has been installed according to instructions and your storefront code has been adjusted.

1. Check out the latest tagged release of the Marketing Cloud Connector from Github.
2. Add the **int_marketing_cloud** directory to your storefront cartridges and upload the cartridge to your Commerce Cloud storefront instance.
3. Import metadata, jobs, services and custom objects, which are found under **sites/site_template/**.
4. The custom object definitions for **MarketingCloudDataExport** and **MarketingCloudTriggers** are by default set to site-level. This is to support different configurations per site if desired. If planned on using the same configuration for your entire organization, you can change from site-level custom objects to organization-level. To do so, edit **marketing-cloud-connector/sites/site_template/meta/custom-objecttype-definitions.xml** and change **<storage-scope>site</storage-scope>** to **<storage-scope>organization</storage-scope>** for each object type that is intended to be global, prior to importing the definition file.
5. Update your site cartridge path, for example:
app_storefront_controllers:app_storefront_core:int_marketing_cloud:int_handlerframework


# Triggered Send/ Transactional Emails #

Before following the instructions below, speak with your Marketing Cloud representative.  
**Important:** Make sure your Marketing Cloud representative is aware that you intend to use Triggered Send functionality, Triggered Send Data Extension templates and that you will be connecting to Triggered Send using REST API. Your representative should be able to ensure that the necessary permissions are turned on/ enabled for your account. These permissions should be checked and enabled or inherited for every Business Unit that you want to utilize with Triggered Sends.  
For each trigger, it's corresponding hook definition must be enabled in CommunicationHandlers, the triggered send definition must be enabled in MarketingCloudTriggers and have a trigger key defined. For attributes to be sent to Marketing Cloud, a triggered email needs to be defined, typically with a data extension attached. Each data extension attribute is used for mapping Subscriber attributes in the trigger definition. If a defined attribute that does not exist at Marketing Cloud side, it will be ignored by Marketing Cloud.

# Marketing Cloud App and API Key #
This step has to be done for each Business Unit that you want to connect with from Commerce Cloud. 

1. If you don't already have an App Center account, create one here: [App Center Account Create](https://appcenter-auth.s1.marketingcloudapps.com/create). This page gives an overview of App Center (good reference): [Salesforce Developers App Center overview](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/app-center.htm)
2. Log in here: [App Center](https://appcenter-auth.s1.marketingcloudapps.com/)
3. Click “Create New App” (This page describes the app creation process in detail: [Salesforce
Developers App Center creation process](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/get-api-key.htm))
4. Select “API Integration”
5. Step 1: Enter a Name and a Package ID, click Next
6. Step 2: Click “Link to Account”, and select the specific business unit and save
7. Step 3: This next page lets you specify what permissions to grant to the app. Specify the following: for Channels - Email a) Send, for Data - Data Extensions a) Read and b) Write
8. Step 4: Review/summary, click next if no issues are apparent.
9. The final page prints out your app details, including Client ID and Secret. Save this page for your records.

# Commerce Cloud - Service Configuration #

Within Commerce Cloud Business Manager, update the services that have been imported into Commerce Cloud using the provided XML files.

NOTE 1: If you intend to only use one Marketing Cloud business unit despite having multiple sites in Commerce Cloud, you can skip this step and maintain one service credential named **marketingcloud.rest.auth**.

NOTE 2: If you have multiple Commerce Cloud sites, and follow the pattern of connecting a single site to a single business unit, you will need to create a separate Service Credential for each site, and repeat the steps described below.

1. Modify or create a new credential based on the Service Credential
**marketingcloud.rest.auth**
2. Append "-SITEID" to the credential id, with your own Site ID from Business Manager (e.g. for SiteGenesis site, it will be **marketingcloud.rest.auth-SiteGenesis**)
3. Replace the user ID field with your own API user ID from Marketing Cloud (aka "Client ID")
4. Replace the password with your own API password from Marketing Cloud (aka "Client Secret")
5. Once you've updated the above credential, save.
6. Modify Service **marketingcloud.rest.auth**.
7. Update Credentials dropdown to match the credentials you just saved. In case you have multiple sites/credentials, the cartridge will automatically attempt to switch to site-specific credentials if the assigned credentials aren't site-specific, and failing that, will then revert to the default assigned credentials if site-specific credentials can't be found.


# Marketing Cloud – Triggered Send Configuration #

Within your Marketing Cloud business unit, follow the below steps to create Triggered Sends. Recommendations can also be found in the [[MC Connector Installation - Triggered Send Configuration]] document.  

1. Each Triggered Send should connect to a **Data Extension** (a data extension can be shared, when the data being stored overlaps between triggers). Consult the Marketing Cloud documentation on how to create a data extension: [Create Data Extension from a Template](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/creating_a_data_extension_from_a_template/).  
**!IMPORTANT!** Data extensions that collect triggering subscriber information must be built using a Triggered Send Source Data Extension template.  
2. Each Triggered Send requires an email. Consult the Marketing Cloud documentation on how to create a template-based Email: [Build a template based email](https://help.marketingcloud.com/en/documentation/exacttarget/content/create_an_email/build_a_template_based_email/). It's recommended to create your email using **Content Builder**.  
3. Now that you've created your Data Extension and Email, you are ready to create your Triggered Send definition. Consult the Marketing Cloud documentation on how to create a triggered send definition: [Create a Triggered Message interaction](https://help.marketingcloud.com/en/documentation/exacttarget/interactions/triggered_emails/triggered_emails_guide/how_to_create_a_triggered_email_message_interaction/)
Be sure to associate the email that you created, as well as the data extension that you created. It's also recommended to enable the feature to Disable the Triggered Send when API errors are encountered.  
4. After you have created and published your Triggered Send, ensure it is in a Running state, otherwise it cannot be used by Commerce Cloud yet.  

# Marketing Cloud - Predictive Web Configuration (collect.js / Analytics) #

**Predictive Web**, also referred to by some as **Analytics** or **collect.js**, provides you with the ability to track customer activity throughout your storefront. This information can be used to power **personalized recommendations**. This information can also be used to facilitate **abandoned cart/search/browse** journeys.  
The Predictive Web feature can be found under **Personalization Builder**. To ensure that you set up Personalization Builder correctly, it is recommended that you work with your Marketing Cloud representative.

Personalization Builder provides you with a wizard that walks you through the set-up process. In this process, you define whether you want to personalize products, content, or both. You also can define additional fields that you want to store within the product and content catalog respectively, to be used for recommendation behavior.  

## Sync Your Catalog ##

### Streaming Updates ###

The Predictive Web feature supports **streaming updates** for your catalogs, so that as a product or content item is viewed, it's details are sent to Marketing Cloud so that the latest information about that item is updated. A caveat to this feature, is that the complete details for the product or content item should be sent, ensuring that you match the same data structure that is sent by any data feed for the product and content catalogs. If fields are omitted, it is assumed those fields are intended to be emptied out.  

### Batch Upload ###

Batch import can occur via a data feed, once per day. Please see the **Data Feeds** section below for more information.

# Commerce Cloud - Marketing Opt-in / Subscription Management #

Marketing opt-in and subscription management is available via a new controller included with the cartridge. The following controller end-points are available to use:  

- **MCSubscription-Manage**: This page allows a logged-in customer to manage their mailing list preferences, enabling or disabling lists as they desire.
- **MCSubscription-Subscribe**: This is a standard email-subscription form page.
- **MCSubscription-SubscribeFooter**: This is the same form as above, without a decorator template applied.
- **MCSubscription-Unsubscribe**: This is a standard email-unsubscribe form page.

Hooks have also been added to support **subscribe** and **unsubscribe**. The subscribe hook is executed when the marketing opt-in checkbox is checked, on the user registration and checkout forms.  
Preferences are available for you to manage this above functionality:  

- Enable Mailing List Hooks: Allows you to turn on/off the hook that executes when the opt-in checkbox is submitted.
- Default Mailing Lists: A list of mailing list IDs that a user should be subscribed to by default, when using the opt-in checkbox or Subscribe forms.
- Mailing Lists Whitelist: A list of mailing list IDs that act as a whitelist to control what lists are displayed to the user on the **MCSubscription-Manage** page. If left blank, all lists are displayed.

# Commerce Cloud – Custom Object Configuration #

Navigate to Custom Object Editor: Merchant Tools > Custom Objects > Custom Objects

1. Select **CommunicationHandlers** from Object Type, click Find.
2. Click to edit "development" object.
3. You should be presented with a JSON object, with two top-level properties: standard_email, int_marketing_cloud
4. Each top-level property contains a list of hooks (each of which can be enabled or disabled), followed by an **“enabled”** property, to either turn the entire section on or off.
5. Update the JSON object's "enabled" properties as desired. Keep in mind that if you allow two handlers to have the same hook enabled, the first hook executed and returning a value will succeed.
NOTE: The order of execution furthermore depends on cartridge path priority. Hence the lookup path will be cartridge location in path > hook definition > “enabled” property.
6. Select **MarketingCloudTriggers** from Object Type, click Find.
7. Edit each entry. Each trigger has a Trigger Key that maps it to Marketing Cloud (examples can be found in the [[MC Connector Installation - Triggered Send Configuration]] document). Each trigger can be directly enabled/disabled. Additionally, a list of Subscriber Attributes has been defined, which is a mapping of available values from Commerce Cloud to the attribute key they should be sent as to Marketing Cloud.

# Data Feeds #

## Feed Configuration ##

Multiple jobs are defined in the Business Manager Job Scheduler, named in the format **MCC-Feed-**. Within each job, on its Step Configurator tab, is a step named in the format **mcc-feed-export**.

Each export step contains the following fields:

* ExportID - corresponds to exportID in MarketingCloudDataExport custom objects
* ExportFileName - specifies the filename that will be generated from the job export
* Delimiter - options are pipe, comma, or tab character
* IncrementalExport - only exports records added/modified since the last execution

Each job also lists a step named **mcc-feed-upload***, with the following fields:

* SFTPServiceID - ID of the [S]FTP service configured in Administration > Operations > Services
* ExportFileName - Filename of the exported feed, as configured in the export step.
* TargetPath - The directory path for the file to be uploaded into, on the destination [S]FTP server.

The MarketingCloudDataExport custom objects that are defined for each export job, provide a field mapping, similar to what is available for the MarketingCloudTriggers custom objects.

## SFTP Configuration ##

After having imported metadata, services, jobs as described at the start of the installation document, you should now have a service defined in **Administration > Operations > Services**, named **marketingcloud.sftp**. This service is used to configure your SFTP credentials that are being used with your Marketing Cloud account.

Your FTP/SFTP service configuration can be named as desired by your organization, but the service name must match what you enter into your MC job configurations in Business Manager's Job Scheduler.

To use a Marketing Cloud-provided SFTP account, log into your Marketing Cloud dashboard, and proceed to Administration (hover your username in upper right, a dropdown menu will appear, click on Administration).


[[images/installation-specification-1.png]]

Within Administration, hover the Account menu, and click on FTP Accounts.

[[images/installation-specification-2.png]]

If an account has already been created, you will see a user listed under FTP Users. If you do not already have an FTP user defined, follow instruction to add a new FTP Account. Create a password for the form (save this password, along with the FTP Username), and click Save. After a few minutes, your FTP user should be created.

On the FTP users page, you can see the details for your FTP account, such as the server address and the port. If the port is 22 (default), then the server is actually an SFTP server.
  
Please proceed to the Services page in Business Manager, and update the **marketingcloud.sftp**'s service credentials with the correct FTP/SFTP details that you discovered in your Marketing Cloud account.


## Product and Content Catalogs ##

Product and Content catalogs can be imported into Marketing Cloud through **Personalization Builder**. Personalization Builder provides you with a wizard for setup (described earlier), which includes configuring your product and content catalogs. Personalization Builder will also walk you through entering your FTP/SFTP, and specifying the path to your file. A recommended configuration looks like the following image:

[[images/installation-specification-3.png]]


## Customers and Orders Feeds ##

Marketing Cloud provides numerous ways to store and link data, so you should work with your Marketing Cloud representative to determine the appropriate approach for you. During the development of the Marketing Cloud Connector cartridge, the solution employed was to create a generic Data Extension for Customers and Orders each, and then to use Journey Builder to create a [File Import automation](http://help.marketingcloud.com/en/documentation/automation_studio/using_automation_studio_activities/use_an_import_activity/update_a_list_or_data_extension_using_an_external_file/).

Within Journey Builder, the automation's Trigger was defined as below:

[[images/installation-specification-4.png]]

And then an “Import File” activity was dragged into “Step 1”, and configured as

[[images/installation-specification-5.png]]