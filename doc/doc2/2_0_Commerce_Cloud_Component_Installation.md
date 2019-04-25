# marketing-cloud-connector: 
-
## 2. Install Commerce Cloud Components

### Table of Contents
1. [Commerce Cloud Configuration](#Config)

3. [Marketing Cloud App and API Key](#MarketingCloudApp)
4. [Commerce Cloud - Service Configuration](#ServiceConfig)
5. [Marketing Cloud - Triggered Send Configuration](#TSConfig)

9. [Commerce Cloud - Custom Object Configuration](#CustomObjectConfig)


--

<a name="Config"></a>
# Commerce Cloud Configuration #

Ensure that the Handler Framework has been installed according to instructions and your storefront code has been adjusted.

See the [Handler Framework Cartridge Installation](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/docs/Handler-Installation.md) if necessary.

1. Check out the latest tagged release from the [Marketing Cloud Connector Github Repository](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector).

2. Add the `int_marketing_cloud` directory to your storefront cartridges, and upload the cartridge to your Commerce Cloud storefront instance.

3. Import metadata, jobs, services, and custom objects, from the `/sites/site_template/` directory.

	The custom object definitions for `MarketingCloudDataExport` and `MarketingCloudTriggers` are set to site-level by default. This is to support different configurations per site. If you are using the same configuration for your entire organization, you can change the site-level custom objects to organization-level custom objects. 
	
	To do so:
    1. Opend `marketing-cloud-connector/sites/site_template/meta/custom-objecttype-definitions.xml`.
    2. Change `<storage-scope>site</storage-scope>` to `<storage-scope>organization</storage-scope>` for each object type that is intended to be global.
    3. Save, and import the definition file.
    
4. Update your site cartridge path:
`app_storefront_controllers:app_storefront_core:int_marketing_cloud:int_handlerframework`


<a name="ServiceConfig"></a>
# Commerce Cloud - Service Configuration #

Within Commerce Cloud Business Manager, update the services that have been imported into Commerce Cloud using the provided XML files.

If you have multiple Commerce Cloud sites, and follow the pattern of connecting a single site to a single business unit, you need to create a separate Service Credential for each site, repeating the steps described below. 

1. In Business Manager, go to **Administration > Operations > Services**, and click the **Creditials** tab.

	**NOTE**: If you intend to only use one Marketing Cloud business unit despite having multiple sites in Commerce Cloud, you can modify the service credential `marketingcloud.rest.auth` directly.

2.  Click **New**, and create a new Service Credential based on `marketingcloud.rest.auth`.

	1. Append your own Business Manager Site ID to the Credential Name (for example, `marketingcloud.rest.auth-SiteGenesis`).
	2. Enter the URL.
	3. Populate the User ID field with your own API User ID from Marketing Cloud (aka "Client ID").
	4. Populate the Password field with your own API password from Marketing Cloud (aka "Client Secret").
	5. Click **Apply**.
3. Click the **Services** tab, and click the new service.
	
	If you're modifying `marketingcloud.rest.auth` directly, click that.

4. Update or verify the Credentials dropdown to match the credentials you saved. 

	In case you have multiple sites/credentials, the cartridge automatically attempts to switch to site-specific credentials if the assigned credentials aren't site-specific.  It will then revert to the default assigned credentials if site-specific credentials can't be found.

5. Click **Apply**.



<a name="TSConfig"></a>
# Marketing Cloud - Triggered Send Configuration #

See the [MC Connector Installation - Triggered Send Configuration](MCConnectorInstallation-TriggeredSendConfiguration.md) document for additional information.  

In Marketing Cloud: 

1. [Create a data extension from a template](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/creating_a_data_extension_from_a_template/). 

	Each triggered send must connect to a **Data Extension**. A data extension can be shared,= when the data being stored overlaps between triggers.
	
	**Note:** Data extensions that collect triggering subscriber information must be built using a triggered-send-source data extension template.  

2. [Build a template-based email.](https://help.marketingcloud.com/en/documentation/exacttarget/content/create_an_email/build_a_template_based_email/)

	Each triggered send requires an email. It's recommended to create your email using Content Builder.  

3. [Create a triggered email message interaction.](https://help.marketingcloud.com/en/documentation/exacttarget/interactions/triggered_emails/triggered_emails_guide/how_to_create_a_triggered_email_message_interaction/)
	
	Be sure to associate the email and data extension that you created. It's also recommended to enable the feature to Disable the Triggered Send when API errors are encountered. 
	 
4. Ensure your triggered send is in a running state, otherwise it cannot be used by Commerce Cloud.  

<a name="CustomObjectConfig"></a>
# Commerce Cloud – Custom Object Configuration #


1. In Business Manager, go to **Merchant Tools > Custom Objects > Custom Objects Editor**.
2. Select **CommunicationHandlers** from the Object Type dropdown, and click **Find**.
3. Click the "**development**" instanceType to edit the object.
	
	A JSON object with the two top-level properties of `standard_email` and `int_marketing_cloud` displays.
	
	Each top-level property contains a list of hooks (each of which can be enabled or disabled), followed by an `enabled` property, to either turn the entire section on or off.
	1. Update the JSON object's "enabled" properties as desired. 
		
		Keep in mind that if you allow two handlers to have the same hook enabled, the first hook executed that returns a value will succeed.
		
		**NOTE**: The order of execution furthermore depends on cartridge path priority. Hence the lookup path will be: cartridge location in path > hook definition > “enabled” property.
		
	2. Click **Apply**.
		
4. Select **MarketingCloudTriggers** from Object Type dropdown, and click **Find**.

	1. Edit each hook as necessary. 
	
		Each trigger has a trigger key that maps to Marketing Cloud. Each trigger can be directly enabled/disabled. Additionally, a list of Subscriber Attributes has been defined, which is a mapping of available values from Commerce Cloud to the attribute key they should be sent as to Marketing Cloud.
		
		See [Marketing Cloud - Triggered Send Configuration](#TSConfig) for additional information. 
		
	2. Click **Apply**.


