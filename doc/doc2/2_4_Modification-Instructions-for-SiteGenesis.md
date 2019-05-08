<a name="Top"></a>
# marketing-cloud-connector

### Navigation
1. [Project Overview](1_0_Project_Overview.md#navlink)
2. [Install B2C Commerce Components](2_0_Commerce_Cloud_Component_Installation.md#navlink)
	
	2.1 [Handler Framework Installation](2_1_Handler-Installation.md#navlink)
	
	2.2 [Marketing Cloud Cartridge Installation](2_2_MarketingCloudCart.md#navlink)
	
	2.3 [SFRA Modification Instructions](2_3_Modification-Instructions-for-SFRA.md#navlink)
	
	2.4 [**SiteGenesis Modification Instructions**](2_4_Modification-Instructions-for-SiteGenesis.md#navlink)
				
	2.5 [Manual Modification Instructions](2_5_ManualModifications.md#navlink)

7. [Install Marketing Cloud Components](3_0_ModifyMarketingCloud.md#navlink)

	3.1 [Triggered Send / Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md#navlink)
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2 [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 2.4 SiteGenesis Modification Instructions #

<a name="Clone"></a>
## Clone or Pull from Community SiteGenesis 

The official Javascript Controller based SiteGenesis repository is in maintenance-only mode while a new Mobile First Reference Architecture is in development. A community-supported fork of SiteGenesis has been established ([Community Site Genesis](https://www.google.com/url?q=https://github.com/SalesforceCommerceCloud/community-sitegenesis)), allowing the community to continue enhancing and extending SiteGenesis.

For detailed information on the SiteGenesis JavaScript Controller, review the existing [B2C Commerce Documentation](https://documentation.demandware.com/DOC1/topic/com.demandware.dochelp/SGJC/SiteGenesisSetup.html?cp=0_4_13).

1. Update SiteGenesis:
    1. For a fresh install of SiteGenesis, clone the Community Site Genesis repository.
    2. For an existing project that is based on the SiteGenesis git repository (and has the git history intact), add the Community Site Genesis as a new git remote, and pull or merge in the community changes.
    
2. Open the file `app_storefront_controllers/cartridge/scripts/hooks.json`, and delete: 

    ```:::javascript
        {
            "name": "app.mail.sendMail",
            "script": "./mail/mailHook"
        },
	```
  

If your project cannot take advantage of Community SiteGenesis for some reason, review the Manual Modifications to SiteGenesis Cartridge.

- - -

[Back to the top](#Top)