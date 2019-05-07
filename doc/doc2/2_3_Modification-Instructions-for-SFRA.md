<a name="Top"></a>
# marketing-cloud-connector: 


### Navigation
1. [Project Overview](1_0_Project_Overview.md)
2. [Install B2C Commerce Components](2_0_Commerce_Cloud_Component_Installation.md)
	
	2.1 [Handler Framework Installation](2_1_Handler-Installation.md)
	
	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md)
	
	2.3 [**SFRA Modification Instructions**](2_3_Modification-Instructions-for-SFRA.md)
	
	2.4 [SiteGenesis Modification Instructions](2_4_Modification-Instructions-for-SiteGenesis.md)
			
	2.5 [Manual Modification Instructions](2_5_ManualModifications.md)

7. [Install Marketing Cloud Components](3_0_ModifyMarketingCloud.md)

	3.1 [Triggered Send / Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md)
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md)
	
	3.2. [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md)
	
11. [Additional Features](4_0_AdditionalFeatures.md)
12. [Debugging](5_0_Debugging.md)

## 2.3 SFRA Modification Instructions 
<a name="Overlay"></a>
### Using the SFRA Overlay Cartridge

With the release of the Marketing Cloud Connector version 2.0.0, a new cartridge is supplied called _plugin\_marketing\_cloud_.  This cartridge is intended to overlay the SFRA main cartridge (_app\_storefront\_base_) and replace the functionality with that needed to activate the Marketing Cloud Connector hooks.  Essentially, it contains all of the changes the Manual Modifications instructions advise you to make.  You will still need to import and configure all the metadata and custom objects as described below; you just won't have to manually cut and paste all the code from these instructions into your version of SFRA.

After loading up the _plugin\_marketing\_cloud_ cartridge, adjust your cartridge path to look like:
`plugin_marketing_cloud:app_storefront_base:int_marketing_cloud:int_handlerframework`

**Note:** These instructions are only relevant for Version 2.0.0 of the Marketing Cloud Connector, after the merging of [Pull Request 27](https://github.com/SalesforceCommerceCloud/marketing-cloud-connector/pull/27).  If you're using a previous release, use the [Manual Modification Instructions](2_5_ManualModifications.md).

--
[Back to the top](#Top)