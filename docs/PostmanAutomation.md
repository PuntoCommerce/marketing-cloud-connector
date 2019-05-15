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

	3.1 [Triggered Send / Transactional Emails](3_1_0_TriggeredSendTransactionalEmails.md#navlink)
	
	3.1.1 [Triggered Send Configuration](3_1_1_MCConnectorInstallation-TriggeredSendConfiguration.md#navlink)
	
	3.2 [Realtime Analytics Configuration](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)


## Postman Automation

Postman Automation can be used automate the setup steps. 


### Prerequisites


1. Install Postman and import the Postman scripts from the /POSTMAN Folder.
2. Install the Legacy Package to make API Calls.
3. Verify Send Management is filled correctly, and the From Email address is done right.
4. Get the Auth/SOAP/Rest Endpoints/Client Id/ Client Secret information.
5. Enable SOAP calls in Marketing Cloud account for the user. By Default, it is disabled.
6.  make sure to add */service.asmx* to the end if the SOAP url while filling in SoapEndPoint variable.
7. Enable username/password for web service calls.
8. Use the legacy package client credentials to request access token.
9. Fill in the requisite values.

### Variables

| Variable Name | Notes |
|---------------|-------|
| soapEndPoint | This information can be found in the installed package. Please suffix */Service.asmx* |
| soapUserName | This is the username used to login to the Marketing Cloud Account. |
| soapPassword | This is the password used to login to the Marketing Cloud Account. |
| restEndPoint | This information can be found in the installed package. |
| authEndPoint | This information can be found in the installed package. |
| clientId | This information can be found in the installed package. |
| clientSecret | This information can be found in the installed package. |
| sfmcClientId | MID |

### Scripts

Execute the scripts in the following order:


1. Auth : Request SFMC Token - This step saves the auth token.
2. General: Gets the data extension template ID's and stores them in the variables.
3. Account Created.
4. Account Updated.
5. Account Locked.
6. Account Password Changed.
7. Account Password Reset.
8. Customer Service - Contact Us.
9. Gift Certificate - Send.
10. Order Confirmation.

### Debugging


1. Check at the response.
2. If the response is not clear, check if all variables have been filled.
3. If steps 1 and 2 do not work, type in the variables directly in the SOAP/REST body and try.

--
[Back to the top](#Top)