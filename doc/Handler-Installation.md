
# marketing-cloud-connector: Handler Framework Installation #
---
## Table of Contents
1. [Handler Framework Overview](#Overview)
2. [Handler Framework Installation](#Install)
3. [SFRA/SiteGenisis Storefront Modifications](#Modifications)

--

<a name="Overview"></a>
### Overview

The Handler Framework for the Marketing Cloud Connector cartridge introduces reusable integration points into SiteGenesis and Storefront Reference Architecture (SFRA). It supports the management of integrations points via Commerce Cloud site configuration rather than applying custom code changes, ultimately allowing additional integrations to be installed without having to modify numerous areas of SiteGenesis or SFRA. Instead of implementing these changes directly into the reference application, the functionality has been moved into this utility cartridge to provide as much as customization flexibility as possible while separating both code bases.  

Currently supported through site configurations and preferences is the management of Communication Handlers. 

Communication Handlers allow the granular definition of triggered/send email origins, such as Commerce Cloud/ SiteGenesis or Marketing Cloud. 

The following email types are supported to be used with either Commerce Cloud or Marketing Cloud:


    1. Account - Created
    2. Account - Updated
    3. Account - Password Changed
    4. Account - Password Reset
    5. Account - Locked Out
    6. Customer Service - Contact Us
    7. Gift Certificate - Send Certificate
    8. Order - Confirmation


The installation instructions refer to the setup and implementation within a Commerce Cloud environment (Business Manager and custom code repository). Knowledge of Commerce Cloud code development techniques and tools are a prerequisite.
  
<a name="Installation"></a>
### Install the Handler Framework ###

1. Check out the latest tagged release from the  [Handler Framework Github Repository](https://github.com/SalesforceCommerceCloud/handler-framework/releases).

2. Add the `int_handlerframework` and `modules` directories to your storefront repository cartridges directory, and upload the cartridges to your storefront instance.
    
    NOTE: If you already have a `modules` directory, merge the directory contents together.
    
3. Ensure that the cartridge is properly loaded by Business Manager. 

	To do so, activate a different code version (in Business Manager, go to **Administration > Site Development > Code Deployment**) and then reactivate your current code version. This ensures that the necessary job-step types are registered correctly, which is necessary before importing.
	
4. Import the metadata, custom objects, and jobs definitions into your Commerce Cloud environment. 
	
	XML definitions can be found in the [/site_template/ directory](https://github.com/SalesforceCommerceCloud/handler-framework/tree/develop/sites/site_template).
	
	The custom object definition for `CommunicationHandlers` is set to site-level, by default. This is to support the possibility of different configurations per site. If you plan on using the same configuration for your entire organization, you can change the site-level custom objects, to organization-level custom objects. 
To do so: 
    1. Open `handler-framework/sites/site_template/meta/custom-objecttype-definitions.xml`. 
    2. Change `<storage-scope>site</storage-scope>` to `<storage-scope>organization</storage-scope>`.
    3. Save, and import the definition file.

5. Update your site cartridge path:  `app_storefront_controllers:app_storefront_core:int_handlerframework`

<a name="Modifications"></a>
### Apply Modifications to Storefront

Depending on your use of SFRA or SiteGensis, your Storefront modifications will vary. Refer to the correct modification instrutions, based on your instance.

[Modification Instructions for SFRA](Modification-Instructions-for-SFRA.md
)

[Modification Instructions for SiteGenesis](Modification-Instructions-for-SiteGenesis.md)