<a name="Top"></a>
# marketing-cloud-connector

### Navigation
1. [Project Overview](1_0_Project_Overview.md#navlink)
2. [Install B2C Commerce Components](2_0_Commerce_Cloud_Component_Installation.md#navlink)
	
	2.1 [Handler Framework Installation](2_1_Handler-Installation.md#navlink)
	
	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md#navlink)
	
	2.3 [SFRA Modification Instructions](2_3_Modification-Instructions-for-SFRA.md#navlink)
	
	2.4 [SiteGenesis Modification Instructions](2_4_Modification-Instructions-for-SiteGenesis.md#navlink)
	
	2.5 [Manual Modification Instructions](2_5_ManualModifications.md#navlink)

7. [Install Marketing Cloud Components](3_0_ModifyMarketingCloud.md#navlink)

	3.1 [**Triggered Send / Transactional Emails**](3_1_0_TriggeredSendTransactionalEmails.md#navlink)
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2 [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 3.1 Triggered Send / Transactional Emails


**Important:** Make sure that your Marketing Cloud representative is aware that you intend to use Triggered Send functionality, Triggered Send Data Extension templates, and that you are connecting to Triggered Send using REST API. Your representative should be able to ensure that the necessary permissions are turned on and enabled for your account. These permissions should be checked and enabled, or inherited, for every Business Unit that you want to utilize with Triggered Sends.  

For each trigger: 

- the corresponding hook definition must be enabled in `CommunicationHandlers`. 
- the triggered send definition must be enabled in `MarketingCloudTriggers`.
- a trigger key is defined. 

For attributes to be sent to Marketing Cloud, a triggered email needs to be defined, typically with a data extension attached. Each data extension attribute is used for mapping subscriber attributes in the trigger definition. If a defined attribute does not exist on the Marketing Cloud side, it is ignored by Marketing Cloud.

In Marketing Cloud: 

1. [Create a data extension from a template](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/creating_a_data_extension_from_a_template/). 

	Each triggered send must connect to a **Data Extension**. A data extension can be shared,= when the data being stored overlaps between triggers.
	
	**Note:** Data extensions that collect triggering subscriber information must be built using a triggered-send-source data extension template.  

2. [Build a template-based email.](https://help.marketingcloud.com/en/documentation/exacttarget/content/create_an_email/build_a_template_based_email/)

	Each triggered send requires an email. It's recommended to create your email using Content Builder.  

3. [Create a triggered email message interaction.](https://help.marketingcloud.com/en/documentation/exacttarget/interactions/triggered_emails/triggered_emails_guide/how_to_create_a_triggered_email_message_interaction/)
	
	Be sure to associate the email and data extension that you created. It's also recommended to enable the feature to Disable the Triggered Send when API errors are encountered. 
	 
4. Ensure your triggered send is in a running state, otherwise it cannot be used by B2C Commerce.  

See [3.1.1 Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink) for additional information.  

- - -

[Back to the top](#Top)