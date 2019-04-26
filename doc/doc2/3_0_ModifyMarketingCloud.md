# marketing-cloud-connector: 
-
## 3. Modify Marketing Cloud Instance

### Navigation
1. [Project Overview](1_0_Project_Overview.md)
2. [Install Commerce Cloud Components](2_0_Commerce_Cloud_Component_Installation.md)
	
	2.1 [Handler Framework Installation](2_1_Handler-Installation.md)
	
	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md)
	
	2.3 [SFRA Modification Instructions](2_3_Modification-Instructions-for-SFRA.md)
	
	2.4. [SiteGenesis Modification Instructions](2_4_Modification-Instructions-for-SiteGenesis.md)

7. [**Modify Marketing Cloud Instance**](3_0_ModifyMarketingCloud.md)

	3.1 [Triggered Send / Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md)
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md)
	
	3.2. [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md)
	
11. [Advanced Usage and Configuration](4_0_AdvancedUsage.md)
12. [ Debugging](5.0_Debugging.md)


## Marketing Cloud App and API Key#

This step must be done for each Commerce Cloud Business Unit that you want to connect with.

See [Salesforce Developers App Center](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/get-api-key.htm) for more information.

1. Log in to [App Center](https://appcenter-auth.s1.marketingcloudapps.com/).

    If you don't already have an App Center account, create one here: [App Center Create Account](https://appcenter-auth.s1.marketingcloudapps.com/create). 
	
	See the [Salesforce Developers App Center Overview](https://developer.salesforce.com/docs/atlas.en-us.mc-getting-started.meta/mc-getting-started/app-center.htm) for more information.

3. If necessary, create a package.

	See [Create and Install Packages] (https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/install-packages.htm) for additional information.
	
	**Note:** You must deselect Create with enhanced functionality when creating your package.
	
4. Create an API Integration component.

	See [Create an API Integration in Legacy Packages](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-integration-legacy.htm) for more information.
	
	Specify the following permissions: 
	- Channels - Email: Send
	- Data - Data Extensions: Read and Write

5. Save the Details page for your records.