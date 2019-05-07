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
	
	3.2 [**Realtime Analytics Configuration**](3_2_MCConnectorInstallation-RealtimeAnalyticsConfiguration.md#navlink)
	
11. [Additional Features](4_0_AdditionalFeatures.md#navlink)
12. [Debugging](5_0_Debugging.md#navlink)

<a name="navlink"></a>
## 3.2 Realtime Analytics Configuration 

Predictive Web, also referred to as Analytics or collect.js, provides you with the ability to track customer activity throughout your storefront. This information can be used to power personalized recommendations, as well as used to facilitate abandoned cart, search, or browse journeys.

The Predictive Web feature can be found under Personalization Builder. To ensure that you set up Personalization Builder correctly, it is recommended that you work with your Marketing Cloud representative.

Personalization Builder provides you with a wizard that walks you through the set-up process. In this process, you define whether you want to personalize products, content, or both. You also define additional fields that you want to store within the product and content catalog to be used for recommendation behavior.
Work with your Marketing Cloud representative to address any questions or concerns that may arise.
Everything on this page merely exists as recommendations, intended to help you configure your account.

## Events

Marketing Cloud Connectors Analytics functionality supports configurable event tracking, using a field mapping approach similar to Triggers and Data Feeds.  
The Connector also supports *custom events* that you can output based on predefined storefront events occurring.

### Available Events

- search
    - Endpoints: `Search-Show`
    - Required params: `q`
    - Event value: The search string
- category
    - Endpoints: `Search-Show`
    - Required params: `cgid`
    - Event value: The category ID
- content
    - Endpoints: `Page-Show`
    - Required params: `cid`
    - Event value: The content ID
- product
    - Endpoints: `Product-Show`, `Product-ShowInCategory`
    - Required params: `pid`
    - Event value: The product ID
- cartAddProduct
    - Endpoints: `Cart-AddProduct`
    - Required params: `pid`
    - Event value: The product ID
- viewCart
    - Endpoints: `Cart-Show`
- cartAddCoupon
    - Endpoints: `Cart-SubmitForm`
    - Required Form ID: `cart`
    - Required Form Action: `addCoupon`
    - Event value: The submitted coupon code
- wishlistAddProduct
    - Endpoints: `Wishlist-Add`
    - Required params: `pid`
    - Event value: The product ID
- registryAddProduct
    - Endpoints: `GiftRegistry-AddProduct`
    - Required params: `pid`
    - Event value: The product ID
- checkout
    - Endpoints: `COCustomer-Start`, `COShipping-Start`, `COBilling-Start`, `COSummary-Start`
    - Event value: The current step number, i.e. - `step0`, `step1`, `step2`, or `step3`
- coShipping
    - Endpoints: `COShipping-SingleShipping`
    - Required Form ID: `singleshipping`
    - Required Form Action: `save`
    - Event value: `submitted`
- coBilling
    - Endpoints: `COBilling-Billing`
    - Required Form ID: `billing`
    - Required Form Action: `save`
    - Event value: `submitted`
- mailingListSubscribed
    - Endpoints: `COBilling-Billing`
    - Required Form ID: `billing`
    - Required Form Action: `save`
    - Event value: The submitted email address (this event only fires if subscribe option is checked)
- coSummary
    - Endpoints: `COSummary-Submit`
    - Event value: `submitted`
- orderConfirmation
    - Endpoints: `COSummary-Submit`
    - Event value: Order ID string
- basketUpdated
    - Fires when basket etag hash has changed
- ajaxRequest
    - Fired when an ajax template is requested

#### Custom Events

Custom events can be fired when any of the available events occur. A custom event can be named whatever value desired.  

**Note**: Custom events are sent to Marketing Cloud using the collect.js `trackEvent` method. This data may or may not be usable on the Marketing Cloud side, so we recommend you speak with your representative to confirm. To ensure that custom event data is always available in some form, custom event data is also added to the `setUserInfo` method. Work with your representative to ensure you're able to react to information set on the user profile.

All custom events have the following attributes available for data mapping:

- EventName
    - Type: `string`
    - Example value: `product`
- EventValue
    - Type: `string`
    - Example value: `123MyProductID`
- RequestData
    - Type: `object`
    - Structure:
        - `RequestData.origBasketState` (`string` - hash value representing state of basket at start of request)
        - `RequestData.request.requestID` (`string` - the base request ID)
        - `RequestData.request.referer` (`string` - referrer according to last clickstream)
        - `RequestData.request.urlPath` (`string` - url path according to last clickstream)
        - `RequestData.request.queryString` (`string` - request query string according to last clickstream)
        - `RequestData.request.triggeredForm.formID` (`string` - submitted form ID)
        - `RequestData.request.triggeredForm.actionID` (`string` - submitted form action)
        - `RequestData.request.params` (`object` - submitted url parameters)
        - `RequestData.request.clickstreamPipeline` (`string` - the last requested pipeline)
        - `RequestData.request.detectedController.controller` (`string` - detected controller that is executing)
        - `RequestData.request.detectedController.method` (`string` - detected controller method that is executing)
        - `RequestData.request.isAjaxRequest` (`boolean` - whether current request is AJAX based)
        - `RequestData.events` (`array` - each entry is an array of event name and possible additional parameter)
- Session
    - Type: `dw.system.Session`
- Customer
    - Type: `dw.customer.Customer`
- Basket
    - Type: `dw.order.Basket`

If the above available events are insufficient, and you want to introduce your own events to be used for tracking, you *should* be able to do something like:

```
const HookMgr = require('dw/system/HookMgr');
var hookID = 'app.tracking.getDataLayer';
var dataLayer = HookMgr.callHook(
    hookID,
    hookID.slice(hookID.lastIndexOf('.') + 1)
);

dataLayer.events.push(['some-custom-event-ID', 'some-custom-event-value']);
```

For additional reference, please review the code for pre-defined events, found in the [Handler Framework's tracking data layer](https://github.com/SalesforceCommerceCloud/handler-framework/tree/develop/cartridges/int_handlerframework/cartridge/scripts/tracking).

--
[Back to the top](#Top)