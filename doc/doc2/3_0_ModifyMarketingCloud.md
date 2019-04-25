# marketing-cloud-connector: 
-
## Modify Marketing Cloud instance

### Table of Contents
1. A
2. B
3. 

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
